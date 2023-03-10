import {getPictures} from './data.js';

const picturesList = document.querySelector('.pictures');
const picturesListTitle = picturesList.querySelector('.pictures__title ');
picturesListTitle.classList.remove('visually-hidden');

const pictureItemTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const newPictures = getPictures();

const newPicturesFragment = document.createDocumentFragment();

newPictures.forEach(({url, likes, comments}) => {
  const newPicture = pictureItemTemplate.cloneNode(true);
  newPicture.querySelector('.picture__img').src = url;
  newPicture.querySelector('.picture__likes').textContent = likes;
  newPicture.querySelector('.picture__comments').textContent = comments;
  newPicturesFragment.appendChild(newPicture);

});

picturesList.appendChild(newPicturesFragment);
