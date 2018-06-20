// import admin
angular.module('expense').controller('expenseCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route, $filter) {

  $('#dashboardindex').removeClass("active");
  $('#customerindex').removeClass("active");
  $('#customeraddindex').removeClass("active");
  $('#customerlsitindex').removeClass("active");
  $('#productindex').removeClass("active");
  $('#productaddindex').removeClass("active");
  $('#productlsitindex').removeClass("active");
  $('#invoiceindex').removeClass("active");
  $('#invoiceaddindex').removeClass("active");
  $('#invoicelistindex').removeClass("active");
  $('#cashbookaddindex').removeClass("active");
  $('#reportindex').removeClass("active");
  $('#reportinvoiceindex').removeClass("active");
  $('#cashbookindex').addClass("active");
  $('#cashbooklistindex').addClass("active");
  
  $scope.filteredTodos = [];
    $scope.currentPage = 1;
    $scope.maxSize = 5;
    $scope.entryLimit = 5;
    $scope.filterUser = 0;
    $scope.filterUserend = 1;
    $scope.numPerPage = 10;
    $scope.obj_Main = [];
    $scope.expenseList = [];
    $scope.loading1 = 0;
$scope.apiURL = $rootScope.baseURL+'/expense';
   $scope.getAll = function () {
        
      $http({
	      method: 'GET',
	      url: $scope.apiURL,
	      headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
	    })
	    .success(function(expense)
	    {
	      expense.forEach(function (value, key) {
                  $scope.expenseList.push(value);
              });

              $scope.$watch("currentPage + numPerPage",
                  function () {
                      var begin = (($scope.currentPage - 1) * $scope.numPerPage);
                      var end = begin + $scope.numPerPage;
                      $scope.filterUserend = begin + 1;
                      $scope.filterUser = end;
                      if ($scope.filterUser >= $scope.expenseList.length)
                          $scope.filterUser = $scope.expenseList.length;
                      $scope.filteredTodos = $scope.expenseList.slice(begin, end);
                  });
              $scope.obj_Main = $scope.expenseList;
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
        if ($scope.filterUser >= $scope.expenseList.length)
            $scope.filterUser = $scope.expenseList.length;
        $scope.filteredTodos = $scope.expenseList.slice(begin, end);
    };
    //search Data
    $scope.getSearch = function () {
        $scope.searchtext = $("#searchtext").val();
        $scope.expenseList = [];
        if ($scope.searchtext !== "") {
            for (var i = 0; i < $scope.obj_Main.length; i++) {
                if (String($scope.obj_Main[i].em_id).toLowerCase().includes($scope.searchtext.toLowerCase())
                    || String($scope.obj_Main[i].em_payment_mode).toLowerCase().includes($scope.searchtext.toLowerCase())
                    || String($scope.obj_Main[i].em_received_by).toLowerCase().includes($scope.searchtext.toLowerCase())
                    || String($scope.obj_Main[i].em_comment).toLowerCase().includes($scope.searchtext.toLowerCase())
                    || String($scope.obj_Main[i].em_credit).toLowerCase().includes($scope.searchtext.toLowerCase())
                    || String($scope.obj_Main[i].cm_name).toLowerCase().includes($scope.searchtext.toLowerCase())
                    || String($scope.obj_Main[i].em_cheque_no).toLowerCase().includes($scope.searchtext.toLowerCase())
                    || String($filter('date')($scope.obj_Main[i].em_date, "mediumDate")).toLowerCase().includes($scope.searchtext.toLowerCase())
                    || String($filter('date')($scope.obj_Main[i].em_cheque_date, "mediumDate")).toLowerCase().includes($scope.searchtext.toLowerCase())
                ) {
                    $scope.expenseList.push($scope.obj_Main[i]);
                }
            }
        }
        else {
            $scope.expenseList = [];
            $scope.expenseList = $scope.obj_Main;
        }
        $scope.resetpagination();
        $scope.$apply();
    };

    $scope.deleteExpense = function (em_id) {
      $scope.em_id=em_id;
    }  

    $scope.deleteConfirm = function () {
	     $http({
	      method: 'POST',
	      url: $rootScope.baseURL+'/expense/delete/'+$scope.em_id.em_id,
        data: $scope.em_id,
	      headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
	    })
	    .success(function(customerObj)
	    {
                $scope.expenseList = [];
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
                dialog.modal('hide'); 
            }, 1500);            
	    });
	};

});