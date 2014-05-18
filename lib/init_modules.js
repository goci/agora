angular.module('Agora', ['ui.router', 'Routes', 'Helpers', 'Controllers'])

.run(['$rootScope',
  function ($rootScope) {
    $rootScope.$on('$stateChangeError', function () {
      console.error(arguments.error);
    });
  }
]);

angular.module('Routes', []);

angular.module('Helpers', ['Models']);

angular.module('Models', ['wrapParse']);

angular.module('Controllers', ['Models']);
