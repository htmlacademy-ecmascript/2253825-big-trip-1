import { render } from '../render.js';

import TripSortView from '../view/trip-sort-view.js';
import FormEventView from '../view/form-event-view.js';
import FormEditEvent from '../view/form-edit-event-view.js';
import TripListView from '../view/trip-list-view.js';

const WAYPOINT = 3;


export default class TripEventsPresenter {
  tripSortComponent = new TripSortView();
  tripEventsComponent = new FormEventView();


  constructor ({ tripEventsContainer }) {
    this.tripEventsContainer = tripEventsContainer;
  }


  init () {
    render(this.tripSortComponent, this.tripEventsContainer);
    render(this.tripEventsComponent, this.tripEventsContainer);
    render(new FormEditEvent(),this.tripEventsComponent.getElement());

    for (let i = 0; i < WAYPOINT; i++) {
      render(new TripListView, this.tripEventsComponent.getElement());
    }
  }
}
