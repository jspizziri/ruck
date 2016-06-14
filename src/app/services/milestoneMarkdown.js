(function(){

  'use strict';

  angular.module('ruckApp')
    .constant('milestoneMarkdown',
      function milestoneMarkdown($showdown) {
        var quoted = {
          type: 'lang',
          regex: /\%"(.*?)"/g,
          replace: '<span milestone-link="\'$1\'" project="project"></span>'
        };

        var oneWord = {
          type: 'lang',
          regex: /\%([^\s]*[^\s0-9][^\s]*)\b/g,
          replace: '<span milestone-link="\'$1\'" project="project"></span>'
        };

        var id = {
          type: 'lang',
          regex:  /\%([0-9][0-9]*)/g,
          replace: '<a target="_blank" href="{{ project.web_url }}/milestones/$1">$1</a>'
        };

        return [quoted, oneWord, id];
      });

})();
