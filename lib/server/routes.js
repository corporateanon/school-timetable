import renderReact from './render-react';
import Index from './view/Index';
import React from 'react';
import moment from 'moment';
import { parseFile } from '../parser';
import { getPositionByTime, getActivityByTime } from '../timetable';
import { join } from 'path';


export function* index(context) {
  const now = moment('Monday September 5 2016 08:45:00', 'dddd MMMM D YYYY HH:mm:ss');
  const data = yield parseFile(join(__dirname, '../../test/data.yaml'));
  const activity = yield getActivityByTime(data, now);

  return {
    ...context,
    body: renderReact(<Index activity={activity} now={now}/>)
  };
}
