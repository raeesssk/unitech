'use strict';
/* Account Module */
angular.module('quotation', [])
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
            
            .when('/quotation',
                {
                    templateUrl: 'modules/quotation/partials/quotation-list.html',
                    controller: 'quotationListCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/quotation/controllers/quotation-list.js']
                            }]);
                        }]
                    }
                })

			.when('/quotation/add',
                {
                    templateUrl: 'modules/quotation/partials/quotation-add.html',
                    controller: 'quotationAddCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/quotation/controllers/quotation-add.js']
                            }]);
                        }]
                    }
                })
				
			.when('/quotation/edit/:quotationId',
                {
                    templateUrl: 'modules/quotation/partials/quotation-edit.html',
                    controller: 'quotationEditCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/quotation/controllers/quotation-edit.js']
                            }]);
                        }]
                    }
                });
				
        }]);