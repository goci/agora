angular.module('Helpers')

.run(['$rootScope', '$window', function($rootScope, $window) {
  $rootScope.user = $window.Parse.User.current();

  $rootScope.facebookLogin = function() {
    Parse.FacebookUtils.logIn(null, {
      success: function(user) {
        $rootScope.user = $window.Parse.User.current();
      }
    });
  };
}])