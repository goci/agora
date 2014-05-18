'use strict';

function field(owner, modelName, fieldName) {

  var modelName = modelName + '.' + fieldName;

  function fieldElement() {
    return element(by.model(modelName));
  }

  owner[(fieldName + 'Element')] = fieldElement;

  var capitalizedFieldName = fieldName.charAt(0).toUpperCase() + fieldName.slice(1);

  owner['fill' + capitalizedFieldName] = function (newValue) {
    fieldElement().clear().then(function () {
      fieldElement().sendKeys(newValue);
    });
  };

  owner['select' + capitalizedFieldName] = function (newValue) {
    fieldElement().findElement(by.xpath('option[text()="' + newValue + '"]')).then(function (option) {
      option.click();
    });
  };

  owner[fieldName + 'SelectedValue'] = function () {
    return element(by.selectedOption(modelName)).getText();
  };

  owner[fieldName + 'Value'] = function () {
    return fieldElement().getAttribute('value');
  };
}

var UserEdit = function () {

  field(this, 'user', 'name');
  field(this, 'user', 'email');
  field(this, 'user', 'state');
  field(this, 'user', 'city');

  this.saveButton = function () {
    return element(by.css('input[type=submit]'));
  };
};

module.exports = UserEdit;
