angular.module('Agora', ['ui.router', 'Routes', 'Helpers']);

angular.module('Routes', []);

angular.module('Helpers', ['Models']);

angular.module('Models', ['wrapParse']);



angular.module('Agora.site', ['ui.router', 'Helpers.site']);

angular.module('Helpers.site', ['Models'])
