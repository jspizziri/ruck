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

  StoryController.$inject = ['$scope', 'IssueResource', 'IssueService'];

  /** @ngInject */
  function StoryController($scope, IssueResource, IssueService) {
    var vm = this;
    vm.issue = $scope.issue;
    vm.users = $scope.users;
    vm.list = $scope.list;
    vm.project = $scope.project;

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

    vm.deleteIssue = function(issue){
      issue = null;
      // issue.close = true
      // $scope.$emit('issueUpdated', issue);
    }

    vm.saveIssue = function(issue){
      var labels = IssueService.processLabels(issue);
      issue.isSaving = true;

      IssueResource.save({
        id: issue.project_id,
        title: issue.title,
        description: issue.description,
        assignee_id: issue.assignee ? issue.assignee.id : null,
        milestone_id: null,
        labels: labels
      }).$promise
        .then(function(result){
          vm.cancelIssue();
          vm.list.issues.unshift(result);
        });
    }

    vm.cancelIssue = function(){
      if(vm.list.issues[0].isNew){
        vm.list.issues.shift();
      }
    }

    vm.issueUpdated = function(issue){
      $scope.$emit('issueUpdated', issue);
    };
  }
})();
