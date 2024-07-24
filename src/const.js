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
  AUTHORIZATION: 'Basic er883jdzbdw33',
  END_POINT: 'https://20.objects.htmlacademy.pro/big-trip'
};

const ApiServiceMethod = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE'
};


export { FilterType, UserAction, UpdateType, Mode, UiTimeLimit, ApiServiceConnector, ApiServiceMethod};
