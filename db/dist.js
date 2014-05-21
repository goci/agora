var Parse = require('parse').Parse,
    chance = new require('chance')(),
    env = process.env.NODE_ENV || 'development',
    config = require(__dirname + '/../parse/config/global.json').applications['agora_' + env];


Parse.initialize(config.applicationId, config.jsKey, config.masterKey);


var Db = new Db({
  Community: {
    name: Db.name,
    description: Db.tinyText
  }
});


function Db (classes) {
  if(!classes) throw 'You must specify your classes';

  var classesNames = classes && Object.keys(classes) || [];
  var classes = opts.classes || {}

  this.cleanDb = function (callback) {
    this.classesNames.forEach(function (name) {
      new Parse.Query(name).find().then(function (data) {
        var promises = [];

        data.forEach(function (record) {
          promises.push(record.destroy());
        });

        return Parse.Promise.when(promises);

      }).then(function () {
        callback && callback();
      });
    });
  };

  this.create = function (amount) {
    var self = this;
    var returns = {};

    this.models.forEach(function (className) {
      returns[className] = function (callback) {
        var lastRecord = false;

        for(var i = 0; i < amount; i++) {
          if((i+1) === amount)
            lastRecord = true;

          new self.models[className]().save({
            name: chance.name(),
            description: chance.sentence({words: 6})
          }).then(function () {
            if(lastRecord)
              callback && callback();
          });
        }
      };

      return returns;
    });
  };
}

module.exports = Db;




window.settings = {
  functionName: 'clickedOnItem'
};

function clickedOnItem (nodeId) {}

var fn = window[settings.functionName];

if(typeof fn === 'function') {
    fn(t.parentNode.id);
}
