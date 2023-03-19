import {isEscapeKey} from './util.js';
import {thumbnailRender} from './miniature.js';

const pictureData = thumbnailRender();
const bigPictureElement = document.querySelector('.big-picture');
const picturesSection = document.querySelector('.pictures');
const bigPictureCancelElement = document.querySelector('.big-picture__cancel');
const bigPictureImg = document.querySelector('.big-picture__img img');
const bigPictureLikes = bigPictureElement.querySelector('.likes-count');
const bigPictureAllComments = bigPictureElement.querySelector('.comments-count');
const bigPictureCommentsContainer = bigPictureElement.querySelector('.social__comments');
const bigPictureDescription = bigPictureElement.querySelector('.social__caption');
const commentCount = bigPictureElement.querySelector('.social__comment-count');
const commentLoader = bigPictureElement.querySelector('.comments-loader');

const openBigPicture = (evt) => {
  if (!evt.target.closest('[data-id]')){
    return;
  }
  bigPictureElement.classList.remove('hidden');
  commentCount.classList.add('hidden');
  commentLoader.classList.add('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);

  bigPictureImg.src = evt.target.src;
  bigPictureDescription.textContent = evt.target.alt;
  const parent = evt.target.parentNode;
  bigPictureAllComments.textContent = parent.querySelector('.picture__comments').textContent;
  bigPictureLikes.textContent = parent.querySelector('.picture__likes').textContent;

  const makeComment = () => {
    const bigPictureComments = pictureData[parent.dataset.id - 1].comments;
    bigPictureCommentsContainer.innerHTML = '';
    bigPictureComments.forEach((element) => {
      bigPictureCommentsContainer.insertAdjacentHTML('beforeend',
        `<li class = "social__comment" >
            <img class="social__picture"
            src = "${element.avatar}";
            alt="${element.name}"
            width="35"
            height="35">
            </img>
            <p class="social__text">${element.message}</p>
          </li>`
      );
    });
  };
  makeComment();


};

const closeBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  document.body.classList.remove('modal-open');
};

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

picturesSection.addEventListener('click', openBigPicture);
bigPictureCancelElement.addEventListener('click',closeBigPicture);


