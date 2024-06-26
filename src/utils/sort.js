import { getPointsByDate, getPointsByDuration, getPointsByPrice } from './format-time.js';


const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFER: 'offer',
};


if(!Array.prototype.toSorted) {
  Array.prototype.toSorted = function(fn) {
    return [...this].sort(fn);
  };
}

const sort = {
  [SortType.DAY]: (points) => points.toSorted(getPointsByDate),
  [SortType.PRICE]: (points) => points.toSorted(getPointsByPrice),
  [SortType.TIME]: (points) => points.toSorted(getPointsByDuration),
  [SortType.EVENT]: () => {
    throw new Error(`Сортивка по ${SortType.EVENT} недоступна`);
  },
  [SortType.OFFER]: () => {
    throw new Error(`Сортивка по ${SortType.OFFER} недоступна`);
  }
};


export { SortType, sort };
