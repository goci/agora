'use strict';

describe('Community', function () {
  var count = 2;

  beforeEach(function () {
    global.create(2).communities(function () {
      browser.get('#/communities');
    });
  });

  it('should list all the communities', function () {
    global.displays(element(by.css('[test-name="communities-list"]'))).then(function () {
      var communities = element.all(by.css('[test-name="communities-list"] li'));
      expect(communities.count()).toEqual(count);
    });
  });
});
