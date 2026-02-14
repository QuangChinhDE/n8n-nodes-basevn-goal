import * as create from './create';
import * as getDetail from './getDetail';

export { create, getDetail };

export const description = [...getDetail.description, ...create.description];
