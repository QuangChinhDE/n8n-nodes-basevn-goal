import type { IExecuteFunctions, INodeExecutionData, INodeProperties } from 'n8n-workflow';
import { goalApiRequest } from '../../shared/transport';
import { processResponse } from '../../shared/utils';

export const description: INodeProperties[] = [
	{
		displayName: 'Username',
		name: 'username',
		type: 'string',
		required: true,
		displayOptions: { show: { resource: ['keyResult'], operation: ['create'] } },
		default: '',
		description: 'Creator username',
	},
	{
		displayName: 'Parent ID',
		name: 'parent_id',
		type: 'number',
		required: true,
		displayOptions: { show: { resource: ['keyResult'], operation: ['create'] } },
		default: 0,
		description: 'Parent goal ID',
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: { show: { resource: ['keyResult'], operation: ['create'] } },
		default: '',
		description: 'Key result name',
	},
	{
		displayName: 'Assignee',
		name: 'assignee',
		type: 'string',
		required: true,
		displayOptions: { show: { resource: ['keyResult'], operation: ['create'] } },
		default: '',
		description: 'Assignee username',
	},
	{
		displayName: 'Metatype',
		name: 'metatype',
		type: 'options',
		required: true,
		displayOptions: { show: { resource: ['keyResult'], operation: ['create'] } },
		options: [
			{ name: 'Percentage', value: 'percentage' },
			{ name: 'Metric', value: 'metric' },
		],
		default: 'percentage',
		description: 'Key result type',
	},
	{
		displayName: 'Metric Code',
		name: 'metric_code',
		type: 'string',
		required: true,
		displayOptions: { show: { resource: ['keyResult'], operation: ['create'], metatype: ['metric'] } },
		default: '',
		description: 'KPI metric code (required when metatype is metric)',
	},
	{
		displayName: 'Workload',
		name: 'workload',
		type: 'number',
		displayOptions: { show: { resource: ['keyResult'], operation: ['create'] } },
		default: 0,
		description: 'Estimated workload',
	},
	{
		displayName: 'Start Time',
		name: 'start_time',
		type: 'string',
		displayOptions: { show: { resource: ['keyResult'], operation: ['create'] } },
		default: '',
		description: 'Start date (dd/mm/yyyy)',
		placeholder: '01/01/2024',
	},
	{
		displayName: 'End Time',
		name: 'end_time',
		type: 'string',
		displayOptions: { show: { resource: ['keyResult'], operation: ['create'] } },
		default: '',
		description: 'End date (dd/mm/yyyy)',
		placeholder: '31/12/2024',
	},
	{
		displayName: 'Target',
		name: 'target',
		type: 'number',
		displayOptions: { show: { resource: ['keyResult'], operation: ['create'] } },
		default: 0,
		description: 'Target value',
	},
	{
		displayName: 'Initial',
		name: 'initial',
		type: 'number',
		displayOptions: { show: { resource: ['keyResult'], operation: ['create'] } },
		default: 0,
		description: 'Initial value',
	},
	{
		displayName: 'Content',
		name: 'content',
		type: 'string',
		displayOptions: { show: { resource: ['keyResult'], operation: ['create'] } },
		default: '',
		description: 'Key result description',
		typeOptions: { rows: 3 },
	},
];

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const username = this.getNodeParameter('username', index) as string;
	const parent_id = this.getNodeParameter('parent_id', index) as number;
	const name = this.getNodeParameter('name', index) as string;
	const assignee = this.getNodeParameter('assignee', index) as string;
	const metatype = this.getNodeParameter('metatype', index) as string;
	const workload = this.getNodeParameter('workload', index, 0) as number;
	const start_time = this.getNodeParameter('start_time', index, '') as string;
	const end_time = this.getNodeParameter('end_time', index, '') as string;
	const target = this.getNodeParameter('target', index, 0) as number;
	const initial = this.getNodeParameter('initial', index, 0) as number;
	const content = this.getNodeParameter('content', index, '') as string;

	const body: { [key: string]: string | number } = {
		username,
		parent_id,
		name,
		assignee,
		metatype,
	};

	if (metatype === 'metric') {
		const metric_code = this.getNodeParameter('metric_code', index) as string;
		body.metric_code = metric_code;
	}

	if (workload) body.workload = workload;
	if (start_time) body.start_time = start_time;
	if (end_time) body.end_time = end_time;
	if (target) body.target = target;
	if (initial) body.initial = initial;
	if (content) body.content = content;

	const response = await goalApiRequest.call(this, 'POST', '/kr/create', body);
	const data = processResponse(response);

	return [{ json: Array.isArray(data) ? data[0] : data }];
}
