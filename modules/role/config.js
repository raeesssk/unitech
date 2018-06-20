'use strict';
/* Account Module */
angular.module('role', [])
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
            
            .when('/role',
                {
                    templateUrl: 'modules/role/partials/role-list.html',
                    controller: 'roleListCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/role/controllers/role-list.js']
                            }]);
                        }]
                    }
                })

			.when('/role/add',
                {
                    templateUrl: 'modules/role/partials/role-add.html',
                    controller: 'roleAddCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/role/controllers/role-add.js']
                            }]);
                        }]
                    }
                })
				
			.when('/role/edit/:roleId',
                {
                    templateUrl: 'modules/role/partials/role-edit.html',
                    controller: 'roleEditCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/role/controllers/role-edit.js']
                            }]);
                        }]
                    }
                });
				
        }]);