// import admin
angular.module('employee').controller('employeeListCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route, $filter) {

    $scope.filteredTodos = [];
    $scope.currentPage = 1;
    $scope.maxSize = 5;
    $scope.entryLimit = 5;
    $scope.filterUser = 0;
    $scope.filterUserend = 1;
    $scope.numPerPage = 10;
    $scope.obj_Main = [];
    $scope.employeeList = [];
    $scope.loading1 = 0;
    $scope.limit={};

$scope.apiURL = $rootScope.baseURL+'/employee/employee/total';
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
                $scope.employeeListcount=value.total;
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
        if ($scope.filterUser >= $scope.employeeListcount)
            $scope.filterUser = $scope.employeeListcount;

              $scope.filteredTodos = [];
              $scope.limit.number = $scope.numPerPage;
              $scope.limit.begin = begin;
              $scope.limit.end = end;
              $http({
                method: 'POST',
                url: $rootScope.baseURL+'/employee/employee/limit',
                data: $scope.limit,
                headers: {'Content-Type': 'application/json',
                          'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
              })
              .success(function(employee)
              {
                $scope.filteredTodos = [];
                if (employee.length > 0) {
                 
                  employee.forEach(function (value, key) {
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
    $scope.viewEmployeeDetails($scope.ind);
      // $scope.getUser();

      // $scope.draw();

  };

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

  $scope.reset = function()
  {
    $scope.toDate = "";
    $scope.fromDate = "";
    $('#user-datepicker-from').val("");
    $('#user-datepicker-to').val("");
    $scope.dateFilter = "";
      $('#reset-user-btn').attr('disabled','true');
      $('#reset-user-btn').text("please wait...");
      $('#view-details').modal('show');
    $scope.viewEmployeeDetails($scope.ind);
  };

  $scope.deleteEmployee = function (emp_id) {
      $scope.emp_id=emp_id;
    }  

  $rootScope.deleteConfirm = function () {
    $('#del').attr('disabled','true');
    $('#del').text("please wait...");
       $http({
        method: 'POST',
        url: $rootScope.baseURL+'/employee/delete/'+$scope.emp_id,
        headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
      })
      .success(function(employeeObj)
      {
                $('#del').text("Delete");
                $('#del').removeAttr('disabled');
                $scope.employeeList = [];
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

  $scope.viewEmployeeDetails1 = function (index) {
      $scope.ind = index;
    $('#user-datepicker-from').val("");
    $('#user-datepicker-to').val("");
    $scope.viewEmployeeDetails(index);
  };

  $scope.viewEmployeeDetails = function (index) {
      $scope.venname = $scope.filteredTodos[index].cm_name;
      $scope.venno = $scope.filteredTodos[index].cm_mobile;
      $scope.venemail = $scope.filteredTodos[index].cm_email;
      $scope.venadd = $scope.filteredTodos[index].cm_address;
      $scope.venbal = $scope.filteredTodos[index].cm_balance;
      $scope.vendebit = $scope.filteredTodos[index].cm_debit;
      $scope.vencode = $scope.filteredTodos[index].cm_code;
      $scope.cmgst = $scope.filteredTodos[index].cm_gst;

      $scope.categoryList =[];
      $http({
        method: 'GET',
        url: $rootScope.baseURL+'/employee/details/'+$scope.filteredTodos[index].cm_id,
        headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
      })
      .success(function(categoryList)
      {
        // $scope.categoryList = angular.copy(categoryList);
        var amount_balance = 0;
          categoryList.forEach(function (value, key) {
            $scope.data = new Date(value.date);

            if(value.credit == 0)
            {
              amount_balance = parseInt(amount_balance) - parseInt(value.debit);
            }
            else if(value.debit == 0)
            {
              amount_balance = parseInt(amount_balance) + parseInt(value.credit);
            }
            if(amount_balance < 0)
            {
              Math.abs(amount_balance);
            value.bal = Math.abs(amount_balance);
              value.drcr="DR";
            }
            else{
              value.drcr="CR";
              value.bal = amount_balance;
            }
            if($scope.fDate <= $scope.data && $scope.tDate >= $scope.data)
            {
              $scope.categoryList.push(value);
            }
            else if($('#user-datepicker-from').val() == "" && $('#user-datepicker-to').val() == "")  
            {
              $scope.categoryList.push(value);
            }
          });
        
          $('#filter-user-btn').text("Filter");
          $('#filter-user-btn').removeAttr('disabled');
          $('#reset-user-btn').text("Reset");
          $('#reset-user-btn').removeAttr('disabled');
      })
      .error(function(data) 
      {
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Oops, Something Went Wrong! Please Refresh the Page.</p>',
                closeButton: false
            });
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
      });

    };

 
});