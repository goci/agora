'use strict';

var Home = function () {
  this.loginButton = element(by.css('[test-name="login-button"]'));
  this.logoutButton = element(by.css('[test-name="logout-button"]'));
  this.userEditLink = element(by.css('a[href="#/user/edit"]'));
  this.communitiesLink = element(by.css('a[href="#/communities"]'));

  this.visit = function () {
    browser.get('/');
  };

  this.logIn = function (callback) {
    function find(fieldName) {
      return browser.driver.findElement(by.id(fieldName));
    }

    browser.getAllWindowHandles().then(function (handles) {
      browser.switchTo().window(handles[1]);

      find('email').sendKeys('gorilao_xdglemk_azul@tfbnw.net');
      find('pass').sendKeys('1234');
      find('loginbutton').click();

      browser.switchTo().window(handles[0]);

      browser.sleep(2000);
      if (callback) {
        callback();
      }
    });
  };
};

module.exports = Home;
