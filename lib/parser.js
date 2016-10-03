import Y from 'yaml';
import fs from 'q-io/fs';
import moment from 'moment';

export function parseFile(file) {
  return fs.read(file)
    .then(raw => Y.eval(raw))
    .then(normalizeTt);
};


function normalizeTt(ttForm1) {
  return {
    timetable: ttForm1.timetable.map(parseTimeSpan),
    lessons: ttForm1.lessons,
  };
}

function parseTimeSpan([startTime, endTime]) {
  return [moment(startTime, 'HH:mm'), moment(endTime, 'HH:mm')];
}
