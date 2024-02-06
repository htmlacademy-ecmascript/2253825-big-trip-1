import FiltersPresenter from './presenter/filters-presenter.js';
import TripEventsPresenter from './presenter/trip-events-presenter.js';


const siteBodyElement = document.querySelector('.page-header');
const siteTripInfo = siteBodyElement.querySelector('.trip-main');
const tripFilterHeader = siteBodyElement.querySelector('.trip-controls__filters');

const filtersPresenter = new FiltersPresenter({ tripInfoContainer: siteTripInfo, tripFilterContainer: tripFilterHeader });

const siteMainElement = document.querySelector('.page-main');
const tripMainEvents = siteMainElement.querySelector('.trip-events');

const tripEventsPresenter = new TripEventsPresenter({ tripEventsContainer: tripMainEvents });


filtersPresenter.init();
tripEventsPresenter.init();
