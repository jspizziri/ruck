
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
    vm.project = ProjectResource.get({ id: $stateParams.id });
    vm.defaultList = null;

    // Fetch all project users
    $q.all([UserResource.me().$promise, ProjectResource.team({ id: $stateParams.id }).$promise])
      .then(function(result){
        vm.users = _.flatten(result);
      });

    IssueResource.query({ id: $stateParams.id }).$promise
      .then(function(result){

        result = IssueService.preprocessIssues(result);

        // Filter issues into groups
        vm.lists.forEach(function(value, key){
          if(value.isDefault)
            vm.defaultList = value;

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
        vm.defaultList.issues = vm.defaultList.issues.concat(result);
        vm.defaultList.issues.name = vm.defaultList.name; // reassign list name as it was deleted on concat
      });

    vm.showRecentlyAccepted = function(){

      if(!vm.toggleRecentlyAccepted) {
        IssueResource.query({ id: $stateParams.id, state: 'closed', labels: 'stage:accepted' }).$promise
          .then(function(results){
            vm.toggleRecentlyAccepted = !vm.toggleRecentlyAccepted;
            vm.recentlyAccepted = { name: 'accepted', issues: IssueService.preprocessIssues(results) };
          })
      } else {
        vm.toggleRecentlyAccepted = !vm.toggleRecentlyAccepted;
      }
    }
  }
})();
