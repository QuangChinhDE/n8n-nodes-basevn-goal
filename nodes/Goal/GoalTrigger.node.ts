import type {
	IWebhookFunctions,
	INodeType,
	INodeTypeDescription,
	IWebhookResponseData,
	IDataObject,
} from 'n8n-workflow';

export class GoalTrigger implements INodeType {
	usableAsTool = true;

	description: INodeTypeDescription = {
		displayName: 'BaseVN - App Goal Trigger',
		name: 'goalTrigger',
		icon: 'file:../../icons/goal.svg',
		group: ['trigger'],
		version: 1,
		description: 'Starts the workflow when BaseVN Goal webhook events occur',
		defaults: {
			name: 'BaseVN Goal Trigger',
		},
		inputs: [],
		outputs: ['main'],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: '={{$parameter["path"]}}',
			},
		],
		properties: [
			{
				displayName: 'Webhook Path',
				name: 'path',
				type: 'string',
				default: 'webhook',
				required: true,
				placeholder: 'webhook',
				description: 'The path for the webhook URL. Leave as default or customize it.',
			},
			{
				displayName: 'Response Selector',
				name: 'responseSelector',
				type: 'options',
				options: [
					{
						name: 'Full Payload',
						value: '',
						description: 'Return complete webhook payload',
					},
					{
						name: 'Body Only',
						value: 'body',
						description: 'Return only the body data',
					},
					{
						name: 'Goal Info',
						value: 'goalInfo',
						description: 'Return simplified goal/OKR/KPI information',
					},
					{
						name: 'Checkin Info',
						value: 'checkinInfo',
						description: 'Return simplified checkin information',
					},
				],
				default: 'body',
				description: 'Select which data to return from webhook',
			},
		],
		usableAsTool: true,
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const bodyData = this.getBodyData() as IDataObject;
		const responseSelector = this.getNodeParameter('responseSelector', '') as string;

		// Process response based on selector
		let returnData: IDataObject = bodyData;

		if (responseSelector === 'goalInfo') {
			// Return simplified goal/target information
			returnData = {
				id: bodyData.id,
				type: bodyData.type,
				name: bodyData.name,
				description: bodyData.description,
				status: bodyData.status,
				progress: bodyData.progress,
				target_value: bodyData.target_value,
				current_value: bodyData.current_value,
				cycle_id: bodyData.cycle_id,
				cycle_name: bodyData.cycle_name,
				owner_id: bodyData.owner_id,
				owner_name: bodyData.owner_name,
				parent_id: bodyData.parent_id,
				parent_name: bodyData.parent_name,
				start_date: bodyData.start_date,
				end_date: bodyData.end_date,
				created_at: bodyData.created_at,
				updated_at: bodyData.updated_at,
				link: bodyData.link,
			};
		} else if (responseSelector === 'checkinInfo') {
			// Return simplified checkin information
			returnData = {
				id: bodyData.id,
				goal_id: bodyData.goal_id,
				goal_name: bodyData.goal_name,
				kr_id: bodyData.kr_id,
				kr_name: bodyData.kr_name,
				checkin_value: bodyData.checkin_value,
				progress: bodyData.progress,
				confidence: bodyData.confidence,
				comment: bodyData.comment,
				user_id: bodyData.user_id,
				user_name: bodyData.user_name,
				checkin_date: bodyData.checkin_date,
				created_at: bodyData.created_at,
				link: bodyData.link,
			};
		} else if (responseSelector === '') {
			// Return full payload including headers
			const headerData = this.getHeaderData();
			returnData = {
				headers: headerData,
				body: bodyData,
			};
		}
		// else: Return body only (default) - returnData is already bodyData

		return {
			workflowData: [this.helpers.returnJsonArray(returnData)],
		};
	}
}
