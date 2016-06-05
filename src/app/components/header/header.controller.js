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

  HeaderController.$inject = ['$cookies', 'AuthTokenResource'];

  /** @ngInject */
  function HeaderController($cookies, AuthTokenResource) {
    var vm = this;
    vm.username = '';
    vm.password = '';
    vm.isLoggedIn = false;

    if($cookies.get('token'))
      vm.isLoggedIn = true;

    vm.login = function(){
      AuthTokenResource.get({ username: vm.username, password: vm.password }).$promise
        .then(function(result){
          $cookies.put('token', result.token);
          vm.isLoggedIn = true;
        });
    };

    vm.signout = function(){
      $cookies.remove('token');
      vm.isLoggedIn = false;
    }
  }
})();
