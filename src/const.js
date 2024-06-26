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


export { OFFER_COUNT, DESTINATION_COUNT, POINT_COUNT, TYPES, OFFER_LIST, FilterType };
