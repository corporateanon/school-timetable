import React from 'react';
import {ordFemale} from '../i18n/ordinals';
import moment from 'moment';


const BreakActivity = ({activity, now}) => (
  <div className="activity-break">
    <p>Зараз { ordFemale(activity.prevLessonNumber) } перерва.</p>
    <p>{ activity.nextLessonName } — { moment(activity.timeRange[1]).locale('uk').from(now) }.</p>

    <pre>{ JSON.stringify(activity) }</pre>
    <pre>{ JSON.stringify(now) }</pre>
  </div>
);

export default BreakActivity;
