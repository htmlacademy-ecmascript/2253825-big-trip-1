import FiltersPresenter from './presenter/filters-presenter.js';


const siteMainElement = document.querySelector('.page-main');
const tripMainEvents = siteMainElement.querySelector('.trip-events');

const filtersPresenter = new FiltersPresenter ({ tripFilterContainer: tripMainEvents });


filtersPresenter.init();

