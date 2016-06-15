(function(){

  'use strict';

  angular.module('ruckApp')
    .constant('emojioneMarkdown',
      function emojioneMarkdown() {

        var emoji = {
          type: 'lang',
          filter: function(text, converter){
            // TODO: this needs to be refactored
            // shouldn't be accessing the window object like this.
            return window.emojione.shortnameToImage(text);
          }
        };

        return [emoji];
      });

})();
