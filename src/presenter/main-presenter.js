import { render, replace, RenderPosition } from '../framework/render.js';

import HeaderPresenter from './header-presenter.js';

import TripSortView from '../view/trip-sort-view.js';
import FormEventView from '../view/form-event-view.js';
import EditPointView from '../view/edit-point-view.js';//
import PointListView from '../view/point-list-view.js';//
import NoPointView from '../view/no-point-view.js';

import { generateFilter } from '../mock/filter.js';

export default class MainPresenter {
  #tripMainContainer = null;
  #destinationsModel = null;
  #offersModel = null;
  #pointsModel = null;

  #tripSortComponent = new TripSortView();
  #tripEventsComponent = new FormEventView();

  #tripEventsPointList = [];


  constructor ({ tripMainContainer, destinationsModel, offersModel, pointsModel, tripFilterContainer }) {
    this.#tripMainContainer = tripMainContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#pointsModel = [ ...pointsModel.points];

    const filters = generateFilter(pointsModel);

    this.headerPresenter = new HeaderPresenter({
      tripFilterContainer: tripFilterContainer,
      filters: filters
    });
  }


  init () {
    this.headerPresenter.init();
    this.#renderTripEvents();
  }


  #renderTripEvents() {
    if (!this.#pointsModel.length) {
      render(new NoPointView(), this.#tripMainContainer, RenderPosition.BEFOREBEGIN);
      return;
    }

    render(this.#tripSortComponent, this.#tripMainContainer);
    render(this.#tripEventsComponent, this.#tripMainContainer);

    this.#renderPoints(this.#tripEventsPointList);
  }


  #renderPoints() {
    this.#pointsModel.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  #renderPoint(point) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replacePointToEdit();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const pointList = new PointListView({
      point,
      pointDestination: this.#destinationsModel.getById(point.destination),
      pointOffers: this.#offersModel.getByType(point.type),

      onEditClick: () => {
        replaceEditToPoint();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const editEvent = new EditPointView({
      point: this.#pointsModel[0],
      pointDestinations: this.#destinationsModel.destinations,
      pointOffers: this.#offersModel.offers,

      onCloseEditFormButton: () => {
        replacePointToEdit();
      },

      onFormSubmit: () => {
        replacePointToEdit();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });


    function replaceEditToPoint() {
      replace(editEvent, pointList);
    }


    function replacePointToEdit() {
      replace(pointList, editEvent);
    }


    render(pointList, this.#tripEventsComponent.element);
  }
}
