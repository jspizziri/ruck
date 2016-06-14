'use strict';

angular.module('ruckApp')
  .directive('markdown', function($showdown, $sanitize, $sce) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        scope.$watch('model', function (newValue) {
          var showdownHTML;
          if (typeof newValue === 'string') {
            showdownHTML = $showdown.makeHtml(newValue);
            scope.trustedHtml = ($showdown.getOption('sanitize')) ? $sanitize(showdownHTML) : $sce.trustAsHtml(showdownHTML);
          } else {
            scope.trustedHtml = typeof newValue;
          }
        });
      },
      scope: {
        model: '=markdown',
        project: '='
      },
      template: '<div bind-html-compile="trustedHtml"></div>'
    };
  });
