(function(){

  'use strict';

  angular.module('ruckApp')
    .constant('mergeRequestMarkdown',
      function mergeRequestMarkdown() {
        var id = {
          type: 'lang',
          regex:  /\!([0-9][0-9]*)\b/g,
          replace: '<a target="_blank" href="{{ project.web_url }}/merge_requests/$1">!$1</a>'
        };

        return [id];
      });

})();
