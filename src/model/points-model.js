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
  }

  delete() {
    this.service.delete();
  }

  add() {
  }
}
