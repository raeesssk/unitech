'use strict';
/* Account Module */
angular.module('user', [])
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
            
            .when('/user',
                {
                    templateUrl: 'modules/user/partials/user-list.html',
                    controller: 'userListCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/user/controllers/user-list.js']
                            }]);
                        }]
                    }
                })

			.when('/user/add',
                {
                    templateUrl: 'modules/user/partials/user-add.html',
                    controller: 'userAddCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/user/controllers/user-add.js']
                            }]);
                        }]
                    }
                })
				
			.when('/user/edit/:userId',
                {
                    templateUrl: 'modules/user/partials/user-edit.html',
                    controller: 'userEditCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/user/controllers/user-edit.js']
                            }]);
                        }]
                    }
                });
				
        }]);