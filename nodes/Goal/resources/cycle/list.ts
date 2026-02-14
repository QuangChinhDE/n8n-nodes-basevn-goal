import type { IExecuteFunctions, INodeExecutionData, INodeProperties } from 'n8n-workflow';
import { goalApiRequest } from '../../shared/transport';
import { processResponse } from '../../shared/utils';

export const description: INodeProperties[] = [
	{
		displayName: 'Cycle Path',
		name: 'path',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['cycle'],
				operation: ['list'],
			},
		},
		default: '',
		description: 'Optional cycle path to filter',
	},
];

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const path = this.getNodeParameter('path', index, '') as string;
	const body: { [key: string]: string } = {};
	if (path) {
		body.path = path;
	}

	const response = await goalApiRequest.call(this, 'POST', '/cycle/list', body);
	const data = processResponse(response);

	return Array.isArray(data) ? data.map((item) => ({ json: item })) : [{ json: data }];
}
