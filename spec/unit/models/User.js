'use strict';

describe('User', function () {
  var User;

  beforeEach(module('Models'));
  beforeEach(inject(function (_User_) {
    User = _User_;
  }));

  it("should return facebook's picture url", function () {
    var user = new User();
    user.facebook_id = '123';

    expect(user.facebookPictureUrl()).toEqual("https://graph.facebook.com/" + user.facebook_id + "/picture");
  });
});
