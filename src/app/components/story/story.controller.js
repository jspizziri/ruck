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

  StoryController.$inject = ['$scope', '$q', '$stateParams', '_', 'UserResource', 'ProjectResource', 'IssueResource', 'IssueService', 'MilestoneResource', 'LabelResource'];

  /** @ngInject */
  function StoryController($scope, $q, $stateParams, _, UserResource, ProjectResource, IssueResource, IssueService, MilestoneResource, LabelResource) {
    var vm = this;
    vm.issue = $scope.issue;
    vm.list = $scope.list;
    vm.project = $scope.project;
    vm.points = IssueService.getPoints();
    vm.stages = IssueService.getStages();
    vm.types = IssueService.getTypes();
    vm.milestones = MilestoneResource.query({ project_id: vm.project.id });
    LabelResource.query({ project_id: vm.project.id }).$promise
      .then(function(labels){
        var re = /list:.*|points:.*|stage:.*|priority:.*|feature|bug|chore|type:.*/;
        vm.labels = _.filter(labels, function(label){
          return !re.test(label.name);
        });
      });

    // Fetch all project users
    $q.all([UserResource.me().$promise, ProjectResource.team({ id: $stateParams.id }).$promise])
      .then(function(result){
        return vm.users = _.flatten(result);
      });

    vm.getNextStages = function(stage){
      return IssueService.processStage(stage).next;
    };

    vm.goToStage = function(issue, stage){
      issue.stage = IssueService.processStage(stage).current

      if(issue.stage === "accepted"){
        issue.isCollapsed = true;
        var index = _.findIndex(vm.list.issues, { 'iid': issue.iid });
        vm.list.issues.splice(index, 1);
      }

      vm.issueUpdated(issue);
    };

    vm.deleteIssue = function(issue){
      var index = _.findIndex(vm.list.issues, { 'iid': issue.iid });

      issue.close = true

      IssueService.applyUpdate(issue, true)
        .then(function(result){
          vm.list.issues.splice(index, 1);
        });
    }

    vm.saveIssue = function(issue){
      var labels = IssueService.processLabels(issue);

      issue.isUpdating = true;
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
          IssueService.preprocessIssue(result);
          vm.list.issues.unshift(result);
        });
    }

    vm.cancelIssue = function(){
      if(vm.list.issues[0].isNew){
        vm.list.issues.shift();
      }
    }

    vm.issueUpdated = function(issue){
      // New issues can't be updated remotely until saved
      if(!issue.isNew) IssueService.applyUpdate(issue);
    };
  }
})();
