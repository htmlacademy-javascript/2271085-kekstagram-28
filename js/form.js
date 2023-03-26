import { resetEffect } from './effects.js';
import { resetScale } from './scale.js';
import {isEscapeKey} from './util.js';

const ERROR_MESSAGE_VALID_TAG = 'Хэштэг не может быть одной #, должен начинаться с # и быть не больше 20 символов';
const ERROR_MESSAGE_TAG_COUNT = 'Должно быть не более 5 хэштэгов';
const ERROR_MESSAGE_UNIQUE_TAG = 'Хэштэги должны быть уникальными';
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

let tagsList;
const makeTaglist = (value) => {
  tagsList = value
    .trim()
    .split(' ')
    .filter((tag) => tag.trim().length);
  return tagsList;
};

const validateUniqueHashtags = (value) => {
  makeTaglist(value,tagsList);
  return hasUniqueTags(tagsList);
};

const validateCountHashtags = (value) => {
  makeTaglist(value,tagsList);
  return hasValidCount(tagsList);
};

const validateValidHashtags = (value) => {
  makeTaglist(value,tagsList);
  return tagsList.every(isValidTag);
};

pristine.addValidator(
  hashtagField,
  validateUniqueHashtags,
  ERROR_MESSAGE_UNIQUE_TAG
);

pristine.addValidator(
  hashtagField,
  validateCountHashtags,
  ERROR_MESSAGE_TAG_COUNT
);

pristine.addValidator(
  hashtagField,
  validateValidHashtags,
  ERROR_MESSAGE_VALID_TAG
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
  resetScale();
  resetEffect();
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
