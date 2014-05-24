(function () {
  'use strict';

  var Parse = require('parse').Parse,
    Q = require('q'),
    _ = require('lodash'),
    Chance = require('Chance'),
    env = process.env.NODE_ENV || 'development',
    config = require(__dirname + '/../parse/config/global.json').applications['agora_' + env],
    Community = Parse.Object.extend('Community');

  Parse.initialize(config.applicationId, config.jsKey, config.masterKey);

  function cleanDb(callback) {
    var classes = [
        'Community'
      ],
      cb = callback || _.noop;

    _.each(classes, function (className) {

      new Parse.Query(className).find().then(function (data) {
        Q.all(_.map(data, function (i) {
          i.destroy();
        })).then(cb);
      });
    });
  }

  function create(amount) {
    var chance = new Chance();

    return {
      communities: function (callback) {
        var cb = callback || _.noop;

        return Q.all(_.map(_.range(amount), function (i) {
          return new Community().save({
            name: chance.name(),
            description: chance.sentence({
              words: 6
            })
          });
        })).then(cb);
      }
    };
  }

  exports.cleanDb = cleanDb;
  exports.create = create;

}());
