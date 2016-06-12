'use strict';

angular.module('ruckApp')
  .directive('mention', function($compile) {
    return {
      templateUrl: 'app/components/mention/mention.html',
      restrict: 'E',
      controller: 'MentionController',
      controllerAs: 'vm',
      scope: {
        model: '=ngModel',
        placeholder: '@'
      }
    };
  });
