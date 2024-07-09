import { render, remove, replace, RenderPosition } from '../framework/render.js';
import { SortType, sort } from '../utils/sort.js';
import { UpdateType, FilterType } from '../const.js';
import { Filters } from '../utils/filters.js';

import FilterTimeView from '../view/filter-time-view.js';
import TripInfoView from '../view/header-travel-view.js';
import NewPointButtonView from '../view/new-point-button-view';

export default class HeaderPresenter {

  #pointsModel = null;
  #filterModel = null;
  #clickModel = null;

  #newPointButtonComponent = null;
  #tripFilterComponent = null;
  #tripInfoComponent = null;

  #points = null;

  constructor ({ tripFilterContainer, filterModel, pointsModel, clickModel }) {

    this.tripFilterContainer = tripFilterContainer;

    this.#filterModel = filterModel;
    this.#pointsModel = pointsModel;
    this.#clickModel = clickModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    const points = this.#pointsModel.get();

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
    this.#newPointButtonComponent = new NewPointButtonView({
      onClick: this.#handleNewPointButtonClick
    });
    render(this.#newPointButtonComponent, this.tripFilterContainer, RenderPosition.BEFOREEND);

  }

  #handleNewPointButtonClick = () => {
    this.#clickModel.setClickState (UpdateType.MINOR, 'creating');
  };

  #renderTripInfo () {
    const prevTripInfoComponent = this.#tripInfoComponent;
    this.#points = sort[SortType.DAY](this.#pointsModel.get());

    this.#tripInfoComponent = new TripInfoView({
      totalSumm: this.getTotalSumm(),
      namesDestinations: this.getNamesDestinations(),
      datesTrip: this.getDatesTrip()
    });

    if(prevTripInfoComponent === null){
      render(this.#tripInfoComponent, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this.#tripInfoComponent, prevTripInfoComponent);
    remove(prevTripInfoComponent);

  }


  getTotalSumm() {
    return this.#points.reduce((total, point) => {
      const basePrice = point.basePrice || 0;
      const offersPrice = point.checkedOffersForPoint.reduce((offerTotal, offer) => offerTotal + offer.price, 0);
      return total + basePrice + offersPrice;
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
      render(this.#tripFilterComponent);
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

