'use strict';
/* Account Module */
angular.module('design', [])
    .config(['$routeProvider', function config($routeProvider) {
        var resolve = {
            data: ["$q", "$location", function ($q, $location) {
              /*  if (!localStorageService.get('kayre_access_token')) {
                    alert("Your session has been expired");
                    window.location = 'login.html';
                    return $q.defer.promise;
                }*/

            }]

        };

        $routeProvider
            
            .when('/design',
                {
                    templateUrl: 'modules/design/partials/design-list.html',
                    controller: 'designListCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/design/controllers/design-list.js']
                            }]);
                        }]
                    }
                })

			.when('/design/add',
                {
                    templateUrl: 'modules/design/partials/design-add.html',
                    controller: 'designAddCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/design/controllers/design-add.js']
                            }]);
                        }]
                    }
                })
				
			.when('/design/edit/:designId',
                {
                    templateUrl: 'modules/design/partials/design-edit.html',
                    controller: 'designEditCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/design/controllers/design-edit.js']
                            }]);
                        }]
                    }
                });
				
        }]);