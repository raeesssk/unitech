// import admin
angular.module('machine').controller('machineEditCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {
  
  	$scope.machineId = $routeParams.userId;
    $scope.apiURL = $rootScope.baseURL+'/machine/edit/'+$scope.machineId;

    $scope.getMachine = function () {
	      $http({
    	      method: 'GET',
    	      url: $rootScope.baseURL+'/machine/'+$scope.machineId,
    	      headers: {'Content-Type': 'application/json',
                      'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
	      })
	      .success(function(machineObj)
	      {
    	    	machineObj.forEach(function (value, key) {
    	      		$scope.machine = value;
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

    $scope.updateMachine = function () {
    		var nameRegex = /^\d+$/;
        var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      
          if($('#mm_machine_name').val() == undefined || $('#mm_machine_name').val() == ""){
              var dialog = bootbox.dialog({
                  message: '<p class="text-center">Please Enter Machine Name!</p>',
                  closeButton: false
              });
              dialog.find('.modal-body').addClass("btn-danger");
              setTimeout(function(){
                  dialog.modal('hide'); 
                  $('#mm_machine_name').focus();
              }, 1500);
          }
          else if($('#mm_price').val() == undefined || $('#mm_price').val() == ""){
              var dialog = bootbox.dialog({
                  message: '<p class="text-center">Please Enter Price / Hour!</p>',
                  closeButton: false
              });
              dialog.find('.modal-body').addClass("btn-danger");
              setTimeout(function(){
                  dialog.modal('hide'); 
                  $('#mm_price').focus();
              }, 1500);
          }
	        else{
              $('#btnsave').attr('disabled','true');
              $('#btnsave').text("please wait...");

              $http({
                  method: 'POST',
                  url: $rootScope.baseURL+'/machine/checkname',
                  data: $scope.machine,
                  headers: {'Content-Type': 'application/json',
                          'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
              })
              .success(function(orderno)
              {
                  if(orderno.length > 1){
                      var dialog = bootbox.dialog({
                          message: '<p class="text-center">Machine Already Exits!</p>',
                          closeButton: false
                      });
                      dialog.find('.modal-body').addClass("btn-warning");
                      setTimeout(function(){
                          dialog.modal('hide'); 
                      }, 1500);

                      $('#btnsave').text("Update");
                      $('#btnsave').removeAttr('disabled');
                  }
                  else
                  {
                      $http({
                          method: 'POST',
                          url: $scope.apiURL,
                          data: $scope.machine,
                          headers: {'Content-Type': 'application/json',
                                  'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
                      })
                      .success(function(login)
                      {     
                          var dialog = bootbox.dialog({
                              message: '<p class="text-center">Machine Updated Successfully!</p>',
                              closeButton: false
                          });
                          dialog.find('.modal-body').addClass("btn-success");
                          setTimeout(function(){
                              dialog.modal('hide'); 
                          }, 1500);

                          $('#btnsave').text("Update");
                          $('#btnsave').removeAttr('disabled');
                          window.location.href = '#/machine';  
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
                    
              })
              .error(function(data) 
              {   
                  var dialog = bootbox.dialog({
                      message: '<p class="text-center">Oops, Something Went Wrong!</p>',
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