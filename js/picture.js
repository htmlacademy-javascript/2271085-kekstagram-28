import {isEscapeKey} from './util.js';
import {thumbnailRender} from './miniature.js';

const COMMENTS_PORTION = 5;
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
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);

  bigPictureImg.src = evt.target.src;
  bigPictureDescription.textContent = evt.target.alt;
  const parent = evt.target.parentNode;
  bigPictureAllComments.textContent = parent.querySelector('.picture__comments').textContent;
  bigPictureLikes.textContent = parent.querySelector('.picture__likes').textContent;
  const bigPictureComments = pictureData[parent.dataset.id - 1].comments;
  let commentsShown = 5;

  const makeComment = (numb) => {
    bigPictureCommentsContainer.innerHTML = '';
    commentLoader.classList.remove('hidden');
    const renderComment = bigPictureComments.slice(0,numb);
    commentCount.textContent = `${renderComment.length} из ${bigPictureAllComments.textContent} комментариев`;
    renderComment.forEach((element) => {
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

    if (commentsShown >= bigPictureComments.length){
      commentLoader.classList.add('hidden');
    }
  };
  makeComment(commentsShown);

  const showComment = () => {
    commentsShown += COMMENTS_PORTION;
    makeComment(commentsShown);

  };
  commentLoader.addEventListener('click', showComment);
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


