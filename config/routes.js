(function () {
  'use strict';

  angular.module('Routes')

  .config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise("/");

      $stateProvider

      .state('root', {
        url: "/",
        templateUrl: 'home/index.tmpl.html'
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
        templateUrl: 'user/edit.tmpl.html'
      })

      .state('communities', {
        url: '/communities',
        controller: 'CommunityIndex',
        templateUrl: 'community/index.tmpl.html'
      });
    }
  ]).run(['$state',
    function () {
      return undefined;
    }
  ]);
}());
