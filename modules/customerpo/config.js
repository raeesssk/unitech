'use strict';
/* Account Module */
angular.module('customerpo', [])
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
            
            .when('/customerpo',
                {
                    templateUrl: 'modules/customerpo/partials/customerpo-list.html',
                    controller: 'customerpoListCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/customerpo/controllers/customerpo-list.js']
                            }]);
                        }]
                    }
                })

			.when('/customerpo/add',
                {
                    templateUrl: 'modules/customerpo/partials/customerpo-add.html',
                    controller: 'customerpoAddCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/customerpo/controllers/customerpo-add.js']
                            }]);
                        }]
                    }
                })
				
			.when('/customerpo/edit/:customerpoId',
                {
                    templateUrl: 'modules/customerpo/partials/customerpo-edit.html',
                    controller: 'customerpoEditCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/customerpo/controllers/customerpo-edit.js']
                            }]);
                        }]
                    }
                });
				
        }]);