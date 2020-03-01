'use strict';

(function () {
  var ESCAPE_BTN = 'Escape';
  var ENTER_BTN = 'Enter';
  var URL = 'https://js.dump.academy/kekstagram/data';
  var URL_SEND = 'https://js.dump.academy/kekstagram';

  var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  var checkHashtags = function (value) {
    var checkArray = [];
    if (value === '' || value === null) {
      return '';
    }
    var hashArray = value.split(/\s+/);
    if (hashArray.length > 5) {
      return 'Допускается не более 5 хештегов';
    }

    for (var i = 0; i < hashArray.length; i++) {
      var checkValue = hashArray[i].match(/^#[\wа-яА-я]+/) || [];

      if (hashArray[i] !== checkValue[0]) {
        return 'Хештег не может содержать пробелы и спецсимволы (#, @, $ и т.п.)';
      }
      if (hashArray[i].length > 20) {
        return 'Максимальная длина хештега 20 символов';
      }

      if (checkArray.includes(hashArray[i].toLowerCase())) {
        return 'Имеются повторяющиеся хештеги';
      } else {
        checkArray.push(hashArray[i].toLowerCase());
      }
    }
    return '';
  };


  var removeAllClasses = function (elem) {
    for (var i = 0; i < elem.classList.length; i++) {
      elem.classList.remove(elem.classList[i]);
    }
  };


  window.util = {
    ESCAPE_BTN: ESCAPE_BTN,
    ENTER_BTN: ENTER_BTN,
    getRandomInt: getRandomInt,
    checkHashtags: checkHashtags,
    removeAllClasses: removeAllClasses,
    URL: URL,
    URL_SEND: URL_SEND
  };

})();
