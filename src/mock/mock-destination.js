import { getRandomValue, getRandomInteger } from '../utils/common.js';
import { CITIES, DESCRIPTION } from './const.js';

const CITY = getRandomValue(CITIES);


const generatePictures = () => {
  const picturesCount = getRandomInteger(1, 5);

  return new Array(picturesCount).fill().map(() => ({
    src: `https://loremflickr.com/248/152?random=${crypto.randomUUID(5)}`,
    description: `${CITY} description`
  }));
};


function generateDestination () {

  return {
    id: crypto.randomUUID(),
    description: getRandomValue(DESCRIPTION),
    name: CITY,
    pictures: generatePictures()
  };
}


export { generateDestination };
