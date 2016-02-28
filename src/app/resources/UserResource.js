
(function(){
  'use strict';

  angular.module('ruckApp')
    .factory('UserResource', UserResource);

  UserResource.$inject = ['$resource'];

  function UserResource($resource) {
    var url = 'https://gitlab.com/api/v3';
    return $resource(url + '/users/:id', { id: '@id' }, {
      me: {
        method: 'GET',
        url: url + '/user'
      }
    });
  }

})();
