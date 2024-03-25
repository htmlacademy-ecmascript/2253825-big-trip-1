import { render } from '../framework/render.js';

import TripSortView from '../view/trip-sort-view.js';
import FormEventView from '../view/form-event-view.js';
import FormEditEvent from '../view/edit-event-view.js';
import PointListView from '../view/point-list-view.js';


export default class MainPresenter {
  #tripMainContainer = null;
  #destinationsModel = null;
  #offersModel = null;

  #tripSortComponent = new TripSortView();
  #tripEventsComponent = new FormEventView();

  #tripPoints = null;

  constructor ({ tripMainContainer, destinationsModel, offersModel, pointsModel }) {
    this.#tripMainContainer = tripMainContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#tripPoints = [ ...pointsModel.points];
  }

  init () {
    render(this.#tripSortComponent, this.#tripMainContainer);
    render(this.#tripEventsComponent, this.#tripMainContainer);

    render(
      new FormEditEvent({
        point: this.#tripPoints[0],
        pointDestinations: this.#destinationsModel.destinations,
        pointOffers: this.#offersModel.offers
      }),

      this.#tripEventsComponent.element
    );

    this.#tripPoints.forEach((point) => {
      render(
        new PointListView({
          point,
          pointDestination: this.#destinationsModel.getById(point.destination),
          pointOffers: this.#offersModel.getByType(point.type)
        }),
        this.#tripEventsComponent.element
      );
    });
  }
}
