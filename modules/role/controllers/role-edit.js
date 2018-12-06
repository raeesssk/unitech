// import admin
angular.module('role').controller('roleEditCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {

    $scope.role={};
    $scope.permissionList=[];
  $scope.roleId = $routeParams.roleId;
  $scope.apiURL = $rootScope.baseURL+'/role/edit/'+$scope.roleId;
  

  $scope.getrole = function () {
       $http({
        method: 'GET',
        url: $rootScope.baseURL+'/role/'+$scope.roleId,
        headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
      })
      .success(function(roleobj)
      {
        roleobj.forEach(function (value, key) {
          $scope.role=value;
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

    scope.getPermission = function(index){

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
                                                    url: $rootScope.baseURL+'/role/permission/'+$scope.roleId,
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
                        url: $rootScope.baseURL+'/role/permission/'+$scope.roleId,
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

    $scope.getPermission();

  $scope.newpermission=[];
    $scope.removeoldpermission=[];
    $scope.removepermission=[];
    $scope.checkstatus = function(sub) {
        $scope.permissionList.forEach(function(value,key){
          value.subpermissions.forEach(function(value1,key1){
            if(value1.psm_select == false)
            {
              $scope.removeoldpermission.push(value1);
            }
            value1.SuperSubpermissions.forEach(function(value2,key2){
              if(value2.pssm_select == false)
              {
                $scope.removeoldpermission.push(value2);
              }
            });
          });
        });
        console.log($scope.removeoldpermission);
        if(sub.psm_select)
        {
          $scope.obj = {
            psm_pm_id : sub.psm_pm_id,
            psm_id : sub.psm_id
          }
            $scope.newpermission.push($scope.obj);
            console.log($scope.newpermission);
        }
        else if(sub.pssm_select)
        {
          $scope.obj = {
            psm_pm_id : sub.psm_pm_id,
            psm_id : sub.pssm_psm_id,
            pssm_id : sub.pssm_id
          }
            $scope.newpermission.push($scope.obj);
            console.log($scope.newpermission);
        }
        else if(sub.psm_select == false)
        {
          var index = $scope.newpermission.indexOf(sub);
          $scope.newpermission.splice(index); 
          console.log($scope.newpermission);
        }
        else if(sub.pssm_select == false)
        {
          var index = $scope.newpermission.indexOf(sub);
          $scope.newpermission.splice(index);
          console.log($scope.newpermission);
        }
    };

  $scope.updateRole = function () {

      var nameRegex = /^\d+$/;
      var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      
      if($('#rm_name').val() == undefined || $('#rm_name').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter Roll Name.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else if($('#rm_description').val() == undefined || $('#rm_description').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter Description.</p>',
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
                    permission:$scope.newpermission,
                    oldpermission:$scope.removeoldpermission
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
                .success(function(login)
                {
                        var dialog = bootbox.dialog({
                            message: '<p class="text-center">Role Updated Successfully!</p>',
                                closeButton: false
                            });
                            dialog.find('.modal-body').addClass("btn-success");
                            setTimeout(function(){
                                dialog.modal('hide'); 
                            }, 1500);
                        $('#btnsave').text("Update");
                        $('#btnsave').removeAttr('disabled');
                   window.location.href = '#/role';  
                })
                .error(function(data) 
                {   
                  var dialog = bootbox.dialog({
                      message: '<p class="text-center">Oops, Something Went Wrong! Please Refresh the Page.</p>',
                          closeButton: false
                      });
                      setTimeout(function(){
                        $('#btnsave').text("Update");
                        $('#btnsave').removeAttr('disabled');
                          dialog.modal('hide'); 
                      }, 1500);            
                });
    }
  };

});