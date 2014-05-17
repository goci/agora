'use strict';

var Home = function() {
  this.loginButton = element(by.css('[test-name="login-button"]'));
  this.logoutButton = element(by.css('[test-name="logout-button"]'));

  this.visit = function () {
    browser.get('/home.html');
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

      global.waitForUrl(/#\/$/).then(function () {
        callback();
      });
    });
  };
};

module.exports = Home;
