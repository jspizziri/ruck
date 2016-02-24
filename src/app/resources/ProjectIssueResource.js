(function(){
  'use strict';

  angular.module('ruckApp')
    .factory('ProjectIssueResource', ProjectIssueResource);

  ProjectIssueResource.$inject = ['$resource'];

  function ProjectIssueResource($resource) {
    var url = 'https://gitlab.com/api/v3/projects/:id/issues';
    return $resource(url, { state: 'opened' }, {
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
