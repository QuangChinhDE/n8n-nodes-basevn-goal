import type { IExecuteFunctions, INodeExecutionData, INodeProperties } from 'n8n-workflow';
import { goalApiRequest } from '../../shared/transport';
import { processResponse } from '../../shared/utils';

export const description: INodeProperties[] = [
	{
		displayName: 'Cycle Path',
		name: 'cycle_path',
		type: 'string',
		required: true,
		displayOptions: { show: { resource: ['target'], operation: ['createDeptOkr'] } },
		default: '',
		description: 'Path of the cycle',
		placeholder: 'thang-42021-10',
	},
	{
		displayName: 'Department Code',
		name: 'dept_code',
		type: 'string',
		required: true,
		displayOptions: { show: { resource: ['target'], operation: ['createDeptOkr'] } },
		default: '',
	},
	{
		displayName: 'Username',
		name: 'username',
		type: 'string',
		required: true,
		displayOptions: { show: { resource: ['target'], operation: ['createDeptOkr'] } },
		default: '',
		description: 'Creator username',
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: { show: { resource: ['target'], operation: ['createDeptOkr'] } },
		default: '',
		description: 'Target name',
	},
	{
		displayName: 'Assignee',
		name: 'assignee',
		type: 'string',
		required: true,
		displayOptions: { show: { resource: ['target'], operation: ['createDeptOkr'] } },
		default: '',
		description: 'Assignee username',
	},
	{
		displayName: 'Parent ID',
		name: 'parent_id',
		type: 'number',
		displayOptions: { show: { resource: ['target'], operation: ['createDeptOkr'] } },
		default: 0,
		description: 'Parent target ID',
	},
	{
		displayName: 'Followers',
		name: 'followers',
		type: 'string',
		displayOptions: { show: { resource: ['target'], operation: ['createDeptOkr'] } },
		default: '',
		description: 'Follower usernames (comma-separated)',
	},
	{
		displayName: 'Start Time',
		name: 'start_time',
		type: 'string',
		displayOptions: { show: { resource: ['target'], operation: ['createDeptOkr'] } },
		default: '',
		description: 'Start date (dd/mm/yyyy)',
	},
	{
		displayName: 'End Time',
		name: 'end_time',
		type: 'string',
		displayOptions: { show: { resource: ['target'], operation: ['createDeptOkr'] } },
		default: '',
		description: 'End date (dd/mm/yyyy)',
	},
	{
		displayName: 'Committed',
		name: 'committed',
		type: 'options',
		displayOptions: { show: { resource: ['target'], operation: ['createDeptOkr'] } },
		options: [
			{ name: 'Committed', value: 1 },
			{ name: 'Aspirational', value: 0 },
		],
		default: 1,
	},
	{
		displayName: 'Weight',
		name: 'weight',
		type: 'number',
		displayOptions: { show: { resource: ['target'], operation: ['createDeptOkr'] } },
		default: 1,
	},
	{
		displayName: 'Status',
		name: 'status',
		type: 'options',
		displayOptions: { show: { resource: ['target'], operation: ['createDeptOkr'] } },
		options: [
			{ name: 'Active', value: 1 },
			{ name: 'Draft', value: 0 },
		],
		default: 1,
	},
	{
		displayName: 'Privacy',
		name: 'privacy',
		type: 'options',
		displayOptions: { show: { resource: ['target'], operation: ['createDeptOkr'] } },
		options: [
			{ name: 'Public', value: 1 },
			{ name: 'Private', value: 0 },
		],
		default: 1,
	},
	{
		displayName: 'Departments to View',
		name: 'depts_to_view',
		type: 'string',
		displayOptions: { show: { resource: ['target'], operation: ['createDeptOkr'] } },
		default: '',
		description: 'Department codes that can view',
	},
	{
		displayName: 'Content',
		name: 'content',
		type: 'string',
		displayOptions: { show: { resource: ['target'], operation: ['createDeptOkr'] } },
		default: '',
		description: 'Target description',
		typeOptions: { rows: 3 },
	},
];

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const cycle_path = this.getNodeParameter('cycle_path', index) as string;
	const dept_code = this.getNodeParameter('dept_code', index) as string;
	const username = this.getNodeParameter('username', index) as string;
	const name = this.getNodeParameter('name', index) as string;
	const assignee = this.getNodeParameter('assignee', index) as string;
	const parent_id = this.getNodeParameter('parent_id', index, 0) as number;
	const followers = this.getNodeParameter('followers', index, '') as string;
	const start_time = this.getNodeParameter('start_time', index, '') as string;
	const end_time = this.getNodeParameter('end_time', index, '') as string;
	const committed = this.getNodeParameter('committed', index, 1) as number;
	const weight = this.getNodeParameter('weight', index, 1) as number;
	const status = this.getNodeParameter('status', index, 1) as number;
	const privacy = this.getNodeParameter('privacy', index, 1) as number;
	const depts_to_view = this.getNodeParameter('depts_to_view', index, '') as string;
	const content = this.getNodeParameter('content', index, '') as string;

	const body: { [key: string]: string | number } = {
		cycle_path,
		dept_code,
		username,
		name,
		assignee,
	};

	if (parent_id) body.parent_id = parent_id;
	if (followers) body.followers = followers;
	if (start_time) body.start_time = start_time;
	if (end_time) body.end_time = end_time;
	body.committed = committed;
	body.weight = weight;
	body.status = status;
	body.privacy = privacy;
	if (depts_to_view) body.depts_to_view = depts_to_view;
	if (content) body.content = content;

	const response = await goalApiRequest.call(this, 'POST', '/target/create/okr.dept', body);
	const data = processResponse(response);

	return [{ json: Array.isArray(data) ? data[0] : data }];
}
