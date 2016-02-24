/**
 * @ngdoc function
 * @name ruckApp.controller:MainController
 * @description
 * # MainController
 * Controller of the ruckApp
 */
(function() {
  'use strict';

  angular
    .module('ruckApp')
    .controller('MainController', MainController);

  MainController.$inject = ['ProjectResource'];

  /** @ngInject */
  function MainController(ProjectResource) {
    var vm = this;

    ProjectResource.query().$promise
      .then(function(result) {
        vm.projects = result;
      });
  }
})();
