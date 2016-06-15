(function(){

  'use strict';

  angular.module('ruckApp')
    .constant('milestoneMarkdown',
      function milestoneMarkdown($showdown) {
        var code = /`.*/;

        var quoted = {
          type: 'lang',
          filter: function(text){
            var re = /`(.+?)`|```(.+?)```|\%"(.*?)"/g;

            text = text.replace(re, function(match, code1, code2, milestone){

              if(!code.test(match))
                return '<span milestone-link="\''+milestone+'\'" project="project"></span>';

              return match
            });

            return text;
          }
        };

        var oneWord = {
          type: 'lang',
          filter: function(text){
            var re = /`(.+?)`|```(.+?)```|\%([^\s]*[^\s0-9][^\s]*)\b/g;

            text = text.replace(re, function(match, code1, code2, milestone){

              if(!code.test(match))
                return '<span milestone-link="\''+milestone+'\'" project="project"></span>';

              return match
            });

            return text;
          }
        };

        var id = {
          type: 'lang',
          filter: function(text){
            var re = /`(.+?)`|```(.+?)```|\%([0-9][0-9]*)\b/g;

            text = text.replace(re, function(match, code1, code2, milestone){

              if(!code.test(match))
                return '<a target="_blank" href="{{ project.web_url }}/milestones/'+milestone+'">'+milestone+'</a>';

              return match
            });

            return text;
          }
        };

        return [quoted, oneWord, id];
      });

})();
