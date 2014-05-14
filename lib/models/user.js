angular.module('Models')

.factory('User', ['wrapParse', function (wrapParse) {

  var User = wrapParse(Parse.User, {
    facebook_id: String
  });

  User.prototype.facebookPictureUrl = function () {
    return "https://graph.facebook.com/" + this.facebook_id + "/picture";
  };

  return User;
}]);
