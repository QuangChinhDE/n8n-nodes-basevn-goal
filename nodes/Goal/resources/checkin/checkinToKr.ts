import type { IExecuteFunctions, INodeExecutionData, INodeProperties } from 'n8n-workflow';
import { goalApiRequest } from '../../shared/transport';
import { processResponse } from '../../shared/utils';

export const description: INodeProperties[] = [
	{
		displayName: 'Username',
		name: 'username',
		type: 'string',
		required: true,
		displayOptions: { show: { resource: ['checkin'], operation: ['checkinToKr'] } },
		default: '',
		description: 'Username of the person checking in',
	},
	{
		displayName: 'Key Result ID',
		name: 'id',
		type: 'number',
		required: true,
		displayOptions: { show: { resource: ['checkin'], operation: ['checkinToKr'] } },
		default: 0,
		description: 'ID of the key result',
	},
	{
		displayName: 'Date',
		name: 'date',
		type: 'string',
		required: true,
		displayOptions: { show: { resource: ['checkin'], operation: ['checkinToKr'] } },
		default: '',
		description: 'Checkin date (dd/mm/yyyy)',
		placeholder: '25/06/2024',
	},
	{
		displayName: 'Value',
		name: 'value',
		type: 'number',
		required: true,
		displayOptions: { show: { resource: ['checkin'], operation: ['checkinToKr'] } },
		default: 0,
		description: 'Progress update value',
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: { show: { resource: ['checkin'], operation: ['checkinToKr'] } },
		default: '',
		description: 'Main content of the checkin',
	},
	{
		displayName: 'Confidence',
		name: 'confidence',
		type: 'options',
		displayOptions: { show: { resource: ['checkin'], operation: ['checkinToKr'] } },
		options: [
			{ name: 'Low', value: 'low' },
			{ name: 'Average', value: 'average' },
			{ name: 'High', value: 'high' },
			{ name: 'Sure', value: 'sure' },
		],
		default: 'average',
		description: 'Confidence level',
	},
	{
		displayName: 'Workload',
		name: 'workload',
		type: 'number',
		displayOptions: { show: { resource: ['checkin'], operation: ['checkinToKr'] } },
		default: 0,
		description: 'Time/effort spent',
	},
	{
		displayName: 'Content',
		name: 'content',
		type: 'string',
		displayOptions: { show: { resource: ['checkin'], operation: ['checkinToKr'] } },
		default: '',
		description: 'Detailed description',
		typeOptions: { rows: 3 },
	},
];

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const username = this.getNodeParameter('username', index) as string;
	const id = this.getNodeParameter('id', index) as number;
	const date = this.getNodeParameter('date', index) as string;
	const value = this.getNodeParameter('value', index) as number;
	const name = this.getNodeParameter('name', index) as string;
	const confidence = this.getNodeParameter('confidence', index, '') as string;
	const workload = this.getNodeParameter('workload', index, 0) as number;
	const content = this.getNodeParameter('content', index, '') as string;

	const body: { [key: string]: string | number } = {
		username,
		id,
		date,
		value,
		name,
	};

	if (confidence) body.confidence = confidence;
	if (workload) body.workload = workload;
	if (content) body.content = content;

	const response = await goalApiRequest.call(this, 'POST', '/checkin/kr', body);
	const data = processResponse(response);

	return [{ json: Array.isArray(data) ? data[0] : data }];
}
