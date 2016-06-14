'use strict';

angular.module('ruckApp')
  .directive('milestoneLink', function() {
    return {
      restrict: 'A',
      controller: function($scope, _,  MilestoneResource) {
        MilestoneResource.query({ project_id: $scope.project.id }, { cached: true }).$promise
          .then(function(milestones){
            var url = $scope.project.web_url + '/milestones/';
            var milestone = _.find(milestones, { 'title': $scope.model });

            if(milestone) url += milestone.iid;

            $scope.url = url;
          });
      },
      scope: {
        model: '=milestoneLink',
        project: '='
      },
      template: '<a target="_blank" href="{{ url }}">{{ model }}</a>'
    };
  });
