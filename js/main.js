'use strict';

var PICTURE_DESCRIPTIONS = ['Описание1', 'Описание2', 'Описание3', 'Описание4', 'Описание5', 'Описание6', 'Описание7'];
var COMMENT_MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var COMMENT_NAMES = ['Артем', 'Иван', 'Андрей', 'Сергей', 'Денис', 'Петр', 'Павел', 'Вероника'];
var ESCAPE_BTN = 'Escape';
var ENTER_BTN = 'Enter';
var pictureTemplate = document.querySelector('#picture').content.firstElementChild;
var pictures = document.querySelector('.pictures');
var bigPicture = document.querySelector('.big-picture');
var closeBigPictureBtn = bigPicture.querySelector('.big-picture__cancel');
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

var photos = generatePhotoObjects(25, COMMENT_MESSAGES, COMMENT_NAMES, PICTURE_DESCRIPTIONS);

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
    var pictureElement = renderPicture(arr[i]);
    pictureElement.setAttribute('data-num', i);
    fragmentPicture.appendChild(pictureElement);
  }
  return fragmentPicture;
};

var appendPicture = function (fragment) {
  pictures.appendChild(fragment);
};

var renderComment = function (commentElement) {
  var commentNode = document.querySelector('.social__comment').cloneNode(true);
  commentNode.querySelector('.social__picture').setAttribute('src', commentElement.avatar);
  commentNode.querySelector('.social__picture').setAttribute('alt', commentElement.name);
  commentNode.querySelector('.social__text').innerText = commentElement.message;
  return commentNode;
};

var generateCommentsFragment = function (arr) {
  var fragmentComments = document.createDocumentFragment();
  var allCommentsNode = document.querySelector('.social__comments').cloneNode();
  for (var i = 0; i < arr.length; i++) {
    allCommentsNode.appendChild(renderComment(arr[i]));
  }
  fragmentComments.appendChild(allCommentsNode);
  return fragmentComments;
};

var showPicture = function (pictureElement) {
  bigPicture.querySelector('.big-picture__img').firstElementChild.setAttribute('src', pictureElement.url);
  bigPicture.querySelector('.likes-count').innerText = pictureElement.likes;
  bigPicture.querySelector('.comments-count').innerText = pictureElement.comments.length;
  bigPicture.querySelector('.social__caption').innerText = pictureElement.description;
  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');
  bigPicture.querySelector('.social__comments').parentNode.replaceChild(generateCommentsFragment(pictureElement.comments), bigPicture.querySelector('.social__comments'));
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

appendPicture(generatePictureFragment(photos));

var showBigPictureHandler = function (evt) {
  if (evt.target.parentNode.classList.contains('picture')) {
    var elementNum = evt.target.parentNode.getAttribute('data-num');
    showPicture(photos[elementNum]);
    document.addEventListener('keydown', closeBigPictureHandler);
  }
};

var showBigPictureEnterHandler = function (evt) {
  var isBigPictureFocused = (document.activeElement.classList.contains('picture'));
  if (evt.key === ENTER_BTN && isBigPictureFocused) {
    var elementNum = document.activeElement.getAttribute('data-num');
    showPicture(photos[elementNum]);
    document.addEventListener('keydown', closeBigPictureHandler);
  }
};

var closeBigPicture = function () {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('click', closeBigPictureHandler);
};

var closeBigPictureHandler = function (evt) {
  var isBigPictureCommentFocused = (document.activeElement === bigPicture.querySelector('.social__footer-text'));
  if (evt.key === ESCAPE_BTN && !isBigPictureCommentFocused) {
    closeBigPicture();
  }
};

closeBigPictureBtn.addEventListener('click', closeBigPicture);

pictures.addEventListener('click', showBigPictureHandler);
document.addEventListener('keydown', showBigPictureEnterHandler);

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
  if (evt.key === ESCAPE_BTN && !isHashtagsFocused && !isCommentFocused) {
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

imgUploadBtn.addEventListener('click', function () {
  hashtags.setCustomValidity(checkHashtags(hashtags.value));
});
