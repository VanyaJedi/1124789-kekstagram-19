'use strict';

(function () {

  var uploadFile = document.getElementById('upload-file');
  var editImgForm = document.querySelector('.img-upload__overlay');
  var closeImgFormBtn = editImgForm.querySelector('.img-upload__cancel');
  var effectLevelPin = editImgForm.querySelector('.effect-level__pin');
  var effectLevelValue = editImgForm.querySelector('.effect-level__value');
  var effectLevelDepth = editImgForm.querySelector('.effect-level__depth');
  var effectsList = editImgForm.querySelector('.effects__list');
  var hashtags = editImgForm.querySelector('.text__hashtags');
  var commentTextarea = editImgForm.querySelector('.text__description');
  var imgUploadBtn = editImgForm.querySelector('.img-upload__submit');

  var openImgForm = function () {
    editImgForm.classList.remove('hidden');
    document.body.classList.add('modal-open');
  };

  var closeImgForm = function () {
    editImgForm.classList.add('hidden');
    document.body.classList.remove('modal-open');
    editImgForm.value = '';
  };

  var closeImgFormKeyEscHandler = function (evt) {
    var isHashtagsFocused = (document.activeElement === hashtags);
    var isCommentFocused = (document.activeElement === commentTextarea);
    if (evt.key === window.util.ESCAPE_BTN && !isHashtagsFocused && !isCommentFocused) {
      closeImgForm();
    }
  };

  uploadFile.addEventListener('change', function () {
    openImgForm();
    document.addEventListener('keydown', closeImgFormKeyEscHandler);
  });

  closeImgFormBtn.addEventListener('click', closeImgForm);

  effectLevelPin.addEventListener('mouseup', function (evt) {
    var totalWidth = getComputedStyle(evt.target.parentNode).width;
    var pinPos = evt.target.offsetLeft;
    var effectLevel = pinPos / parseInt(totalWidth, 10);
    effectLevelValue.value = Math.round(effectLevel * 100);
    effectLevelDepth.style.width = Math.round(effectLevel * 100) + '%';
  });

  imgUploadBtn.addEventListener('click', function () {
    hashtags.setCustomValidity(window.util.checkHashtags(hashtags.value));
  });
})();
