'use strict';

(function () {

  var editImgForm = document.querySelector('.img-upload__overlay');
  var effectLevelPin = editImgForm.querySelector('.effect-level__pin');
  var effectLevelValue = editImgForm.querySelector('.effect-level__value');
  var effectLevelDepth = editImgForm.querySelector('.effect-level__depth');

  function getCoords(elem) {
    var box = elem.getBoundingClientRect();

    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };
  }

  effectLevelPin.addEventListener('mousedown', function (evt) {
    var totalWidth = getComputedStyle(evt.target.parentNode).width;
    var effectLeft = getCoords(evt.target.parentNode).left;
    var effectLevel;

    var movePinHandler = function (moveEvt) {
      var pinPos = moveEvt.clientX - effectLeft;
      if (pinPos < 0) {
        effectLevel = 0;
      } else if (pinPos > parseInt(totalWidth, 10)) {
        effectLevel = 1;
      } else {
        effectLevel = pinPos / parseInt(totalWidth, 10);
      }

      var effectLevelRounded = Math.round(effectLevel * 100);

      effectLevelValue.value = effectLevelRounded;
      effectLevelPin.style.left = effectLevelRounded + '%';
      effectLevelDepth.style.width = effectLevelRounded + '%';
      var effectValue = document.querySelector('#upload-select-image .effects__radio:checked').value;
      window.filter.changeValueFilterHandler(effectLevel, effectValue);
    };

    document.addEventListener('mousemove', movePinHandler);

    document.addEventListener('mouseup', function () {
      document.removeEventListener('mousemove', movePinHandler);
    });
  });


})();
