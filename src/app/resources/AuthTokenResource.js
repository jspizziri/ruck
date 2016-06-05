

(function(){

  'use strict';

  angular.module('ruckApp')
    .factory('AuthTokenResource', AuthTokenResource);

  AuthTokenResource.$inject = ['$resource'];

  function AuthTokenResource($resource) {

    return $resource('https://gitlab.com/api/v3/session', {}, {
      get: {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        transformRequest: function(data, headersGetter) {
          var str = [];
          for (var d in data)
            str.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
          return str.join("&");
        }
      }
    });
  }

})()
