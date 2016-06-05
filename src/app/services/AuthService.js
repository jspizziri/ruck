(function(){
  'use strict';

  angular.module('ruckApp')
    .service('AuthService', AuthService);

  AuthService.$inject = ['$cookies', '$state', '$rootScope', 'AuthTokenResource'];

  function AuthService($cookies, $state, $rootScope, AuthTokenResource) {
    var vm = this;

    vm.isLoggedIn = function(){
      return !!$cookies.get('token')
    }

    vm.login = function(username, password){
      AuthTokenResource.get({}, { login: username, password: password }).$promise
        .then(function(result){
          $cookies.put('token', result.private_token);
          $rootScope.$emit('loginStateChanged', 'in');
          $state.go('main');
        });
    };

    vm.signout = function(){
      $cookies.remove('token');
      $rootScope.$emit('loginStateChanged', 'out');
      $state.go('login');
    }

    return {
      isLoggedIn: vm.isLoggedIn,
      login: vm.login,
      signout: vm.signout
    }
  }

})();
