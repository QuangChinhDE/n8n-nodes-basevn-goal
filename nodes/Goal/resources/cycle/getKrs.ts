import type { IExecuteFunctions, INodeExecutionData, INodeProperties } from 'n8n-workflow';
import { goalApiRequest } from '../../shared/transport';
import { processResponse } from '../../shared/utils';

export const description: INodeProperties[] = [
	{
		displayName: 'Cycle Path',
		name: 'path',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['cycle'],
				operation: ['getKrs'],
			},
		},
		default: '',
		description: 'Cycle path (e.g. thang-12021-6)',
		placeholder: 'thang-12021-6',
	},
];

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const path = this.getNodeParameter('path', index) as string;

	const response = await goalApiRequest.call(this, 'POST', '/cycle/krs', { path });
	const data = processResponse(response);

	return Array.isArray(data) ? data.map((item) => ({ json: item })) : [{ json: data }];
}
