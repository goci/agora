angular.module('Helpers')

.run(['$rootScope', '$window', 'User', function ($rootScope, $window, User) {
  $rootScope.user = $window.Parse.User.current();

  $rootScope.facebookLogin = function () {
    Parse.FacebookUtils.logIn('public_profile,email,user_location', {
      success: function (user) {
        $rootScope.user = $window.Parse.User.current();

        $window.FB.api('/me', function (fbUserInfo) {
          var userData = _(fbUserInfo).chain().extend({facebook_id: fbUserInfo.id}).omit('id').value();
          Parse.User.current().save(userData);
        });
      },
      error: function () {
        console.log("User cancelled login / error happened while logging in", arguments);
      }
    });
  };
}]);
