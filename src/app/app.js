'use strict';

/**
 * @ngdoc overview
 * @name ruckApp
 * @description
 * # ruckApp
 *
 * Main module of the application.
 */
angular
  .module('ruckApp', [
    'angularSpinner',
    'mentio',
    'ng-showdown',
    'ng-sortable',
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'ui.router',
    'ui.select'
  ])
  .config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
  })
  .config(function($showdownProvider, milestoneMarkdown, issueMarkdown, labelMarkdown, mergeRequestMarkdown, diffMarkdown, mentionMarkdown, fileReferenceMarkdown, emojioneMarkdown) {
    // Configure Showdown for GFM
    $showdownProvider.setOption('tasklists', true);
    $showdownProvider.setOption('simplifiedAutoLink', true);
    $showdownProvider.setOption('literalMidWordUnderscores', true);
    $showdownProvider.setOption('strikethrough', true);
    $showdownProvider.setOption('tables', true);

    // Load Extensions
    $showdownProvider.loadExtension(milestoneMarkdown);
    $showdownProvider.loadExtension(issueMarkdown);
    $showdownProvider.loadExtension(labelMarkdown);
    $showdownProvider.loadExtension(mergeRequestMarkdown);
    $showdownProvider.loadExtension(diffMarkdown);
    $showdownProvider.loadExtension(mentionMarkdown);
    $showdownProvider.loadExtension(fileReferenceMarkdown);
    $showdownProvider.loadExtension(emojioneMarkdown);
  })
  .factory('authInterceptor', function($rootScope, $q, $cookies, $injector) {
    var state;
    return {
      // Add authorization token to headers
      request: function(config) {
        config.headers = config.headers || {};
        if ($cookies.get('token')) {
          config.headers['PRIVATE-TOKEN'] = $cookies.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if (response.status === 401) {
          (state || (state = $injector.get('$state'))).go('login');
          // remove any stale tokens
          $cookies.remove('token');
          return $q.reject(response);
        } else {
          return $q.reject(response);
        }
      }
    };
  });
