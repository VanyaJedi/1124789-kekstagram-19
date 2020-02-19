'use strict';

(function () {

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

  window.arraySort = {
    randomPhotos: randomPhotos,
    sortPhotos: sortPhotos
  };


})();
