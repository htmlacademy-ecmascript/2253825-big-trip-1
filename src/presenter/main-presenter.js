import { render, remove, replace, RenderPosition } from '../framework/render.js';

import HeaderPresenter from './header-presenter.js';
import PointPresenter from './point-presenter.js';

import PointSortView from '../view/point-sort-view.js';
import EventsListView from '../view/events-list-view.js';
import NoPointView from '../view/no-point-view.js';

import { generateFilter } from '../mock/filter.js';
import { updateItem } from '../utils/common.js';
import { SortType, sort } from '../utils/sort.js';

export default class MainPresenter {

  #tripMainContainer = null;

  #destinationsModel = null;
  #offersModel = null;
  #pointsModel = null;

  #pointSortComponent = null;
  #eventListComponent = new EventsListView();
  #noPointComponent = new NoPointView();

  #tripEventsPoints = [];
  #pointPresenters = new Map();
  #currentSortType = SortType.DAY;


  constructor ({ tripMainContainer, destinationsModel, offersModel, pointsModel, tripFilterContainer }) {

    this.#tripMainContainer = tripMainContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#pointsModel = pointsModel;
    this.#tripEventsPoints = sort[SortType.DAY]([ ...this.#pointsModel.get()]);

    const filters = generateFilter(pointsModel);

    this.headerPresenter = new HeaderPresenter({
      tripFilterContainer: tripFilterContainer,
      filters: filters
    });
  }

  init() {
    this.headerPresenter.init();
    this.#renderTripEvents();
  }

  #pointChangeHandler = (updatedPoint) => {
    this.#tripEventsPoints = updateItem(this.#tripEventsPoints, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #modeChangeHandler = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #sortTypeChangeHandler = (sortType) => {
    this.#sortPoints(sortType);

    this.#clearPointList();
    this.#renderSort(this.#tripMainContainer);
    this.#renderPointsList();
  };

  #sortPoints(sortType){
    this.#currentSortType = sortType;
    this.#tripEventsPoints = sort[this.#currentSortType]([...this.#tripEventsPoints]);
  }

  #clearPointList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

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

  #renderSort() {

    const prevSortComponent = this.#pointSortComponent;
    this.#pointSortComponent = new PointSortView({
      sortType: this.#currentSortType,
      onSortTypeChange: this.#sortTypeChangeHandler
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

  #renderPoints() {
    this.#tripEventsPoints.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  #renderPointsList() {
    render(this.#eventListComponent, this.#tripMainContainer);

    this.#renderPoints();
  }

  #renderTripEvents() {
    if (!this.#tripEventsPoints.length) {
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    this.#renderPointsList();
  }
}
