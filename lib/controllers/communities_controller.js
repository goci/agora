(function () {
  'use strict';

  angular.module('Controllers')

  .controller('CommunityIndex', ['$scope', 'Community',
    function ($scope, Community) {
      Community.byName(function (communities) {
        $scope.communities = communities;
      });
    }
  ]);
}());
