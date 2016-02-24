
(function(){
  'use strict';

  angular.module('ruckApp')
    .factory('ProjectResource', ProjectResource);

  ProjectResource.$inject = ['$resource'];

  function ProjectResource($resource) {
    var url = 'https://gitlab.com/api/v3/projects';
    return $resource(url+'/:id', null, {
      owned: {
        method: 'GET',
        url: url + '/owned'
      },
      starred: {
        method: 'GET',
        url: url + '/starred'
      },
      all: {
        method: 'GET',
        url: url + '/all'
      }
    });
  }

})();
