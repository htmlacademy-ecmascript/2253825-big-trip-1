import { Filters } from '../utils/filters.js';


function generateFilter(points) {

  return Object.entries(Filters).map(
    ([ filterType, filterPoints ]) => ({
      type: filterType,
      count: filterPoints(points.get()).length,
    }),
  );
}


export { generateFilter };
