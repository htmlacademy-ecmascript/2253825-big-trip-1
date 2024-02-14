import FiltersPresenter from './presenter/filters-presenter.js';
import MainPresenter from './presenter/main-presenter.js';


const siteBodyElement = document.querySelector('.page-header');
const siteTripInfo = siteBodyElement.querySelector('.trip-main');


const siteMainElement = document.querySelector('.page-main');
const tripMainEvents = siteMainElement.querySelector('.trip-events');

const filtersPresenter = new FiltersPresenter ({ tripFilterContainer: siteTripInfo });
const mainPresenter = new MainPresenter ({ tripMainContainer: tripMainEvents });


filtersPresenter.init();
mainPresenter.init();

