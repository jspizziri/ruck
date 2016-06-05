/**
 * @ngdoc function
 * @name ruckApp.controller:NoteController
 * @description
 * # NoteController
 * Controller of the ruckApp
 */
(function() {
  'use strict';

  angular
    .module('ruckApp')
    .controller('NoteController', NoteController);

  NoteController.$inject = ['$filter', '$scope', '$timeout', 'NoteResource', 'UserResource'];

  /** @ngInject */
  function NoteController($filter, $scope, $timeout, NoteResource, UserResource) {
    var vm = this;
    vm.issue = $scope.issue;
    vm.project = $scope.project;
    vm.tickInterval = 1000;

    vm.notes = NoteResource.query({ project_id: vm.issue.project_id, issue_id: vm.issue.id });
    vm.me = UserResource.me();

    // timer
    vm.now = 'loading...';
    vm.tick = function(){
      vm.now = new Date();
      $timeout(vm.tick, vm.tickInterval);
    }

    $timeout(vm.tick, vm.tickInterval);


    vm.saveNote = function(body){
      vm.newNote.body = null;

      NoteResource.save({
        project_id: vm.issue.project_id,
        issue_id: vm.issue.id,
        body: body,
        created_at: vm.now
      }).$promise
        .then(function(result){
          vm.notes.push(result);
        });
    }
  }
})();
