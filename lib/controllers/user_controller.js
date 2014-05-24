(function () {
  'use strict';

  angular.module('Controllers')

  .controller('UserEdit', ['$scope', 'User',
    function ($scope, User) {
      $scope.user = User.current();
      $scope.states = [
        "Acre",
        "Alagoas",
        "Amapá",
        "Amazonas",
        "Bahia",
        "Ceará",
        "Distrito Federal",
        "Espírito Santo",
        "Goiás",
        "Maranhão",
        "Mato Grosso",
        "Mato Grosso do Sul",
        "Minas Gerais",
        "Pará",
        "Paraíba",
        "Paraná",
        "Pernambuco",
        "Piauí",
        "Rio de Janeiro",
        "Rio Grande do Norte",
        "Rio Grande do Sul",
        "Rondônia", "Roraima",
        "Santa Catarina",
        "São Paulo",
        "Sergipe",
        "Tocantins"
      ];

      $scope.saveUser = function () {
        $scope.user.save();
      };
    }
  ]);

}());
