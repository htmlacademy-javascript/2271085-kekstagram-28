const SCALE_STEP = 25;
const SCALE_MAX = 100;
const SCALE_DEFAULT = 100;

const scaleSmallerButton = document.querySelector('.scale__control--smaller');
const scaleBiggerButton = document.querySelector('.scale__control--bigger');
const scaleValueElement = document.querySelector('.scale__control--value');
const imageElement = document.querySelector('.img-upload__preview img');

let actuallScale = parseInt(scaleValueElement.value, 10);

const changeScale = (value) => {
  imageElement.style.transform = `scale(${value / 100})`;
  scaleValueElement.value = `${value}%`;
};

const makeSmaller = () => {
  actuallScale -= SCALE_STEP;
  if(actuallScale < SCALE_STEP){
    actuallScale = SCALE_STEP;
  }
  scaleValueElement.value = actuallScale;
  changeScale(actuallScale);
};

const makeBigger = () => {
  actuallScale += SCALE_STEP;
  if(actuallScale >= SCALE_MAX){
    actuallScale = SCALE_MAX;
  }
  scaleValueElement.value = actuallScale;
  changeScale(actuallScale);
};

const resetScale = () => changeScale(SCALE_DEFAULT);

scaleSmallerButton.addEventListener('click', makeSmaller);
scaleBiggerButton.addEventListener('click', makeBigger);

export {resetScale};
