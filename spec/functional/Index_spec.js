describe('Index', function() {
  it('A valid test', function() {
    browser.get('http://tests.deliberare.com.br/');
    var name = element(by.binding('name')).getText();
    expect(name).toEqual('Olá, Deliberare! :)');
  });
});