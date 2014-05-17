'use strict';

describe('Helpers', function () {
  var User, $rootScope, assignVars;

  beforeEach(module('Helpers'));
  beforeEach(inject(function (_$rootScope_, _User_, _assignVars_) {
    $rootScope = _$rootScope_;
    User = _User_;
    assignVars = _assignVars_;
  }));

  it('should assign a user with the current logged user function', function () {
    spyOn(User, 'current').andReturn('theUser');

    assignVars();

    expect($rootScope.user()).toEqual('theUser');
  });


});
