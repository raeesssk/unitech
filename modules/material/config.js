'use strict';
/* Account Module */
angular.module('material', [])
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
            
            .when('/material',
                {
                    templateUrl: 'modules/material/partials/material-list.html',
                    controller: 'materialListCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/material/controllers/material-list.js']
                            }]);
                        }]
                    }
                })

			.when('/material/add',
                {
                    templateUrl: 'modules/material/partials/material-add.html',
                    controller: 'materialAddCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/material/controllers/material-add.js']
                            }]);
                        }]
                    }
                })
				
			.when('/material/edit/:materialId',
                {
                    templateUrl: 'modules/material/partials/material-edit.html',
                    controller: 'materialEditCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/material/controllers/material-edit.js']
                            }]);
                        }]
                    }
                });
				
        }]);