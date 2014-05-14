'use strict';

describe('General', function () {
  var $rootScope, global;

  beforeEach(module('Helpers'));
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

    it("should save the user by passing a 'facebook_id' instead of an 'id' after login", function() {
      // Given
      global.FB = {
        api: function(url, callback) {
          callback({id: 'facebookId'});
        }
      };

      spyOn(global.Parse.FacebookUtils, 'logIn').andCallFake(function (permissions, callbacks) {
        callbacks.success(new global.Parse.User());
      });

      spyOn(global.Parse.User.prototype, 'save').andReturn({
        then: function() { return undefined; }
      });

      // When
      $rootScope.facebookLogin();

      // Then
      expect(global.Parse.User.prototype.save).toHaveBeenCalledWith({facebook_id: 'facebookId'});
    });
  });

});
