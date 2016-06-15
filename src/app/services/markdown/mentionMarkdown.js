(function(){

  'use strict';

  angular.module('ruckApp')
    .constant('mentionMarkdown',
      function mentionMarkdown() {
        var all = {
          type: 'lang',
          regex:  /\B\@(all)\b/g,
          replace: '<a target="_blank" href="{{ project.web_url }}">&#64;$1</a>'
        };

        var user = {
          type: 'lang',
          regex:  /\B\@([^\s]*)\b/g,
          replace: '<a target="_blank" href="https://gitlab.com/u/$1">&#64;$1</a>'
        };

        return [all, user];
      });

})();
