import * as checkinToKpiGoal from './checkinToKpiGoal';
import * as checkinToKr from './checkinToKr';

export { checkinToKpiGoal, checkinToKr };

export const description = [...checkinToKpiGoal.description, ...checkinToKr.description];
