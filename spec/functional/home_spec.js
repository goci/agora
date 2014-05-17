'use strict';

describe('Home', function() {
  it('shows link for user to login', function() {
    browser.get('/');
    var command = element(by.css('[test-name="login-button"]')).getText();
    expect(command).toEqual('Entrar');
  });
});
