(function(){
  'use strict';

  angular.module('ruckApp')
    .factory('IssueResource', IssueResource);

  IssueResource.$inject = ['$resource'];

  function IssueResource($resource) {
    var url = 'https://gitlab.com/api/v3/projects/:id/issues/:issue_id';
    return $resource(url, { id: '@id', issue_id: '@issue_id' }, {
      query: {
        params: { state: 'opened' },
        isArray: true
      },
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
      },
      update: {
        method: 'PUT'
      }
    });
  }

})();
