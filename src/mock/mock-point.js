import { getRandomInteger } from '../utils/common.js';
import { Price } from './const.js';
//import { getDate } from './utils.js';


function generatePoint (destinationId, offersId, type) {

  return {
    id: crypto.randomUUID(),
    basePrice: getRandomInteger(Price.MIN, Price.MAX),
    dateFrom: '2022-11-23T18:28:01.397Z',
    dateTo: '2022-11-24T23:28:01.397Z',
    // dateFrom: getDate({ next: false }),
    // dateTo: getDate({ next: true }),
    destination: destinationId,
    isFavorite: !!getRandomInteger(0, 1),
    offers: offersId,
    type
  };
}


export { generatePoint };
