/*
 * Login Controller
 */
 //  angular.module('orientfurniture', []).controller('loginCtrl', function($scope, $http) {
function LoginCtrl($scope, $location, $http, $routeParams, $rootScope) {
    
	// $scope.apiURL = 'http://localhost:3002';
	$scope.apiURL = 'http://unitech.unitechautomations.com:3002';
	// $scope.apiURL = 'http://10.1.0.81:3002';

	// if(localStorage.getItem("unitech_admin_access_token") != null)
 //      {
 //          window.location = '/greenair/';
 //      }
  
  	$scope.login = function() {
        var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
  		if($scope.username == undefined || $scope.username == ""){
  			var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter email.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);  
  		}
  		else if(!emailRegex.test($scope.username)){
		     var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter a valid email.</p>',
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
			        	$scope.role_id = deliverycount[0].role_id;
			        	localStorage.setItem('unitech_admin_role',$scope.role_id);
				  	 	localStorage.setItem('unitech_admin_username', $scope.user);
				  	 	localStorage.setItem('unitech_admin_firstname', $scope.firstname);
				  	 	localStorage.setItem('unitech_admin_iconimage', $scope.iconimage);
				  	 	localStorage.setItem('unitech_admin_access_token', data.access_token);
				        localStorage.setItem('unitech_admin_expires_in', data.expires_in);
				        localStorage.setItem('unitech_admin_refresh_token', data.refresh_token);
				        localStorage.setItem('unitech_admin_token_type', data.token_type);
                $('#login').text("Login");
                $('#login').removeAttr('disabled');
				         // window.location = "/";
				         window.location = "unitech";
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


