import React from 'react';
import {ordMale} from '../i18n/ordinals';
import {timeFrom} from '../i18n/time';


const LessonActivity = ({now, activity}) => (
  <div className="activity-lesson">
    <p>Зараз { ordMale(activity.lessonNumber) } урок — { activity.lessonName }.</p>
    <p>Дзвоник на перерву — { timeFrom(now, activity.timeRange[1]) }.</p>
  </div>
);

export default LessonActivity;
