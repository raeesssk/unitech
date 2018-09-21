// import admin
angular.module('admin').controller('dashboardCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route, $filter) {

  $('#customerindex').removeClass("active");
  $('#customeraddindex').removeClass("active");
  $('#customerlsitindex').removeClass("active");
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
  $('#dashboardindex').addClass("active");
	$scope.invoicereport = 0;
  $scope.designreport = 0;
  $scope.visareport = 0;
  $scope.hotelreport = 0;

  $scope.filteredTodos = [];
    $scope.currentPage = 1;
    $scope.maxSize = 5;
    $scope.entryLimit = 5;
    $scope.filterUser = 0;
    $scope.filterUserend = 1;
    $scope.numPerPage = 10;
    $scope.obj_Main = [];
    $scope.designList = [];
    $scope.loading1 = 0;
    $scope.limit={};
    $scope.design = {};

    /*$scope.getInvoiceReport = function() {
        $http({
          method: 'GET',
          url: $rootScope.baseURL+'/dashboard/invoicereport',
          headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
        })
        .success(function(invoicereport)
        {
            $scope.invoicereport = invoicereport.length;
        })
        .error(function(data) 
        {   
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Oops, Something Went Wrong!</p>',
                closeButton: false
            });
            setTimeout(function(){
                dialog.modal('hide');
            }, 1500);
        });
    };*/
    $scope.apiURL = $rootScope.baseURL+'/design/design/total';
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
                    $scope.designListcount=value.total;
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
          if ($scope.filterUser >= $scope.designListcount)
              $scope.filterUser = $scope.designListcount;
              $scope.filteredTodos = [];
              $scope.limit.number = $scope.numPerPage;
              $scope.limit.begin = begin;
              $scope.limit.end = end;
              $http({
                method: 'POST',
                url: $rootScope.baseURL+'/design/design/limit',
                data: $scope.limit,
                headers: {'Content-Type': 'application/json',
                          'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
              })
              .success(function(design)
              {
                  $scope.filteredTodos = [];
                  if (design.length > 0) {
                    design.forEach(function (value, key) {
                        $scope.filteredTodos.push(value);
                    });
                  }
                  else{
                  }
                  // $scope.obj_Main = $scope.vendorList;
                  $scope.loading1 = 1;
                  // $scope.$apply();
                  localStorage.setItem('designObj',JSON.stringify(design[0]) );
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

      $scope.viewDetails = function(index){
        $scope.personalDetails=[];
        // $scope.imageDetails=[];
      $scope.design = $scope.filteredTodos[index];
      $('#view_icon').modal('show'); 
        $http({
          method: 'GET',
          url: $rootScope.baseURL+'/design/details/'+$scope.filteredTodos[index].dm_id,
          //data: $scope.data,
          headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
        })
        .success(function(obj)
        {   
          $scope.totalqty = 0;
            obj.forEach(function(value, key){
              $scope.totalqty = parseInt($scope.totalqty + value.dtm_qty);
              $scope.personalDetails.push(value);
            });

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

      $scope.addQuotation =function(designObj){
        // console.log(designObj);
        $rootScope.designObj = designObj;
        window.location.href = "#/quotation/add";
      };
});