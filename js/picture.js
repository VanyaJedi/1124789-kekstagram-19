'use strict';

(function () {

  var pictures = document.querySelector('.pictures');
  var bigPicture = document.querySelector('.big-picture');
  var closeBigPictureBtn = bigPicture.querySelector('.big-picture__cancel');
  var filterPhotos = document.querySelector('.img-filters');
  var COMMENTS_SHOW = 5;

  var showData = function (data) {
    window.backend.serverResponse = data;
    window.backend.filterPictures = data;
    window.appendPicture(data);
    filterPhotos.classList.remove('img-filters--inactive');
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
    var len = arr.length > COMMENTS_SHOW ? COMMENTS_SHOW : arr.length;
    var fragmentComments = document.createDocumentFragment();
    var allCommentsNode = document.querySelector('.social__comments').cloneNode();
    for (var i = 0; i < len; i++) {
      allCommentsNode.appendChild(renderComment(arr[i]));
    }
    fragmentComments.appendChild(allCommentsNode);
    arr.splice(0, len);
    return fragmentComments;
  };

  var showPicture = function (pictureElement) {
    bigPicture.querySelector('.comments-loader').removeEventListener('click', insertMoreComments);
    var commentsArray = pictureElement.comments.slice();
    bigPicture.querySelector('.big-picture__img').firstElementChild.setAttribute('src', pictureElement.url);
    bigPicture.querySelector('.likes-count').innerText = pictureElement.likes;
    bigPicture.querySelector('.comments-count-show').innerText = COMMENTS_SHOW > pictureElement.comments.length ? pictureElement.comments.length : COMMENTS_SHOW;
    bigPicture.querySelector('.comments-count').innerText = pictureElement.comments.length;
    bigPicture.querySelector('.social__caption').innerText = pictureElement.description;
    if (pictureElement.comments.length > COMMENTS_SHOW) {
      bigPicture.querySelector('.comments-loader').classList.remove('hidden');
    } else {
      bigPicture.querySelector('.comments-loader').classList.add('hidden');
    }
    bigPicture.querySelector('.social__comments').parentNode.replaceChild(generateCommentsFragment(commentsArray), bigPicture.querySelector('.social__comments'));
    bigPicture.classList.remove('hidden');
    document.body.classList.add('modal-open');

    var insertMoreComments = function () {
      var len = commentsArray.length > COMMENTS_SHOW ? COMMENTS_SHOW : commentsArray.length;
      for (var i = 0; i < len; i++) {
        bigPicture.querySelector('.social__comments').appendChild(renderComment(commentsArray[i]));
      }
      bigPicture.querySelector('.comments-count-show').innerText = +bigPicture.querySelector('.comments-count-show').innerText + len;
      commentsArray.splice(0, len);
      if (commentsArray.length === 0) {
        bigPicture.querySelector('.comments-loader').removeEventListener('click', insertMoreComments);
        bigPicture.querySelector('.comments-loader').classList.add('hidden');
      }
    };

    bigPicture.querySelector('.comments-loader').addEventListener('click', insertMoreComments);
  };

  var showBigPictureHandler = function (evt) {
    if (evt.target.parentNode.classList.contains('picture')) {
      var elementNum = evt.target.parentNode.getAttribute('data-num');
      showPicture(window.backend.filterPictures[elementNum]);
      document.addEventListener('keydown', closeBigPictureHandler);
    }
  };

  var showBigPictureEnterHandler = function (evt) {
    var isBigPictureFocused = (document.activeElement.classList.contains('picture'));
    if (evt.key === window.util.ENTER_BTN && isBigPictureFocused) {
      var elementNum = document.activeElement.getAttribute('data-num');
      showPicture(window.backend.filterPictures[elementNum]);
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
