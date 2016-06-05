'use strict';

angular.module('ruckApp')
  .directive('story', function () {
    return {
      templateUrl: 'app/components/story/story.html',
      restrict: 'AE',
      controller: 'StoryController',
      controllerAs: 'vm',
      scope: {
        issue: '=ngModel',
        users: '=',
        project: '='
      }
    };
  });
