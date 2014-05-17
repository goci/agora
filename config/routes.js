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
        resolve: {
          logout: ['User', '$window',
            function (User, $window) {
              User.logOut();
              $window.location.reload();
            }
          ]
        }
      });
  }
]);
