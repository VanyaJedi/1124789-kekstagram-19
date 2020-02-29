'use strict';

(function () {

  var form = document.querySelector('.img-upload__form');
  var formBtn = document.querySelector('.img-upload__submit');
  var inputUpload = form.querySelector('.img-upload__input');
  var uploadFile = document.getElementById('upload-file');
  var editImgForm = document.querySelector('.img-upload__overlay');
  var closeImgFormBtn = editImgForm.querySelector('.img-upload__cancel');
  var hashtags = editImgForm.querySelector('.text__hashtags');
  var commentTextarea = editImgForm.querySelector('.text__description');
  var successMessageTemplate = document.querySelector('#success').content.firstElementChild;
  var errorMessageTemplate = document.querySelector('#error').content.firstElementChild;
  var originalFilter = document.getElementById('effect-none');

  var openImgForm = function () {
    editImgForm.classList.remove('hidden');
    document.body.classList.add('modal-open');
  };

  var closeImgForm = function () {
    editImgForm.classList.add('hidden');
    document.body.classList.remove('modal-open');
    inputUpload.value = '';
    hashtags.value = '';
    commentTextarea.value = '';
    window.filter.setDefaultFilter();
    originalFilter.checked = true;
  };

  var closeImgFormKeyEscHandler = function (evt) {
    var isHashtagsFocused = (document.activeElement === hashtags);
    var isCommentFocused = (document.activeElement === commentTextarea);
    if (evt.key === window.util.ESCAPE_BTN && !isHashtagsFocused && !isCommentFocused) {
      hideAndBackToDefaultFrom();
    }
  };

  uploadFile.addEventListener('change', function () {
    openImgForm();
    document.addEventListener('keydown', closeImgFormKeyEscHandler);
  });

  closeImgFormBtn.addEventListener('click', closeImgForm);

  var removeSuccesMessage = function (evt) {
    if (evt.target.classList.contains('success__button') || evt.target.classList.contains('success')) {
      document.querySelector('main').removeChild(successMessageTemplate);
      successMessageTemplate.removeEventListener('click', removeSuccesMessage);
    }
  };

  var removeEscMessage = function (evt) {
    if (evt.key === window.util.ESCAPE_BTN) {
      document.querySelector('main').removeChild(successMessageTemplate);
      document.removeEventListener('keydown', removeEscMessage);
    }
  };

  var removeErrorMessage = function (evt) {
    if (evt.target.classList.contains('error__button') || evt.target.classList.contains('error')) {
      document.querySelector('main').removeChild(errorMessageTemplate);
      successMessageTemplate.removeEventListener('click', removeErrorMessage);
    }
  };

  var removeEscMessageError = function (evt) {
    if (evt.key === window.util.ESCAPE_BTN) {
      document.querySelector('main').removeChild(errorMessageTemplate);
      document.removeEventListener('keydown', removeEscMessageError);
    }
  };

  var showSuccessMessage = function () {
    document.querySelector('main').appendChild(successMessageTemplate);
    successMessageTemplate.addEventListener('click', removeSuccesMessage);
    document.addEventListener('keydown', removeEscMessage);
  };

  var showErrorMessage = function () {
    document.querySelector('main').appendChild(errorMessageTemplate);
    errorMessageTemplate.addEventListener('click', removeErrorMessage);
    document.addEventListener('keydown', removeEscMessageError);
  };

  var hideAndBackToDefaultFrom = function () {
    closeImgForm();
    hashtags.value = '';
    commentTextarea.value = '';
    originalFilter.click();
  };

  var sendData = function () {
    closeImgForm();
    showSuccessMessage();
  };

  var errorSendData = function () {
    closeImgForm();
    showErrorMessage();
  };

  formBtn.addEventListener('click', function () {
    hashtags.setCustomValidity(window.util.checkHashtags(hashtags.value));
  });

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    hashtags.setCustomValidity(window.util.checkHashtags(hashtags.value));
    window.backend.save(new FormData(form), sendData, errorSendData);
  });
})();
