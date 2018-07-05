'use strict';
/* Account Module */
angular.module('projectprocess', [])
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
            
            .when('/projectprocess',
                {
                    templateUrl: 'modules/projectprocess/partials/projectprocess-list.html',
                    controller: 'projectprocessListCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/projectprocess/controllers/projectprocess-list.js']
                            }]);
                        }]
                    }
                })

			.when('/projectprocess/add',
                {
                    templateUrl: 'modules/projectprocess/partials/projectprocess-add.html',
                    controller: 'projectprocessAddCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/projectprocess/controllers/projectprocess-add.js']
                            }]);
                        }]
                    }
                })
				
			.when('/projectprocess/edit/:projectprocessId',
                {
                    templateUrl: 'modules/projectprocess/partials/projectprocess-edit.html',
                    controller: 'projectprocessEditCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/projectprocess/controllers/projectprocess-edit.js']
                            }]);
                        }]
                    }
                });
				
        }]);