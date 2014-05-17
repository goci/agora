(function (global) {

  'use strict';

  angular.module('Helpers')

  .run(['$rootScope', '$window', 'utils',
    function ($rootScope, $window, utils) {
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

                user.save(userData).then(function () {
                  utils.redirect('/');
                });
              });
            } else {
              utils.redirect('/');
            }
          }
        });
      };
    }
  ])

  .factory('utils', ['$window',
    function (global) {
      return {
        redirect: function (url) {
          global.location.href = url;
        }
      };
    }
  ]);

}(window));
