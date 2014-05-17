'use strict';

var Home = require('./home.po.js');

describe('Home', function () {
  var home = new Home();

  beforeEach(function () {
    home.visit();
  });

  it('should login with facebook', function () {
    expect(home.loginButton.getText()).toEqual('Entrar');
    home.loginButton.click();

    home.logIn(function () {
      expect(home.logoutButton.getText()).toEqual('Sair');
    });
  });
});
