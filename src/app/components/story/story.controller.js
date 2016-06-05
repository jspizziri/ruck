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
      issue.close = true
      $scope.$emit('issueUpdated', issue);
    }

    vm.saveIssue = function(issue, list){
      var labels = IssueService.processLabels(issue);
      IssueResource.save({
        id: issue.project_id,
        title: issue.title,
        description: issue.description,
        assignee_id: issue.assignee ? issue.assignee.id : null,
        milestone_id: null,
        labels: labels
      }).$promise
        .then(function(result){
          delete list.new;
          list.issues.push(result);
        });
    }

    vm.cancelIssue = function(list){
      delete list.new;
    }

    vm.issueUpdated = function(issue){
      $scope.$emit('issueUpdated', issue);
    };
  }
})();
