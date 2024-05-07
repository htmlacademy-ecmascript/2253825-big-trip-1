import { render, RenderPosition } from '../framework/render.js';

import HeaderPresenter from './header-presenter.js';
import PointPresenter from './point-presenter.js';

import TripSortView from '../view/trip-sort-view.js';
import EventsListView from '../view/events-list-view.js';
import NoPointView from '../view/no-point-view.js';

import { generateFilter } from '../mock/filter.js';
import { updateItem } from '../utils/common.js';

export default class MainPresenter {
  #tripMainContainer = null;

  #destinationsModel = null;
  #offersModel = null;
  #pointsModel = null;

  #tripSortComponent = new TripSortView();
  #eventListComponent = new EventsListView();

  #tripEventsPoints = [];
  //#currentSortType = SortType.DAY;

  #pointPresenters = new Map();

  constructor ({ tripMainContainer, destinationsModel, offersModel, pointsModel, tripFilterContainer }) {
    this.#tripMainContainer = tripMainContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#pointsModel = [ ...pointsModel.points];
    //this.#pointsModel = pointsModel;
    //this.#tripEventsPoints = sort[SortType.DAY]([ ...this.#pointsModel.get()]);

    const filters = generateFilter(pointsModel);

    this.headerPresenter = new HeaderPresenter({
      tripFilterContainer: tripFilterContainer,
      filters: filters
    });
  }


  init () {
    this.headerPresenter.init();
    this.#renderTripEvents();
  }

  #modeChangeHandler = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #pointChangeHandler = (updatedPoint) => {
    this.#tripEventsPoints = updateItem(this.#tripEventsPoints, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      tripPointsContainer: this.#eventListComponent.element,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onDataChange: this.#pointChangeHandler,
      onModeChange: this.#modeChangeHandler
    });

    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderTripEvents() {
    if (!this.#pointsModel.length) {
      render(new NoPointView(), this.#tripMainContainer, RenderPosition.BEFOREBEGIN);
      return;
    }

    render(this.#tripSortComponent, this.#tripMainContainer);
    render(this.#eventListComponent, this.#tripMainContainer);

    this.#renderPoints(this.#tripEventsPoints);
  }

  #clearPointList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #renderPoints() {
    this.#pointsModel.forEach((point) => {
      this.#renderPoint(point);
    });
  }
}
