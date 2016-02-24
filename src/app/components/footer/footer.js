'use strict';

angular.module('ruckApp')
  .directive('footer', function () {
    return {
      templateUrl: 'app/components/footer/footer.html',
      restrict: 'E'
    };
  });
