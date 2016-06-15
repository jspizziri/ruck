(function(){

  'use strict';

  angular.module('ruckApp')
    .constant('labelMarkdown',
      function labelMarkdown() {
        var code = /`.*/;
        var link = function(tag){
          return '<a target="_blank" href="{{ project.web_url }}/issues?label_name='+tag+'"><span class="badge '+tag+'">'+tag+'</span></a>';
        };

        // Ignore code contexts
        var quoted = {
          type: 'lang',
          filter: function(text){
            var re = /`(.+?)`|```(.+?)```|~T"(.+?)"/g;

            text = text.replace(re, function(match, code1, code2, tag){

              if(!code.test(match))
                return link(tag);

              return match
            });

            return text;
          }
        };

        var oneWord = {
          type: 'lang',
          filter: function(text){
            var re = /`(.+?)`|```(.+?)```|\B~T([^\s]+)\b/g;

            text = text.replace(re, function(match, code1, code2, tag){

              if(!code.test(match))
                return link(tag);

              return match
            });

            return text;
          }
        };

        return [quoted, oneWord];
      });

})();
