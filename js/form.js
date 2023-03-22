import {isEscapeKey} from './util.js';

const TAG_ERROR_MESSAGE = 'Неверный хэштэг';
const MAX_HASHTAGS_COUNT = 5;
const VALID_TEXT = /^#[a-zа-яё0-9]{1,19}$/i;

const uploadForm = document.querySelector('.img-upload__form');
const uploadFile = document.querySelector('#upload-file');
const uploadFormSection = document.querySelector('.img-upload__overlay');
const uploadFormCancelElement = document.querySelector('#upload-cancel');
const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__wrapper',
  errorTextParent: 'img-upload__wrapper',
  errorTextClass: 'img-upload__wrapper__error',
});

const hasValidCount = (tags) => tags.length <= MAX_HASHTAGS_COUNT;

const hasUniqueTags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const isValidTag = (tag) => VALID_TEXT.test(tag);

const validateHashtags = (value) => {
  const tagsList = value
    .trim()
    .split(' ')
    .filter((tag) => tag.trim().length);
  return hasValidCount(tagsList) && hasUniqueTags(tagsList) && tagsList.every(isValidTag);
};

pristine.addValidator(
  hashtagField,
  validateHashtags,
  TAG_ERROR_MESSAGE
);

const openUploadForm = () => {
  uploadFormSection.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const closeUploadForm = () => {
  uploadFormSection.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  document.body.classList.remove('modal-open');
  uploadForm.reset();
  pristine.reset();
};

const isTextInFocus = () =>
  document.activeElement === hashtagField ||
  document.activeElement === commentField;

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt) && !isTextInFocus()) {
    evt.preventDefault();
    closeUploadForm();
  }
}

uploadFile.addEventListener('change', openUploadForm);
uploadFormCancelElement.addEventListener('click', closeUploadForm);
uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
