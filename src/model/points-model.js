import Observable from '../framework/observable.js';

export default class PointsModel extends Observable {

  constructor(service) {
    super();
    this.service = service;
    this.points = this.service.points;
  }

  get() {
    return this.points;
  }

  update() {
    // eslint-disable-next-line no-console
    // console.log(this.service);
  }

  delete() {
    this.service.delete();
  }
}
