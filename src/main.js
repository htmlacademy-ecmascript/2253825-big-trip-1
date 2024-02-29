import FiltersPresenter from './presenter/filters-presenter.js';
import MainPresenter from './presenter/main-presenter.js';

import MockService from './service/mock-service.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';
import PointsModel from './model/points-model.js';

const siteBodyElement = document.querySelector('.page-header');
const siteTripInfo = siteBodyElement.querySelector('.trip-main');

const siteMainElement = document.querySelector('.page-main');
const tripMainEvents = siteMainElement.querySelector('.trip-events');

const mockService = new MockService();
const destinationsModel = new DestinationsModel(mockService);
const offersModel = new OffersModel(mockService);
const pointsModel = new PointsModel(mockService);

const filtersPresenter = new FiltersPresenter({ tripFilterContainer: siteTripInfo });
const mainPresenter = new MainPresenter({
  tripMainContainer: tripMainEvents,
  destinationsModel,
  offersModel,
  pointsModel
});


filtersPresenter.init();
mainPresenter.init();
