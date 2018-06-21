/*
 * Login Controller
 */
 //  angular.module('orientfurniture', []).controller('loginCtrl', function($scope, $http) {
function LoginCtrl($scope, $location, $http, $routeParams, $rootScope) {
    
	// $scope.apiURL = 'http://192.168.1.104:3000';
	$scope.apiURL = 'http://localhost:3002';

	// if(localStorage.getItem("unitech_admin_access_token") != null)
 //      {
 //          window.location = '/greenair/';
 //      }
  
  	$scope.login = function() {
  		if($scope.username == undefined || $scope.username == ""){
  			var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter username.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);  
  		}
  		else if($scope.password == undefined || $scope.password == ""){
  			var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter password..</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);  
  		}
  		else{
                $('#login').attr('disabled','true');
                $('#login').text("please wait...");
  			$http({
		          method: 'POST',
		          url: $scope.apiURL+"/oauth/token",
		          data: 'grant_type=password&username='+ encodeURIComponent($scope.username) +'&password='+ encodeURIComponent($scope.password),
		          headers: {'Content-Type': 'application/x-www-form-urlencoded',
	                    'Authorization' : 'Basic Y2xpZW50S2V5OmNsaWVudFNlY3JldEtleQ=='}
			 })
		  	 .success(function(data, status, headers, config)
		  	 {
		  	 	if($scope.username == 'admin'){

			        $http({
			          method: 'POST',
			          url: $scope.apiURL+'/login/isonline',
			          data: 'username='+$scope.username,
			          headers: {'Content-Type': 'application/x-www-form-urlencoded',
	                  'Authorization' :'Bearer '+data.access_token}
			        })
			        .success(function(deliverycount)
			        {	
			        	$scope.user = deliverycount[0].username;
			        	$scope.firstname = deliverycount[0].first_name;
			        	$scope.iconimage = deliverycount[0].icon_image;
				  	 	localStorage.setItem('unitech_admin_username', $scope.user);
				  	 	localStorage.setItem('unitech_admin_firstname', $scope.firstname);
				  	 	localStorage.setItem('unitech_admin_iconimage', $scope.iconimage);
				  	 	localStorage.setItem('unitech_admin_access_token', data.access_token);
				        localStorage.setItem('unitech_admin_expires_in', data.expires_in);
				        localStorage.setItem('unitech_admin_refresh_token', data.refresh_token);
				        localStorage.setItem('unitech_admin_token_type', data.token_type);
                $('#login').text("Login");
                $('#login').removeAttr('disabled');
				         window.location = "/unitech";
			        })
			        .error(function(data) 
			        {   
			            //console.log("url"+$scope.apiURL);
			            /*console.log("Oops, Something Went Wrong!");*/
			            var dialog = bootbox.dialog({
			            message: '<p class="text-center">Oops, Something Went Wrong!</p>',
			                closeButton: false
			            });
			            setTimeout(function(){
                $('#login').text("Login");
                $('#login').removeAttr('disabled');
			                dialog.modal('hide');
			            }, 3001);
			        });

		  	 		
		  	 	}
		  	 	else{
			  	 	$scope.username = undefined;
		  	 		$scope.password = undefined;
		  	 		localStorage.removeItem('unitech_admin_access_token');
			        localStorage.removeItem('unitech_admin_expires_in');
			        localStorage.removeItem('unitech_admin_refresh_token');
			        localStorage.removeItem('unitech_admin_token_type');
			  	 	localStorage.removeItem('unitech_admin_username');
			  	 	localStorage.removeItem('unitech_admin_firstname');
			  	 	localStorage.removeItem('unitech_admin_iconimage');
			        localStorage.clear();
			        var dialog = bootbox.dialog({
		            message: '<p class="text-center">You Are Not Right User To Login!</p>',
		                closeButton: false
		            });
		            setTimeout(function(){
                $('#login').text("Login");
                $('#login').removeAttr('disabled');
		                dialog.modal('hide'); 
		            }, 2000); 
		  	 	}
		  	 })
		  	 .error(function(data, status, headers, config)
		  	 {
		  	 	var dialog = bootbox.dialog({
	            message: '<p class="text-center">Invalid Username or Password</p>',
	                closeButton: false
	            });
	            setTimeout(function(){
                $('#login').text("Login");
                $('#login').removeAttr('disabled');
	                dialog.modal('hide'); 
	            }, 1500);
		     });
  		}
	}

}


