import moment from 'moment';
import caseOf from '../../case-of';

export const timeFrom = (a, b) => {
  const momentB = moment(b).locale('uk');
  return caseOf([
    [
      () => momentB.isSame(a, 'second'),
      () => 'просто зараз',
    ]
  ], () => b.from(a));
}
