(function(){
  'use strict';

  angular.module('ruckApp')
    .service('AuthService', AuthService);

  AuthService.$inject = ['$cookies', '$state', 'AuthTokenResource'];

  function AuthService($cookies, $state, AuthTokenResource) {
    var vm = this;

    vm.isLoggedIn = function(){
      if($cookies.get('token'))
        return true;

      return false;
    }

    vm.login = function(username, password){
      AuthTokenResource.get({}, { login: username, password: password }).$promise
        .then(function(result){
          $cookies.put('token', result.private_token);
          $state.go('main');
        });
    };

    vm.signout = function(){
      $cookies.remove('token');
      $state.go('login');
    }

    return {
      isLoggedIn: vm.isLoggedIn,
      login: vm.login,
      signout: vm.signout
    }
  }

})();
