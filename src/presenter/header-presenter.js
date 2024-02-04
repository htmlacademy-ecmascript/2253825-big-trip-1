import { RenderPosition } from '../render.js';
import { render } from '../render.js';

import FilterTimeView from '../view/filter-time-view.js';
import HeaderTravelView from '../view/header-travel-view.js';


export default class HeaderPresenter {
  tripFilterComponent = new FilterTimeView();
  tripInfoComponent = new HeaderTravelView();

  constructor ({ tripInfoContainer, tripFilterContainer }) {
    this.tripInfoContainer = tripInfoContainer;
    this.tripFilterContainer = tripFilterContainer;
  }


  init () {
    render(this.tripInfoComponent, this.tripInfoContainer, RenderPosition.AFTERBEGIN);
    render(this.tripFilterComponent, this.tripFilterContainer, RenderPosition.AFTERBEGIN);
  }
}
