'use strict';

(function () {

  var pictures = document.querySelector('.pictures');
  var bigPicture = document.querySelector('.big-picture');
  var closeBigPictureBtn = bigPicture.querySelector('.big-picture__cancel');
  var pictureTemplate = document.querySelector('#picture').content.firstElementChild;

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

  var showData = function (data) {
    appendPicture(generatePictureFragment(data));
  };

  window.backend.load(showData);

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

  var showBigPictureHandler = function (evt) {
    if (evt.target.parentNode.classList.contains('picture')) {
      var elementNum = evt.target.parentNode.getAttribute('data-num');
      showPicture(window.backend.serverResponse[elementNum]);
      document.addEventListener('keydown', closeBigPictureHandler);
    }
  };

  var showBigPictureEnterHandler = function (evt) {
    var isBigPictureFocused = (document.activeElement.classList.contains('picture'));
    if (evt.key === window.util.ENTER_BTN && isBigPictureFocused) {
      var elementNum = document.activeElement.getAttribute('data-num');
      showPicture(window.serverResponse[elementNum]);
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
    if (evt.key === window.util.ESCAPE_BTN && !isBigPictureCommentFocused) {
      closeBigPicture();
    }
  };

  closeBigPictureBtn.addEventListener('click', closeBigPicture);

  pictures.addEventListener('click', showBigPictureHandler);
  document.addEventListener('keydown', showBigPictureEnterHandler);
})();
