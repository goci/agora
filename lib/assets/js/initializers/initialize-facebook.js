(function(global) {
  global.fbAsyncInit = function() {
    Parse.FacebookUtils.init({
      appId: config.facebookAppId,
      status: true,
      cookie: true,
      xfbml: true,
      version: 'v2.0'
    });
  };
})(window);
