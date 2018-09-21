// import admin
angular.module('report').controller('designReportCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route, $filter) {

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

    $scope.filter = function () {
    $scope.toDate = $("#user-datepicker-to").val();
    $scope.fromDate = $("#user-datepicker-from").val();
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
      $scope.getAll();

      // $scope.draw();

    };

     //design details on typeahead select
    $scope.getDesignDetails=function(){

        $scope.personalDetails=[];

        $http({
              method: 'GET',
              url: $rootScope.baseURL+'/design/details/'+$scope.quotation.qm_dm_id.dm_id,
              headers: {'Content-Type': 'application/json',
                      'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
            })
            .success(function(design)
            {     

                 design.forEach(function(value,key){
                  value.flcuts = [];
                  value.turnings = [];
                  value.millings = [];
                  value.borings = [];
                  value.drillings = [];
                  value.tapings = [];
                  value.grindings = [];
                  value.cncs = [];
                  value.wires = [];
                  value.fabrications = [];
                  value.hards = [];
                  value.blacodisings = [];
                  value.punchings = [];
                  value.surfs = [];
                  value.qpmm_mm_hr = 0;
                  value.dtm_total_cost = 0;

                  value.qpm_fl_price = 250;
                  value.qpm_fl_qty = 0;
                  value.qpm_tn_price = 300;
                  value.qpm_tn_qty = 0;
                  value.qpm_ml_price = 50;
                  value.qpm_ml_qty = 0;
                  value.qpm_gd_price = 350;
                  value.qpm_gd_qty = 0;
                  value.qpm_cnc_price = 100;
                  value.qpm_cnc_qty = 0;
                  value.qpm_wire_price = 20;
                  value.qpm_wire_qty = 0;
                  value.qpm_fab_price = 75;
                  value.qpm_fab_qty = 0;
                  value.qpm_hard_price = 80;
                  value.qpm_hard_qty = 0;
                  value.qpm_bc_price = 150;
                  value.qpm_bc_qty = 0;
                  value.qpm_pc_price = 200;
                  value.qpm_pc_qty = 0;
                  value.qpm_surf_price = 250;
                  value.qpm_surf_qty = 0;
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
                  $('#btnsave').text("Save");
                  $('#btnsave').removeAttr('disabled');
                      dialog.modal('hide'); 
                  }, 1500);            
            });
    };
    Date.prototype.setFromDate = function() {
     var yyyy = this.getFullYear().toString();
     var mm = (this.getMonth()).toString(); // getMonth() is zero-based
     var dd  = this.getDate().toString();
     if(mm == 0){
      document.getElementById("user-datepicker-from").value = yyyy-1 +"-"+ ("12") +"-"+ (dd[1]?dd:"0"+dd[0]);
     }
     else{
      document.getElementById("user-datepicker-from").value = yyyy +"-"+ (mm[1]?mm:"0"+mm[0]) +"-"+ (dd[1]?dd:"0"+dd[0]);
     }
    };

    Date.prototype.setToDate = function() {
     var yyyy = this.getFullYear().toString();
     var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
     var dd  = this.getDate().toString();
     document.getElementById("user-datepicker-to").value = yyyy +"-"+ (mm[1]?mm:"0"+mm[0]) +"-"+ (dd[1]?dd:"0"+dd[0]);
    $scope.filter();
    };

    d = new Date();
    d.setFromDate();
    d.setToDate();

    $scope.reset = function()
    {
      $scope.toDate = "";
      $scope.fromDate = "";
      $('#user-datepicker-from').val("");
      $('#user-datepicker-to').val("");
      $scope.dateFilter = "";
        $('#reset-user-btn').attr('disabled','true');
        $('#reset-user-btn').text("please wait...");
        $scope.getAll();
    };


     //search Data
    $scope.getSearch = function () {
      $scope.getAll();
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

        // $http({
        //   method: 'GET',
        //   url: $rootScope.baseURL+'/design/details/images/'+$scope.filteredTodos[index].dm_id,
        //   //data: $scope.data,
        //   headers: {'Content-Type': 'application/json',
        //           'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
        // })
        // .success(function(obj)
        // {   
        //   $scope.design.totalqty = 0;
        //     obj.forEach(function(value, key){
        //       $scope.imageDetails.push(value);
        //     });

        // })
        // .error(function(data) 
        // {   
        //     var dialog = bootbox.dialog({
        //         message: '<p class="text-center">Oops, Something Went Wrong! Please Refresh the Page.</p>',
        //             closeButton: false
        //         });
        //         setTimeout(function(){
        //             dialog.modal('hide'); 
        //         }, 1500); 
        // });
    };

    $scope.addQuotation =function(){
       
        $http({
          method: 'GET',
          // url: $rootScope.baseURL+'/design/details/'+$scope.filteredTodos[index].dm_project_no,
          //data: $scope.data,
          headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
        })
        .success(function(obj)
        {   
           window.location.href = '#/quotation/add';

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