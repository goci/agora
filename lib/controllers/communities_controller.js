(function () {
  'use strict';

  angular.module('Controllers')

  .controller('CommunitiesIndex', ['$scope', 'Community',
    function ($scope, Community) {
      Community.byName(function (communities) {
        $scope.communities = communities;
      });
    }
  ])

  .controller('CommunitiesShow', ['$scope', 'Community', '$stateParams',
    function ($scope, Community, $stateParams) {
      Community.get($stateParams.id, function (community) {
        $scope.community = community;
      });
    }
  ]);
}());
