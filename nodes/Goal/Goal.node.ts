import type {
IExecuteFunctions,
INodeExecutionData,
INodeType,
INodeTypeDescription,
} from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

import { checkin, cycle, goal, keyResult, target, description } from './resources';

export class Goal implements INodeType {
description: INodeTypeDescription = {
displayName: 'BaseVN - App Goal',
name: 'goal',
icon: 'file:../../icons/goal.svg',
group: ['transform'],
version: 1,
usableAsTool: true,
subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
description: 'Interact with BaseVN Goal API',
defaults: {
name: 'Goal',
},
inputs: ['main'],
outputs: ['main'],
credentials: [
{
name: 'goalApi',
required: true,
},
],
requestDefaults: {
baseURL: '={{$credentials.domain}}',
headers: {
'Content-Type': 'application/x-www-form-urlencoded',
},
},
properties: [
{
displayName: 'Resource',
name: 'resource',
type: 'options',
noDataExpression: true,
options: [
{
name: 'Checkin',
value: 'checkin',
},
{
name: 'Cycle',
value: 'cycle',
},
{
name: 'Goal',
value: 'goal',
},
{
name: 'Key Result',
value: 'keyResult',
},
{
name: 'Target',
value: 'target',
},
],
default: 'cycle',
},
{
displayName: 'Operation',
name: 'operation',
type: 'options',
noDataExpression: true,
displayOptions: {
show: {
resource: ['cycle'],
},
},
options: [
{
name: 'Create',
value: 'create',
action: 'Create a cycle',
},
{
name: 'Get Checkins',
value: 'getCheckins',
action: 'Get all checkins of cycle',
},
{
name: 'Get Detail',
value: 'getDetail',
action: 'Get cycle detail',
},
{
name: 'Get KRs',
value: 'getKrs',
action: 'Get all key results of cycle',
},
{
name: 'Get Reviews',
value: 'getReviews',
action: 'Get all reviews of cycle',
},
{
name: 'Get Summary',
value: 'getSummary',
action: 'Get cycle summary info',
},
{
name: 'List',
value: 'list',
action: 'List all cycles',
},
],
default: 'list',
},
{
displayName: 'Operation',
name: 'operation',
type: 'options',
noDataExpression: true,
displayOptions: {
show: {
resource: ['target'],
},
},
options: [
{
name: 'Create Company KPI',
value: 'createCompanyKpi',
action: 'Create company KPI target',
},
{
name: 'Create Company OKR',
value: 'createCompanyOkr',
action: 'Create company OKR target',
},
{
name: 'Create Dept KPI',
value: 'createDeptKpi',
action: 'Create department KPI target',
},
{
name: 'Create Dept OKR',
value: 'createDeptOkr',
action: 'Create department OKR target',
},
{
name: 'Create Team KPI',
value: 'createTeamKpi',
action: 'Create team KPI target',
},
{
name: 'Create Team OKR',
value: 'createTeamOkr',
action: 'Create team OKR target',
},
{
name: 'Get Detail',
value: 'getDetail',
action: 'Get target detail',
},
{
name: 'Get Summary',
value: 'getSummary',
action: 'Get target summary info',
},
],
default: 'getDetail',
},
{
displayName: 'Operation',
name: 'operation',
type: 'options',
noDataExpression: true,
displayOptions: {
show: {
resource: ['goal'],
},
},
options: [
{
name: 'Create KPI',
value: 'createKpi',
action: 'Create KPI goal',
},
{
name: 'Create OKR',
value: 'createOkr',
action: 'Create OKR goal',
},
{
name: 'Get Detail',
value: 'getDetail',
action: 'Get goal detail',
},
{
name: 'Get Summary',
value: 'getSummary',
action: 'Get goal summary info',
},
],
default: 'getDetail',
},
{
displayName: 'Operation',
name: 'operation',
type: 'options',
noDataExpression: true,
displayOptions: {
show: {
resource: ['keyResult'],
},
},
options: [
{
name: 'Create',
value: 'create',
action: 'Create a key result',
},
{
name: 'Get Detail',
value: 'getDetail',
action: 'Get key result detail',
},
],
default: 'getDetail',
},
{
displayName: 'Operation',
name: 'operation',
type: 'options',
noDataExpression: true,
displayOptions: {
show: {
resource: ['checkin'],
},
},
options: [
{
name: 'Checkin to KPI/Goal',
value: 'checkinToKpiGoal',
action: 'Checkin to KPI or goal',
},
{
name: 'Checkin to Key Result',
value: 'checkinToKr',
action: 'Checkin to key result',
},
],
default: 'checkinToKpiGoal',
},
...description,
],
};

async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
const items = this.getInputData();
const returnData: INodeExecutionData[] = [];
const resource = this.getNodeParameter('resource', 0);
const operation = this.getNodeParameter('operation', 0);

for (let i = 0; i < items.length; i++) {
try {
let responseData: INodeExecutionData[];

if (resource === 'cycle') {
if (operation === 'create') {
responseData = await cycle.create.execute.call(this, i);
} else if (operation === 'getCheckins') {
responseData = await cycle.getCheckins.execute.call(this, i);
} else if (operation === 'getDetail') {
responseData = await cycle.getDetail.execute.call(this, i);
} else if (operation === 'getKrs') {
responseData = await cycle.getKrs.execute.call(this, i);
} else if (operation === 'getReviews') {
responseData = await cycle.getReviews.execute.call(this, i);
} else if (operation === 'getSummary') {
responseData = await cycle.getSummary.execute.call(this, i);
} else if (operation === 'list') {
responseData = await cycle.list.execute.call(this, i);
} else {
throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
}
} else if (resource === 'target') {
if (operation === 'createCompanyKpi') {
responseData = await target.createCompanyKpi.execute.call(this, i);
} else if (operation === 'createCompanyOkr') {
responseData = await target.createCompanyOkr.execute.call(this, i);
} else if (operation === 'createDeptKpi') {
responseData = await target.createDeptKpi.execute.call(this, i);
} else if (operation === 'createDeptOkr') {
responseData = await target.createDeptOkr.execute.call(this, i);
} else if (operation === 'createTeamKpi') {
responseData = await target.createTeamKpi.execute.call(this, i);
} else if (operation === 'createTeamOkr') {
responseData = await target.createTeamOkr.execute.call(this, i);
} else if (operation === 'getDetail') {
responseData = await target.getDetail.execute.call(this, i);
} else if (operation === 'getSummary') {
responseData = await target.getSummary.execute.call(this, i);
} else {
throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
}
} else if (resource === 'goal') {
if (operation === 'createKpi') {
responseData = await goal.createKpi.execute.call(this, i);
} else if (operation === 'createOkr') {
responseData = await goal.createOkr.execute.call(this, i);
} else if (operation === 'getDetail') {
responseData = await goal.getDetail.execute.call(this, i);
} else if (operation === 'getSummary') {
responseData = await goal.getSummary.execute.call(this, i);
} else {
throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
}
} else if (resource === 'keyResult') {
if (operation === 'create') {
responseData = await keyResult.create.execute.call(this, i);
} else if (operation === 'getDetail') {
responseData = await keyResult.getDetail.execute.call(this, i);
} else {
throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
}
} else if (resource === 'checkin') {
if (operation === 'checkinToKpiGoal') {
responseData = await checkin.checkinToKpiGoal.execute.call(this, i);
} else if (operation === 'checkinToKr') {
responseData = await checkin.checkinToKr.execute.call(this, i);
} else {
throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
}
} else {
throw new NodeOperationError(this.getNode(), `Unknown resource: ${resource}`);
}

returnData.push(...responseData);
} catch (error) {
if (this.continueOnFail()) {
const errorMessage = error instanceof Error ? error.message : String(error);
returnData.push({ json: { error: errorMessage } });
continue;
}
throw error;
}
}

return [returnData];
}
}
