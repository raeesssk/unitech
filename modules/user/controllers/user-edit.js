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
                value.um_username=value.username;
                value.um_password=value.password;
                value.um_rm_id=value.rm_name;
                value.um_confirm_password=value.password;
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

  $scope.updateUser = function () {

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
              url: $scope.apiURL,
              data: $scope.user,
              headers: {'Content-Type': 'application/json',
                      'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
            })
            .success(function(login)
            {   
                var dialog = bootbox.dialog({
                    message: '<p class="text-center">User Updated Successfully!</p>',
                        closeButton: false
                    });
                    dialog.find('.modal-body').addClass("btn-success");
                    setTimeout(function(){
                        dialog.modal('hide'); 
                    }, 1500);
                $('#btnsave').text("Update");
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
                $('#btnsave').text("Update");
                $('#btnsave').removeAttr('disabled');
                    dialog.modal('hide'); 
                }, 1500);            
            });
        }
    };

});