

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const createRandomNumber = (min,max) => {
  const previousValues = [];
  return function (){
    let randomNumber = getRandomInteger(min,max);
    if (previousValues.length >= (max - min + 1)){
      return null;
    }
    while (previousValues.includes(randomNumber)){
      randomNumber = getRandomInteger(min,max);
    }
    previousValues.push(randomNumber);
    return randomNumber;
  };
};

const isEscapeKey = (evt) => evt.key === 'Escape';

export {getRandomInteger, createRandomNumber,isEscapeKey};
