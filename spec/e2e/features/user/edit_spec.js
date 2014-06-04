'use strict';

var UserEdit = require('../../page_objects/user_edit.js');

describe('UserEdit', function () {
  var userEdit = new UserEdit();

  beforeEach(function () {
    userEdit.visit();

    userEdit.fillName('Gorilao da Bola Azul');
    userEdit.selectState('Rio de Janeiro');
    userEdit.fillCity('Macae');
    userEdit.saveButton().click();

    browser.sleep(1000);
    userEdit.visit();
  });

  it('show user data', function () {
    expect(userEdit.emailValue()).toEqual('gorilao_xdglemk_azul@tfbnw.net');

    userEdit.fillName('Gorilao da Bola Vermelha');
    userEdit.selectState('Pernambuco');
    userEdit.fillCity('Recife');
    userEdit.saveButton().click();

    browser.sleep(1000);
    userEdit.visit();

    expect(userEdit.nameValue()).toEqual('Gorilao da Bola Vermelha');
    expect(userEdit.stateSelectedValue()).toEqual('Pernambuco');
    expect(userEdit.cityValue()).toEqual('Recife');
  });
});
