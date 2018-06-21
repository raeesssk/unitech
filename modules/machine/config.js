'use strict';
/* Account Module */
angular.module('machine', [])
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
            
            .when('/machine',
                {
                    templateUrl: 'modules/machine/partials/machine-list.html',
                    controller: 'machineListCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/machine/controllers/machine-list.js']
                            }]);
                        }]
                    }
                })

			.when('/machine/add',
                {
                    templateUrl: 'modules/machine/partials/machine-add.html',
                    controller: 'machineAddCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/machine/controllers/machine-add.js']
                            }]);
                        }]
                    }
                })
				
			.when('/machine/edit/:machineId',
                {
                    templateUrl: 'modules/machine/partials/machine-edit.html',
                    controller: 'machineEditCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/machine/controllers/machine-edit.js']
                            }]);
                        }]
                    }
                });
				
        }]);