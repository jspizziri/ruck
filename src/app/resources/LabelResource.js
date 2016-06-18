(function(){
  'use strict';

  angular.module('ruckApp')
    .factory('LabelResource', LabelResource);

  LabelResource.$inject = ['$resource'];

  function LabelResource($resource) {
    var url = 'https://gitlab.com/api/v3/projects/:project_id/labels';
    return $resource(url, { project_id: '@project_id' }, {
      query: {
        isArray: true
      }
    });
  }

})();
