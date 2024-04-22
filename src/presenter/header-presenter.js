import { RenderPosition, render } from '../framework/render.js';

import FilterTimeView from '../view/filter-time-view.js';
import HeaderTravelView from '../view/header-travel-view.js';


export default class HeaderPresenter {

  constructor ({ tripInfoContainer, tripFilterContainer, filters }) {

    this.tripInfoContainer = tripInfoContainer;
    this.tripFilterContainer = tripFilterContainer;

    this.tripInfoComponent = new HeaderTravelView();
    this.tripFilterComponent = new FilterTimeView({filters});
  }

  init () {
    render(this.tripInfoComponent, this.tripFilterContainer, RenderPosition.AFTERBEGIN);
    render(this.tripFilterComponent, this.tripFilterContainer, RenderPosition.AFTERBEGIN);
  }
}

