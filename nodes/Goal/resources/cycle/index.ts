import * as create from './create';
import * as getCheckins from './getCheckins';
import * as getDetail from './getDetail';
import * as getKrs from './getKrs';
import * as getReviews from './getReviews';
import * as getSummary from './getSummary';
import * as list from './list';

export { create, getCheckins, getDetail, getKrs, getReviews, getSummary, list };

export const description = [
	...getSummary.description,
	...getCheckins.description,
	...getKrs.description,
	...getReviews.description,
	...getDetail.description,
	...list.description,
	...create.description,
];
