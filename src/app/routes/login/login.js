'use strict';

angular.module('ruckApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/routes/login/login.html',
        controller: 'LoginController',
        controllerAs: 'vm'
      });
  });
