'use strict';

(function () {

  var RESPONSE_TYPE = 'json';
  var RESPONSE_STATUS_SUCCESS = 200;


  var responseToServer = function (url, type, data, timeout, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = RESPONSE_TYPE;

    xhr.addEventListener('load', function () {
      if (xhr.status === RESPONSE_STATUS_SUCCESS) {
        onLoad(xhr.response);
      } else if (onError) {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    if (onError) {
      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });
    }

    xhr.timeout = timeout;

    xhr.open(type, url);
    xhr.send(data || {});
  };

  window.backend = {
    responseToServer: responseToServer
  };
})();
