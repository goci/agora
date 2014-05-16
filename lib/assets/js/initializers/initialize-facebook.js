(function (global) {
  'use strict';

  global.fbAsyncInit = function () {
    global.Parse.FacebookUtils.init({
      appId: global.config.facebookAppId,
      cookie: true,
      version: 'v2.0'
    });
  };

}(window));
