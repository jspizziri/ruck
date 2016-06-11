'use strict';

angular.module('ruckApp')
  .directive('list', function () {
    return {
      templateUrl: 'app/components/list/list.html',
      restrict: 'E',
      controller: 'ListController',
      controllerAs: 'vm',
      scope: {
        list: '=',
        lists: '=',
        project: '=',
        users: '=',
        allowNewIssues: '='
      }
    };
  });
