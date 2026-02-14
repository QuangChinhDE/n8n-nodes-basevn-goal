import type { IExecuteFunctions, INodeExecutionData, INodeProperties } from 'n8n-workflow';
import { goalApiRequest } from '../../shared/transport';
import { processResponse } from '../../shared/utils';

export const description: INodeProperties[] = [
	{
		displayName: 'Username',
		name: 'username',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['cycle'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Creator username',
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['cycle'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Cycle name',
	},
	{
		displayName: 'Owners',
		name: 'owners',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['cycle'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Owners (comma-separated usernames, e.g. @admin,@user)',
		placeholder: '@admin,@user',
	},
	{
		displayName: 'Metatype',
		name: 'metatype',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['cycle'],
				operation: ['create'],
			},
		},
		options: [
			{ name: 'Monthly', value: 'monthly' },
			{ name: 'Quarterly', value: 'quarterly' },
			{ name: 'Yearly', value: 'yearly' },
		],
		default: 'monthly',
		description: 'Cycle type',
	},
	{
		displayName: 'Year',
		name: 'year',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['cycle'],
				operation: ['create'],
			},
		},
		default: 2024,
		description: 'Year (from 2018 to 2050)',
		typeOptions: {
			minValue: 2018,
			maxValue: 2050,
		},
	},
	{
		displayName: 'Period',
		name: 'period',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['cycle'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Period: Monthly (T1-T12), Quarterly (Q1-Q4)',
		placeholder: 'T4 or Q2',
	},
	{
		displayName: 'KPIs',
		name: 'kpis',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['cycle'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'KPI metric codes (comma-separated)',
		placeholder: 'revenues,customers',
	},
	{
		displayName: 'Content',
		name: 'content',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['cycle'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Cycle description',
		typeOptions: {
			rows: 3,
		},
	},
];

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const username = this.getNodeParameter('username', index) as string;
	const name = this.getNodeParameter('name', index) as string;
	const owners = this.getNodeParameter('owners', index) as string;
	const metatype = this.getNodeParameter('metatype', index) as string;
	const year = this.getNodeParameter('year', index) as number;
	const period = this.getNodeParameter('period', index) as string;
	const kpis = this.getNodeParameter('kpis', index, '') as string;
	const content = this.getNodeParameter('content', index, '') as string;

	const body: { [key: string]: string | number } = {
		username,
		name,
		owners,
		metatype,
		year,
		period,
	};

	if (kpis) body.kpis = kpis;
	if (content) body.content = content;

	// Note: This endpoint uses multipart/form-data
	const response = await goalApiRequest.call(this, 'POST', '/cycle/create', body);
	const data = processResponse(response);

	return [{ json: Array.isArray(data) ? data[0] : data }];
}
