var Parse = require('parse').Parse,
    chance = new require('chance')(),
    env = process.env.NODE_ENV || 'development',
    config = require(__dirname+'/../parse/config/global.json').applications['agora_' + env];


Parse.initialize(config.applicationId, config.jsKey, config.masterKey);


var Community = Parse.Object.extend('Community');


exports.cleanDb = cleanDb;
exports.create = create;

function cleanDb (callback) {
  [
    'Community'
  ].forEach(function (className) {

    new Parse.Query(className).find().then(function (data) {
      if(data.length === 0) {
        callback && callback();
        return;
      }

      var finish = false;
      var length = data.length;
      for(var i = 0; i < length; i++) {
        if((i+1) === length)
          finish = true;

        data[i].destroy().then(function () {
          if(finish)
            callback && callback();
        });
      }
    });
  });
}

function create (amount) {
  return {
    communities: function (callback) {
      var lastRecord = false;

      for(var i = 0; i < amount; i++) {
        if((i+1) === amount)
          lastRecord = true;

        new Community().save({
          name: chance.name(),
          description: chance.sentence({words: 6})
        }).then(function () {
          if(lastRecord)
            callback && callback();
        });
      }
    }
  }
}
