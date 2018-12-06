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
    $scope.permissionList=[];


   var permission=JSON.parse(localStorage.getItem('permission'));
  var value = '#/role';
  var access = permission.includes(value);
    $scope.getrolepermission=function(){
        if(access)
        {
          return true;
        }
        else
        {
          var dialog = bootbox.dialog({
          message: '<p class="text-center">You Are Not Authorized</p>',
              closeButton: false
          });
          dialog.find('.modal-body').addClass("btn-danger");
          setTimeout(function(){
              dialog.modal('hide'); 
          }, 1500);
          $location.path('/');
        }
          
    };
    $scope.getrolepermission();
  
    var supermission=JSON.parse(localStorage.getItem('supermission'));
    var editValue = 3;
    var deleteValue = 4;
    var checkedit = supermission.includes(editValue);
    var checkdelete = supermission.includes(deleteValue);
    $scope.getsupermission=function(){
          if(checkedit == false)
          {
            $scope.edithide=0;
          }
          if(checkdelete == false)
          {
            $scope.deletehide=0;
          }
          if($scope.deletehide == 0 && $scope.edithide == 0)
          {
            $scope.theadhide = 0;
          }

      };
      $scope.getsupermission();
    

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
          url: $rootScope.baseURL+'/role',
          //data: $scope.data,
          headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
        })
        .success(function(obj)
        {
                obj.forEach(function(value, key){
                  $http({
                    method: 'GET',
                    url: $rootScope.baseURL+'/role/subpermission/'+value.pm_id,
                    //data: $scope.data,
                    headers: {'Content-Type': 'application/json',
                            'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
                  })
                  .success(function(obj1)
                  {
                        value.subpermissions=[];
                        obj1.forEach(function(value1,key1){
                              value1.SuperSubpermissions=[];
                                $http({
                                      method: 'GET',
                                      url: $rootScope.baseURL+'/permission/supersub/'+value1.psm_id,
                                      //data: $scope.data,
                                      headers: {'Content-Type': 'application/json',
                                              'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
                                    })
                                    .success(function(obj2)
                                    {
                                            obj2.forEach(function(value2, key2){
                                              $http({
                                                    method: 'GET',
                                                    url: $rootScope.baseURL+'/role/permission/'+$scope.filteredTodos[index].rm_id,
                                                    //data: $scope.data,
                                                    headers: {'Content-Type': 'application/json',
                                                            'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
                                                  })
                                                  .success(function(obj3)
                                                  {
                                                        obj3.forEach(function(value3,key3){
                                                          
                                                          if(value2.pssm_id === value3.rpm_pssm_id)
                                                          {
                                                            value2.pssm_select = true;
                                                          }
                                                          
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

                                                value1.SuperSubpermissions.push(value2);
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
                            value.subpermissions.push(value1);
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
                  $scope.permissionList.push(value);
                });
                 $http({
                        method: 'GET',
                        url: $rootScope.baseURL+'/role/permission/'+$scope.filteredTodos[index].rm_id,
                        //data: $scope.data,
                        headers: {'Content-Type': 'application/json',
                                'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
                      })
                      .success(function(obj3)
                      {
                            obj3.forEach(function(value3,key3){
                              $scope.permissionList.forEach(function(value4,key4){
                                value4.subpermissions.forEach(function(val,key){
                                  if(value3.rpm_psm_id ==  val.psm_id)
                                  {
                                    val.psm_select=true;
                                  }
                                });
                              });
                              // if(value1.psm_id === value3.rpm_psm_id)
                              // {
                              //   value1.psm_select = true;
                              // }
                              // if(value2.pssm_id === value3.rpm_pssm_id)
                              // {
                              //   value2.pssm_select = true;
                              // }
                              
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