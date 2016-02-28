
/**
 * @ngdoc function
 * @name ruckApp.controller:ProjectController
 * @description
 * # ProjectController
 * Controller of the ruckApp
 */
(function() {
  'use strict';

  angular
    .module('ruckApp')
    .controller('ProjectController', ProjectController);

  ProjectController.$inject = ['$scope', '$stateParams', '$q', '_', 'ProjectResource', 'IssueResource', 'UserResource', 'IssueService'];

  /** @ngInject */
  function ProjectController($scope, $stateParams, $q, _, ProjectResource, IssueResource, UserResource, IssueService) {
    var vm = this;
    vm.lists = [{ name: 'current', issues: [] }, { name: 'backlog', issues: [] }, { name: 'icebox', issues: [], isDefault: true }];
    vm.stages = IssueService.getStages();
    vm.types = IssueService.getTypes();
    vm.points = IssueService.getPoints();
    vm.project = ProjectResource.get({ id: $stateParams.id });
    vm.defaultList = null;

    // Fetch all project users
    $q.all([UserResource.me().$promise, ProjectResource.team({ id: $stateParams.id }).$promise])
      .then(function(result){
        vm.users = _.flatten(result);
      })

    IssueResource.query({ id: $stateParams.id }).$promise
      .then(function(result){

        result.forEach(function(issue){
          IssueService.preprocessLabels(issue);
          issue.isCollapsed = true;
          if(!issue.stage)
            issue.stage = IssueService.processStage().current
        });

        // Filter issues into groups
        var def;
        vm.lists.forEach(function(value, key){
          if(value.isDefault)
            def = value;

          vm.lists[key].issues = _.remove(result, function(issue){
            return issue.list && issue.list == value.name;
          });

          // Sort issue by priority
          vm.lists[key].issues = _.sortBy(vm.lists[key].issues, 'priority')

          // Associate the name of the list with the list
          // for sortable event
          vm.lists[key].issues.name = value.name;
        });

        // Assign the remainder of unmatched labels
        // to the default list
        def.issues = def.issues.concat(result);
        def.issues.name = def.name; // reassign list name as it was deleted on concat
        vm.defaultList = def;
      });

    vm.getNextStages = function(stage){
      return IssueService.processStage(stage).next;
    };

    vm.goToStage = function(issue, stage){
      issue.stage = IssueService.processStage(stage).current
      vm.issueUpdated(issue);
    };

    vm.issueUpdated = function(issue){
      $scope.$emit('issueUpdated', issue);
    };

    vm.updatedList = function(e){
      var issue = e.model;
      if(!issue.list) issue.list = vm.defaultList.name;
      var oldList = _.find(vm.lists, ['name', issue.list]).issues;
      var newList = e.models;
      var oldPriority = e.oldIndex;
      var newPriority = e.newIndex;
      issue.list = newList.name;
      issue.priority = newPriority;

      $scope.$emit('issueUpdated', issue);
      vm.reprioritize(newList, newPriority);
      vm.reprioritize(oldList, oldPriority);
    };

    vm.updatedSort = function(e){
      e.model.priority = e.newIndex;
      $scope.$emit('issueUpdated', e.model);

      var indicies = [e.newIndex, e.oldIndex];
      var min = _.min(indicies);
      var max = _.max(indicies);

      vm.reprioritize(e.models, min, max);
    };

    vm.reprioritize = function(issues, startingIndex, endingIndex){

      if(!endingIndex) endingIndex = issues.length - 1;
      if(endingIndex)  startingIndex += 1;

      for(var i = startingIndex; i <= endingIndex; i++){
        var issue = issues[i];
        issue.priority = i;
        $scope.$emit('issueUpdated', issue);
      }
    };
  }
})();
