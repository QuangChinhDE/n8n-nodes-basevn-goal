import type { IExecuteFunctions, INodeExecutionData, INodeProperties } from 'n8n-workflow';
import { goalApiRequest } from '../../shared/transport';
import { processResponse } from '../../shared/utils';

export const description: INodeProperties[] = [
	{
		displayName: 'Username',
		name: 'username',
		type: 'string',
		required: true,
		displayOptions: { show: { resource: ['checkin'], operation: ['checkinToKpiGoal'] } },
		default: '',
		description: 'Username of the person checking in',
	},
	{
		displayName: 'KPI Goal ID',
		name: 'id',
		type: 'number',
		required: true,
		displayOptions: { show: { resource: ['checkin'], operation: ['checkinToKpiGoal'] } },
		default: 0,
		description: 'ID of the KPI goal',
	},
	{
		displayName: 'Date',
		name: 'date',
		type: 'string',
		required: true,
		displayOptions: { show: { resource: ['checkin'], operation: ['checkinToKpiGoal'] } },
		default: '',
		description: 'Checkin date (dd/mm/yyyy)',
		placeholder: '24/06/2024',
	},
	{
		displayName: 'Value',
		name: 'value',
		type: 'number',
		required: true,
		displayOptions: { show: { resource: ['checkin'], operation: ['checkinToKpiGoal'] } },
		default: 0,
		description: 'Update value',
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: { show: { resource: ['checkin'], operation: ['checkinToKpiGoal'] } },
		default: '',
		description: 'Checkin title (what has been done)',
	},
	{
		displayName: 'Content',
		name: 'content',
		type: 'string',
		displayOptions: { show: { resource: ['checkin'], operation: ['checkinToKpiGoal'] } },
		default: '',
		description: 'Additional description',
		typeOptions: { rows: 3 },
	},
];

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const username = this.getNodeParameter('username', index) as string;
	const id = this.getNodeParameter('id', index) as number;
	const date = this.getNodeParameter('date', index) as string;
	const value = this.getNodeParameter('value', index) as number;
	const name = this.getNodeParameter('name', index) as string;
	const content = this.getNodeParameter('content', index, '') as string;

	const body: { [key: string]: string | number } = {
		username,
		id,
		date,
		value,
		name,
	};

	if (content) body.content = content;

	const response = await goalApiRequest.call(this, 'POST', '/checkin/goal.kpi', body);
	const data = processResponse(response);

	return [{ json: Array.isArray(data) ? data[0] : data }];
}
