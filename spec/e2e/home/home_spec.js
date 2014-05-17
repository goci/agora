'use strict';

var Home = require('./home.po.js');

describe('Home', function () {
  var home = new Home();

  beforeEach(function() {
    home.visit();
  });

  it('shows link for user to login', function () {
    expect(home.loginButton.getText()).toEqual('Entrar');
  });

  it('should login with facebook', function () {
    home.loginButton.click();

    home.logIn(function() {
      expect(home.logoutButton.getText()).toEqual('Sair');
    });
  });
});
