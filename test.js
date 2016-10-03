import { parseFile } from './lib/parser';
import { getPositionByTime } from './lib/timetable';
import moment from 'moment';

parseFile('./data.yaml')
  .then(obj => testPositions(obj))
  .catch(err => console.error(err.stack));

function testPositions(obj) {
  console.log(obj);
  console.log(getPositionByTime(obj.timetable, moment()));
  console.log(getPositionByTime(obj.timetable, moment('09:30', 'HH:mm')));
  console.log(getPositionByTime(obj.timetable, moment('11:31', 'HH:mm')));
  console.log(getPositionByTime(obj.timetable, moment('15:40', 'HH:mm')));
}

