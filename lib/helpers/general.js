(function (global) {

  'use strict';

  angular.module('Helpers')

  .run(['assignVars',
    function (assignVars) {
      assignVars();
    }
  ])

  .factory('assignVars', ['$rootScope', 'User',
    function ($rootScope, User) {
      return function () {
        $rootScope.user = User.current();
      };
    }
  ])

  .run(['$rootScope', '$window',
    function ($rootScope, $window) {
      $rootScope.facebookLogin = function () {
        global.Parse.FacebookUtils.logIn('public_profile,email,user_location', {
          success: function (user) {
            if (!user.existed()) {
              $window.FB.api('/me', function (fbUserInfo) {
                var userData = _(fbUserInfo).chain()
                  .omit('id')
                  .extend({
                    facebook_id: fbUserInfo.id,
                    username: fbUserInfo.email
                  })
                  .value();

                user.save(userData).then(function (user) {
                  $rootScope.user = user;
                });
              });
            } else {
              $rootScope.user = user;
            }
          }
        });
      };
    }
  ]);
}(window));
