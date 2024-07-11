import Observable from '../framework/observable';

export default class OffersModel extends Observable {

  constructor(service) {
    super();
    this.service = service;
    this.offers = this.service.offers;
  }

  get() {
    return this.offers;
  }

  getByType(type) {
    return this.offers
      .find((offer) => offer.type === type).offers;
  }
}
