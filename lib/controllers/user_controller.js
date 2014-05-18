angular.module('Controllers')

.controller('UserEdit', ['$scope', 'User', function ($scope, User) {
  $scope.user = User.current();

  $scope.saveUser = function () {
    $scope.user.save();
  };
}]);
