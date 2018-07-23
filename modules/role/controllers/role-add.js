// import admin
angular.module('role').controller('roleAddCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {

    $scope.role = {};
    $scope.permissionList=[];

  $scope.apiURL = $rootScope.baseURL+'/role/add';
    
    $scope.getPermission = function(){
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

    $scope.checkstatus = function() {
        $scope.permissionList.forEach(function(value, key){
            if (value.pm_add == true){
                value.pm_add1=1;
            }
            else{
                value.pm_add1=0;
            }
            if (value.pm_edit == true){
                value.pm_edit1=1;
            }
            else{
                value.pm_edit1=0;
            }

            if (value.pm_delete == true){
                value.pm_delete1=1;
            }
            else{
                value.pm_delete1=0;
            }
            if (value.pm_list == true){
                value.pm_list1=1;
            }
            else{
                value.pm_list1=0;
            }
        });
    };
    

    $scope.addRole = function () {
    var nameRegex = /^\d+$/;
      var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      
        if($('#rm_name').val() == undefined || $('#rm_name').val() == ""){
        var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter Role Name.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
      }
      else if($('#rm_description').val() == undefined || $('#rm_description').val() == ""){
        var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter Role Discription.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
      }
      else{
                
                
                $scope.obj={
                    role:$scope.role,
                    permission:$scope.permissionList
                }

                $('#btnsave').attr('disabled','true');
                $('#btnsave').text("please wait...");

                $http({
                  method: 'POST',
                  url: $scope.apiURL,
                  data: $scope.obj,
                  headers: {'Content-Type': 'application/json',
                          'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
                })
                .success(function(roles)
                {
                        
                        $('#btnsave').text("SAVE");
                        $('#btnsave').removeAttr('disabled');
                        window.location.href = '#/role';  
                    
                })
                .error(function(data) 
                {   
                    var dialog = bootbox.dialog({
                    message: '<p class="text-center">Oops, Something Went Wrong!</p>',
                        closeButton: false
                    });
                    setTimeout(function(){
                        $('#btnsave').text("SAVE");
                        $('#btnsave').removeAttr('disabled');
                        dialog.modal('hide');  
                    }, 1500);
                });
    }
  };

});