import { RenderPosition, render } from '../render.js';

import FilterTimeView from '../view/filter-time-view.js';
import HeaderTravelView from '../view/header-travel-view.js';


export default class FiltersPresenter {
  tripInfoComponent = new HeaderTravelView();
  tripFilterComponent = new FilterTimeView();

  constructor ({ tripFilterContainer }) {
    this.tripFilterContainer = tripFilterContainer;
  }

  init () {
    render(this.tripInfoComponent, this.tripFilterContainer, RenderPosition.AFTERBEGIN);
    render(this.tripFilterComponent, this.tripFilterContainer, RenderPosition.AFTERBEGIN);
  }
}

