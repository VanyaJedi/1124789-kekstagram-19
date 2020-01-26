'use strict';

var PICTURE_DESCRIPTIONS = ['Описание1', 'Описание2', 'Описание3', 'Описание4', 'Описание5', 'Описание6', 'Описание7'];
var COMMENT_MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var COMMENT_NAMES = ['Артем', 'Иван', 'Андрей', 'Сергей', 'Денис', 'Петр', 'Павел', 'Вероника'];
var pictureTemplate = document.querySelector('#picture').content.firstElementChild;

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

var renderPicture = function (pictureElement) {
  var pictureNode = pictureTemplate.cloneNode(true);
  pictureNode.querySelector('.picture__img').setAttribute('src', pictureElement.url);
  pictureNode.querySelector('.picture__likes').innerText = pictureElement.likes;
  pictureNode.querySelector('.picture__comments').innerText = pictureElement.comments.length;
  return pictureNode;
};

var generatePictureFragment = function (arr) {
  var fragmentPicture = document.createDocumentFragment();
  for (var i = 0; i < arr.length; i++) {
    fragmentPicture.appendChild(renderPicture(arr[i]));
  }
  return fragmentPicture;
};

var appendPicture = function () {
  document.querySelector('.pictures').appendChild(generatePictureFragment(generatePhotoObjects(25, COMMENT_MESSAGES, COMMENT_NAMES, PICTURE_DESCRIPTIONS)));
};

appendPicture();
