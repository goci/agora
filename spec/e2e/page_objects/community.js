'use strict';

var Community = function () {
  var self = this;
  self.communities = element.all(by.repeater('c in communities'));

  self.joinLink = function () {
    return element(by.repeater('c in communities').row(0)).findElement(by.css('a[test-name="join"]'));
  };

  self.leaveLink = function () {
    return element(by.repeater('c in communities').row(0)).findElement(by.css('a[test-name="leave"]'));
  };

  self.visit = function () {
    browser.get('#/communities');
  };
};

module.exports = Community;
