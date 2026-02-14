import * as checkin from './checkin';
import * as cycle from './cycle';
import * as goal from './goal';
import * as keyResult from './keyResult';
import * as target from './target';

export { checkin, cycle, goal, keyResult, target };

export const description = [
	...cycle.description,
	...target.description,
	...goal.description,
	...keyResult.description,
	...checkin.description,
];
