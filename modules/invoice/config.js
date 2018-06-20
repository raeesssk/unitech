'use strict';
/* Account Module */
angular.module('invoice', [])
    .config(['$routeProvider', function config($routeProvider) {
        var resolve = {
            data: ["$q", "$location", function ($q, $location) {

            }]

        };

        $routeProvider
                
             .when('/invoice',
                {
                    templateUrl: 'modules/invoice/partials/invoice-list.html',
                    controller: 'invoiceCtrl',
                    resolve: resolve
                })

            .when('/invoice/add',
                {
                    templateUrl: 'modules/invoice/partials/invoice-add.html',
                    controller: 'invoiceAddCtrl',
                    resolve: resolve
                })

            .when('/invoice/edit/:smId',
                {
                    templateUrl: 'modules/invoice/partials/invoice-edit.html',
                    controller: 'invoiceEditCtrl',
                    resolve: resolve
                });
            
    }]);


