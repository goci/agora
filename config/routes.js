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
          logout: ['User', 'utils',
            function (User, utils) {
              User.logOut();
            }
          ]
        }
      });
  }
]);
