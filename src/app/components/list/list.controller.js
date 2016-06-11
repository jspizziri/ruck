/**
 * @ngdoc function
 * @name ruckApp.controller:ListController
 * @description
 * # ListController
 * Controller of the ruckApp
 */
(function() {
  'use strict';

  angular
    .module('ruckApp')
    .controller('ListController', ListController);

  ListController.$inject = ['$scope', 'IssueService'];

  /** @ngInject */
  function ListController($scope, IssueService) {
    var vm = this;

    vm.list = $scope.list;
    vm.lists = $scope.lists;
    vm.project = $scope.project;
    vm.users = $scope.users;
    vm.allowNewIssues = $scope.allowNewIssues;

    vm.updatedList = function(e){
      var issue = e.model;
      if(!issue.list) issue.list = vm.defaultList.name;
      var oldList = _.find(vm.lists, ['name', issue.list]).issues;
      var newList = e.models;
      var oldPriority = e.oldIndex;
      var newPriority = e.newIndex;
      issue.list = newList.name;
      issue.priority = newPriority;

      IssueService.applyUpdate(issue);
      vm.reprioritize(newList, newPriority); // reprioritize everything from the current index down
      vm.reprioritize(oldList, oldPriority); // reprioritize everything from the current index down
    };

    vm.updatedSort = function(e){
      e.model.priority = e.newIndex;
      IssueService.applyUpdate(e.model);

      var indicies = [e.newIndex, e.oldIndex];
      var min = _.min(indicies);
      var max = _.max(indicies);

      // Only reprioritize issues between the old and new index
      vm.reprioritize(e.models, min, max);
    };

    vm.reprioritize = function(issues, startingIndex, endingIndex){

      if(!endingIndex) endingIndex = issues.length - 1;
      if(endingIndex)  startingIndex += 1;

      for(var i = startingIndex; i <= endingIndex; i++){
        var issue = issues[i];
        issue.priority = i;
        IssueService.applyUpdate(issue);
      }
    };
  }
})();
