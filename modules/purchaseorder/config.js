'use strict';
/* Account Module */
angular.module('purchaseorder', [])
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
            
            .when('/purchaseorder',
                {
                    templateUrl: 'modules/purchaseorder/partials/purchaseorder-list.html',
                    controller: 'purchaseorderListCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/purchaseorder/controllers/purchaseorder-list.js']
                            }]);
                        }]
                    }
                })

			.when('/purchaseorder/add',
                {
                    templateUrl: 'modules/purchaseorder/partials/purchaseorder-add.html',
                    controller: 'purchaseorderAddCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/purchaseorder/controllers/purchaseorder-add.js']
                            }]);
                        }]
                    }
                })
				
			.when('/purchaseorder/edit/:purchaseorderId',
                {
                    templateUrl: 'modules/purchaseorder/partials/purchaseorder-edit.html',
                    controller: 'purchaseorderEditCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/purchaseorder/controllers/purchaseorder-edit.js']
                            }]);
                        }]
                    }
                });
				
        }]);