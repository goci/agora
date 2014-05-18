'use strict';

var UserEdit = function () {

  this.nameInput = function () {
    return element(by.model('user.name')).getAttribute('value');
  };
};

module.exports = UserEdit;
