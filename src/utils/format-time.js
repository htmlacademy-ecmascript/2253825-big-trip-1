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


export { formatStringToDateTime, formatStringToShortDate, formatDuration };
