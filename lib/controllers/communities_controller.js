(function () {
  'use strict';

  angular.module('Controllers')

  .controller('CommunitiesIndex', ['$scope', 'Community',
    function ($scope, Community) {
      Community.byName(function (communities) {
        $scope.communities = communities;
      });
    }
  ]);
}());
