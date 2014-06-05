'use strict';

angular.module('Models')

.run(['$rootScope', function ($rootScope) {
  $rootScope.countAsync = 0;

  (function(open) {
    XMLHttpRequest.prototype.open = function(method, url, async, user, pass) {
      if(method === 'POST') {
        $rootScope.countAsync += 1;

        this.addEventListener("load", function () {
          $rootScope.countAsync -= 1;
        }, false);

        this.addEventListener("error", function () {
          $rootScope.countAsync -= 1;
        }, false);

        this.addEventListener("abort", function () {
          $rootScope.countAsync -= 1;
        }, false);
      }

      open.call(this, method, url, async, user, pass);
    };
  })(XMLHttpRequest.prototype.open);
}]);
