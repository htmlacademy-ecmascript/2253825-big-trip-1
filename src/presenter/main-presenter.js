import { render, remove, replace, RenderPosition } from '../framework/render.js';

import PointPresenter from './point-presenter.js';
import NewPointPresenter from './new-point-presenter.js';

import PointSortView from '../view/point-sort-view.js';
import EventsListView from '../view/events-list-view.js';
import NoPointView from '../view/no-point-view.js';


import { SortType, sort } from '../utils/sort.js';
import { UpdateType, UserAction, FilterType, Mode } from '../const.js';
import { Filters } from '../utils/filters.js';

export default class MainPresenter {

  #tripMainContainer = null;

  #destinationsModel = null;
  #offersModel = null;
  #pointsModel = null;
  #filterModel = null;
  #formStateModel = null;

  #pointSortComponent = null;
  #eventListComponent = new EventsListView();
  #noPointComponent = null;

  #newPointPresenter = null;
  #pointPresenters = new Map();
  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;


  constructor ({ tripMainContainer, destinationsModel, offersModel, pointsModel, filterModel, formStateModel}) {

    this.#tripMainContainer = tripMainContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
    this.#formStateModel = formStateModel;

    this.#newPointPresenter = new NewPointPresenter({
      pointListContainer: this.#eventListComponent.element,
      pointOffers: this.#pointsModel.offers,
      pointDestinations: this.#pointsModel.destinations,
      onDataChange: this.#handleViewAction,
      onDestroy: this.#handleNewPointDestroy,
    });

    this.#formStateModel.addObserver(this.#handleFormStateChanged);
    this.#destinationsModel.addObserver(this.#handleModelEvent);
    this.#offersModel.addObserver(this.#handleModelEvent);
    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = Filters[this.#filterType](points);
    return sort[this.#currentSortType](filteredPoints);
  }

  init() {
    this.#renderTripEvents();
  }


  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this.#pointsModel.update(updateType, update);
        break;
      case UserAction.ADD_EVENT:
        this.#pointsModel.add(updateType, update);
        break;
      case UserAction.DELETE_EVENT:
        this.#pointsModel.delete(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearTripEvents();
        this.#renderTripEvents();
        break;
      case UpdateType.MAJOR:
        this.#clearTripEvents({resetSortType: true});
        this.#renderTripEvents();
        break;
    }
  };

  #modeChangeHandler = () => {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleFormStateChanged = (state) => {
    if (state === Mode.CREATING) {
      this.#handleNewPointFormOpen();
    }
  };

  #handleNewPointFormOpen() {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);

    this.#newPointPresenter.init();
  }

  #sortTypeChangeHandler = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;

    this.#clearPointList();
    this.#renderTripEvents();
  };

  #handleNewPointDestroy = () => {
    this.#formStateModel.formState = Mode.DEFAULT;

    if(!this.points.length && this.#formStateModel.formState !== Mode.CREATING) {

      remove(this.#pointSortComponent && this.#formStateModel.formState !== Mode.CREATING);
      this.#pointSortComponent = null;
      this.#renderNoPoints();
    }
  };

  #clearPointList() {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #clearTripEvents({resetSortType = false} = {}){
    this.#clearPointList();

    remove(this.#pointSortComponent);

    if(this.#noPointComponent){
      remove(this.#noPointComponent);
    }

    if(resetSortType){
      this.#currentSortType = SortType.DAY;
    }
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      tripPointsContainer: this.#eventListComponent.element,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#modeChangeHandler});


    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderSort() {

    const prevSortComponent = this.#pointSortComponent;
    this.#pointSortComponent = new PointSortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this. #sortTypeChangeHandler
    });

    if(prevSortComponent) {
      replace(this.#pointSortComponent, prevSortComponent);
      remove(prevSortComponent);
    } else {
      render(this.#pointSortComponent, this.#tripMainContainer);
    }
    render(this.#pointSortComponent, this.#tripMainContainer, RenderPosition.AFTERBEGIN);
  }

  #renderNoPoints() {
    this.#noPointComponent = new NoPointView({
      filterType: this.#filterType
    });
    render(this.#noPointComponent, this.#tripMainContainer, RenderPosition.AFTERBEGIN);
  }

  #renderPoints(points) {
    points.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  #renderPointsList() {
    render(this.#eventListComponent, this.#tripMainContainer);
  }

  #renderTripEvents() {
    if (!this.points.length && this.#formStateModel.formState !== Mode.CREATING) {
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    this.#renderPointsList();
    this.#renderPoints(this.points);
  }
}
