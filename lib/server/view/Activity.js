import React from 'react';
import caseOf from '../../case-of';
import { MORNING, EVENING, DAYOFF, BREAK, LESSON } from '../../constants';
import LessonActivity from './LessonActivity';
import BreakActivity from './BreakActivity';
import MorningActivity from './MorningActivity';
import EveningActivity from './EveningActivity';


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
        ], [
          () => activity.type === MORNING,
          () => (<MorningActivity now={now} activity={activity} />)
        ], [
          () => activity.type === EVENING,
          () => (<EveningActivity now={now} activity={activity} />)
        ]
      ])
    }

    <pre>{ JSON.stringify(activity) }</pre>
    <pre>{ JSON.stringify(now) }</pre>

  </div>
);

export default Activity;
