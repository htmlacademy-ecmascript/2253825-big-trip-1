import AbstractView from '../framework/view/abstract-view.js';
import { formatStringToDateTime, formatStringToShortDate, formatDuration } from '../utils/format-time.js';
import he from 'he';


function createPointTemplate(point) {

  const {type, destinationForPoint, basePrice, dateFrom, dateTo, isFavorite} = point;


  const favoriteClassName = isFavorite
    ? 'event__favorite-btn--active'
    : '';

  const checkedOffersList = point.checkedOffersForPoint.map((offer) =>
    `<li class="event__offer">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </li>`
  ).join('');

  return (
    `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="2019-03-18">${formatStringToDateTime(dateFrom)}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${destinationForPoint.name}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="2019-03-18T10:30">${formatStringToShortDate(dateFrom)}</time>
          &mdash;
          <time class="event__end-time" datetime="2019-03-18T11:00">${formatStringToShortDate(dateTo)}</time>
        </p>
        <p class="event__duration">${formatDuration(dateFrom, dateTo)}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${he.encode(basePrice.toString())}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
     <ul class="event__selected-offers">
        ${checkedOffersList}
      </ul>
      <button class="event__favorite-btn ${favoriteClassName}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`
  );
}

export default class PointListView extends AbstractView {
  #point = null;
  #handleEventClick = null;
  #handleFavoriteClick = null;

  constructor({ point, onEditClick, onFavoriteClick }) {
    super();
    this.#point = point;
    this.#handleEventClick = onEditClick;
    this.#handleFavoriteClick = onFavoriteClick;


    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editClickHandler);
    this.element.querySelector('.event__favorite-btn')
      .addEventListener('click', this.#favoriteClickHandler);
  }

  get template() {
    return createPointTemplate(this.#point);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEventClick();
  };


  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFavoriteClick();
  };
}
