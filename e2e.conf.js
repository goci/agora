exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['spec/functional/*_spec.js'],
  capabilities: {
    'browserName': '<%= isRunningOnSnap ? "firefox" : "chrome" %>'
  }
};
