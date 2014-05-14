(function(global) {

  'use strict';
  angular.module('Helpers')

  .run(['$rootScope', '$window', 'User', function ($rootScope, $window, User) {
    var user = User.current();
    $rootScope.user = user;

    $rootScope.facebookLogin = function () {
      global.Parse.FacebookUtils.logIn('public_profile,email,user_location', {
        success: function (user) {
          $window.FB.api('/me', function (fbUserInfo) {
            /*
              Avoid conflict with Parse: take out the 'id' field (from Facebook)
              and put it back in as 'facebook_id'.
             */
            var userData = _(fbUserInfo).chain()
                          .omit('id')
                          .extend({ facebook_id: fbUserInfo.id })
                          .value();

            user.save(userData).then(function(user) {
              $rootScope.user = user;
            });
          });
        }
      });
    };
  }]);

}(window));
