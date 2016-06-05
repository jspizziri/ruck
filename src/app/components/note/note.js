'use strict';

angular.module('ruckApp')
  .directive('note', function () {
    return {
      templateUrl: 'app/components/note/note.html',
      restrict: 'AE',
      controller: 'NoteController',
      controllerAs: 'vm',
      scope: {
        issue: '='
      }
    };
  });
