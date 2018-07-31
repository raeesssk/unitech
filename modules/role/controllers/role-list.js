// import admin
angular.module('role').controller('roleListCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route, $filter) {
/*
  $('#dashboardindex').removeClass("active");
  $('#customeraddindex').removeClass("active");
  $('#productindex').removeClass("active");
  $('#productaddindex').removeClass("active");
  $('#productlsitindex').removeClass("active");
  $('#invoiceindex').removeClass("active");
  $('#invoiceaddindex').removeClass("active");
  $('#invoicelistindex').removeClass("active");
  $('#cashbookindex').removeClass("active");
  $('#cashbookaddindex').removeClass("active");
  $('#cashbooklistindex').removeClass("active");
  $('#reportindex').removeClass("active");
  $('#reportinvoiceindex').removeClass("active");
  $('#customerindex').addClass("active");
  $('#customerlsitindex').addClass("active");
    $scope.filteredTodos = [];
    $scope.currentPage = 1;
    $scope.maxSize = 5;
    $scope.entryLimit = 5;
    $scope.filterUser = 0;
    $scope.filterUserend = 1;
    $scope.numPerPage = 10;
    $scope.obj_Main = [];
    $scope.customerList = [];
    $scope.loading1 = 0;

$('#user-datepicker-from').datepicker({
 timepicker:false,
 format:'yyyy-mm-dd',
 maxDate:'+1970/01/02',
 scrollInput:false,
  autoclose: true
});

$('#user-datepicker-to').datepicker({
 timepicker:false,
 format:'yyyy-mm-dd',
 maxDate:'+1970/01/02',
 scrollInput:false,
  autoclose: true

});

$scope.filter = function()
  {
    $scope.toDate = document.getElementById("user-datepicker-to").value;
    $scope.fromDate = document.getElementById("user-datepicker-from").value;
    if(angular.isUndefined($scope.fromDate) || $scope.fromDate === null || $scope.fromDate == "")
      {
        var dialog = bootbox.dialog({
          message: '<p class="text-center">please select from-date.</p>',
              closeButton: false
          });
          dialog.find('.modal-body').addClass("btn-danger");
          setTimeout(function(){
              dialog.modal('hide'); 
          }, 1500);
        return;
      }

      if(angular.isUndefined($scope.toDate) || $scope.toDate === null || $scope.toDate == "")
      {
        var dialog = bootbox.dialog({
          message: '<p class="text-center">please select to-date.</p>',
              closeButton: false
          });
          dialog.find('.modal-body').addClass("btn-danger");
          setTimeout(function(){
              dialog.modal('hide'); 
          }, 1500);
        return;
      }

      $scope.dateFilter = '&startTime='+ $scope.fromDate + '&endTime=' + $scope.toDate;

      $scope.fDate = new Date($scope.fromDate);
      $scope.fDate.setHours(0,0,0,0);
      $scope.tDate = new Date($scope.toDate);
      $scope.tDate.setHours(0,0,0,0);
      if($scope.fDate > $scope.tDate)
      {
        var dialog = bootbox.dialog({
          message: '<p class="text-center">oops!!! to-date greater than from-date.</p>',
              closeButton: false
          });
          dialog.find('.modal-body').addClass("btn-danger");
          setTimeout(function(){
              dialog.modal('hide'); 
          }, 1500);
        return;
      }
      $('#filter-user-btn').attr('disabled','true');
      $('#filter-user-btn').text("please wait...");
      $('#view-details').modal('show');
    $scope.viewCustomerDetails($scope.ind);*/
      // $scope.getUser();

      // $scope.draw();

  //};

  // Date.prototype.setFromDate = function() {
  //  var yyyy = this.getFullYear().toString();
  //  var mm = (this.getMonth()).toString(); // getMonth() is zero-based
  //  var dd  = this.getDate().toString();
  //  document.getElementById("user-datepicker-from").value = yyyy +"-"+ (mm[1]?mm:"0"+mm[0]) +"-"+ (dd[1]?dd:"0"+dd[0]);
  // };

  // Date.prototype.setToDate = function() {
  //  var yyyy = this.getFullYear().toString();
  //  var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
  //  var dd  = this.getDate().toString();
  //  document.getElementById("user-datepicker-to").value = yyyy +"-"+ (mm[1]?mm:"0"+mm[0]) +"-"+ (dd[1]?dd:"0"+dd[0]);
  // $scope.filter();
  // };

  // d = new Date();
  // d.setFromDate();
  // d.setToDate();
$scope.filteredTodos = [];
    $scope.currentPage = 1;
    $scope.maxSize = 5;
    $scope.entryLimit = 5;
    $scope.filterUser = 0;
    $scope.filterUserend = 1;
    $scope.numPerPage = 10;
    $scope.obj_Main = [];
    $scope.roleList = [];
    $scope.roleListcount=0;
    $scope.permissionList=[];
    $scope.loading1 = 0;
    $scope.limit={};

$scope.apiURL = $rootScope.baseURL+'/role/role/total';

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
      .success(function(product)
      {
        product.forEach(function (value, key) {
                  $scope.roleListcount=value.total;
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
                     
      });
    };


   //Pagination Function
  
      $scope.resetpagination = function () {
        var begin = (($scope.currentPage - 1) * $scope.numPerPage);
        var end = begin + $scope.numPerPage;
        $scope.filterUserend = begin + 1;
        $scope.filterUser = end;
        if ($scope.filterUser >= $scope.roleListcount)
            $scope.filterUser = $scope.roleListcount;

              $scope.filteredTodos = [];
              $scope.limit.number = $scope.numPerPage;
              $scope.limit.begin = begin;
              $scope.limit.end = end;
              $http({
                method: 'POST',
                url: $rootScope.baseURL+'/role/role/limit',
                data: $scope.limit,
                headers: {'Content-Type': 'application/json',
                          'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
              })
              .success(function(user)
              {
                $scope.filteredTodos = [];
                if (user.length > 0) {
                 
                  user.forEach(function (value, key) {
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

    $scope.deleteRole = function (rm_id) {
      $scope.rm_id=rm_id;
    }  

    $rootScope.deleteConfirm = function () {
                $('#del').attr('disabled','true');
                $('#del').text("please wait...");
       $http({
        method: 'POST',
        url: $rootScope.baseURL+'/role/delete/'+$scope.rm_id,
        headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
      })
      .success(function(roleObj)
      {
                $('#del').text("Delete");
                $('#del').removeAttr('disabled');
                $scope.roleList = [];
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

  $scope.getPermission = function(index){

                $scope.permissionList=[];
        $http({
          method: 'GET',
          url: $rootScope.baseURL+'/permission/view/'+$scope.filteredTodos[index].rm_id,
          //data: $scope.data,
          headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
        })
        .success(function(obj)
        {

        
                obj.forEach(function(value, key){
                    if(value.rpm_add==1){
                      value.rpm_add = true;
                    }
                    if(value.rpm_edit==1){
                      value.rpm_edit = true;
                    }if(value.rpm_delete==1){
                      value.rpm_delete = true;
                    }if(value.rpm_list==1){
                      value.rpm_list = true;
                    }
                    $scope.permissionList.push(value);
                });

        })
        .error(function(data) 
        {   
            toastr.error('Oops, Something Went Wrong.', 'Error', {
                closeButton: true,
                progressBar: true,
                positionClass: "toast-top-center",
                timeOut: "500",
                extendedTimeOut: "500",
            });  
        });
    };

});