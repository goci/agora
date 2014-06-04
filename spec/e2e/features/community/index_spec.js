'use strict';

var Community = require('../../page_objects/community.js');

describe('Community', function () {
  var communityPage = new Community(),
    count = 2;

  beforeEach(function () {
    global.create(count).communities(function () {
      communityPage.visit();
      browser.sleep(1000);
    });
  });

  it('should list all communities', function () {
    expect(communityPage.communities.count()).toEqual(count);
  });

  it('should allow the user to join and leave communites', function () {
    communityPage.joinLink().then(function (joinLink) {
      expect(joinLink.isDisplayed()).toEqual(true);

      joinLink.click();

      communityPage.leaveLink().then(function (leaveLink) {
        expect(leaveLink.isDisplayed()).toEqual(true);
      });
    });
  });
});
