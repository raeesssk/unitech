'use strict';
/* Account Module */
angular.module('quota', [])
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
            
            .when('/quota/pending',
                {
                    templateUrl: 'modules/quota/partials/quota-list.html',
                    controller: 'quotaListCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/quota/controllers/quota-list.js']
                            }]);
                        }]
                    }
                })
            .when('/quota/approve',
                {
                    templateUrl: 'modules/quota/partials/quota-list-approve.html',
                    controller: 'quotaApproveListCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/quota/controllers/quota-list-approve.js']
                            }]);
                        }]
                    }
                })
            .when('/quota/disapprove',
                {
                    templateUrl: 'modules/quota/partials/quota-list-disapprove.html',
                    controller: 'quotaDisApproveListCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/quota/controllers/quota-list-disapprove.js']
                            }]);
                        }]
                    }
                })

			.when('/quota/add/',
                {
                    templateUrl: 'modules/quota/partials/quota-add.html',
                    controller: 'quotaAddCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/quota/controllers/quota-add.js']
                            }]);
                        }]
                    }
                })
				
			.when('/quota/edit/:quotaId',
                {
                    templateUrl: 'modules/quota/partials/quota-edit.html',
                    controller: 'quotaEditCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/quota/controllers/quota-edit.js']
                            }]);
                        }]
                    }
                });
				
        }]);