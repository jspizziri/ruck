'use strict';

angular.module('ruckApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/routes/main/main.html',
        controller: 'MainController',
        controllerAs: 'vm'
      });
  });
