import {isEscapeKey} from './util.js';
import {thumbnailRender} from './miniature.js';

const pictureArray = thumbnailRender();
const bigPicture = document.querySelector('.big-picture');
const picturesList = document.querySelector('.pictures');
const bigPictureCanсel = document.querySelector('.big-picture__cancel');
const pictureImg = document.querySelector('.big-picture__img img');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const bigPictureCommentsNumber = bigPicture.querySelector('.comments-count');
const bigPictureCommentsContainer = bigPicture.querySelector('.social__comments');
const bigPictureDescription = bigPicture.querySelector('.social__caption');
const commentCount = bigPicture.querySelector('.social__comment-count');
const commentLoader = bigPicture.querySelector('.comments-loader');

const openBigPicture = (evt) => {
  bigPicture.classList.remove('hidden');
  commentCount.classList.add('hidden');
  commentLoader.classList.add('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);

  if (evt.target.closest('.picture')){
    pictureImg.src = evt.target.src;
    bigPictureDescription.textContent = evt.target.alt;
    const parent = evt.target.parentNode;
    bigPictureCommentsNumber.textContent = parent.querySelector('.picture__comments').textContent;
    bigPictureLikes.textContent = parent.querySelector('.picture__likes').textContent;

    const makeComment = () => {
      const bigPictureComments = pictureArray[parent.id - 1].comments;
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
  }

};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  document.body.classList.remove('modal-open');
};

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

picturesList.addEventListener('click', openBigPicture);
bigPictureCanсel.addEventListener('click',closeBigPicture);


