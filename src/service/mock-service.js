import { generateDestination } from '../mock/mock-destination.js';
import { generateOffer } from '../mock/mock-offer.js';
import { generatePoint } from '../mock/mock-point.js';

import { OFFER_COUNT, DESTINATION_COUNT, POINT_COUNT, TYPES } from '../const.js';
import { getRandomInteger, getRandomValue } from '../utils/common.js';


export default class MockService {
  #destinations = [];
  #offers = [];
  #points = [];
  #enrichedPoints = [];

  constructor() {
    this.#destinations = this.generateDestinations();
    this.#offers = this.generateOffers();
    this.#points = this.generatePoints();
  }


  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }

  get points() {
    return this.#points;
  }

  get enrichedPoints() {
    if (!this.#enrichedPoints) {
      this.#enrichedPoints = this.#points.map((point) => ({
        ...point,
        checkedOffersForPoint: this.getCheckedOffersForPoint(point),
        destinationForPoint: this.getDestinationForPoint(point)
      }));
    }
    return this.#enrichedPoints;
  }


  getCheckedOffersForPoint(point) {
    const pointTypeOffers = this.#offers.find((offer) => offer.type === point.type);
    return pointTypeOffers ? pointTypeOffers.offers
      .filter((offer) => point.offers.includes(offer.id)) : [];
  }

  getDestinationForPoint(point) {
    return this.#destinations.find((destination) => destination.id === point.destination);
  }

  updatePoint(updateType, update){
    const index = this.#enrichedPoints.findIndex((point) => point.id === update.id);

    this.#enrichedPoints = [
      ...this.#enrichedPoints.slice(0, index),
      update,
      ...this.#enrichedPoints.slice(index + 1)
    ];
    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this.#enrichedPoints = [
      update,
      ...this.#enrichedPoints
    ];
    this._notify(updateType, update);
  }

  deletePoint (updateType, update) {
    const index = this.#enrichedPoints.findIndex((event) => event.id === update.id);

    this.#enrichedPoints = [
      ...this.#enrichedPoints.slice(0, index),
      ...this.#enrichedPoints.slice(index + 1)
    ];
    this._notify(updateType, update);
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
      const destination = getRandomValue(this.#destinations);

      const hasOffers = getRandomInteger(0, 3);

      const offersByType = this.#offers
        .find((offerByType) => offerByType.type === type);

      const offerIds = (hasOffers)
        ? offersByType.offers
          .slice(0, getRandomInteger(0, OFFER_COUNT))
          .map((offer) => offer.id)
        : [];

      return generatePoint(destination.id, offerIds, type);
    });
  }

  delete() {
    this.#points = [];
  }

  add() {
  }
}
