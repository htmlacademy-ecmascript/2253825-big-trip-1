import Observable from '../framework/observable';

export default class DestinationsModel extends Observable {

  constructor(service) {
    super();
    this.service = service;
    this.destinations = this.service.destinations;
  }

  get() {
    return this.destinations;
  }

  getById(id) {
    return this.destinations
      .find((destination) => destination.id === id);
  }
}
