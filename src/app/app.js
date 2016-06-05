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
    'btford.markdown',
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
  })

  // Register global event listeners
  // Issue Listener
  .run(function($rootScope, $log,  IssueResource, IssueService){

    // Update remote issue
    $rootScope.$on('issueUpdated', function(event, issue){
      var update = IssueService.getUpdate(issue);
      $log.log("Updating issue: "+ JSON.stringify(update));
      IssueResource.update(update).$promise
        .then(function(result){
          $log.log(result);
        });
    })
  })
