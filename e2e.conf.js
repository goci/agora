process.env.NODE_ENV = 'tests';

var baseUrl = process.env.SNAP_CI ? 'http://tests.deliberare.com.br/' : 'http://local.deliberare.com.br:8000/';
var ScreenshotReporter = require('./spec/e2e/reporters/ScreenshotReporter.js');

var Db = require('./db/db');

var Home = require('./spec/e2e/page_objects/home.js');
var lodash = require('lodash');

exports.config = {
  specs: ['spec/e2e/features/**/*_spec.js'],
  chromeOnly: true,
  chromeDriver: '/usr/local/bin/chromedriver',
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: ['no-sandbox']
    }
  },
  baseUrl: baseUrl,

  onPrepare: function () {
    beforeEach(function () {
      cleanDb();
    });

    global.create = create;
    global.baseUrl = baseUrl;
    global._ = lodash;

    browser.driver.manage().window().setSize(1280, 800);

    jasmine.getEnv().addReporter(new ScreenshotReporter("./tmp/agora/screenshots"));

    global.waitForUrl = waitForUrl
    global.displays = displays

    var home = new Home();
    home.visit();
    home.loginButton.click();
    home.logIn();
  }
};

function cleanDb() {
  var finish = false;

  runs(function () {
    Db.cleanDb(function () {
      finish = true;
    });
  });

  waitsFor(function () {
    return finish;
  });
}

function displays(element) {
  return browser.wait(function () {
    return element.isDisplayed().then(function (visible) {
        return visible;
      },
      function () {
        return element.isDisplayed().then(function (visible) {
          return visible;
        });
      }
    );
  });
}

function waitForUrl(urlRegex) {
  var currentUrl;

  return browser.getCurrentUrl().then(function (url) {
      currentUrl = url;
    })
    .then(function () {
      return browser.wait(function () {
        return browser.getCurrentUrl().then(function (url) {
          return urlRegex.test(url);
        });
      });
    });
}

function create(amount) {
  var finish = false;

  return {
    communities: function (callback) {
      runs(function () {
        Db.create(amount).communities(function () {
          finish = true;
        });
      });

      waitsFor(function () {
        return finish;
      });

      runs(function () {
        callback && callback();
      });
    }
  }
}
