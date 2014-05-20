var Parse = require('parse').Parse,
    chance = new require('chance')(),
    config = require(__dirname+'/../parse/config/global.json').applications.agora_tests;

Parse.initialize(config.applicationId, 'S3nP3eZeGX20JKiJckO31z89ckOeBwmg19r37EfF', config.masterKey);


var Community = Parse.Object.extend('Community');


exports.cleanDb = cleanDb;
exports.create = create;

function cleanDb (callback) {
  [
    'Community'
  ].forEach(function (className) {

    new Parse.Query(className).find().then(function (data) {
      if(data.length === 0) {
        callback();
        return;
      }

      var finish = false;
      var length = data.length;
      for(var i = 0; i < length; i++) {
        if((i+1) === length)
          finish = true;

        data[i].destroy().then(function () {
          if(finish)
            callback();
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

        new Community().save({ name: chance.name() }).then(function () {
          if(lastRecord)
            callback();
        });
      }
    }
  }
}
