/**
 * @ngdoc function
 * @name ruckApp.controller:LoginController
 * @description
 * # LoginController
 * Controller of the ruckApp
 */
(function() {
  'use strict';

  angular
    .module('ruckApp')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['AuthService'];

  /** @ngInject */
  function LoginController(AuthService) {
    var vm = this;

    vm.login = function(){
      AuthService.login(vm.username, vm.password);
    }
  }
})();
