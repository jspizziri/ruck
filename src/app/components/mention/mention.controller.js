/**
 * @ngdoc function
 * @name ruckApp.controller:MentionController
 * @description
 * # MentionController
 * Controller of the ruckApp
 */
(function() {
  'use strict';

  angular
    .module('ruckApp')
    .controller('MentionController', MentionController);

  MentionController.$inject = ['$scope', '$stateParams', '$q', 'UserResource', 'ProjectResource'];

  /** @ngInject */
  function MentionController($scope, $stateParams, $q, UserResource, ProjectResource) {
    var vm = this;

    vm.placeholder = $scope.placeholder;
    vm.mentionables = [];

    // Fetch all project users
    $q.all([UserResource.me().$promise, ProjectResource.team({ id: $stateParams.id }).$promise])
      .then(function(result){
        return vm.mentionables = _.flatten(result);
      });

    vm.search = function(term) {
      var results = [];
      angular.forEach(vm.mentionables, function(item) {
        if (item.username.toUpperCase().indexOf(term.toUpperCase()) >= 0) {
          results.push(item);
        }
      });
      vm.mentionables = results;
    };

    vm.select = function(locals) {
      return '@' + locals.username;
    };
  }
})();
