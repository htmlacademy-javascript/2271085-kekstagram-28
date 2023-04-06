import { resetEffect } from './effects.js';
import { resetScale } from './scale.js';
import {isEscapeKey, showAlert} from './util.js';
import {sendData} from './api.js';
import {showSuccessMessage,showErrorMessage,closeErrorMessage,closeSuccessMessage} from './messages.js';

const SubmitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
};

const ERROR_MESSAGE_VALID_TAG = 'Хэштэг не может быть одной #, должен начинаться с # и быть не больше 20 символов';
const ERROR_MESSAGE_TAG_COUNT = 'Должно быть не более 5 хэштэгов';
const ERROR_MESSAGE_UNIQUE_TAG = 'Хэштэги должны быть уникальными';
const MAX_HASHTAGS_COUNT = 5;
const VALID_TEXT = /^#[a-zа-яё0-9]{1,19}$/i;
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const uploadForm = document.querySelector('.img-upload__form');
const uploadFileElement = document.querySelector('#upload-file');
const uploadFormSectionElement = document.querySelector('.img-upload__overlay');
const uploadFormCancelElement = document.querySelector('#upload-cancel');
const hashtagFieldElement = document.querySelector('.text__hashtags');
const commentFieldElement = document.querySelector('.text__description');
const submitButton = document.querySelector('.img-upload__submit');
const previewElement = document.querySelector('.img-upload__preview img');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__wrapper-error',
});

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

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
  hashtagFieldElement,
  validateUniqueHashtags,
  ERROR_MESSAGE_UNIQUE_TAG
);

pristine.addValidator(
  hashtagFieldElement,
  validateCountHashtags,
  ERROR_MESSAGE_TAG_COUNT
);

pristine.addValidator(
  hashtagFieldElement,
  validateValidHashtags,
  ERROR_MESSAGE_VALID_TAG
);

const openUploadForm = () => {
  uploadFormSectionElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);

  const file = uploadFileElement.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    previewElement.src = URL.createObjectURL(file);
  } else {
    showAlert('Вы должны выбрать файл jpg, jpeg или png');
  }
};

const closeUploadForm = () => {
  uploadFormSectionElement.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  document.body.classList.remove('modal-open');
  uploadForm.reset();
  pristine.reset();
  resetScale();
  resetEffect();
};

const isTextInFocus = () =>
  document.activeElement === hashtagFieldElement ||
  document.activeElement === commentFieldElement;

function onDocumentKeydown (evt) {
  if (document.querySelector('.error')){
    evt.preventDefault();
    closeErrorMessage();
    return;
  }
  if (document.querySelector('.success')){
    evt.preventDefault();
    closeSuccessMessage();
    return;
  }
  if (isEscapeKey(evt) && !isTextInFocus()) {
    evt.preventDefault();
    closeUploadForm();
  }
}

uploadFileElement.addEventListener('change', openUploadForm);
uploadFormCancelElement.addEventListener('click', closeUploadForm);


const setUserFormSubmit = (onSuccess) => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if(isValid){
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(onSuccess)
        .then (showSuccessMessage)
        .catch(showErrorMessage)
        .finally(unblockSubmitButton);
    }
  });
};
setUserFormSubmit(closeUploadForm);

export {onDocumentKeydown};
