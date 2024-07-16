import dayjs from 'dayjs';
import durationPlugin from 'dayjs/plugin/duration.js';

dayjs.extend(durationPlugin);


function formatStringToDateTime(date) {

  return dayjs(date).format('DD/MM/YY HH:mm');
}


function formatStringToShortDate(date) {

  return dayjs(date).format('HH:MM');
}


function formatDuration(dateFrom, dateTo) {

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


function getPointsByDate(pointA, pointB) {
  return dayjs(pointB.dateFrom).diff(dayjs(pointA.dateFrom));
}


function getPointsByDuration(pointA, pointB) {
  const durationA = dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
  const durationB = dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom));
  return durationB - durationA;
}

function getPointsByPrice(pointA, pointB) {
  return pointB.basePrice - pointA.basePrice;
}


const FormatsDate = {
  MONTHDAY: 'MMM DD',
  HOURMIN: 'HH:mm',
  DMYHM: 'DD/MM/YY HH:mm'
};

const formatDate = (date, neededFormat) => dayjs(date).format(neededFormat);

export { formatStringToDateTime, formatStringToShortDate, formatDuration,
  getPointsByDate, getPointsByDuration, getPointsByPrice, FormatsDate, formatDate};
