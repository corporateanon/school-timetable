import caseOf from './case-of';
import moment from 'moment';
import { MORNING, EVENING, DAYOFF, BREAK, LESSON } from './constants';

export function getActivityByTime(description, time) {
  return getActivityByPosition(description.lessons,
    getPositionByTime(description.timetable, time),
    time);
}

export function getActivityByPosition(lessons, position, time) {
  const isLesson = position.type === LESSON;
  const isBreak = position.type === BREAK;
  const isMorning = position.type === MORNING;
  const isEvening = position.type === EVENING;
  const weekDay = time.isoWeekday() - 1;
  const weekDayLessons = lessons[weekDay];

  return caseOf([
  [() => !weekDayLessons,
    () => ({ type: DAYOFF })
  ],

  [() => isLesson,
    () => ({
      timeRange: position.range,
      lessonNumber: position.number,
      lessonName: weekDayLessons[position.number] || false,
      type: position.type,
    })
  ],

  [() => isBreak,
    () => ({
      timeRange: position.range,
      prevLessonNumber: position.number,
      prevLessonName: weekDayLessons[position.number] || false,
      nextLessonNumber: position.number + 1,
      nextLessonName: weekDayLessons[position.number + 1] || false,
      type: position.type,
    })
  ],

  [() => isMorning,
    () => ({ type: position.type })
  ],

  [() => isEvening,
    () => ({ type: position.type })
  ],
]);
}

export function getPositionByTime(timetable, time, nextRange = false) {
  const range = rangeForCurrentDay(time, timetable[timetable.length - 1]);
  const [t0, t1] = range || [];
  return caseOf([
    [() => timetable.length === 0,
      () => Morning()
    ],

    [() => isTimeAfter(time, t1) && !nextRange,
      () => Evening(timetable.length - 1)
    ],

    [() => isTimeAfter(time, t1),
      () => Break(timetable.length - 1, [t1, nextRange[0]])
    ],

    [() => isTimeBetween(time, t0, t1),
      () => Lesson(timetable.length - 1, range)
    ],

  ], () => getPositionByTime(timetable.slice(0, timetable.length - 1), time, range));
}

function rangeForCurrentDay(time, range) {
  return caseOf([
    [
      () => !range,
      () => range
    ]
  ], () => {
    const [start, end] = range;
    return [
      time.clone().hour(start.hour()).minute(start.minute()).second(start.second()),
      time.clone().hour(end.hour()).minute(end.minute()).second(end.second())
    ]
  });
}

function normalizeTime(t) {
  return t.clone().dayOfYear(0).year(0);
}

function isTimeBetween(t, t0, t1) {
  return normalizeTime(t).isBetween(normalizeTime(t0), normalizeTime(t1), 'second', '[]');
}

function isTimeAfter(t, t0) {
  return normalizeTime(t).isAfter(normalizeTime(t0));
}

function Break(n, range) {
  return {
    type: BREAK,
    number: n,
    range,
  };
}

function Lesson(n, range) {
  return {
    type: LESSON,
    number: n,
    range,
  };
}

function Morning() {
  return {
    type: MORNING
  };
}

function Evening() {
  return {
    type: EVENING
  };
}
