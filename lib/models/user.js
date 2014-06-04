(function () {
  'use strict';

  angular.module('Models')

  .factory('User', ['wrapParse', '$window', '$rootScope',
    function (wrapParse, $window, $rootScope) {

      var User = wrapParse($window.Parse.User, {
        name: String,
        first_name: String,
        last_name: String,
        email: String,
        gender: String,
        location: Object,
        facebook_id: String,
        state: String,
        city: String
      });

      function setCommunities() {
        var communitiesRelation = User.current().relation('communities');

        communitiesRelation.query().find().then(function (communities) {
          communities.include = function (community) {
            return !!_.find(this, function (aCommunity) {
              return community.id === aCommunity.id;
            });
          };

          communities.remove = function (community) {
            var index = _.findIndex(this, {
              id: community.id
            });
            this.splice(index, 1);
          };

          User.prototype.communities = communities;
        });

        User.prototype.communitiesRelation = communitiesRelation;
      }

      $rootScope.$watch('user', function (user) {
        if (user) {
          setCommunities();
        }
      });

      User.prototype.facebookPictureUrl = function () {
        return "https://graph.facebook.com/" + this.facebook_id + "/picture";
      };

      User.prototype.join = function (community) {
        this.communitiesRelation.add(community);
        this.save();

        this.communities.push(community);
      };

      User.prototype.leave = function (community) {
        this.communitiesRelation.remove(community);
        this.save();

        this.communities.remove(community);
      };

      return User;
    }
  ]);
}());
