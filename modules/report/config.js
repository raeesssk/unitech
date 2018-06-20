'use strict';

/* Account Module */
angular.module('report', [])
    .config(['$routeProvider', function config($routeProvider) {
        var resolve = {
            data: ["$q", "$location", function ($q, $location) {
            
            }]

        };

        $routeProvider
            .when('/invoicereport',
                {
                    templateUrl: 'modules/report/partials/invoice-report.html',
                    controller: 'invoiceReportCtrl',
                    resolve: resolve
                });
    }]);