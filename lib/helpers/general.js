(function() {

  'use strict';

  angular.module('Helpers')

  .run(['$rootScope', 'User', function ($rootScope, User) {
    var user = User.current();
    $rootScope.user = user;
  }]);

}(window));
