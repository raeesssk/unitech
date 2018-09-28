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
                })
            .when('/designreport',
                {
                    templateUrl: 'modules/report/partials/design-report.html',
                    controller: 'designReportCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/report/controllers/design-report.js']
                            }]);
                        }]
                    }
                })
            .when('/quotationreport',
                {
                    templateUrl: 'modules/report/partials/quotation-report.html',
                    controller: 'quotationReportCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/report/controllers/quotation-report.js']
                            }]);
                        }]
                    }
                })
    }]);