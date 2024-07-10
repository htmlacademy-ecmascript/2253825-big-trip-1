import EditPointView from '../view/edit-point-view.js';
import { render,remove, RenderPosition } from '../framework/render.js';
import { UpdateType, UserAction, Mode } from '../const.js';
import { generateID } from '../utils/common.js';

export default class NewPointPresenter {
  #pointListContainer = null;
  #pointOffers = null;
  #pointDestinations = null;
  #clickModel = null;

  #handleDataChange = null;
  #handleDestroy = null;

  #pointEditComponent = null;

  constructor({pointListContainer, pointOffers, pointDestinations, clickModel,
    onDataChange, onDestroy}) {
    this.#pointListContainer = pointListContainer;
    this.#pointOffers = pointOffers;
    this.#pointDestinations = pointDestinations;
    this.#clickModel = clickModel;
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
      clickModel: this.#clickModel,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteEditFormButton: this.#handleDeleteEditFormButton,
      type: Mode.CREATING
    });

    render(this.#pointEditComponent, this.#pointListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy(){
    if(this.#pointEditComponent === null){
      return;
    }

    this.#handleDestroy();

    remove(this.#pointEditComponent);
    this.#pointEditComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_EVENT,
      UpdateType.MINOR,
      {id: generateID(), ...point}
    );

    this.destroy();
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
