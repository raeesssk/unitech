// import admin
angular.module('admin').controller('changePasswordCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {
	

  $scope.changePassword = function () {


	    if($('#password').val() === undefined || $('#password').val() === ""){
	    	var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter password.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
	    }
	    else if($('#conpassword').val() == undefined || $('#conpassword').val() == ""){
	    	var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter confirm password.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
	    }
	    else if($('#conpassword').val() != $('#password').val()){
	    	var dialog = bootbox.dialog({
            message: '<p class="text-center">the password and confirm password do not match.</p>',
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
            $scope.user.username = $rootScope.userid;
    		$http({
		      method: 'POST',
		      url: $rootScope.baseURL+'/login/changepassword',
		      data: $scope.user,
		      headers: {'Content-Type': 'application/json',
	                  'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
		    })
		    .success(function(login)
		    {
                $('#btnsave').text("Change Password");
                $('#btnsave').removeAttr('disabled');
		       window.location.href = '#/';  
		    })
		    .error(function(data) 
		    {   
		       var dialog = bootbox.dialog({
	            message: '<p class="text-center">Oops, Something Went Wrong!</p>',
	                closeButton: false
	            });
	            setTimeout(function(){
                $('#btnsave').text("Change Password");
                $('#btnsave').removeAttr('disabled');
	                dialog.modal('hide');  
	            }, 1500);             
		    });
		}
	    
	};

});