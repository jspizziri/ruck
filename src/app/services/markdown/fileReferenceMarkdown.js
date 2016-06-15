(function(){

  'use strict';

  angular.module('ruckApp')
    .constant('fileReferenceMarkdown',
      function fileReferenceMarkdown() {
        var image = {
          type: 'lang',
          regex: /!\[(.*)\]\(\/(.*)\)/g,
          replace: '<img src="{{ project.web_url }}/$2" title="$1"/>'
        };

        var file = {
          type: 'lang',
          filter: function(text, converter){
            var http = /\[(.*)\]\((https?:)/;
            var re = /[^!](\[([^\[\]]+)])\((.*)\)/g;

            text = text.replace(re, function(match, closedTag, tag, url){

              if(!http.test(match))
                return '<a target="_blank" href="{{ project.web_url }}/blob/master/'+ url +'">'+ tag +'</a>';

              return match;
            })
            
            return text;
          }
        };

        return [image, file];
      });

})();
