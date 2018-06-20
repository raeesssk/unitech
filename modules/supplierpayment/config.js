'use strict';
/* Account Module */
angular.module('supplierpayment', [])
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
            
            .when('/supplierpayment',
                {
                    templateUrl: 'modules/supplierpayment/partials/supplierpayment-list.html',
                    controller: 'supplierpaymentListCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/supplierpayment/controllers/supplierpayment-list.js']
                            }]);
                        }]
                    }
                })

			.when('/supplierpayment/add',
                {
                    templateUrl: 'modules/supplierpayment/partials/supplierpayment-add.html',
                    controller: 'supplierpaymentAddCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/supplierpayment/controllers/supplierpayment-add.js']
                            }]);
                        }]
                    }
                })
				
			.when('/supplierpayment/edit/:supplierpaymentId',
                {
                    templateUrl: 'modules/supplierpayment/partials/supplierpayment-edit.html',
                    controller: 'supplierpaymentEditCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/supplierpayment/controllers/supplierpayment-edit.js']
                            }]);
                        }]
                    }
                });
				
        }]);