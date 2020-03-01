'use strict';

(function () {
  var editImgForm = document.querySelector('.img-upload__overlay');
  var effectsList = editImgForm.querySelector('.effects__list');
  var effectLevelPin = editImgForm.querySelector('.effect-level__pin');
  var effectLevelDepth = editImgForm.querySelector('.effect-level__depth');
  var uploadImgForEdit = editImgForm.querySelector('.img-upload__preview img');
  var effectLevel = editImgForm.querySelector('.effect-level');
  var scaleInput = document.querySelector('.scale__control--value');

  var setDefaultFilter = function () {
    uploadImgForEdit.removeAttribute('style');
    window.util.removeAllClasses(uploadImgForEdit);
    effectLevelPin.style.left = '100%';
    effectLevelDepth.style.width = '100%';
    scaleInput.value = '100%';
  };

  var changeFilterHandler = function (evt) {
    setDefaultFilter();
    if (evt.target.value) {
      var classForImg = 'effects__preview--' + evt.target.value;
      uploadImgForEdit.classList.add(classForImg);
    }

    if (evt.target.getAttribute('id') !== 'effect-none') {
      effectLevel.classList.remove('hidden');
    } else {
      effectLevel.classList.add('hidden');
    }
  };

  effectsList.addEventListener('change', function (evt) {
    if (evt.target.classList.contains('effects__radio')) {
      changeFilterHandler(evt);
    }
  });

  var changeValueFilterHandler = function (lvl, val) {
    switch (val) {
      case 'chrome':
        uploadImgForEdit.style.filter = 'grayscale(' + lvl + ')';
        break;
      case 'sepia':
        uploadImgForEdit.style.filter = 'sepia(' + lvl + ')';
        break;
      case 'marvin':
        uploadImgForEdit.style.filter = 'invert(' + lvl * 100 + '%)';
        break;
      case 'phobos':
        uploadImgForEdit.style.filter = 'blur(' + lvl * 3 + 'px)';
        break;
      case 'heat':
        uploadImgForEdit.style.filter = 'brightness(' + lvl * 3 + ')';
        break;
    }
  };

  window.filter = {
    changeValueFilterHandler: changeValueFilterHandler,
    setDefaultFilter: setDefaultFilter
  };

})();
