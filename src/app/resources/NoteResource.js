(function(){
  'use strict';

  angular.module('ruckApp')
    .factory('NoteResource', NoteResource);

  NoteResource.$inject = ['$resource'];

  function NoteResource($resource) {
    var url = 'https://gitlab.com/api/v3/projects/:project_id/issues/:issue_id/notes/:note_id';
    return $resource(url, { project_id: '@project_id', issue_id: '@issue_id', note_id: '@note_id' }, {
      query: {
        isArray: true
      }
    });
  }

})();
