(function(){

  'use strict';

  angular.module('ruckApp')
    .constant('issueMarkdown',
      function issueMarkdown() {
        var code = /`.*/;
        var id = {
          type: 'lang',
          filter: function(text){
            var re = /`(.+?)`|```(.+?)```|\#([0-9]+)\b/g;

            text = text.replace(re, function(match, code1, code2, issue){

              if(!code.test(match))
                return '<a target="_blank" href="{{ project.web_url }}/issues/'+issue+'">#'+issue+'</a>';

              return match
            });

            return text;
          }
        };

        return [id];
      });

})();
