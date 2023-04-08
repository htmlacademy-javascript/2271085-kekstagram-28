import {isEscapeKey, showAlert, debounce} from './util.js';
import {thumbnailRender} from './miniature.js';
import {getData} from './api.js';
import {initFilters,getFilteredPictures} from './filters.js';

const COMMENTS_PORTION = 5;
const bigPictureElement = document.querySelector('.big-picture');
const picturesSectionElement = document.querySelector('.pictures');
const bigPictureCancelElement = document.querySelector('.big-picture__cancel');
const bigPictureImgElement = document.querySelector('.big-picture__img img');
const bigPictureLikesElement = bigPictureElement.querySelector('.likes-count');
const bigPictureAllCommentsElement = bigPictureElement.querySelector('.comments-count');
const bigPictureCommentsContainerElement = bigPictureElement.querySelector('.social__comments');
const bigPictureDescriptionElement = bigPictureElement.querySelector('.social__caption');
const commentCountElement = bigPictureElement.querySelector('.social__comment-count');
const commentLoaderElement = bigPictureElement.querySelector('.comments-loader');
let pictureData;

getData()
  .then((images) => {
    const debounceThumbnailRender = debounce(thumbnailRender);
    initFilters(images,debounceThumbnailRender);
    pictureData = getFilteredPictures(images);
    thumbnailRender(pictureData);
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );

const onOpenBigPicture = (evt) => {
  if (!evt.target.closest('[data-id]')){
    return;
  }

  evt.preventDefault();

  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);

  bigPictureImgElement.src = evt.target.src;
  bigPictureDescriptionElement.textContent = evt.target.alt;
  const parent = evt.target.parentNode;
  bigPictureAllCommentsElement.textContent = parent.querySelector('.picture__comments').textContent;
  bigPictureLikesElement.textContent = parent.querySelector('.picture__likes').textContent;
  const bigPictureComments = pictureData[parent.dataset.id].comments;
  let commentsShown = 5;

  const makeComment = (numb) => {
    bigPictureCommentsContainerElement.innerHTML = '';
    commentLoaderElement.classList.remove('hidden');
    const renderComment = bigPictureComments.slice(0,numb);
    commentCountElement.textContent = `${renderComment.length} из ${bigPictureAllCommentsElement.textContent} комментариев`;
    renderComment.forEach((element) => {
      bigPictureCommentsContainerElement.insertAdjacentHTML('beforeend',
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
      commentLoaderElement.classList.add('hidden');
    }
  };
  makeComment(commentsShown);

  const showComment = () => {
    commentsShown += COMMENTS_PORTION;
    makeComment(commentsShown);
  };
  commentLoaderElement.addEventListener('click', showComment);
};


const onCloseBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  document.body.classList.remove('modal-open');
};

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onCloseBigPicture();
  }
}

picturesSectionElement.addEventListener('click', onOpenBigPicture);
bigPictureCancelElement.addEventListener('click',onCloseBigPicture);
