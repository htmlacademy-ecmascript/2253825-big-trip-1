import { render, RenderPosition } from '../framework/render.js';

import HeaderPresenter from './header-presenter.js';
import PointPresenter from './point-presenter.js';

import TripSortView from '../view/trip-sort-view.js';
import EventsListView from '../view/events-list-view.js';
import NoPointView from '../view/no-point-view.js';

import { generateFilter } from '../mock/filter.js';

export default class MainPresenter {
  #tripMainContainer = null;

  #destinationsModel = null;
  #offersModel = null;
  #pointsModel = null;

  #tripSortComponent = new TripSortView();
  #tripEventsComponent = new EventsListView();

  #tripEventsPoints = [];


  constructor ({ tripMainContainer, destinationsModel, offersModel, pointsModel, tripFilterContainer }) {
    this.#tripMainContainer = tripMainContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#pointsModel = [ ...pointsModel.points];

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


  #renderTripEvents() {
    if (!this.#pointsModel.length) {
      render(new NoPointView(), this.#tripMainContainer, RenderPosition.BEFOREBEGIN);
      return;
    }

    render(this.#tripSortComponent, this.#tripMainContainer);
    render(this.#tripEventsComponent, this.#tripMainContainer);

    this.#renderPoints(this.#tripEventsPoints);
  }


  #renderPoints() {
    this.#pointsModel.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      tripPointsContainer: this.#tripEventsComponent.element,
      destinationsModel: this.#destinationsModel,
      offersModel:this.#offersModel
    });

    pointPresenter.init(point);
  }
}
