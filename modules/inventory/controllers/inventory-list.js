// import admin
angular.module('inventory').controller('inventoryListCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route, $filter) {

    $scope.filteredTodos = [];
    $scope.currentPage = 1;
    $scope.maxSize = 5;
    $scope.entryLimit = 5;
    $scope.filterUser = 0;
    $scope.filterUserend = 1;
    $scope.numPerPage = 10;
    $scope.obj_Main = [];
    $scope.inventoryList = [];
    $scope.loading1 = 0;
    $scope.limit={};

  $scope.apiURL = $rootScope.baseURL+'/inventory/inventory/total';
      $scope.getAll = function () {
          if ($('#searchtext').val() == undefined || $('#searchtext').val() == "") {
            $scope.limit.search = "";
          }
          else{
            $scope.limit.search = $scope.searchtext;
          }
          $http({
            method: 'POST',
            url: $scope.apiURL,
            data:$scope.limit,
            headers: {'Content-Type': 'application/json',
                      'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
          })
          .success(function(category)
          {
            category.forEach(function (value, key) {
                $scope.inventoryListcount=value.total;
            });
            $scope.$watch("currentPage + numPerPage",
                function () {
                    $scope.resetpagination();
                });
                // $scope.$apply(); 
          })
          .error(function(data) 
          {   
              $scope.loading1 = 1;
              var dialog = bootbox.dialog({
                  message: '<p class="text-center">No Record Found!</p>',
                    closeButton: false
              });
              dialog.find('.modal-body').addClass("btn-danger");
              setTimeout(function(){
                  dialog.modal('hide'); 
              }, 1500);             
          });
      };

    $scope.resetpagination = function () {
        var begin = (($scope.currentPage - 1) * $scope.numPerPage);
        var end = begin + $scope.numPerPage;
        $scope.filterUserend = begin + 1;
        $scope.filterUser = end;
        if ($scope.filterUser >= $scope.inventoryListcount)
            $scope.filterUser = $scope.inventoryListcount;

              $scope.filteredTodos = [];
              $scope.limit.number = $scope.numPerPage;
              $scope.limit.begin = begin;
              $scope.limit.end = end;
              $http({
                method: 'POST',
                url: $rootScope.baseURL+'/inventory/inventory/limit',
                data: $scope.limit,
                headers: {'Content-Type': 'application/json',
                          'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
              })
              .success(function(inventory)
              {
                $scope.filteredTodos = [];
                if (inventory.length > 0) {
                    inventory.forEach(function (value, key) {
                        $scope.filteredTodos.push(value);
                    });
                }
                else{
                }
                // $scope.obj_Main = $scope.vendorList;
                    $scope.loading1 = 1;
                    // $scope.$apply(); 
              })
              .error(function(data) 
              {   
                  $scope.loading1 = 1;
                    var dialog = bootbox.dialog({
                    message: '<p class="text-center">Oops, Something Went Wrong! Please Refresh the Page.</p>',
                        closeButton: false
                    });
                    setTimeout(function(){
                        dialog.modal('hide'); 
                    }, 3001);             
              });
    };

    //search Data
    $scope.getSearch = function () {
        $scope.getAll();
    };

    $scope.deleteInventory = function (im_id) {
      $('#confirm-delete').modal('show');
        $scope.im_id=im_id;
    }  

    $rootScope.deleteConfirm = function () {
        $('#del').attr('disabled','true');
        $('#del').text("please wait...");
        $http({
            method: 'POST',
            url: $rootScope.baseURL+'/inventory/delete/'+$scope.im_id,
            headers: {'Content-Type': 'application/json',
                      'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
        })
        .success(function(inventoryObj)
        { 
            $('#del').text("Delete");
            $('#del').removeAttr('disabled');
            $scope.inventoryList = [];
            $scope.getAll();
            $('#confirm-delete').modal('hide');
        })
        .error(function(data) 
        {   
          var dialog = bootbox.dialog({
              message: '<p class="text-center">Oops, Something Went Wrong! Please Refresh the Page.</p>',
                  closeButton: false
          });
          setTimeout(function(){
              $('#del').text("Delete");
              $('#del').removeAttr('disabled');
              dialog.modal('hide'); 
          }, 1500);            
        });
     };

});