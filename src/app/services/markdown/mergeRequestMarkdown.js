(function(){

  'use strict';

  angular.module('ruckApp')
    .constant('mergeRequestMarkdown',
      function mergeRequestMarkdown() {
        var code = /`.*/;
        var id = {
          type: 'lang',
          filter: function(text){
            var re = /`(.+?)`|```(.+?)```|\!([0-9][0-9]*)\b/g;

            text = text.replace(re, function(match, code1, code2, request){

              if(!code.test(match))
                return '<a target="_blank" href="{{ project.web_url }}/merge_requests/'+request+'">!'+request+'</a>';

              return match
            });

            return text;
          }
        };

        return [id];
      });

})();
