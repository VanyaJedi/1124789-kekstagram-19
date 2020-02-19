'use strict';

(function () {
  var filterBlock = document.querySelector('.img-filters__form');
  var filterButtons = filterBlock.querySelectorAll('.img-filters__button');

  var deletePictures = function () {
    var picturesList = document.querySelectorAll('.picture');
    for (var i = 0; i < picturesList.length; i++) {
      picturesList[i].remove();
    }
  };

  var randomPhotos = function (array) {
    var randomArray = [];
    for (var i = 0; i < 10; i++) {
      var indexElem = window.util.getRandomInt(0, array.length);
      randomArray.push(array[indexElem]);
      array.splice(indexElem, 1);
    }
    return randomArray;
  };

  var sortPhotos = function (array) {
    return array.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
  };

  var defaultPhotos = function () {
    return window.backend.serverResponse;
  };

  var changeFilter = function (cb) {
    var arrayCopy = window.backend.serverResponse.slice();
    var data = cb(arrayCopy);
    deletePictures();
    window.appendPicture(data);
  };


  var makeActiveBtn = function (evt) {
    for (var i = 0; i < filterButtons.length; i++) {
      filterButtons[i].classList.remove('img-filters__button--active');
    }
    evt.target.classList.add('img-filters__button--active');
  };

  filterBlock.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('img-filters__button') && !evt.target.classList.contains('img-filters__button--active')) {
      var filterType = evt.target.getAttribute('id');
      switch (filterType) {
        case 'filter-random':
          window.debounce(changeFilter(randomPhotos));
          break;
        case 'filter-discussed':
          window.debounce(changeFilter(sortPhotos));
          break;
        default:
          window.debounce(changeFilter(defaultPhotos));
          break;
      }
      makeActiveBtn(evt);
    }
  });
})();
