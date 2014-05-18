angular.module('Routes')

.config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");

    $stateProvider

    .state('root', {
      url: "/",
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
    });
  }
]).run(function ($state) {});
