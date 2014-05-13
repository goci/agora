(function(global) {
  global.fbAsyncInit = function() {
    Parse.FacebookUtils.init({
      appId: config.facebookAppId,
      cookie: true,
      xfbml: true,
      version: 'v2.0'
    });
  };
})(window);
