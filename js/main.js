angular.module('unitech',
    [
// External Dependencies
        'ngRoute',
        'oc.lazyLoad',
        // 'ngValidate',
        'ui.bootstrap',
        'angularFileUpload',
        'ngIdle',
        // 'ngAnimate',
        // 'toastr',
        //'Modular Dependencies',
        'customer',
        'employee',
        'machine',
        'inventory',
        'design',
        'quota',
        'quotation',
        'supplier',
        'material',
        'user',
        'role',
        'salary',
        'customerpayment',
        'supplierpayment',
        'bill',
        'purchaseorder',
        'customerpo',
        'materialreceived',
        'purchase',
        'projectprocess',
        'admin',
        'product',
        'invoice',
        'rawmaterial',
        'expense',
        'report',
    // ]).config(cityMotorRouter);

]).config(function($routeProvider, IdleProvider, KeepaliveProvider, $controllerProvider) {
  // configure Idle settings
  IdleProvider.idle(3600); // in seconds
  IdleProvider.timeout(5); // in seconds
  KeepaliveProvider.interval(2); // in seconds
  $controllerProvider.allowGlobals();
  $routeProvider
})
.run(function(Idle){
  // start watching when the app runs. also starts the Keepalive service by default.
  Idle.watch();
});
// function cityMotorRouter($routeProvider, IdleProvider, KeepaliveProvider, $controllerProvider) {
//     $controllerProvider.allowGlobals();
//     $routeProvider
// }

