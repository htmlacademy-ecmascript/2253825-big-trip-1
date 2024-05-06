import { replace, render } from '../framework/render.js';

import EditPointView from '../view/edit-point-view.js';
import PointListView from '../view/point-list-view.js';

export default class PointPresenter {
  #tripPointsContainer = null;
  #destinationsModel = null;
  #offersModel = null;

  #pointComponent = null;
  #pointEditComponent = null;
  #point = null;

  constructor({ tripPointsContainer, destinationsModel, offersModel}) {
    this.#tripPointsContainer = tripPointsContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  init(point) {
    this.#point = point;

    // const prevPointComponent = this.#pointComponent;
    // const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new PointListView({
      point: this.#point,
      pointDestination: this.#destinationsModel.getById(point.destination),
      pointOffers: this.#offersModel.getByType(point.type),
      onEditClick: this.#handleEditClick,
    });


    this.#pointEditComponent = new EditPointView({
      point: this.#point,
      pointDestinations: this.#destinationsModel.get(),
      pointOffers: this.#offersModel.get(),
      onFormSubmit: this.#handleFormSubmit,
      onCloseEditFormButton: this.#handleCloseEditFormButton,
    });

    render(this.#pointComponent, this.#tripPointsContainer);
  }

  #replaceCardToForm() {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #replaceFormToCard() {
    replace(this.#pointComponent, this.#pointEditComponent);
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
