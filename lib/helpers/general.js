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
            var userData = _(fbUserInfo).chain()
                          .extend({
                            facebook_id: fbUserInfo.id
                          })
                          .omit('id')
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
