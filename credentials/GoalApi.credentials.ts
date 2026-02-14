import type {
	ICredentialTestRequest,
	ICredentialType,
	Icon,
	INodeProperties,
} from 'n8n-workflow';

export class GoalApi implements ICredentialType {
	name = 'goalApi';

	displayName = 'BaseVN - App Goal API';

	icon: Icon = 'file:../icons/goal.svg';

	documentationUrl = 'https://goal.base.vn';

	properties: INodeProperties[] = [
		{
			displayName: 'Domain',
			name: 'domain',
			type: 'string',
			default: '',
			placeholder: 'company.base.vn',
			required: true,
		},
		{
			displayName: 'Access Token',
			name: 'accessToken',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
		},
	];

	test: ICredentialTestRequest = {
		request: {
			baseURL: '=https://goal.{{$credentials.domain}}/extapi/v1',
			url: '/cycles',
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: {
				access_token_v2: '={{$credentials.accessToken}}',
			},
		},
	};
}
