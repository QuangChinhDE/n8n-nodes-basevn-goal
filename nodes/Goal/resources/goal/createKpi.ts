import type { IExecuteFunctions, INodeExecutionData, INodeProperties } from 'n8n-workflow';
import { goalApiRequest } from '../../shared/transport';
import { processResponse } from '../../shared/utils';

export const description: INodeProperties[] = [
	{
		displayName: 'Cycle Path',
		name: 'cycle_path',
		type: 'string',
		required: true,
		displayOptions: { show: { resource: ['goal'], operation: ['createKpi'] } },
		default: '',
		description: 'Path of the cycle',
		placeholder: 'thang-42021-10',
	},
	{
		displayName: 'Username',
		name: 'username',
		type: 'string',
		required: true,
		displayOptions: { show: { resource: ['goal'], operation: ['createKpi'] } },
		default: '',
		description: 'Creator username',
	},
	{
		displayName: 'Metric Code',
		name: 'metric_code',
		type: 'string',
		required: true,
		displayOptions: { show: { resource: ['goal'], operation: ['createKpi'] } },
		default: '',
		description: 'KPI metric code',
	},
	{
		displayName: 'Target',
		name: 'target',
		type: 'string',
		required: true,
		displayOptions: { show: { resource: ['goal'], operation: ['createKpi'] } },
		default: '',
		description: 'Target value',
	},
	{
		displayName: 'Assignee',
		name: 'assignee',
		type: 'string',
		required: true,
		displayOptions: { show: { resource: ['goal'], operation: ['createKpi'] } },
		default: '',
		description: 'Assignee username',
	},
	{
		displayName: 'Team Code',
		name: 'team_code',
		type: 'string',
		displayOptions: { show: { resource: ['goal'], operation: ['createKpi'] } },
		default: '',
	},
	{
		displayName: 'Watchers',
		name: 'watchers',
		type: 'string',
		displayOptions: { show: { resource: ['goal'], operation: ['createKpi'] } },
		default: '',
		description: 'Watcher usernames (comma-separated)',
	},
	{
		displayName: 'Start Time',
		name: 'start_time',
		type: 'string',
		displayOptions: { show: { resource: ['goal'], operation: ['createKpi'] } },
		default: '',
		description: 'Start date (dd/mm/yyyy)',
	},
	{
		displayName: 'End Time',
		name: 'end_time',
		type: 'string',
		displayOptions: { show: { resource: ['goal'], operation: ['createKpi'] } },
		default: '',
		description: 'End date (dd/mm/yyyy)',
	},
	{
		displayName: 'Weight',
		name: 'weight',
		type: 'number',
		displayOptions: { show: { resource: ['goal'], operation: ['createKpi'] } },
		default: 1,
		description: 'Goal weight',
	},
	{
		displayName: 'Status',
		name: 'status',
		type: 'options',
		displayOptions: { show: { resource: ['goal'], operation: ['createKpi'] } },
		options: [
			{ name: 'Active', value: 1 },
			{ name: 'Draft', value: 0 },
		],
		default: 1,
		description: 'Goal status',
	},
	{
		displayName: 'Content',
		name: 'content',
		type: 'string',
		displayOptions: { show: { resource: ['goal'], operation: ['createKpi'] } },
		default: '',
		description: 'Goal description',
		typeOptions: { rows: 3 },
	},
	{
		displayName: 'Parent ID',
		name: 'parent_id',
		type: 'number',
		displayOptions: { show: { resource: ['goal'], operation: ['createKpi'] } },
		default: 0,
		description: 'Parent goal ID',
	},
];

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const cycle_path = this.getNodeParameter('cycle_path', index) as string;
	const username = this.getNodeParameter('username', index) as string;
	const metric_code = this.getNodeParameter('metric_code', index) as string;
	const target = this.getNodeParameter('target', index) as string;
	const assignee = this.getNodeParameter('assignee', index) as string;
	const team_code = this.getNodeParameter('team_code', index, '') as string;
	const watchers = this.getNodeParameter('watchers', index, '') as string;
	const start_time = this.getNodeParameter('start_time', index, '') as string;
	const end_time = this.getNodeParameter('end_time', index, '') as string;
	const weight = this.getNodeParameter('weight', index, 1) as number;
	const status = this.getNodeParameter('status', index, 1) as number;
	const content = this.getNodeParameter('content', index, '') as string;
	const parent_id = this.getNodeParameter('parent_id', index, 0) as number;

	const body: { [key: string]: string | number } = {
		cycle_path,
		username,
		metric_code,
		target,
		assignee,
	};

	if (team_code) body.team_code = team_code;
	if (watchers) body.watchers = watchers;
	if (start_time) body.start_time = start_time;
	if (end_time) body.end_time = end_time;
	body.weight = weight;
	body.status = status;
	if (content) body.content = content;
	if (parent_id) body.parent_id = parent_id;

	const response = await goalApiRequest.call(this, 'POST', '/goal/create.kpi', body);
	const data = processResponse(response);

	return [{ json: Array.isArray(data) ? data[0] : data }];
}
