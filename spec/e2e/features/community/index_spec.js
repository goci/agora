'use strict';

describe('Community', function () {
  var count = 2;

  beforeEach(function () {
    var finish = false;

    runs(function () {
      global.create(count).communities(function () {
        finish = true;
      });
    });

    waitsFor(function () {
      return finish;
    });

    runs(function () {
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
