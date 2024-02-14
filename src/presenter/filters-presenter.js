import { RenderPosition } from '../render.js';
import { render } from '../render.js';

import FilterTimeView from '../view/filter-time-view.js';
import HeaderTravelView from '../view/header-travel-view.js';
import TripSortView from '../view/trip-sort-view.js';
import FormEventView from '../view/form-event-view.js';
import FormEditEvent from '../view/form-edit-event-view.js';
import TripListView from '../view/trip-list-view.js';

const WAYPOINT = 3;

export default class FiltersPresenter {
  tripInfoComponent = new HeaderTravelView();
  tripFilterComponent = new FilterTimeView();
  tripSortComponent = new TripSortView();
  tripEventsComponent = new FormEventView();


  constructor ({ tripFilterContainer }) {
    this.tripFilterContainer = tripFilterContainer;
  }

  init () {
    render(this.tripInfoComponent, this.tripFilterContainer, RenderPosition.AFTERBEGIN);
    render(this.tripFilterComponent, this.tripFilterContainer, RenderPosition.AFTERBEGIN);
    render(this.tripSortComponent, this.tripFilterContainer);
    render(this.tripEventsComponent, this.tripFilterContainer);
    render(new FormEditEvent(),this.tripEventsComponent.getElement());

    for (let i = 0; i < WAYPOINT; i++) {
      render(new TripListView, this.tripEventsComponent.getElement());
    }
  }
}

