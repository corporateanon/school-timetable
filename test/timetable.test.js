import { parseFile } from '../lib/parser';
import { getPositionByTime, getActivityByTime } from '../lib/timetable';
import { MORNING, EVENING, DAYOFF, BREAK, LESSON } from '../lib/constants';
import moment from 'moment';
import { expect } from 'chai';


describe('Timetable', () => {
  var parseRulults;
  beforeEach(() => parseFile('./test/data.yaml').then(obj => parseRulults = obj));

  describe('parser', () => {
    describe('#parseFile()', () => {
      it('should parse', () => {
        expect(parseRulults).to.have.property('lessons');
        expect(parseRulults).to.have.property('timetable');
      });
    });
  });

  describe('timetable', () => {

    describe('#getPositionByTime()', () => {

      it('should detect morning', () => {
        expect(getPositionByTime(parseRulults.timetable, moment('Monday September 5 2016 06:30', 'dddd MMMM D YYYY HH:mm')).type).to.equal(MORNING);
      });

      it('should detect evening', () => {
        expect(getPositionByTime(parseRulults.timetable, moment('Monday September 5 2016 19:00', 'dddd MMMM D YYYY HH:mm')).type).to.equal(EVENING);
      });

      it('should detect lesson 0', () => {
        const position = getPositionByTime(parseRulults.timetable, moment('Monday September 5 2016 08:30', 'dddd MMMM D YYYY HH:mm'));
        expect(position.type).to.equal(LESSON);
        expect(position.number).to.equal(0);
      });

      it('should detect break 0', () => {
        const position = getPositionByTime(parseRulults.timetable, moment('Monday September 5 2016 08:46', 'dddd MMMM D YYYY HH:mm'));
        expect(position.type).to.equal(BREAK);
        expect(position.number).to.equal(0);
      });

      it('should detect lesson 1', () => {
        const position = getPositionByTime(parseRulults.timetable, moment('Monday September 5 2016 09:00', 'dddd MMMM D YYYY HH:mm'));
        expect(position.type).to.equal(LESSON);
        expect(position.number).to.equal(1);
      });

      it('should detect break 1', () => {
        const position = getPositionByTime(parseRulults.timetable, moment('Monday September 5 2016 09:41', 'dddd MMMM D YYYY HH:mm'));
        expect(position.type).to.equal(BREAK);
        expect(position.number).to.equal(1);
      });

    });

    describe('#getActivityByTime()', () => {
      it('should return state for lesson 0', () => {
        const state = getActivityByTime(parseRulults, moment('Monday September 5 2016 08:30', 'dddd MMMM D YYYY HH:mm'));
        expect(state.type).to.equal(LESSON);
        expect(state.lessonName).to.equal('Фізкультура');
        expect(state.lessonNumber).to.equal(0);
        expect(state.timeRange[0].format('HH:mm')).to.equal('08:00');
        expect(state.timeRange[1].format('HH:mm')).to.equal('08:45');
      });

      it('should return state for break 0', () => {
        const state = getActivityByTime(parseRulults, moment('Monday September 5 2016 08:46', 'dddd MMMM D YYYY HH:mm'));
        expect(state.type).to.equal(BREAK);
        expect(state.timeRange[0].format('HH:mm')).to.equal('08:45');
        expect(state.timeRange[1].format('HH:mm')).to.equal('08:55');
        expect(state.prevLessonName).to.equal('Фізкультура');
        expect(state.nextLessonName).to.equal('Російська мова');
      });

      it('should return DAYOFF state for Saturday', () => {
        const state = getActivityByTime(parseRulults, moment('Saturday September 3 2016 12:00', 'dddd MMMM D YYYY HH:mm'));
        expect(state.type).to.equal('DAYOFF');
      });

      it('should return DAYOFF state for Sunday', () => {
        const state = getActivityByTime(parseRulults, moment('Sunday September 4 2016 12:00', 'dddd MMMM D YYYY HH:mm'));
        expect(state.type).to.equal('DAYOFF');
      });

      it('should not return MORNING state for Monday September 5 2016 08:45', () => {
        const state = getActivityByTime(parseRulults, moment('Monday September 5 2016 08:45', 'dddd MMMM D YYYY HH:mm'));
        expect(state.type).to.equal('LESSON');
      });
    });
  });
});
