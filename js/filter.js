'use strict';

(function () {
  var editImgForm = document.querySelector('.img-upload__overlay');
  var effectsList = editImgForm.querySelector('.effects__list');
  var effectInputs = effectsList.querySelectorAll('.effects__radio');
  var effectLevelPin = editImgForm.querySelector('.effect-level__pin');
  var effectLevelDepth = editImgForm.querySelector('.effect-level__depth');
  var uploadImgForEdit = editImgForm.querySelector('.img-upload__preview img');


  var changeFilterHandler = function () {
    uploadImgForEdit.removeAttribute('style');
    window.util.removeAllClasses(uploadImgForEdit);
    effectLevelPin.style.left = '100%';
    effectLevelDepth.style.width = '100%';

    if (this.value) {
      var classForImg = 'effects__preview--' + this.value;
      uploadImgForEdit.classList.add(classForImg);
    }
  };

  for (var i = 0; i < effectInputs.length; i++) {
    effectInputs[i].addEventListener('change', changeFilterHandler);
  }


  effectLevelPin.addEventListener('mousedown', function () {

    var changeValueFilterHandler = function () {
      if (uploadImgForEdit.classList.contains('effects__preview--chrome')) {
        uploadImgForEdit.style.filter = 'grayscale(' + window.effectLevel + ')';
      } else if (uploadImgForEdit.classList.contains('effects__preview--sepia')) {
        uploadImgForEdit.style.filter = 'sepia(' + window.effectLevel + ')';
      } else if (uploadImgForEdit.classList.contains('effects__preview--marvin')) {
        uploadImgForEdit.style.filter = 'invert(' + window.effectLevel * 100 + '%)';
      } else if (uploadImgForEdit.classList.contains('effects__preview--phobos')) {
        uploadImgForEdit.style.filter = 'blur(' + window.effectLevel * 3 + 'px)';
      } else if (uploadImgForEdit.classList.contains('effects__preview--heat')) {
        uploadImgForEdit.style.filter = 'brightness(' + window.effectLevel * 3 + ')';
      }
    };

    document.addEventListener('mousemove', changeValueFilterHandler);
    document.addEventListener('mouseup', function () {
      document.removeEventListener('mousemove', changeValueFilterHandler);
    });
  });

})();
