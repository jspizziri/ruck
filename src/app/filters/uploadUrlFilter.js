/**
 * @ngdoc function
 * @name ruckApp.controller:uploadUrlFilter
 * @description
 * # uploadUrlFilter
 */
(function() {
  'use strict';

  angular
    .module('ruckApp')
    .filter('uploadUrlFilter', uploadUrlFilter);

  uploadUrlFilter.$inject = [];

  /** @ngInject */
  function uploadUrlFilter() {
    return function(text, rootUrl){
      if(text) return text.replace(/(!\[.*\]\()(\/)(.*\))/g, "$1" + rootUrl + "/$3");
    }
  }
})();
