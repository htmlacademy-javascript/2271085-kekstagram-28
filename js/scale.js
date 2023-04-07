const SCALE_STEP = 25;
const SCALE_MAX = 100;
const SCALE_DEFAULT = 100;

const scaleSmallerButtonElement = document.querySelector('.scale__control--smaller');
const scaleBiggerButtonElement = document.querySelector('.scale__control--bigger');
const scaleValueElement = document.querySelector('.scale__control--value');
const imageElement = document.querySelector('.img-upload__preview img');

let actualScale = parseInt(scaleValueElement.value, 10);

const changeScale = (value) => {
  imageElement.style.transform = `scale(${value / 100})`;
  scaleValueElement.value = `${value}%`;
};

const makeSmaller = () => {
  actualScale -= SCALE_STEP;
  if(actualScale < SCALE_STEP){
    actualScale = SCALE_STEP;
  }
  scaleValueElement.value = actualScale;
  changeScale(actualScale);
};

const makeBigger = () => {
  actualScale += SCALE_STEP;
  if(actualScale >= SCALE_MAX){
    actualScale = SCALE_MAX;
  }
  scaleValueElement.value = actualScale;
  changeScale(actualScale);
};

const resetScale = () => changeScale(SCALE_DEFAULT);

scaleSmallerButtonElement.addEventListener('click', makeSmaller);
scaleBiggerButtonElement.addEventListener('click', makeBigger);

export {resetScale};
