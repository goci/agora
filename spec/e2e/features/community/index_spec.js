'use strict';

var Community = require('../../page_objects/community.js');

describe('Community', function () {
  var communityPage = new Community(),
    count = 2;

  beforeEach(function () {
    global.create(count).communities(function () {
      communityPage.visit();
    });
  });

  it('should list all communities', function () {
    waitAsyncCalls().then(function () {
      expect(communityPage.communities.count()).toEqual(count);
    });
  });

  it('should allow user to join communites', function () {
    waitAsyncCalls().then(function () {
      expect(communityPage.joinLink().isDisplayed()).toEqual(true);
    });
  });

  it('should allow user to leave communities', function () {
    waitAsyncCalls().then(function () {
      communityPage.joinLink().click();

      expect(communityPage.leaveLink().isDisplayed()).toEqual(true);
    });
  });
});
