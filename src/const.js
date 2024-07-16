const OFFER_COUNT = 4;

const DESTINATION_COUNT = 5;

const POINT_COUNT = 9;

const TYPES = [
  'Taxi',
  'Bus',
  'Train',
  'Ship',
  'Drive',
  'Flight',
  'Check-in',
  'Sightseeing',
  'Restaurant'
];

const OFFER_LIST = [
  'Add luggage',
  'Switch to comfort',
  'Rent a car',
  'Add breakfast',
];

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

const UserAction = {
  UPDATE_EVENT: 'UPDATE_EVENT',
  ADD_EVENT: 'ADD_EVENT',
  DELETE_EVENT: 'DELETE_EVENT'
};

const UpdateType = {
  INIT: 'INIT',
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR'
};

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
  CREATING: 'CREATING',
};

const UiTimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

const ApiServiceConnector = {
  AUTHORIZATION: 'Basic er883jdzbdw',
  END_POINT: 'https://20.objects.htmlacademy.pro/big-trip'
};

const ApiServiceMethod = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE'
};


export { OFFER_COUNT, DESTINATION_COUNT, POINT_COUNT, TYPES, OFFER_LIST, FilterType,
  UserAction, UpdateType, Mode, UiTimeLimit, ApiServiceConnector, ApiServiceMethod};
