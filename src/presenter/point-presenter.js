import { replace, render } from '../framework/render.js';

import EditPointView from '../view/edit-point-view.js';
import PointListView from '../view/point-list-view.js';

export default class PointPresenter {
  #tripPointsContainer = null;
  #point = null;
  #allOffers = null;
  #allDestinations = null;

  #tripComponent = null;
  #tripEditComponent = null;

  constructor({ tripPointsContainer }) {
    this.#tripPointsContainer = tripPointsContainer;
  }

  init(tripPoint, allOffers, allDestinations) {
    this.#point = tripPoint;
    this.#allOffers = allOffers;
    this.#allDestinations = allDestinations;


    this.#tripComponent = new PointListView({
      tripPoint: this.#point,
      allOffers: this.#allOffers,
      allDestinations: this.#allDestinations,
      onEditClick: this.#handleEditClick,
    });


    this.#tripEditComponent = new EditPointView({
      tripPoint: this.#point,
      allOffers: this.#allOffers,
      allDestinations: this.#allDestinations,
      onFormSubmit: this.#handleFormSubmit,
      onCloseEditFormButton: this.#handleCloseEditFormButton,
    });

    render(this.#tripComponent, this.#tripPointsContainer);
  }

  #replaceCardToForm() {
    replace(this.#tripEditComponent, this.#tripComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #replaceFormToCard() {
    replace(this.#tripComponent, this.#tripEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToCard();
    }
  };

  #handleEditClick = () => {
    this.#replaceCardToForm();
  };

  #handleFormSubmit = () => {
    this.#replaceFormToCard();
  };

  #handleCloseEditFormButton = () => {
    this.#replaceFormToCard();
  };
}
