import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { formatStringToDateTime } from '../utils/format-time.js';
import { POINT_EMPTY } from '../const.js';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

function createDestinationDescription (pointDestinations) {
  return (
    pointDestinations.map((event) =>
      `<h3 class="event__section-title  event__section-title--destination">${event.name}</h3>
              <p class="event__destination-description">${event.description}</p>`)
      .join('')
  );
}

function createEditPointTemplate ({ state, pointDestinations, pointOffers }) {
  const { point } = state;
  const { basePrice, dateFrom, dateTo, offers, type } = point;

  const neededPoint = pointOffers.find((pointOffer) => pointOffer.type === type);

  const neededOffers = neededPoint.offers;
  // Temporary const
  const destination = pointDestinations[0];

  return (
    `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">

        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-${point.id}">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>

          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${point.id}" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>

        ${pointOffers.map((item) => `<div class="event__type-item">
          <input id="event-type-${item.type}" class="event__type-input visually-hidden"
            type="radio" name="event-type" value="${item.type}"
              ${item.type === type ? 'checked' : ''}>

          <label class="event__type-label event__type-label--${item.type}"
              for="event-type-${item.type}">${item.type}</label>
                </div>`)
      .join('')}
            </fieldset>
          </div>
        </div>


        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-${point.id}">
            ${type}
          </label>

          ${pointDestinations.map((city) => (
      `<input class="event__input  event__input--destination"
               id="event-destination-${point.id}" type="text" name="event-destination" value="${city.name}"
                list="destination-list-${point.id}">
               <datalist id="destination-list-${point.id}">
          <option value="${city.name}"></option>`))
      .join('')}

          </datalist>
        </div>


        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-${point.id}">From</label>
          <input class="event__input  event__input--time" id="event-start-time-${point.id}" type="text" name="event-start-time"
           value="${formatStringToDateTime(dateFrom)}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-${point.id}">To</label>
          <input class="event__input  event__input--time" id="event-end-time-${point.id}" type="text" name="event-end-time"
           value="${formatStringToDateTime(dateTo)}">
        </div>


        <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-${point.id}">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-${point.id}"
         type="text" name="event-price" value="${basePrice}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Cancel</button>
      <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
    </header>


    <section class="event__details">
    <section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">

    ${neededOffers.map(({ id, title, price }) => `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${id}" type="checkbox" name="event-offer-luggage"
       ${offers.includes(id) ? 'checked' : ''}>
    <label class="event__offer-label" for="event-offer-${id}">
      <span class="event__offer-title">${title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
    </label>
  </div>`)
      .join('')}
    </div>
        </section>

        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          ${createDestinationDescription (pointDestinations)}
          <div class="event__photos-container">
            <div class="event__photos-tape">

       ${destination.pictures
      .map(({ src, description }) => `<img class="event__photo"src="${src}" alt="${description}"/>`)
      .join('')}

            </div>
          </div>
        </section>
      </section>
    </form>
  </li>`
  );
}

export default class EditPointView extends AbstractStatefulView {

  #pointDestinations = null;
  #pointOffers = null;
  #handleFormSubmit = null;
  #handleCloseEditFormButton = null;
  #datepickerFrom = null;
  #datepickerTo = null;

  constructor({ point = POINT_EMPTY, pointDestinations, pointOffers, onFormSubmit, onCloseEditFormButton }) {
    super();

    // const { destinationForPoint } = point;
    // this.destinationForPoint = destinationForPoint;

    this.#pointDestinations = pointDestinations;
    this.#pointOffers = pointOffers;
    this._setState(EditPointView.parsePointToState({point}));

    this.#handleFormSubmit = onFormSubmit;
    this.#handleCloseEditFormButton = onCloseEditFormButton;

    this._restoreHandlers();
  }

  get template () {
    return createEditPointTemplate ({
      state: this._state,
      pointDestinations: this.#pointDestinations,
      pointOffers: this.#pointOffers,
      //destinationForPoint: this._state.destinationForPoint
    });
  }

  reset (point) {
    this.updateElement(
      EditPointView.parsePointToState({point}),
    );
  }

  _restoreHandlers = () => {
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#closeEditFormButtonHandler);
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelectorAll('.event__type-input').forEach((element) => {
      element.addEventListener('change', this.#typeInputClick);
    });

    this.element.querySelector('.event__input--price').addEventListener('change', this.#priceInputChange);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationInputChange);

    const offerBlock = this.element.querySelector('.event__available-offers');

    if (offerBlock) {
      offerBlock.addEventListener('change', this.#offerClickHanlder);
    }

    this.#setDatepickers();
  };

  #setDatepickers = () => {
    this.#datepickerFrom = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.point.dateFrom,
        onClose: this.#dateFromChangeHandler,
        enableTime: true,
        maxDate: this._state.point.dateTo,
        locale: {
          firstDayOfWeek: 1
        },
        'time_24hr': true
      });

    this.#datepickerTo = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.point.dateTo,
        onClose: this.#dateToChangeHandler,
        enableTime: true,
        minDate: this._state.point.dateFrom,
        locale: {
          firstDayOfWeek: 1
        },
        'time_24hr': true
      }
    );
  };

  #dateFromChangeHandler = ([userDate]) => {
    this._setState({
      point: {
        ...this._state.point,
        dateFrom: userDate
      }
    });
    this.#datepickerTo.set('minDate', this._state.tripPoint.dateFrom);
  };

  #dateToChangeHandler = ([userDate]) => {
    this._setState({
      point: {
        ...this._state.point,
        dateTo: userDate
      }
    });
    this.#datepickerFrom.set('maxDate', this._state.point.dateTo);
  };

  removeElement = () => {
    super.removeElement();

    if(this.#datepickerFrom){
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }

    if(this.#datepickerTo){
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  };


  #formSubmitHandler = (evt) => {

    evt.preventDefault();
    this.#handleFormSubmit(EditPointView.parseStateToPoint(this._state));
  };


  #typeInputClick = (evt) => {

    evt.preventDefault();

    this.updateElement({
      point: {
        ...this._state.point,
        type: evt.target.value,
        offers: []
      }
    });
  };


  #offerClickHanlder = (evt) => {

    evt.preventDefault();

    const newCheckedOffersForPoint = Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked'))
      .map((offer) => offer.dataset.offerId);

    this._setState({
      ...this._state,
      point: {
        ...this._state.point,
        offers: newCheckedOffersForPoint,
        checkedOffersForPoint: this.#pointOffers
          .find((offer) => offer.type === this._state.point.type).offers
          .filter((offer) => newCheckedOffersForPoint.includes(offer.id))
      },
    });
  };


  #priceInputChange = (evt) => {

    evt.preventDefault();

    this._setState({
      point: {
        ...this._state.point,
        basePrice: evt.target.value
      }
    });
  };

  #closeEditFormButtonHandler = (evt) => {
    evt.preventDefault();
    this.#handleCloseEditFormButton();
  };


  #destinationInputChange = (evt) => {

    evt.preventDefault();

    const selectedDestination = this.#pointDestinations
      .find((destination) => destination.name === evt.target.value);

    const selectedDestinationId = (selectedDestination)
      ? selectedDestination.id
      : null;

    this.updateElement({
      tripPoint: {
        ...this._state.point,
        destinationForPoint: selectedDestination,
        destination: selectedDestinationId
      }
    });
  };

  static parsePointToState = ({ point }) => ({ point });

  static parseStateToPoint = (state) => state.point;
}
