// import admin
angular.module('user').controller('userAddCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {

    $scope.user = {};
    $scope.roleList=[];
    $('#um_emp_id').focus();
  $scope.apiURL = $rootScope.baseURL+'/userm/add';

    $scope.getpermission=function(){
      if(localStorage.getItem('unitech_user_permission') == 0){
        alert('You are not authorized');
        window.location.href='#/';
      }
    };
    $scope.getpermission();
  
    $scope.getSearchEmp = function(vals) {

      var searchTerms = {search: vals};
      
        const httpOptions = {
          headers: {
            'Content-Type':  'application/json',
            'Authorization': 'Bearer '+localStorage.getItem("unitech_admin_access_token")
          }
        };
        return $http.post($rootScope.baseURL+'/employee/typeahead/search', searchTerms, httpOptions).then((result) => {
          
          return result.data;
      });
  };

  $scope.getrole = function(vals) {

      var searchTerms = {search: vals};
      
        const httpOptions = {
          headers: {
            'Content-Type':  'application/json',
            'Authorization': 'Bearer '+localStorage.getItem("unitech_admin_access_token")
          }
        };
        return $http.post($rootScope.baseURL+'/role/typeahead/search', searchTerms, httpOptions).then((result) => {
          
          return result.data;
      });
  };


    $scope.addUser = function () {

    var nameRegex = /^\d+$/;
      var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      
        if($('#um_emp_id').val() == undefined || $('#um_emp_id').val() == ""){
        var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter Employee Name!</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
                $('#um_emp_id').focus();
            }, 1500);
      }
      else if($('#um_username').val() == undefined || $('#um_username').val() == ""){
        var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter Username!</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
                $('#um_username').focus();
            }, 1500);
      }
      else if($('#um_password').val() == undefined || $('#um_password').val() == ""){
        var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter Password!</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
                $('#um_password').focus(); 
            }, 1500);
      }

      else if($('#um_confirm_password').val() == undefined || $('#um_confirm_password').val() == ""){
        var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Confirm  Password.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
                $('#um_confirm_password').focus(); 
            }, 1500);
      }
        else if($('#um_confirm_password').val() != $('#um_password').val()){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Password Entered Does Not Match.. Please Try Again</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-warning");
            setTimeout(function(){
                dialog.modal('hide');  
                $('#um_password').focus(); 
            }, 1500);
                $scope.user.um_password="";
                $scope.user.um_confirm_password="";
        }
        else if($('#um_rm_id').val() == undefined || $('#um_rm_id').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter Assign_role!</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
                $('#um_rm_id').focus(); 
            }, 1500);
        }
      else{
               
                $('#btnsave').attr('disabled','true');
                $('#btnsave').text("please wait...");
                    $http({
                      method: 'POST',
                      url: $rootScope.baseURL+'/userm/check/user',
                      data: $scope.user,
                      headers: {'Content-Type': 'application/json',
                              'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
                    })
                    .success(function(login)
                    {
                      if(login.length > 0)
                      {
                        var dialog = bootbox.dialog({
                          message: '<p class="text-center">User Already Exists.</p>',
                              closeButton: false
                          });
                          dialog.find('.modal-body').addClass("btn-danger");
                          $('#btnsave').removeAttr('disabled');
                          $('#btnsave').text("Save");
                          setTimeout(function(){
                            dialog.modal('hide');
                          $('#um_user_name').focus();
                          }, 1500);


                      }
                      else
                      {
                        $http({
                              method: 'POST',
                              url: $scope.apiURL,
                              data: $scope.user,
                              headers: {'Content-Type': 'application/json',
                                      'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
                            })
                            .success(function(login)
                            {
                                var dialog = bootbox.dialog({
                                message: '<p class="text-center">User Added Successfully!</p>',
                                    closeButton: false
                                });
                                dialog.find('.modal-body').addClass("btn-success");
                                setTimeout(function(){
                                    dialog.modal('hide'); 
                                }, 1500);
                                $('#btnsave').text("Save");
                                $('#btnsave').removeAttr('disabled');
                               window.location.href = '#/user';  
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
                      }
                        /*if()
                        {
                          var dialog = bootbox.dialog({
                          message: '<p class="text-center">Customer Already exists.</p>',
                              closeButton: false
                          });
                          setTimeout(function(){
                            console.log('test');
                              dialog.modal('hide'); 
                              $("#um_user_name").focus();
                          }, 1500);  
                        }
                        else
                        {
                              
                        } */        
                    })
                    .error(function(data) 
                    {   
                      var dialog = bootbox.dialog({
                        message: '<p class="text-center">Oops, Something Went Wrong! Please Refresh the Page.</p>',
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

  