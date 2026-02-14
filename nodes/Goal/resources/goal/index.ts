import * as createKpi from './createKpi';
import * as createOkr from './createOkr';
import * as getDetail from './getDetail';
import * as getSummary from './getSummary';

export { createKpi, createOkr, getDetail, getSummary };

export const description = [
	...getDetail.description,
	...getSummary.description,
	...createOkr.description,
	...createKpi.description,
];
