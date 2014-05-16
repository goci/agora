'use strict';

describe('Helpers.site', function () {
  var $rootScope, global;

  beforeEach(module('Helpers.site'));
  beforeEach(inject(function (_$rootScope_, $window) {
    $rootScope = _$rootScope_;
    global = $window;
  }));

  describe('facebookLogin', function() {
    it('should login with facebook using Parse API', function() {
      spyOn(global.Parse.FacebookUtils, 'logIn');

      $rootScope.facebookLogin();

      expect(global.Parse.FacebookUtils.logIn).toHaveBeenCalled();
    });

    it('should ask for permissions: public_profile, email and user_location', function() {
      spyOn(global.Parse.FacebookUtils, 'logIn');

      $rootScope.facebookLogin();

      expect(global.Parse.FacebookUtils.logIn).toHaveBeenCalledWith('public_profile,email,user_location', jasmine.any(Object));
    });

    describe('after login', function() {
      beforeEach(function() {
        global.FB = {
          api: function(url, callback) {
            callback({
              id: 'facebookId',
              email: 'userEmail'
            });
          }
        };

        spyOn(global.Parse.User.prototype, 'save').andReturn({
          then: function() { return undefined; }
        });
      });

      it("should save the user only if it doesn't exists", function() {
        spyOn(global.Parse.FacebookUtils, 'logIn').andCallFake(function (permissions, callbacks) {
          var user = new global.Parse.User();
          user.existed = function() {
            return true;
          };
          callbacks.success(user);
        });

        $rootScope.facebookLogin();

        expect(global.Parse.User.prototype.save).not.toHaveBeenCalled();
      });

      it("should save the user by passing facebook's info plus: facebook_id instead of the id, username as user's email", function() {
        spyOn(global.Parse.FacebookUtils, 'logIn').andCallFake(function (permissions, callbacks) {
          callbacks.success(new global.Parse.User());
        });

        $rootScope.facebookLogin();

        expect(global.Parse.User.prototype.save).toHaveBeenCalledWith({
          facebook_id: 'facebookId',
          username: 'userEmail',
          email: 'userEmail'
        });
      });
    });
  });

});
