describe('Home', function() {
  it('shows link for user to login', function() {
    browser.get('http://tests.deliberare.com.br/');
    var command = element(by.css('.user-area')).getText();
    expect(command).toEqual('Entrar');
  });
});
