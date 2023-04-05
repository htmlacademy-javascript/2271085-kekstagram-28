const PICTURES_COUNT = 10;
const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};
const filtersContainerElement = document.querySelector('.img-filters');
let currentFilter = Filter.DEFAULT;
let pictures = [];

const sortRandomly = () => Math.random() - 0.5;

const sortByComments = (pictureA, pictureB) =>
  pictureB.comments.length - pictureA.comments.length;

const getFilteredPictures = () => {
  switch (currentFilter) {
    case Filter.RANDOM:
      return [...pictures].sort(sortRandomly).slice(0,PICTURES_COUNT);
    case Filter.DISCUSSED:
      return [...pictures].sort(sortByComments);
    case Filter.DEFAULT:
      return [...pictures];
  }
};

const setOnFilterClick = (cb) => {
  filtersContainerElement.addEventListener('click', (evt) => {
    if(!evt.target.classList.contains('img-filters__button')){
      return;
    }
    const clickedButton = evt.target;
    if(clickedButton.id === currentFilter){
      return;
    }
    filtersContainerElement
      .querySelector('.img-filters__button--active')
      .classList.remove('img-filters__button--active');
    clickedButton.classList.add('img-filters__button--active');
    currentFilter = clickedButton.id;
    cb(getFilteredPictures());
  });
};

const initFilters = (loadedPictures, cb) => {
  filtersContainerElement.classList.remove('img-filters--inactive');
  pictures = [...loadedPictures];
  setOnFilterClick(cb);
};

export {initFilters, getFilteredPictures};
