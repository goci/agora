'use strict';

describe('UserEdit', function () {
  var $scope, currentUser;

  beforeEach(module('Controllers'));
  beforeEach(inject(function ($rootScope, $controller) {
    var User = jasmine.createSpyObj('User', ['current']);
    currentUser = jasmine.createSpyObj('currentUser', ['save']);
    User.current.andReturn(currentUser);

    $scope = $rootScope.$new();
    $controller('UserEdit', {
      '$scope': $scope,
      'User': User
    });
  }));

  it('sets the user on scope', function () {
    expect($scope.user).toEqual(currentUser);
  });

  it("saves user's info", function () {
    $scope.saveUser();
    expect(currentUser.save).toHaveBeenCalled();
  });
});
