'use strict';

(function () {
  var editImgForm = document.querySelector('.img-upload__overlay');
  var effectsList = editImgForm.querySelector('.effects__list');
  var effectInputs = effectsList.querySelectorAll('.effects__radio');
  var effectLevelPin = editImgForm.querySelector('.effect-level__pin');
  var effectLevelDepth = editImgForm.querySelector('.effect-level__depth');
  var uploadImgForEdit = editImgForm.querySelector('.img-upload__preview img');


  var changeFilterHandler = function (evt) {
    uploadImgForEdit.removeAttribute('style');
    window.util.removeAllClasses(uploadImgForEdit);
    effectLevelPin.style.left = '100%';
    effectLevelDepth.style.width = '100%';

    if (evt.target.value) {
      var classForImg = 'effects__preview--' + evt.target.value;
      uploadImgForEdit.classList.add(classForImg);
    }
  };

  effectsList.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('effects__radio')) {
      changeFilterHandler(evt);
    }
  });

  var changeValueFilterHandler = function (lvl) {
    if (uploadImgForEdit.classList.contains('effects__preview--chrome')) {
      uploadImgForEdit.style.filter = 'grayscale(' + lvl + ')';
    } else if (uploadImgForEdit.classList.contains('effects__preview--sepia')) {
      uploadImgForEdit.style.filter = 'sepia(' + lvl + ')';
    } else if (uploadImgForEdit.classList.contains('effects__preview--marvin')) {
      uploadImgForEdit.style.filter = 'invert(' + lvl * 100 + '%)';
    } else if (uploadImgForEdit.classList.contains('effects__preview--phobos')) {
      uploadImgForEdit.style.filter = 'blur(' + lvl * 3 + 'px)';
    } else if (uploadImgForEdit.classList.contains('effects__preview--heat')) {
      uploadImgForEdit.style.filter = 'brightness(' + lvl * 3 + ')';
    }
  };

  window.changeValueFilterHandler = changeValueFilterHandler;

})();