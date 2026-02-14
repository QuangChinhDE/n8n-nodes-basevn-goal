import type { IExecuteFunctions, INodeExecutionData, INodeProperties } from 'n8n-workflow';
import { goalApiRequest } from '../../shared/transport';
import { processResponse } from '../../shared/utils';

export const description: INodeProperties[] = [
	{
		displayName: 'Goal ID',
		name: 'id',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['goal'],
				operation: ['getDetail'],
			},
		},
		default: 0,
		description: 'ID of the goal',
	},
];

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const id = this.getNodeParameter('id', index) as number;

	const response = await goalApiRequest.call(this, 'POST', '/goal/get', { id });
	const data = processResponse(response);

	return [{ json: Array.isArray(data) ? data[0] : data }];
}
