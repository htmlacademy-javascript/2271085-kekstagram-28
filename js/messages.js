import {onDocumentKeydown} from './form.js';

const successMessageTemplateElement = document.querySelector('#success')
  .content
  .querySelector('.success');

const errorMessageTemplateElement = document.querySelector('#error')
  .content
  .querySelector('.error');

const closeSuccessMessage = () => {
  const successElement = document.querySelector('.success');
  const successCloseElement = successElement.querySelector('.success__button');
  successCloseElement.removeEventListener('click',closeSuccessMessage);
  document.removeEventListener('keydown',onDocumentKeydown);
  successElement.remove();
};

function clickOutOfSuccessMessage (evt) {
  if (!evt.target.closest('.success__inner')){
    closeSuccessMessage();
  }
}

const showSuccessMessage = () => {
  const successMessageElement = successMessageTemplateElement.cloneNode(true);
  document.body.appendChild(successMessageElement);

  const successElement = document.querySelector('.success');
  const successCloseElement = successElement.querySelector('.success__button');
  successCloseElement.addEventListener('click', closeSuccessMessage);
  document.addEventListener('keydown',onDocumentKeydown);
  successElement.addEventListener('click',clickOutOfSuccessMessage);
};

const closeErrorMessage = () => {
  const errorElement = document.querySelector('.error');
  const errorCloseElement = errorElement.querySelector('.error__button');
  errorCloseElement.removeEventListener('click',closeErrorMessage);
  removeEventListener('keydown', onDocumentKeydown);
  errorElement.remove();
};

function clickOutOfErrorMessage (evt) {
  if (!evt.target.closest('.error__inner')){
    closeErrorMessage();
  }
}

const showErrorMessage = () => {
  const errorMessage = errorMessageTemplateElement.cloneNode(true);
  document.body.appendChild(errorMessage);
  const errorElement = document.querySelector('.error');
  const errorCloseElement = errorElement.querySelector('.error__button');
  errorCloseElement.addEventListener('click', closeErrorMessage);
  document.addEventListener('keydown',onDocumentKeydown);
  errorElement.addEventListener('click',clickOutOfErrorMessage);
};

export {showSuccessMessage,showErrorMessage,closeErrorMessage,closeSuccessMessage};
