'use strict';

var Community = function () {
  this.communities = element.all(by.css('[test-name="communities-list"] li'));

  this.visit = function () {
    browser.get('#/communities');
  };
};

module.exports = Community;
