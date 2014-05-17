var baseUrl = process.env.SNAP_CI ? 'http://tests.deliberare.com.br/' : 'http://local.deliberare.com.br:8000/';

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
