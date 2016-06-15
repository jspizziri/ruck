(function(){

  'use strict';

  angular.module('ruckApp')
    .constant('labelMarkdown',
      function labelMarkdown() {
        var quoted = {
          type: 'lang',
          regex: /\~"(.*?)"\b/g,
          replace: '<a target="_blank" href="{{ project.web_url }}/issues?label_name=$1"><span class="badge $1">$1</span></a>'
        };

        var oneWord = {
          type: 'lang',
          regex: /\~([^\s]*[^\s0-9][^\s]*)\b/g,
          replace: '<a target="_blank" href="{{ project.web_url }}/issues?label_name=$1"><span class="badge $1">$1</span></a>'
        };

        return [quoted, oneWord];
      });

})();
