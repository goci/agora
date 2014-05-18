var baseUrl = process.env.SNAP_CI ? 'http://tests.deliberare.com.br/' : 'http://local.deliberare.com.br:8000/';
var ScreenshotReporter = require('./spec/e2e/reporters/ScreenshotReporter.js');

var Home = require('./spec/e2e/page_objects/home.js');

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
    global.baseUrl = baseUrl;

    browser.driver.manage().window().setSize(1280, 800);

    jasmine.getEnv().addReporter(new ScreenshotReporter("./tmp/agora/screenshots"));

    global.waitForUrl = function (urlRegex) {
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
    };

    var home = new Home();
    home.visit();
    home.loginButton.click();
    home.logIn();
  }
};
