(function(){

  'use strict';

  angular.module('ruckApp')
    .constant('diffMarkdown',
      function diffMarkdown() {
        var code = /`.*/;
        var commit = {
          type: 'lang',
          filter: function(text){
            var re = /`(.+?)`|```(.+?)```|\b([0-9a-f]{5,40})\.\.\.([0-9a-f]{5,40})\b/g;

            text = text.replace(re, function(match, code1, code2, sha1, sha2){

              if(!code.test(match))
                return '<a target="_blank" href="{{ project.web_url }}/compare/'+sha1+'...'+sha2+'"><code>'+sha1+'...'+sha2+'</code></a>'

              return match
            });

            return text;
          }
        };

        return [commit];
      });

})();
