(function(){

  'use strict';

  angular.module('ruckApp')
    .constant('issueMarkdown',
      function issueMarkdown() {
        var id = {
          type: 'lang',
          regex:  /\#([0-9][0-9]*)\b/g,
          replace: '<a target="_blank" href="{{ project.web_url }}/issues/$1">#$1</a>'
        };

        return [id];
      });

})();
