'use strict';

angular.module('ruckApp')
  .directive('story', function () {
    return {
      templateUrl: 'app/components/story/story.html',
      restrict: 'E',
      controller: 'StoryController',
      controllerAs: 'vm',
      scope: {
        issue: '=ngModel',
        users: '=',
        list: '=',
        project: '='
      }
    };
  });
