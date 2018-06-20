'use strict';
/* Account Module */
angular.module('expense', [])
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
            
            .when('/expense',
                {
                    templateUrl: 'modules/expense/partials/expense-list.html',
                    controller: 'expenseCtrl',
                    resolve: resolve
                })

			.when('/expense/add',
                {
                    templateUrl: 'modules/expense/partials/expense-add.html',
                    controller: 'expenseAddCtrl',
                    resolve: resolve
                })
				
			.when('/expense/edit/:emId',
                {
                    templateUrl: 'modules/expense/partials/expense-edit.html',
                    controller: 'expenseEditCtrl',
                    resolve: resolve
                });
				
        }]);