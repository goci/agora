var Parse = require('parse').Parse,
    config = require(__dirname+'/../parse/config/global.json').applications.agora_development;

Parse.initialize(config.applicationId, 'QJTBgCWm1GuM2qUUEOk5OIn6IPdXNbuLChh6etsY', config.masterKey);

var Community = Parse.Object.extend('Community');

new Parse.Query(Community).find().then(function (data) {
  if(data.length === 0) return;

  for(var i in data) {
    data[i].destroy();
  }
});