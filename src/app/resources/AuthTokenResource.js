

(function(){

  'use strict';

  angular.module('ruckApp')
    .factory('AuthTokenResource', AuthTokenResource);

  AuthTokenResource.$inject = ['$resource'];

  function AuthTokenResource($resource) {
    return $resource('localhost:9001/auth/gitlab', { username: '@username', password: '@password', grant_type: 'password' }, {
      get: {
        method: 'POST',
        withCredentials: true
      }
    });
  }

})()
