import dayjs from 'dayjs';
import { getRandomInteger } from '../utils.js';
import { Duration } from './mock-const.js';


let date = dayjs().subtract(getRandomInteger(0, Duration.DAY), 'day').toDate();


function getDate ({ next }) {

  const daysGap = getRandomInteger(0, Duration.DAY);
  const hoursGap = getRandomInteger(1, Duration.HOUR);
  const minsGap = getRandomInteger(0, Duration.MIN);

  if (next) {
    date = dayjs(date)
      .add(daysGap, 'day')
      .add(hoursGap, 'hour')
      .add(minsGap, 'minute')
      .toDate();
  }
  return date;
}


export { getDate };
