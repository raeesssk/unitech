'use strict';
/* Account Module */
angular.module('salary', [])
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
            
            .when('/salary',
                {
                    templateUrl: 'modules/salary/partials/salary-list.html',
                    controller: 'salaryListCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/salary/controllers/salary-list.js']
                            }]);
                        }]
                    }
                })

			.when('/salary/add',
                {
                    templateUrl: 'modules/salary/partials/salary-add.html',
                    controller: 'salaryAddCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/salary/controllers/salary-add.js']
                            }]);
                        }]
                    }
                })
				
			.when('/salary/edit/:salaryId',
                {
                    templateUrl: 'modules/salary/partials/salary-edit.html',
                    controller: 'salaryEditCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/salary/controllers/salary-edit.js']
                            }]);
                        }]
                    }
                });
				
        }]);