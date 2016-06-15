(function(){

  'use strict';

  angular.module('ruckApp')
    .constant('diffMarkdown',
      function diffMarkdown() {
        var commit = {
          type: 'lang',
          regex: /\b([0-9a-f]{5,40})\.\.\.([0-9a-f]{5,40})\b/g,
          replace: '<a target="_blank" href="{{ project.web_url }}/compare/$1...$2"><code>$1...$2</code></a>'
        };

        return [commit];
      });

})();
