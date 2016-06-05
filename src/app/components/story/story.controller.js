/**
 * @ngdoc function
 * @name ruckApp.controller:StoryController
 * @description
 * # StoryController
 * Controller of the ruckApp
 */
(function() {
  'use strict';

  angular
    .module('ruckApp')
    .controller('StoryController', StoryController);

  StoryController.$inject = ['$scope', 'IssueService'];

  /** @ngInject */
  function StoryController($scope, IssueService) {
    var vm = this;
    vm.issue = $scope.issue;
    vm.users = $scope.users;

    vm.points = IssueService.getPoints();
    vm.stages = IssueService.getStages();
    vm.types = IssueService.getTypes();


    vm.getNextStages = function(stage){
      return IssueService.processStage(stage).next;
    };

    vm.goToStage = function(issue, stage){
      issue.stage = IssueService.processStage(stage).current
      vm.issueUpdated(issue);
    };

  }
})();
