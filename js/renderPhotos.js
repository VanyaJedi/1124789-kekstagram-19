'use strict';

(function () {
  var pictures = document.querySelector('.pictures');
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

  window.appendPicture = function (fragment) {
    pictures.appendChild(generatePictureFragment(fragment));
  };

})();
