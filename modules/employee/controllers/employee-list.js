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

                    $scope.employeeListcount = value.total;
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

    $scope.deleteEmployee = function (emp_id) {
      $('#confirm-delete').modal('show'); 
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

    $scope.viewEmployeeDetails = function(index){
        $scope.empList=[];
        $('#view-details').modal('show'); 
        $http({
          method: 'GET',
          url: $rootScope.baseURL+'/employee/'+$scope.filteredTodos[index].emp_id,
          //data: $scope.data,
          headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
        })
        .success(function(obj)
        {   
            obj.forEach(function(value, key){
              $scope.empList.push(value);
            });

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