'use strict';

var Home = require('../../page_objects/home.js'),
  Community = require('../../page_objects/community.js');

describe('Home', function () {
  var home = new Home(),
    communityPage = new Community();

  beforeEach(function () {
    home.visit();
  });

  describe('authentication', function() {
    it('should logout', function () {
      home.logoutButton.click();

      expect(home.loginButton.getText()).toEqual('Entrar');
    });

    it('should login with facebook', function () {
      home.loginButton.click();
      browser.sleep(2000);
      expect(home.logoutButton.getText()).toEqual('Sair');
    });
  });

  describe('links to other pages', function() {
    it('should have a link to user edit page', function () {
      expect(home.userEditLink.isDisplayed()).toBeTruthy();
    });

    it('should have a link to communities page', function () {
      expect(home.communitiesLink.isDisplayed()).toBeTruthy();
    });
  });

  describe('communities', function() {
    beforeEach(function () {
      global.create(10).communities();
    });

    it("should show uses's communities", function () {
      communityPage.visit();
      browser.sleep(1000);

      communityPage.join(3).communities();
      browser.sleep(500);

      home.visit();
      browser.sleep(1000);

      expect(home.communities.count()).toEqual(3);
    });
  });
});
