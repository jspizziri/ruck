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

  HeaderController.$inject = ['$cookies', 'AuthService'];

  /** @ngInject */
  function HeaderController($cookies, AuthService) {
    var vm = this;
    vm.isLoggedIn = AuthService.isLoggedIn();

    vm.signout = function(){
      AuthService.signout();
    }
  }
})();
