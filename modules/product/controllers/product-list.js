// import admin
angular.module('product').controller('productListCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route, $filter) {

  $('#dashboardindex').removeClass("active");
  $('#customerindex').removeClass("active");
  $('#customeraddindex').removeClass("active");
  $('#customerlsitindex').removeClass("active");
  $('#productaddindex').removeClass("active");
  $('#invoiceindex').removeClass("active");
  $('#invoiceaddindex').removeClass("active");
  $('#invoicelistindex').removeClass("active");
  $('#cashbookindex').removeClass("active");
  $('#cashbookaddindex').removeClass("active");
  $('#cashbooklistindex').removeClass("active");
  $('#reportindex').removeClass("active");
  $('#reportinvoiceindex').removeClass("active");
  $('#productindex').addClass("active");
  $('#productlsitindex').addClass("active");
    $scope.filteredTodos = [];
    $scope.currentPage = 1;
    $scope.maxSize = 5;
    $scope.entryLimit = 5;
    $scope.filterUser = 0;
    $scope.filterUserend = 1;
    $scope.numPerPage = 10;
    $scope.obj_Main = [];
    $scope.productList = [];
    $scope.loading1 = 0;

    $scope.apiURL = $rootScope.baseURL+'/product';
   $scope.getAll = function () {
        
      $http({
	      method: 'GET',
	      url: $scope.apiURL,
	      headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
	    })
	    .success(function(product)
	    {
	      product.forEach(function (value, key) {
                  $scope.productList.push(value);
              });
              $scope.$watch("currentPage + numPerPage",
                  function () {
                      var begin = (($scope.currentPage - 1) * $scope.numPerPage);
                      var end = begin + $scope.numPerPage;
                      $scope.filterUserend = begin + 1;
                      $scope.filterUser = end;
                      if ($scope.filterUser >= $scope.productList.length)
                          $scope.filterUser = $scope.productList.length;
                      $scope.filteredTodos = $scope.productList.slice(begin, end);
                  });

              $scope.obj_Main = $scope.productList;
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
        if ($scope.filterUser >= $scope.productList.length)
            $scope.filterUser = $scope.productList.length;
        $scope.filteredTodos = $scope.productList.slice(begin, end);
    };
    //search Data
    $scope.getSearch = function () {
        $scope.searchtext = $("#searchtext").val();
        $scope.productList = [];
        if ($scope.searchtext !== "") {
            for (var i = 0; i < $scope.obj_Main.length; i++) {
                if (String($scope.obj_Main[i].pm_name).toLowerCase().includes($scope.searchtext.toLowerCase())
                    || String($scope.obj_Main[i].pm_unit).toLowerCase().includes($scope.searchtext.toLowerCase())
                    || String($scope.obj_Main[i].pm_hsn).toLowerCase().includes($scope.searchtext.toLowerCase())
                    || String($scope.obj_Main[i].pm_price).toLowerCase().includes($scope.searchtext.toLowerCase())
                    || String($scope.obj_Main[i].pm_cgst).toLowerCase().includes($scope.searchtext.toLowerCase())
                    || String($scope.obj_Main[i].pm_sgst).toLowerCase().includes($scope.searchtext.toLowerCase())
                ) {
                    $scope.productList.push($scope.obj_Main[i]);
                }
            }
        }
        else {
            $scope.productList = [];
            $scope.productList = $scope.obj_Main;
        }
        $scope.resetpagination();
        $scope.$apply();
    };

    $scope.deleteProduct = function (pm_id) {
      $scope.pm_id=pm_id;
    }  

    $scope.deleteConfirm = function () {
                $('#del').attr('disabled','true');
                $('#del').text("please wait...");
	     $http({
	      method: 'POST',
	      url: $rootScope.baseURL+'/product/delete/'+$scope.pm_id,
	      headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
	    })
	    .success(function(customerObj)
	    {
                $('#del').text("Delete");
                $('#del').removeAttr('disabled');
                $scope.productList = [];
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