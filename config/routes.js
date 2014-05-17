angular.module('Routes')

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state('root', {
      url: "/",
      resolve: {
        guest: ['User', '$location',
          function (User, $location) {
            if(!User.current()) {
              $location.url('/home.html');
            }
          }]
      }
    })
    .state('logout', {
      url: "/logout",
      resolve: {
        logout: ['User', '$location',
          function(User, $location){
            User.logOut();
            $location.url('/home.html');
          }]
      }
    })
    ;
}]);
