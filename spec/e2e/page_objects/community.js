'use strict';

var Community = function () {
  var self = this;
  self.communities = element.all(by.css('[test-name="communities-list"] li'));

  self.firstCommunity = function () {
    return self.communities[0];
  };

  self.joinLink = function () {
    return self.communities.then(function (items) {
      return items[0].findElement(by.css('a[test-name="join"]'));
    });
  };

  self.leaveLink = function () {
    return self.communities.then(function (items) {
      return items[0].findElement(by.css('a[test-name="leave"]'));
    });
  };

  self.visit = function () {
    browser.get('#/communities');
  };
};

module.exports = Community;
