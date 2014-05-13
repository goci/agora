angular.module('Routes')

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state('logout', {
      url: "/logout",
      controller: function($location, $window, $rootScope) {
        $window.Parse.User.logOut();
        $rootScope.user = undefined;
        $location.path('/');
      }
    });
});
