import { render } from '../render.js';

import TripSortView from '../view/trip-sort-view.js';
import FormEventView from '../view/form-event-view.js';
import FormEditEvent from '../view/form-edit-event-view.js';
import TripListView from '../view/trip-list-view.js';


export default class MainPresenter {
  tripSortComponent = new TripSortView();
  tripEventsComponent = new FormEventView();

  constructor ({ tripMainContainer, destinationsModel, offersModel, pointsModel }) {
    this.tripMainContainer = tripMainContainer;
    this.destinationsModel = destinationsModel;
    this.offersModel = offersModel;
    this.pointsModel = pointsModel;

    this.points = [ ...pointsModel.get()];
  }

  init () {
    render(this.tripSortComponent, this.tripMainContainer);
    render(this.tripEventsComponent, this.tripMainContainer);

    render(
      new FormEditEvent({
        point: this.points[0],
        pointDestinations: this.destinationsModel.get(),
        pointOffers: this.offersModel.get()
      }),

      this.tripEventsComponent.getElement()
    );

    this.points.forEach((point) => {
      render(
        new TripListView({
          point,
          pointDestinations: this.destinationsModel.getById(point.destination),
          pointOffers: this.offersModel.getByType(point.type)
        }),
        this.tripEventsComponent.getElement()
      );
    });
  }
}
