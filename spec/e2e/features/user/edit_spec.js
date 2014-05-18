'use strict';

var Home = require('./../../page_objects/home.js');
var UserEdit = require('./../../page_objects/user_edit.js');

describe('UserEdit', function () {
  var home = new Home(),
    userEdit = new UserEdit();

  beforeEach(function () {
    home.visit();
    home.visitUserEdit();
  });

  it('show user data', function () {
    expect(userEdit.nameInput()).toEqual('Gorilão da Bola Azul');
  });
});
