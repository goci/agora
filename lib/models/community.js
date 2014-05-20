(function() {
  'use strict';

  angular.module('Models')

  .factory('Community', ['wrapParse', function (wrapParse) {

    var Community = wrapParse('Community', {
      name: String
    });

    Community.byName = function (callback) {
      Community.query().ascending('name').find().then(callback);
    };

    return Community;
  }]);
}());
