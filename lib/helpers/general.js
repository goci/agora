(function(global) {

  'use strict';

  angular.module('Helpers')

  .run(['$rootScope', 'User', function ($rootScope, User) {
    var user = User.current();
    $rootScope.user = user;
  }]);


  angular.module('Helpers.site')
  .run(['$rootScope', '$window', 'User', function ($rootScope, $window, User) {
    var user = User.current();
    $rootScope.user = user;

    $rootScope.facebookLogin = function () {
      global.Parse.FacebookUtils.logIn('public_profile,email,user_location', {
        success: function (user) {
          if(!user.existed()) {
            $window.FB.api('/me', function (fbUserInfo) {
              var userData = _(fbUserInfo).chain()
                            .omit('id')
                            .extend({
                              facebook_id: fbUserInfo.id,
                              username   : fbUserInfo.email
                            })
                            .value();

              user.save(userData).then(function(user) {
                $rootScope.user = user;
                $window.location.href = '/';
              });
            });
          }
        }
      });
    };
  }]);

}(window));
