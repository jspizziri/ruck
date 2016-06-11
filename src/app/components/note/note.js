'use strict';

angular.module('ruckApp')
  .directive('note', function () {
    return {
      templateUrl: 'app/components/note/note.html',
      restrict: 'E',
      controller: 'NoteController',
      controllerAs: 'vm',
      scope: {
        issue: '=',
        project: '='
      }
    };
  });
