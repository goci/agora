var Parse = require('node-parse-api').Parse,
    chance = new require('chance')(),
    env = process.env.NODE_ENV || 'development',
    config = require(__dirname+'/../parse/config/global.json').applications.agora_development;

var app = new Parse(config.applicationId, config.masterKey);

create(10).communities();

function create(ammount) {
  return {
    communities: function() {
      for(var i = 0; i < ammount; i++) {
        app.insert('Community', { name: chance.name() }, function (err, res) {
          if(err)
            err = true
          else
            console.log('Object created: ' + res.objectId)
        });
      }
    }
  }
}
