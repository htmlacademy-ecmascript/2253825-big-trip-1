import { render } from './render.js';
import FilterTimeView from './view/filter-time-view.js';
import TripSortView from './view/trip-sort-view.js';
import FormEditEvent from './view/form-edit-event-view.js';
import FormEventView from './view/form-event-view.js';
import TripListView from './view/trip-list-view.js';
import HeaderTravelView from './view/header-travel-view.js';


const siteMainElement = document.querySelector('.page-main');
const tripMainEvents = siteMainElement.querySelector('.trip-events');
const siteBodyElement = document.querySelector('.page-header');
const tripFilerHeader = siteBodyElement.querySelector('.trip-controls__filters');


render(new HeaderTravelView(), tripFilerHeader);
render(new FilterTimeView(), tripFilerHeader);
render(new TripSortView(), tripMainEvents);
render(new FormEventView(), tripMainEvents);


const tripEventsList = tripMainEvents.querySelector('.trip-events__list');
render(new FormEditEvent(), tripEventsList);


for (let i = 0; i <= 3; i++) {
  render(new TripListView(), tripEventsList);
}
