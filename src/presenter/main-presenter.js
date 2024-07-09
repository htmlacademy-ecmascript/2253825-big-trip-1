import { render, remove, replace, RenderPosition } from '../framework/render.js';

import HeaderPresenter from './header-presenter.js';
import PointPresenter from './point-presenter.js';

import PointSortView from '../view/point-sort-view.js';
import EventsListView from '../view/events-list-view.js';
import NoPointView from '../view/no-point-view.js';

import { generateFilter } from '../mock/filter.js';

import { SortType, sort } from '../utils/sort.js';
import { UpdateType, UserAction } from '../const.js';

export default class MainPresenter {

  #tripMainContainer = null;

  #destinationsModel = null;
  #offersModel = null;
  #pointsModel = null;

  #pointSortComponent = null;
  #eventListComponent = new EventsListView();
  #noPointComponent = new NoPointView();

  #pointPresenters = new Map();
  #currentSortType = SortType.DAY;


  constructor ({ tripMainContainer, destinationsModel, offersModel, pointsModel, tripFilterContainer }) {

    this.#tripMainContainer = tripMainContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#pointsModel = pointsModel;

    const filters = generateFilter(this.#pointsModel);

    this.headerPresenter = new HeaderPresenter({
      tripFilterContainer: tripFilterContainer,
      filters: filters
    });

    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    const points = this.#pointsModel.get();
    return sort[this.#currentSortType](points);
  }

  init() {
    this.headerPresenter.init();
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
        this.#pointsModel.delete(updateType,update);
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
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };


  #sortTypeChangeHandler = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;

    this.#clearPointList();
    this.#renderTripEvents();
  };


  #clearPointList() {
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
    if (!this.points.length) {
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    this.#renderPointsList();
    this.#renderPoints(this.points);
  }
}
