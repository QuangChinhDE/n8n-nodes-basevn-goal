import * as createCompanyKpi from './createCompanyKpi';
import * as createCompanyOkr from './createCompanyOkr';
import * as createDeptKpi from './createDeptKpi';
import * as createDeptOkr from './createDeptOkr';
import * as createTeamKpi from './createTeamKpi';
import * as createTeamOkr from './createTeamOkr';
import * as getDetail from './getDetail';
import * as getSummary from './getSummary';

export {
	createCompanyKpi,
	createCompanyOkr,
	createDeptKpi,
	createDeptOkr,
	createTeamKpi,
	createTeamOkr,
	getDetail,
	getSummary,
};

export const description = [
	...getDetail.description,
	...getSummary.description,
	...createCompanyOkr.description,
	...createDeptOkr.description,
	...createTeamOkr.description,
	...createCompanyKpi.description,
	...createDeptKpi.description,
	...createTeamKpi.description,
];
