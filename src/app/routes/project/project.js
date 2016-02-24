'use strict';

angular.module('ruckApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('project', {
        url: '/project/:id',
        templateUrl: 'app/routes/project/project.html',
        controller: 'ProjectController',
        controllerAs: 'vm'
      });
  });
