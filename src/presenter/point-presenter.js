// import { replace, render } from '../framework/render.js';

// import PointListView from '../view/point-list-view.js';
// import EditPointView from '../view/edit-point-view.js';


// export default class PointPresenter {
//   #tripPointsContainer = null;
//   #point = null;
//   #offers = null;
//   #destinations = null;

//   #tripPointComponent = null;
//   #tripEditComponent = null;

//   constructor({ tripPointsContainer }) {
//     this.#tripPointsContainer = tripPointsContainer;
//   }

//   init(tripPoint, allOffers, allDestinations) {
//     this.#point = tripPoint;
//     this.#offers = allOffers;
//     this.#destinations = allDestinations;

//     this.#tripPointComponent = new PointListView({
//       tripPoint: this.#point,
//       onEditClick: this.#handleEditClick,
//     });

//     this.#tripEditComponent = new EditPointView({
//       tripPoint: this.#point,
//       allOffers: this.#offers,
//       allDestinations: this.#destinations,

//       onFormSubmit: this.#handleFormSubmit,
//       onCloseEditFormButton: this.#handleCloseEditFormButton,
//     });

//     render(this.#tripPointComponent, this.#tripPointsContainer);
//   }

//   #replaceCardToForm() {
//     replace(this.#tripEditComponent, this.#tripPointComponent);
//     document.addEventListener('keydown', this.#escKeyDownHandler);
//   }

//   #replaceFormToCard() {
//     replace(this.#tripPointComponent, this.#tripEditComponent);
//     document.removeEventListener('keydown', this.#escKeyDownHandler);
//   }

//   #escKeyDownHandler = (evt) => {
//     if (evt.key === 'Escape') {
//       evt.preventDefault();
//       this.#replaceFormToCard();
//     }
//   };

//   #handleEditClick = () => {
//     this.#replaceCardToForm();
//   };

//   #handleFormSubmit = () => {
//     this.#replaceFormToCard();
//   };

//   #handleCloseEditFormButton = () => {
//     this.#replaceFormToCard();
//   };
// }
