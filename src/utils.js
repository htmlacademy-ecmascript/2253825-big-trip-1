import dayjs from 'dayjs';


function getRandomInteger (a = 0, b = 1) {

  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
}


function getRandomValue (items) {

  return items[getRandomInteger(0, items.length - 1)];
}


function formatStringToDateTime (date) {

  return dayjs(date).format('YYYY-MM_DDTHH:mm');
}


function formatStringToShortDate (date) {

  return dayjs(date).format('MMM DD');
}


export { getRandomInteger, getRandomValue, formatStringToDateTime, formatStringToShortDate };


