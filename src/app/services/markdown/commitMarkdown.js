(function(){

  'use strict';

  angular.module('ruckApp')
    .constant('commitMarkdown',
      function commitMarkdown() {
        var commit = {
          type: 'lang',
          regex: /\%"(.*?)"/g,
          replace: '<span milestone-link="\'$1\'" project="project"></span>'
        };

        return [commit];
      });

})();
