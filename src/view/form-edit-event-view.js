import { createElement } from '../render.js';
import { formatStringToDateTime } from '../utils.js';
import { POINT_EMPTY } from '../const.js';


function createDestinationDescription (pointDestinations) {
  return (
    pointDestinations.map((event) =>
      `<h3 class="event__section-title  event__section-title--destination">${event.name}</h3>
              <p class="event__destination-description">${event.description}</p>`)
      .join('')
  );
}

function createEditPointTemplate ({ point, pointDestinations, pointOffers }) {

  const {
    basePrice, dateFrom, dateTo, offers, type
  } = point;

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

export default class FormEditEvent {
  constructor({ point = POINT_EMPTY, pointDestinations, pointOffers }) {
    this.point = point;
    this.pointDestinations = pointDestinations;
    this.pointOffers = pointOffers;
  }

  getTemplate () {
    return createEditPointTemplate ({
      point: this.point,
      pointDestinations: this.pointDestinations,
      pointOffers: this.pointOffers
    });
  }


  getElement () {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }


  removeElement () {
    this.element = null;
  }
}
