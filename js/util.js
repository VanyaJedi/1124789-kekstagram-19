'use strict';
(function () {
  var PICTURE_DESCRIPTIONS = ['Описание1', 'Описание2', 'Описание3', 'Описание4', 'Описание5', 'Описание6', 'Описание7'];
  var COMMENT_MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  var COMMENT_NAMES = ['Артем', 'Иван', 'Андрей', 'Сергей', 'Денис', 'Петр', 'Павел', 'Вероника'];
  var ESCAPE_BTN = 'Escape';
  var ENTER_BTN = 'Enter';

  var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  var getRandomArrValue = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  var generateComments = function (cnt, messages, names) {
    var comments = [];
    for (var i = 0; i < cnt; i++) {
      var comment = {};
      comment.avatar = 'img/avatar-' + getRandomInt(1, 6) + '.svg';
      comment.message = getRandomArrValue(messages);
      comment.name = getRandomArrValue(names);
      comments.push(comment);
    }
    return comments;
  };

  var generatePhotoObjects = function (cnt, messages, names, descriptions) {
    var photos = [];
    for (var i = 0; i < cnt; i++) {
      var photo = {};
      photo.url = 'photos/' + (i + 1) + '.jpg';
      photo.description = getRandomArrValue(descriptions);
      photo.likes = getRandomInt(15, 200);
      photo.comments = generateComments(getRandomInt(1, 10), messages, names);
      photos.push(photo);
    }
    return photos;
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

  var photos = generatePhotoObjects(25, COMMENT_MESSAGES, COMMENT_NAMES, PICTURE_DESCRIPTIONS);

  window.util = {
    photos: photos,
    ESCAPE_BTN: ESCAPE_BTN,
    ENTER_BTN: ENTER_BTN,
    getRandomInt: getRandomInt,
    getRandomArrValue: getRandomArrValue,
    checkHashtags: checkHashtags,
    removeAllClasses: removeAllClasses
  };

})();
