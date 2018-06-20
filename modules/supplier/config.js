'use strict';
/* Account Module */
angular.module('supplier', [])
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
            
            .when('/supplier',
                {
                    templateUrl: 'modules/supplier/partials/supplier-list.html',
                    controller: 'supplierListCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/supplier/controllers/supplier-list.js']
                            }]);
                        }]
                    }
                })

			.when('/supplier/add',
                {
                    templateUrl: 'modules/supplier/partials/supplier-add.html',
                    controller: 'supplierAddCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/supplier/controllers/supplier-add.js']
                            }]);
                        }]
                    }
                })
				
			.when('/supplier/edit/:supplierId',
                {
                    templateUrl: 'modules/supplier/partials/supplier-edit.html',
                    controller: 'supplierEditCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/supplier/controllers/supplier-edit.js']
                            }]);
                        }]
                    }
                });
				
        }]);