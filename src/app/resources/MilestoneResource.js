(function(){
  'use strict';

  angular.module('ruckApp')
    .factory('MilestoneResource', MilestoneResource);

  MilestoneResource.$inject = ['$resource'];

  function MilestoneResource($resource) {
    var url = 'https://gitlab.com/api/v3/projects/:project_id/milestones';
    return $resource(url, { project_id: '@project_id' }, {
      query: {
        params: { state: 'active' },
        isArray: true,
        cached: true
      }
    });
  }

})();
