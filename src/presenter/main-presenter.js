import { render } from '../render.js';

import TripSortView from '../view/trip-sort-view.js';
import FormEventView from '../view/form-event-view.js';
import FormEditEvent from '../view/form-edit-event-view.js';
import TripListView from '../view/trip-list-view.js';

const WAYPOINT = 3;


export default class MainPresenter {
  tripSortComponent = new TripSortView();
  tripEventsComponent = new FormEventView();

  constructor ({ tripMainContainer }) {
    this.tripMainContainer = tripMainContainer;
  }

  init () {
    render(this.tripSortComponent, this.tripMainContainer);
    render(this.tripEventsComponent, this.tripMainContainer);
    render(new FormEditEvent(),this.tripEventsComponent.getElement());

    for (let i = 0; i < WAYPOINT; i++) {
      render(new TripListView, this.tripEventsComponent.getElement());
    }
  }
}
