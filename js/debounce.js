'use strict';
(function () {
  var DEBOUNCE_INTERVAL = 500; // ms

  window.debounce = function debounce(f, ms) {

    let isCooldown = false;

    return function() {
      if (isCooldown) return;

      f.apply(this, arguments);

      isCooldown = true;

      setTimeout(() => isCooldown = false, DEBOUNCE_INTERVAL);
    };

  };
})();
