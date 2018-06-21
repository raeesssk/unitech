'use strict';
/* Account Module */
angular.module('bill', [])
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
            
            .when('/bill',
                {
                    templateUrl: 'modules/bill/partials/bill-list.html',
                    controller: 'billListCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/bill/controllers/bill-list.js']
                            }]);
                        }]
                    }
                })

			.when('/bill/add',
                {
                    templateUrl: 'modules/bill/partials/bill-add.html',
                    controller: 'billAddCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/bill/controllers/bill-add.js']
                            }]);
                        }]
                    }
                })
				
			.when('/bill/edit/:billId',
                {
                    templateUrl: 'modules/bill/partials/bill-edit.html',
                    controller: 'billEditCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/bill/controllers/bill-edit.js']
                            }]);
                        }]
                    }
                });
				
        }]);