import MainPresenter from './presenter/main-presenter.js';
import HeaderPresenter from './presenter/header-presenter.js';
import TripApiService from './service/trip-api-service.js';
import { ApiServiceConnector } from './const.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filters-model.js';
import FormStateModel from './model/form-state-model.js';

const siteBodyElement = document.querySelector('.page-header');
const siteTripInfo = siteBodyElement.querySelector('.trip-main');
const siteFilters = siteBodyElement.querySelector('.trip-controls__filters');

const siteMainElement = document.querySelector('.page-main');
const tripMainEvents = siteMainElement.querySelector('.trip-events');


const pointsModel = new PointsModel({
  tripApiService: new TripApiService(ApiServiceConnector.END_POINT,
    ApiServiceConnector.AUTHORIZATION)
});
const filterModel = new FilterModel;
const formStateModel = new FormStateModel;


const mainPresenter = new MainPresenter({
  tripMainContainer: tripMainEvents,
  pointsModel,
  filterModel,
  formStateModel
});


const headerPresenter = new HeaderPresenter({
  tripFilterContainer: siteFilters,
  siteTripInfo,
  pointsModel,
  filterModel,
  formStateModel
});


pointsModel.init();
headerPresenter.init();
mainPresenter.init();
