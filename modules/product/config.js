'use strict';
/* Account Module */
angular.module('product', [])
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
            
            .when('/product',
                {
                    templateUrl: 'modules/product/partials/product-list.html',
                    controller: 'productListCtrl',
                    resolve: resolve
                })

			.when('/product/add',
                {
                    templateUrl: 'modules/product/partials/product-add.html',
                    controller: 'productAddCtrl',
                    resolve: resolve
                })
				
			.when('/product/edit/:productId',
                {
                    templateUrl: 'modules/product/partials/product-edit.html',
                    controller: 'productEditCtrl',
                    resolve: resolve
                });
				
        }]);