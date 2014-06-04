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
        User.prototype.communitiesRelation = User.current().relation('communities');

        User.prototype.communities = function () {
          var self = this;

          self.communitiesRelation.query().find().then(function (communities) {
            self.communities = communities;

            self.communities.include = function (community) {
              return !!_.find(self.communities, function (aCommunity) {
                return community.id === aCommunity.id;
              });
            };
            self.communities.remove = function (community) {
              var index = _.findIndex(self.communities, {
                id: community.id
              });
              self.communities.splice(index, 1);
            };
          });
        }.call(User.current());
      }

      $rootScope.$watch('user', function (user) {
        if(user) {
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
