import { createElement } from '../render.js';
import { formatStringToDateTime } from '../utils.js';
import { POINT_EMPTY } from '../const.js';


function createTypeItemsTemplate (pointOffers) {

  return (
    pointOffers.map((item) => `<div class="event__type-item">
  <input id="event-type-${item.type}" class="event__type-input visually-hidden"
   type="radio" name="event-type" value="${item.type}">

  <label class="event__type-label event__type-label--${item.type}"
   for="event-type-${item.type}">${item.type}</label>
</div>`
    ).join(''));
}


function createCitiesNamesTemplate (pointDestinations) {

  return (
    pointDestinations.map((city) => (
      `<input class="event__input  event__input--destination"
         id="event-destination-1" type="text" name="event-destination" value="${city.name}" list="destination-list-1">
         <datalist id="destination-list-1">`
    )).join('')
  );
}


function createDestinationNamesTemplate (pointDestinations) {

  return (
    pointDestinations.map((avialableDestination) =>
      `<option value="${avialableDestination.name}"></option>`
    ).join(''));
}


function createEventsSectionTemplate (pointDestinations) {

  return (
    pointDestinations.map((event) =>
      `<h3 class="event__section-title  event__section-title--destination">${event.name}</h3>
        <p class="event__destination-description">${event.description}</p>`
    ).join(''));
}


function createPicturesTemplate (pointDestinations) {
  return (
    pointDestinations.map((picture) =>
      `<img class="event__photo"src="${picture.pictures}" alt="Event photo">`
    ).join(''));
}


function createEditPointTemplate ({ point, pointDestinations, pointOffers }) {

  const {
    basePrice, dateFrom, dateTo, offers, type
  } = point;

  return (/*html*/
    `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">

        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>

          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${createTypeItemsTemplate(pointOffers)}
            </fieldset>
          </div>
        </div>


        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${type}
          </label>
          ${createCitiesNamesTemplate(pointDestinations)}
          ${createDestinationNamesTemplate(pointDestinations)}
          </datalist>
        </div>


        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time"
           value="${formatStringToDateTime(dateFrom)}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time"
           value="${formatStringToDateTime(dateTo)}">
        </div>


        <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1"
         type="text" name="event-price" value="${basePrice}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Cancel</button>

    </header>


    <section class="event__details">
    <section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">

    ${pointOffers.map((offer) => `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.type}-1" type="checkbox" name="event-offer-${offer.title}"
       ${offers.includes(offer.id) ? 'checked' : ''}>
    <label class="event__offer-label" for="event-offer-${offer.title}-1">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </label>
  </div>`).join('')}

    </div>
        </section>
        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          ${createEventsSectionTemplate(pointDestinations)}
          <div class="event__photos-container">
            <div class="event__photos-tape">
            ${createPicturesTemplate (pointDestinations)}
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
