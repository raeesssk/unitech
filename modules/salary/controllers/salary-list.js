// import admin
angular.module('salary').controller('salaryListCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route, $filter) {

    $scope.filteredTodos = [];
    $scope.currentPage = 1;
    $scope.maxSize = 5;
    $scope.entryLimit = 5;
    $scope.filterUser = 0;
    $scope.filterUserend = 1;
    $scope.numPerPage = 10;
    $scope.obj_Main = [];
    $scope.salaryList = [];
    $scope.loading1 = 1;

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
    $scope.viewSalaryDetails($scope.ind);
  };

    $scope.apiURL = $rootScope.baseURL+'/salary';
   $scope.getAll = function () {
        
      $http({
	      method: 'GET',
	      url: $scope.apiURL,
	      headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
	    })
	    .success(function(salary)
	    {
	      salary.forEach(function (value, key) {
                  $scope.salaryList.push(value);
              });
              $scope.$watch("currentPage + numPerPage",
                  function () {
                      var begin = (($scope.currentPage - 1) * $scope.numPerPage);
                      var end = begin + $scope.numPerPage;
                      $scope.filterUserend = begin + 1;
                      $scope.filterUser = end;
                      if ($scope.filterUser >= $scope.salaryList.length)
                          $scope.filterUser = $scope.salaryList.length;
                      $scope.filteredTodos = $scope.salaryList.slice(begin, end);
                  });

              $scope.obj_Main = $scope.salaryList;
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
            }, 1500);             
	    });
    };

    //Pagination Function
    $scope.resetpagination = function () {
        var begin = (($scope.currentPage - 1) * $scope.numPerPage);
        var end = begin + $scope.numPerPage;
        $scope.filterUserend = begin + 1;
        $scope.filterUser = end;
        if ($scope.filterUser >= $scope.salaryList.length)
            $scope.filterUser = $scope.salaryList.length;
        $scope.filteredTodos = $scope.salaryList.slice(begin, end);
    };
    

    $scope.deleteSalary = function (cm_id) {
      $scope.cm_id=cm_id;
    }  

    $scope.deleteConfirm = function () {
                $('#del').attr('disabled','true');
                $('#del').text("please wait...");
	    //  $http({
	    //   method: 'POST',
	    //   url: $rootScope.baseURL+'/salary/delete/'+$scope.cm_id,
	    //   headers: {'Content-Type': 'application/json',
     //              'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
	    // })
	    // .success(function(salaryObj)
	    // {
     //            $('#del').text("Delete");
     //            $('#del').removeAttr('disabled');
     //            $scope.salaryList = [];
     //            $scope.getAll();
     //            $('#confirm-delete').modal('hide');
      		  
	    // })
	    // .error(function(data) 
	    // {   
	    //   var dialog = bootbox.dialog({
     //        message: '<p class="text-center">Oops, Something Went Wrong! Please Refresh the Page.</p>',
     //            closeButton: false
     //        });
     //        setTimeout(function(){
     //            $('#del').text("Delete");
     //            $('#del').removeAttr('disabled');
     //            dialog.modal('hide'); 
     //        }, 1500);            
	    // });
	};

  $scope.viewSalaryDetails1 = function (index) {
      $scope.ind = index;
    $('#user-datepicker-from').val("");
    $('#user-datepicker-to').val("");
    $scope.viewSalaryDetails(index);
  };

  // $scope.viewSalaryDetails = function (index) {
  //     $scope.venname = $scope.filteredTodos[index].cm_name;
  //     $scope.venno = $scope.filteredTodos[index].cm_mobile;
  //     $scope.venemail = $scope.filteredTodos[index].cm_email;
  //     $scope.venadd = $scope.filteredTodos[index].cm_address;
  //     $scope.venbal = $scope.filteredTodos[index].cm_balance;
  //     $scope.vendebit = $scope.filteredTodos[index].cm_debit;
  //     $scope.vencode = $scope.filteredTodos[index].cm_code;
  //     $scope.cmgst = $scope.filteredTodos[index].cm_gst;

  //     $scope.categoryList =[];
  //     $http({
  //       method: 'GET',
  //       url: $rootScope.baseURL+'/salary/details/'+$scope.filteredTodos[index].cm_id,
  //       headers: {'Content-Type': 'application/json',
  //                 'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
  //     })
  //     .success(function(categoryList)
  //     {
  //       // $scope.categoryList = angular.copy(categoryList);
  //       var amount_balance = 0;
  //         categoryList.forEach(function (value, key) {
  //           $scope.data = new Date(value.date);

  //           if(value.credit == 0)
  //           {
  //             amount_balance = parseInt(amount_balance) - parseInt(value.debit);
  //           }
  //           else if(value.debit == 0)
  //           {
  //             amount_balance = parseInt(amount_balance) + parseInt(value.credit);
  //           }
  //           if(amount_balance < 0)
  //           {
  //             Math.abs(amount_balance);
  //           value.bal = Math.abs(amount_balance);
  //             value.drcr="DR";
  //           }
  //           else{
  //             value.drcr="CR";
  //             value.bal = amount_balance;
  //           }
  //           if($scope.fDate <= $scope.data && $scope.tDate >= $scope.data)
  //           {
  //             $scope.categoryList.push(value);
  //           }
  //           else if($('#user-datepicker-from').val() == "" && $('#user-datepicker-to').val() == "")  
  //           {
  //             $scope.categoryList.push(value);
  //           }
  //         });
        
  //         $('#filter-user-btn').text("Filter");
  //         $('#filter-user-btn').removeAttr('disabled');
  //         $('#reset-user-btn').text("Reset");
  //         $('#reset-user-btn').removeAttr('disabled');
  //     })
  //     .error(function(data) 
  //     {
  //           var dialog = bootbox.dialog({
  //           message: '<p class="text-center">Oops, Something Went Wrong! Please Refresh the Page.</p>',
  //               closeButton: false
  //           });
  //           setTimeout(function(){
  //               dialog.modal('hide'); 
  //           }, 1500);
  //     });

  //   };


});