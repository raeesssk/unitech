'use strict';
/* Account Module */
angular.module('rawmaterial', [])
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
            
            .when('/rawmaterial',
                {
                    templateUrl: 'modules/rawmaterial/partials/rawmaterial-list.html',
                    controller: 'rawmaterialListCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/rawmaterial/controllers/rawmaterial-list.js']
                            }]);
                        }]
                    }
                })

			.when('/rawmaterial/add',
                {
                    templateUrl: 'modules/rawmaterial/partials/rawmaterial-add.html',
                    controller: 'rawmaterialAddCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/rawmaterial/controllers/rawmaterial-add.js']
                            }]);
                        }]
                    }
                })
				
			.when('/rawmaterial/edit/:rawmaterialId',
                {
                    templateUrl: 'modules/rawmaterial/partials/rawmaterial-edit.html',
                    controller: 'rawmaterialEditCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/rawmaterial/controllers/rawmaterial-edit.js']
                            }]);
                        }]
                    }
                });
				
        }]);