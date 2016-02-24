
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

  ProjectController.$inject = ['$stateParams', '_', 'ProjectResource', 'ProjectIssueResource'];

  /** @ngInject */
  function ProjectController($stateParams, _, ProjectResource, ProjectIssueResource) {
    var vm = this;
    vm.lists = [{ name: 'current', issues: [] }, { name: 'backlog', issues: [] }, { name: 'icebox', issues: [], isDefault: true }];

    ProjectResource.get({ id: $stateParams.id }).$promise
      .then(function(result){
        vm.project = result;
      });

    ProjectIssueResource.query({ id: $stateParams.id }).$promise
      .then(function(result){
        // Filter issues into groups
        var def;
        vm.lists.forEach(function(value, key){
          if(value.isDefault)
            def = value;

          vm.lists[key].issues = _.remove(result, function(issue){
            return _.some(issue.labels, function(label){ return label === 'list:' + value.name });
          });
        });

        // Assign the remainder of unmatched labels
        // to the default list
        def.issues = def.issues.concat(result);
      });
  }
})();
