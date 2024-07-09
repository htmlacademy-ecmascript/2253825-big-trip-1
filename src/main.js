import MainPresenter from './presenter/main-presenter.js';
import HeaderPresenter from './presenter/header-presenter.js';
import MockService from './service/mock-service.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';
import PointsModel from './model/points-model.js';
//import { generateFilter } from './mock/filter.js';
import FilterModel from './model/filters-model.js';

const siteBodyElement = document.querySelector('.page-header');
const siteTripInfo = siteBodyElement.querySelector('.trip-main');
const siteFilters = siteBodyElement.querySelector('.trip-controls__filters');

const siteMainElement = document.querySelector('.page-main');
const tripMainEvents = siteMainElement.querySelector('.trip-events');

const mockService = new MockService();
const destinationsModel = new DestinationsModel(mockService);
const offersModel = new OffersModel(mockService);
const pointsModel = new PointsModel(mockService);
const filterModel = new FilterModel;


const mainPresenter = new MainPresenter({
  tripMainContainer: tripMainEvents,
  destinationsModel,
  offersModel,
  pointsModel,
  filterModel
});


const headerPresenter = new HeaderPresenter({
  tripFilterContainer: siteFilters,
  pointsModel,
  siteTripInfo,
});

headerPresenter.init();
mainPresenter.init();
