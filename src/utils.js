import dayjs from 'dayjs';
import durationPlugin from 'dayjs/plugin/duration.js';

dayjs.extend(durationPlugin);


function getRandomInteger (a = 0, b = 1) {

  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
}


function getRandomValue (items) {

  return items[getRandomInteger(0, items.length - 1)];
}


function formatStringToDateTime (date) {

  return dayjs(date).format('DD/MM/YY HH:mm');
}


function formatStringToShortDate (date) {

  return dayjs(date).format('HH:MM');
}


function formatDuration (dateFrom, dateTo) {

  const ms = dayjs(dateTo).diff(dateFrom);
  const duration = dayjs.duration(ms, 'ms');

  if (duration.days()) {

    return duration.format('DD[d] HH[h] mm[m]');
  }

  if (duration.hours()) {

    return duration.format('HH[h] mm[m]');
  }

  return duration.format('mm[m]');
}


export { getRandomInteger, getRandomValue, formatStringToDateTime, formatStringToShortDate, formatDuration };


