// import admin
angular.module('user').controller('userEditCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {

  
  $scope.user={};
    $scope.usermId = $routeParams.usermId;
  $scope.apiURL = $rootScope.baseURL+'/userm/edit/'+$scope.usermId;

  $scope.preventPaste= function() {
 $('#um_user_password').bind('cut copy paste', function (e) {
        e.preventDefault();
    });
  $('#um_confirm_password').bind('cut copy paste', function (e) {
        e.preventDefault();
    });
}

$scope.getpermission=function(){
      if(localStorage.getItem('unitech_user_permission') == 0){
        alert('You are not authorized');
        window.location.href='#/';
      }
    };
    $scope.getpermission();

  $scope.getUser = function () {
         $http({
          method: 'GET',
          url: $rootScope.baseURL+'/userm/'+$scope.usermId,
          headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
        })
        .success(function(userobj)
        {
            userobj.forEach(function (value, key) {
                value.um_emp_id=value.emp_name;
                value.um_user_name=value.username;
                value.um_user_password=value.pass;

                value.um_rm_id=value.rm_name;
                $scope.user = value;
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


  $scope.updateUser = function () {

        var nameRegex = /^\d+$/;
        var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        if($('#um_emp_id').val() == undefined || $('#um_emp_id').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter employee name.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else if($('#um_user_name').val() == undefined || $('#um_user_name').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter username.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
      else if($('#um_user_password').val() == undefined || $('#um_user_password').val() == ""){
        var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter password.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
      }
        else if($('#um_confirm_password').val() == undefined || $('#um_confirm_password').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please confirm password.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else if($('#um_confirm_password').val() != $('#um_user_password').val()){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Password Does Not Match..!!!</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else if($('#um_rm_id').val() == undefined || $('#um_rm_id').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please assign role</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else{
                $('#btnsave').attr('disabled','true');
                $('#btnsave').text("please wait...");
            $http({
              method: 'POST',
              url: $scope.apiURL,
              data: $scope.user,
              headers: {'Content-Type': 'application/json',
                      'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
            })
            .success(function(login)
            {
                $('#btnsave').text("SAVE");
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
                $('#btnsave').text("SAVE");
                $('#btnsave').removeAttr('disabled');
                    dialog.modal('hide'); 
                }, 1500);            
            });
        }
    };

});