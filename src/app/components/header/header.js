'use strict';

angular.module('ruckApp')
  .directive('header', function () {
    return {
      templateUrl: 'app/components/header/header.html',
      restrict: 'E',
      controller: 'HeaderController',
      controllerAs: 'vm'
    };
  });
