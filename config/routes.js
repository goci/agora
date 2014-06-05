(function () {
  'use strict';

  angular.module('Routes')

  .constant('states', [
    'user_edit',
    'communities_index' // { url: '/communities', controller: 'CommunitiesIndex', templateUrl: '/communities/index.tmpl.html' }
  ])

  .config(['$stateProvider', '$urlRouterProvider', 'states',
    function ($stateProvider, $urlRouterProvider, states) {
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
        });

      states.forEach(function (state) {
        $stateProvider.state(state, {
          url: urlForState(state),
          controller: controllerForState(state),
          templateUrl: templateForState(state)
        });
      });

      function urlForState(state) {
        var pieces = state.split('_');
        var path = pieces.join('/');
        return '/' + path.replace(/\/index$/, '');
      }

      function controllerForState(state) {
        var controller = '';
        state.split('_').forEach(function (piece) {
          controller += piece[0].toUpperCase() + piece.substring(1, piece.length);
        });
        return controller;
      }

      function templateForState(state) {
        var pieces = state.split('_');
        var path = pieces.join('/');
        return path + '.tmpl.html';
      }
    }
  ]).run(['$state', _.noop]); // re-evaluates routes when page is reloaded
}());
