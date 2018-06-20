'use strict';
/* Account Module */
angular.module('customer', [])
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
            
            .when('/customer',
                {
                    templateUrl: 'modules/customer/partials/customer-list.html',
                    controller: 'customerListCtrl',
                    resolve: resolve
                })

			.when('/customer/add',
                {
                    templateUrl: 'modules/customer/partials/customer-add.html',
                    controller: 'customerAddCtrl',
                    resolve: resolve
                })
				
			.when('/customer/edit/:customerId',
                {
                    templateUrl: 'modules/customer/partials/customer-edit.html',
                    controller: 'customerEditCtrl',
                    resolve: resolve
                });
				
        }]);