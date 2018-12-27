'use strict';
/* Account Module */
angular.module('materialreceived', [])
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
            
            .when('/materialreceived',
                {
                    templateUrl: 'modules/materialreceived/partials/materialreceived-list.html',
                    controller: 'materialreceivedListCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/materialreceived/controllers/materialreceived-list.js']
                            }]);
                        }]
                    }
                })

			.when('/materialreceived/add',
                {
                    templateUrl: 'modules/materialreceived/partials/materialreceived-add.html',
                    controller: 'materialreceivedAddCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/materialreceived/controllers/materialreceived-add.js']
                            }]);
                        }]
                    }
                })
				
			.when('/materialreceived/edit/:materialreceivedId',
                {
                    templateUrl: 'modules/materialreceived/partials/materialreceived-edit.html',
                    controller: 'materialreceivedEditCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/materialreceived/controllers/materialreceived-edit.js']
                            }]);
                        }]
                    }
                });
				
        }]);