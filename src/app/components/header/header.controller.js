/**
 * @ngdoc function
 * @name ruckApp.controller:HeaderController
 * @description
 * # HeaderController
 * Controller of the ruckApp
 */
(function() {
  'use strict';

  angular
    .module('ruckApp')
    .controller('HeaderController', HeaderController);

  HeaderController.$inject = ['$cookies', '$rootScope', 'AuthService'];

  /** @ngInject */
  function HeaderController($cookies, $rootScope, AuthService) {
    var vm = this;
    vm.isLoggedIn = AuthService.isLoggedIn();

    // Recompute isLoggedIn on state change
    $rootScope.$on('loginStateChanged', function(){
      vm.isLoggedIn = AuthService.isLoggedIn();
    });

    vm.signout = function(){
      AuthService.signout();
    }
  }
})();
