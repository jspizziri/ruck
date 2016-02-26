
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

  ProjectController.$inject = ['$stateParams', '_', 'ProjectResource', 'IssueResource', 'IssueService'];

  /** @ngInject */
  function ProjectController($stateParams, _, ProjectResource, IssueResource, IssueService) {
    var vm = this;
    vm.lists = [{ name: 'current', issues: [] }, { name: 'backlog', issues: [] }, { name: 'icebox', issues: [], isDefault: true }];
    vm.stages = IssueService.getStages();

    ProjectResource.get({ id: $stateParams.id }).$promise
      .then(function(result){
        vm.project = result;
      });

    IssueResource.query({ id: $stateParams.id }).$promise
      .then(function(result){

        result.forEach(function(issue){
          IssueService.preprocessLabels(issue);

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
        });

        // Assign the remainder of unmatched labels
        // to the default list
        def.issues = def.issues.concat(result);
      });

    vm.getNextStages = function(stage){
      return IssueService.processStage(stage).next;
    }

    vm.goToStage = function(issue, stage){
      issue.stage = IssueService.processStage(stage).current
    }
  }
})();
