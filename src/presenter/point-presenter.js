import { replace, render, remove } from '../framework/render.js';
import { UpdateType, UserAction } from '../const.js';
import { isSameDates, isSamePrices } from '../utils/format-time.js';

import EditPointView from '../view/edit-point-view.js';
import PointListView from '../view/point-list-view.js';


export default class PointPresenter {
  #tripPointsContainer = null;
  #destinationsModel = null;
  #offersModel = null;

  #handleDataChange = null;
  #handleModeChange = null;

  #pointComponent = null;
  #pointEditComponent = null;
  #point = null;
  //#mode = Mode.DEFAULT;

  constructor({ tripPointsContainer, destinationsModel, offersModel, onDataChange, onModeChange }) {
    this.#tripPointsContainer = tripPointsContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(point) {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new PointListView({
      point: this.#point,
      pointDestination: this.#destinationsModel.getById(point.destination),
      pointOffers: this.#offersModel.getByType(point.type),
      onEditClick: this.#handleEditClick,
      onFavoriteClick: this.#favoriteClickHandler
    });

    this.#pointEditComponent = new EditPointView({
      point: this.#point,
      pointDestinations: this.#destinationsModel.get(),
      pointOffers: this.#offersModel.get(),
      onFormSubmit: this.#handleFormSubmit,
      onCloseEditFormButton: this.#handleCloseEditFormButton,
      onDeleteEditFormButton: this.#handleDeleteEditFormButton
    });

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#tripPointsContainer);
      return;
    }

    // if (this.#mode === Mode.DEFAULT) {
    //   replace(this.#pointComponent, prevPointComponent);
    // }

    // if (this.#mode === Mode.EDITING) {
    //   replace(this.#pointEditComponent, prevPointEditComponent);
    // }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  resetView() {
    // if (this.#mode !== Mode.DEFAULT) {
    //   this.#replaceFormToCard();
    // }
  }

  #replaceCardToForm() {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    //this.#mode = Mode.EDITING;
  }

  #replaceFormToCard() {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    //this.#mode = Mode.DEFAULT;
  }


  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormToCard();
    }
  };

  #handleEditClick = () => {
    this.#replaceCardToForm();
  };

  #handleFormSubmit = (update) => {
    const isMinorUpdate = isSameDates(this.#point.dateFrom, update.dateFrom)
    || isSameDates(this.#point.dateTo, update.dateTo)
    || isSamePrices(this.#point.basePrice, update.basePrice);

    this.#handleDataChange(
      UserAction.UPDATE_EVENT,
      isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      update
    );
    this.#replaceFormToCard();
  };

  #handleDeleteEditFormButton = (point) => {
    this.#handleDataChange(
      UserAction.DELETE_EVENT,
      UpdateType.MINOR,
      point,
    );
  };

  #handleCloseEditFormButton = () => {
    this.#replaceFormToCard();
  };

  #favoriteClickHandler = () => {
    this.#handleDataChange(
      UserAction.UPDATE_EVENT,
      UpdateType.MINOR,
      {...this.#point, isFavorite: !this.#point.isFavorite});
  };
}
