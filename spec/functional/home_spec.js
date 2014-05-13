describe('Home', function() {
  it('shows home', function() {
    browser.get('http://tests.deliberare.com.br/');
    var name = element(by.binding('name')).getText();
    expect(name).toEqual('Olá, Deliberare! :)');
  });
});
