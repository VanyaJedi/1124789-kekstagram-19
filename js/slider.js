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

      effectLevelValue.value = Math.round(effectLevel * 100);
      effectLevelPin.style.left = Math.round(effectLevel * 100) + '%';
      effectLevelDepth.style.width = Math.round(effectLevel * 100) + '%';

      window.effectLevel = effectLevel;
    };

    document.addEventListener('mousemove', movePinHandler);

    document.addEventListener('mouseup', function () {
      document.removeEventListener('mousemove', movePinHandler);
    });
  });


})();
