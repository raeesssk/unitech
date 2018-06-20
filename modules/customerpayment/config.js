'use strict';
/* Account Module */
angular.module('customerpayment', [])
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
            
            .when('/customerpayment',
                {
                    templateUrl: 'modules/customerpayment/partials/customerpayment-list.html',
                    controller: 'customerpaymentListCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/customerpayment/controllers/customerpayment-list.js']
                            }]);
                        }]
                    }
                })

			.when('/customerpayment/add',
                {
                    templateUrl: 'modules/customerpayment/partials/customerpayment-add.html',
                    controller: 'customerpaymentAddCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/customerpayment/controllers/customerpayment-add.js']
                            }]);
                        }]
                    }
                })
				
			.when('/customerpayment/edit/:customerpaymentId',
                {
                    templateUrl: 'modules/customerpayment/partials/customerpayment-edit.html',
                    controller: 'customerpaymentEditCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/customerpayment/controllers/customerpayment-edit.js']
                            }]);
                        }]
                    }
                });
				
        }]);