'use strict';

angular.module('ruckApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('about', {
        url: '/about',
        templateUrl: 'app/routes/about/about.html',
        controller: 'AboutController',
        controllerAs: 'vm'
      });
  });
