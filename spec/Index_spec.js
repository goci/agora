describe('Index', function() {
  it('A valid test', function() {
    browser.get('http://dev.deliberare.com.br/');
    var name = element(by.binding('name')).getText();
    expect(name).toEqual('Olá, Deliberare! :)');
  });
});