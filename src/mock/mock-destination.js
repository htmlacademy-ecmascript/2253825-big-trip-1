import { getRandomValue } from '../utils/common.js';
import { CITIES, DESCRIPTION } from './const.js';


function generateDestination () {

  const city = getRandomValue(CITIES);

  return {
    id: crypto.randomUUID(),
    description: getRandomValue(DESCRIPTION),
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
