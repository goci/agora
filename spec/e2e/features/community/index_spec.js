'use strict';

var Community = require('../../page_objects/community.js');

describe('Community', function () {
  var community = new Community(),
      count = 2;

  beforeEach(function () {
    global.create(count).communities(function () {
      community.visit();
    });
  });

  it('should list all communities', function () {
    browser.sleep(1000);
    expect(community.communities.count()).toEqual(count);
  });
});
