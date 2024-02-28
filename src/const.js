const OFFER_COUNT = 6;

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


export { OFFER_COUNT, DESTINATION_COUNT, POINT_COUNT, TYPES, DEFAULT_TYPE, POINT_EMPTY };
