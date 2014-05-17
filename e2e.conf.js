var baseUrl = process.env.SNAP_CI ? 'http://tests.deliberare.com.br/' : 'http://local.deliberare.com.br:8000/';

exports.config = {
  specs: ['spec/functional/*_spec.js'],
  chromeOnly: true,
  chromeDriver: '/usr/local/bin/chromedriver',
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: ['no-sandbox']
    }
  },
  baseUrl: baseUrl
};
