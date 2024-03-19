import { generateDestination } from '../mock/mock-destination.js';
import { generateOffer } from '../mock/mock-offer.js';
import { generatePoint } from '../mock/mock-point.js';

import { OFFER_COUNT, DESTINATION_COUNT, POINT_COUNT, TYPES } from '../const.js';
import { getRandomInteger, getRandomValue } from '../utils.js';


export default class MockService {
  destinations = [];
  offers = [];
  points = [];

  constructor () {
    this.destinations = this.generateDestinations();
    this.offers = this.generateOffers();
    this.points = this.generatePoints();
  }


  getDestinations() {
    return this.destinations;
  }

  getOffers() {
    return this.offers;
  }

  getPoints() {
    return this.points;
  }


  generateDestinations() {

    return Array.from(
      { length: DESTINATION_COUNT },
      () => generateDestination()
    );
  }


  generateOffers() {

    return TYPES.map((type) => ({
      type,
      offers: Array.from({ length: getRandomInteger(0, OFFER_COUNT) }, () => generateOffer(type))
    }));
  }

  generatePoints() {

    return Array.from({ length: POINT_COUNT }, () => {
      const type = getRandomValue(TYPES);
      const destination = getRandomValue(this.destinations);

      const hasOffers = getRandomInteger(0, 1);

      const offersByType = this.offers
        .find((offerByType) => offerByType.type === type);

      const offerIds = (hasOffers)
        ? offersByType.offers
          .slice(0, getRandomInteger(0, OFFER_COUNT))
          .map((offer) => offer.id)
        : [];

      return generatePoint(destination.id, offerIds, type);
    });
  }
}
