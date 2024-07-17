import EditPointView from '../view/edit-point-view.js';
import { render,remove, RenderPosition } from '../framework/render.js';
import { UpdateType, UserAction, Mode } from '../const.js';


export default class NewPointPresenter {
  #pointListContainer = null;
  #pointOffers = null;
  #pointDestinations = null;

  #handleDataChange = null;
  #handleDestroy = null;

  #pointEditComponent = null;

  constructor({pointListContainer, pointOffers, pointDestinations, onDataChange, onDestroy}) {
    this.#pointListContainer = pointListContainer;
    this.#pointOffers = pointOffers;
    this.#pointDestinations = pointDestinations;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init() {

    if (this.#pointEditComponent !== null) {
      return;
    }

    this.#pointEditComponent = new EditPointView({
      poingtgOffers: this.#pointOffers,
      pointDestinations: this.#pointDestinations,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteEditFormButton: this.#handleDeleteEditFormButton,
      mode: Mode.CREATING
    });

    render(this.#pointEditComponent, this.#pointListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }


  destroy() {

    if(this.#pointEditComponent === null) {
      return;
    }

    remove(this.#pointEditComponent);
    this.#pointEditComponent = null;
    this.#handleDestroy();

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  setSaving() {
    this.#pointEditComponent.updateElement({
      isDisabled: true,
      isSaving: true
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#pointEditComponent.updateElement({
        isDisabled: false,
        isSaving: false
      });
    };
    this.#pointEditComponent.shake(resetFormState);
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_EVENT,
      UpdateType.MAJOR,
      {...point, isFavorite: false}
    );
  };

  #handleDeleteEditFormButton = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
