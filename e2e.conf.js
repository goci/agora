var baseUrl = process.env.SNAP_CI ? 'http://tests.deliberare.com.br/' : 'http://tests.deliberare.com.br/';
var ScreenshotReporter = require('./spec/e2e/reporters/ScreenshotReporter.js');

exports.config = {
  specs: ['spec/e2e/**/*_spec.js'],
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
    }
  }
};
