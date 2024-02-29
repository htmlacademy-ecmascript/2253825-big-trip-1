const OFFER_COUNT = 4;

const DESTINATION_COUNT = 6;

const POINT_COUNT = 6;

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


const DEFAULT_TYPE = 'Flight';

const POINT_EMPTY = {
  basePrice: 0,
  dateFrom: null,
  dateTo: null,
  destination: null,
  isFavorite: false,
  offers: [],
  type: DEFAULT_TYPE
};


export { OFFER_COUNT, DESTINATION_COUNT, POINT_COUNT, TYPES, OFFER_LIST, DEFAULT_TYPE, POINT_EMPTY };
