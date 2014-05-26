(function () {
  'use strict';

  angular.module('Routes')

  .config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise("/");

      $stateProvider

      .state('root', {
        url: "/",
        templateUrl: 'templates/home/index.html'
      })

      .state('logout', {
        url: "/logout",
        controller: function (User, $state, $rootScope) {
          User.logOut();
          $rootScope.user = undefined;
          $state.go('root');
        }
      })

      .state('editUser', {
        url: '/user/edit',
        controller: 'UserEdit',
        templateUrl: 'templates/user/edit.html'
      })

      .state('communities', {
        url: '/communities',
        controller: 'CommunityIndex',
        templateUrl: 'templates/community/index.html'
      });
    }
  ]).run(['$state', function ($state) {}]);
}());
