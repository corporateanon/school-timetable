const male = [
  'перший',
  'другий',
  'третій',
  'четвертий',
  'пʼятий',
  'шостий',
  'сьомий',
  'восьмий',
  'девʼятий',
  'десятий',
];

const female = [
  'перша',
  'друга',
  'третя',
  'четверта',
  'пʼята',
  'шоста',
  'сьома',
  'восьма',
  'девʼята',
  'десята',
];

export const ordMale   = (n) => male[n]   || `${n}-ий`;
export const ordFemale = (n) => female[n] || `${n}-а`;