import React from 'react';
import caseOf from '../../case-of';
import { MORNING, EVENING, DAYOFF, BREAK, LESSON } from '../../constants';
import LessonActivity from './LessonActivity';
import BreakActivity from './BreakActivity';


const Activity = ({activity, now}) => (
  <div className="activity">
    {
      caseOf([
        [
          () => activity.type === LESSON,
          () => (<LessonActivity now={now} activity={activity} />)
        ], [
          () => activity.type === BREAK,
          () => (<BreakActivity now={now} activity={activity} />)
        ]
      ], ()=><pre>{JSON.stringify(activity)}</pre>)
    }
  </div>
);

export default Activity;
