angular.module('Routes')

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state('root', {
      url: "/",
      resolve: {
        guest: ['User', '$window',
          function (User, $window) {
            if(!User.current()) {
              $window.location.href = '/home.html';
            }
          }]
      }
    })
    .state('logout', {
      url: "/logout",
      resolve: {
        logout: ['User', '$window',
          function(User, $window){
            User.logOut();
            $window.location.href = '/home.html';
          }]
      }
    })
    ;
}]);
