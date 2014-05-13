angular.module('Helpers')

.run(['$rootScope', '$window', '$location', function($rootScope, $window, $l) {
  $rootScope.user = $window.Parse.User.current();

  $rootScope.facebookLogin = function() {
    Parse.FacebookUtils.logIn('public_profile,email', {
      success: function(user) {
        $rootScope.user = $window.Parse.User.current();
        $window.FB.api('/me', function(fbUserInfo) {
          Parse.User.current().save(_.omit(fbUserInfo, 'id'));
        });
      },
      error: function() {
        console.log("User cancelled login / error happened while logging in", arguments);
      }
    });
  };
}]);
