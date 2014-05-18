'use strict';

var Home = require('./../../page_objects/home.js');
var UserEdit = require('./../../page_objects/user_edit.js');

describe('UserEdit', function () {
  var home = new Home(),
    userEdit = new UserEdit();

  beforeEach(function () {
    home.visit();
    home.visitUserEdit();
    userEdit.fillName('Gorilao da Bola Azul');
    userEdit.selectState('Rio de Janeiro');
    userEdit.fillCity('Macae');
    userEdit.saveButton().click();
    browser.sleep(1000);
    home.visit();
    home.visitUserEdit();
  });

  it('show user data', function () {
    expect(userEdit.emailValue()).toEqual('gorilao_xdglemk_azul@tfbnw.net');
    userEdit.fillName('Gorilao da Bola Vermelha');
    userEdit.selectState('Pernambuco');
    userEdit.fillCity('Recife');
    userEdit.saveButton().click();
    browser.sleep(1000);
    home.visit();
    home.visitUserEdit();
    expect(userEdit.nameValue()).toEqual('Gorilao da Bola Vermelha');
    expect(userEdit.stateSelectedValue()).toEqual('Pernambuco');
    expect(userEdit.cityValue()).toEqual('Recife');
  });
});
