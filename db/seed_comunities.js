var Parse = require('parse').Parse,
    chance = new require('chance')(),
    config = require(__dirname + '/../parse/config/global.json').applications.agora_development;

Parse.initialize(config.applicationId, 'QJTBgCWm1GuM2qUUEOk5OIn6IPdXNbuLChh6etsY', config.masterKey);

var Community = Parse.Object.extend('Community');

module.exports = create;

function create(ammount) {
  return {
    communities: function() {
      for(var i = 0; i < ammount; i++) {
        new Community().save({
          name: chance.name()
        });
      }
    }
  }
}
