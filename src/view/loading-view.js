import AbstractView from '../framework/view/abstract-view.js';


const createLoadingViewTemplate = (isLoading) => {

  if (isLoading) {
    return ('<p class="trip-events__msg">Loading...</p>');

  } else {
    return ('<p class="trip-events__msg">Failed to load latest route information</p>');
  }
};

export default class LoadingtView extends AbstractView {

  #isLoading = false;

  constructor(isLoading) {
    super();
    this.#isLoading = isLoading;
  }

  get template() {
    return createLoadingViewTemplate(this.#isLoading);
  }
}
