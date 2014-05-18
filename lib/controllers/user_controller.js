angular.module('Controllers')

.controller('UserEdit', ['$scope', 'User', function ($scope, User) {
  $scope.user = User.current();
  $scope.states = ["Acre", "Alagoas", "Amapa", "Amazonas", "Bahia", "Ceara", "Distrito Federal", "Espirito Santo", "Goias", "Maranhao", "Mato Grosso", "Mato Grosso do Sul", "Minas Gerais", "Para", "Paraiba", "Parana", "Pernambuco", "Piaui", "Rio de Janeiro", "Rio Grande do Norte", "Rio Grande do Sul", "Rondonia", "Roraima", "Santa Catarina", "Sao Paulo", "Sergipe", "Tocantins"];

  $scope.saveUser = function () {
    $scope.user.save();
  };
}]);
