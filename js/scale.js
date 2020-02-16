'use strict';

(function () {

  var scaleUp = document.querySelector('.scale__control--bigger');
  var scaleDown = document.querySelector('.scale__control--smaller');
  var scaleInput = document.querySelector('.scale__control--value');
  var uploadImgForEdit = document.querySelector('.img-upload__preview img');

  scaleUp.addEventListener('click', function () {
    var currentValue = parseInt(scaleInput.value, 10);
    var nextValue = (currentValue + 25) > 100 ? 100 : (currentValue + 25);
    scaleInput.value = nextValue + '%';
    var scale = nextValue / 100;
    uploadImgForEdit.style.transform = 'scale(' + scale + ')';
  });

  scaleDown.addEventListener('click', function () {
    var currentValue = parseInt(scaleInput.value, 10);
    var nextValue = (currentValue - 25) < 0 ? 0 : (currentValue - 25);
    scaleInput.value = nextValue + '%';
    var scale = nextValue / 100;
    uploadImgForEdit.style.transform = 'scale(' + scale + ')';
  });

  scaleInput.addEventListener('input', function () {
    var scale = parseInt(scaleInput.value, 10) / 100;
    uploadImgForEdit.style.transform = 'scale(' + scale + ')';
  });

})();
