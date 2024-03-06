import { getRandomValue } from '../utils.js';
import { CITIES, DESCRIPTION } from './mock-const.js';


function generateDestination () {

  const city = getRandomValue(CITIES);

  return {
    id: crypto.randomUUID(),
    description: DESCRIPTION,
    name: city,
    pictures: [
      {
        'src': `https://loremflickr.com/248/152?random=${crypto.randomUUID()}`,
        'description': `${city} description`
      }
    ]
  };
}


export { generateDestination };
