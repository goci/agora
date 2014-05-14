angular.module('Helpers')

.run(['$rootScope', '$window', 'User', function ($rootScope, $window, User) {
  $rootScope.user = User.current();

  $rootScope.facebookLogin = function () {
    Parse.FacebookUtils.logIn('public_profile,email,user_location', {
      success: function (user) {
        $window.FB.api('/me', function (fbUserInfo) {
          var userData = _(fbUserInfo).chain().extend({facebook_id: fbUserInfo.id}).omit('id').value();

          User.current().save(userData).then(function() {
            $rootScope.user = User.current();
          });
        });
      },
      error: function () {
        console.log("User cancelled login / error happened while logging in", arguments);
      }
    });
  };
}]);