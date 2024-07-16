import { render, remove, replace, RenderPosition } from '../framework/render.js';
import { SortType, sort } from '../utils/sort.js';
import { UpdateType, FilterType, Mode } from '../const.js';
import { Filters } from '../utils/filters.js';

import FilterTimeView from '../view/filter-time-view.js';
import TripInfoView from '../view/header-travel-view.js';
import NewPointButtonView from '../view/new-point-button-view';

export default class HeaderPresenter {

  #tripFilterContainer = null;
  #pointsModel = null;
  #filterModel = null;
  #formStateModel = null;

  #newPointButtonComponent = null;
  #tripFilterComponent = null;
  #tripInfoComponent = null;

  #points = null;

  constructor ({ tripFilterContainer, filterModel, pointsModel, formStateModel }) {

    this.#tripFilterContainer = tripFilterContainer;
    this.#filterModel = filterModel;
    this.#pointsModel = pointsModel;
    this.#formStateModel = formStateModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
    this.#formStateModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    const points = this.#pointsModel.enrichedPoints;

    return Object.values(FilterType).map((type) => ({
      type,
      count: Filters[type](points).length
    }));
  }

  init () {
    this.#renderTripInfo();
    this.#renderFilters();
    this.#renderNewButton();
  }

  #renderNewButton() {
    if (!this.#newPointButtonComponent) {
      this.#newPointButtonComponent = new NewPointButtonView({
        onClick: this.#handleNewPointButtonClick
      });
    }

    const isCreating = this.#formStateModel.formState === Mode.CREATING;
    this.#newPointButtonComponent.disable(isCreating);

    render(this.#newPointButtonComponent, this.#tripFilterContainer, RenderPosition.BEFOREEND);
  }

  #handleNewPointButtonClick = () => {
    this.#formStateModel.formState = Mode.CREATING;
  };

  #renderTripInfo () {
    const prevTripInfoComponent = this.#tripInfoComponent;
    this.#points = sort[SortType.DAY](this.#pointsModel.enrichedPoints);

    if (this.#points.length === 0) {
      remove(this.#tripInfoComponent);
      this.#tripInfoComponent = null;

      return;
    }

    this.#tripInfoComponent = new TripInfoView({
      totalSumm: this.getTotalSumm(),
      namesDestinations: this.getNamesDestinations(),
      datesTrip: this.getDatesTrip()
    });

    if (prevTripInfoComponent === null) {
      render(this.#tripInfoComponent, this.#tripFilterContainer, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this.#tripInfoComponent, prevTripInfoComponent);
    remove(prevTripInfoComponent);
  }


  getTotalSumm() {
    return this.#points.reduce((total, point) => {
      const basePrice = point.basePrice || 0;
      const offersPrice = point.checkedOffersForPoint.reduce((offerTotal, offer) => offerTotal + offer.price, 0);
      return total + parseInt(basePrice, 10) + offersPrice;
    }, 0);
  }


  getNamesDestinations() {
    const uniqueCityNames = new Set();

    this.#points.forEach((point) => {
      const destination = point.destinationForPoint;
      if (destination && destination.name) {
        uniqueCityNames.add(destination.name);
      }
    });

    return Array.from(uniqueCityNames);
  }

  getDatesTrip(){
    const tripDateFrom = this.#points.at(0)?.dateFrom;
    const tripDateTo = this.#points.at(-1)?.dateTo;

    return {
      tripDateFrom,
      tripDateTo
    };
  }

  #renderFilters() {
    const filters = this.filters;
    const prevFilterComponent = this.#tripFilterComponent;

    this.#tripFilterComponent = new FilterTimeView({
      filters,
      currentFilterType: this.#filterModel.filter,
      onFilterTypeChange: this.#handleFilterTypeChange
    });

    if (prevFilterComponent === null) {
      render(this.#tripFilterComponent, this.#tripFilterContainer);
      return;
    }

    replace(this.#tripFilterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };
}

