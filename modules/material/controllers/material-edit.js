// import admin
angular.module('material').controller('materialEditCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {
  
  	$scope.materialId = $routeParams.materialId;
    $scope.apiURL = $rootScope.baseURL+'/material/edit/'+$scope.materialId;

    $scope.getMaterial = function () {
	      $http({
    	      method: 'GET',
    	      url: $rootScope.baseURL+'/material/'+$scope.materialId,
    	      headers: {'Content-Type': 'application/json',
                      'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
	      })
	      .success(function(materialObj)
	      {
    	    	materialObj.forEach(function (value, key) {
    	      		$scope.material = value;
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

    $scope.updateMaterial = function () {
    		var nameRegex = /^\d+$/;
        var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      
          if($('#mtm_name').val() == undefined || $('#mtm_name').val() == ""){
            var dialog = bootbox.dialog({
                message: '<p class="text-center">Please Enter Material Name!</p>',
                    closeButton: false
                });
                dialog.find('.modal-body').addClass("btn-danger");
                setTimeout(function(){
                    dialog.modal('hide'); 
                    $('#mtm_name').focus();
                }, 1500);
          }
        else if($('#mtm_density').val() == undefined || $('#mtm_density').val() == ""){
          var dialog = bootbox.dialog({
              message: '<p class="text-center">Please Enter Density!</p>',
                  closeButton: false
              });
              dialog.find('.modal-body').addClass("btn-danger");
              setTimeout(function(){
                  dialog.modal('hide'); 
                  $('#mtm_density').focus();
              }, 1500);
        }
        else if($('#mtm_price').val() == undefined || $('#mtm_price').val() == ""){
          var dialog = bootbox.dialog({
              message: '<p class="text-center">Please Enter Price / Hour!</p>',
                  closeButton: false
              });
              dialog.find('.modal-body').addClass("btn-danger");
              setTimeout(function(){
                  dialog.modal('hide'); 
                  $('#mtm_price').focus();
              }, 1500);
        }
	        else{
              $('#btnsave').attr('disabled','true');
              $('#btnsave').text("please wait...");

              $http({
                  method: 'POST',
                  url: $rootScope.baseURL+'/material/checkname',
                  data: $scope.material,
                  headers: {'Content-Type': 'application/json',
                          'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
              })
              .success(function(orderno)
              {
                  if(orderno.length > 1){
                      var dialog = bootbox.dialog({
                          message: '<p class="text-center">Material Already Exits!</p>',
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
                          data: $scope.material,
                          headers: {'Content-Type': 'application/json',
                                  'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
                      })
                      .success(function(login)
                      {     
                          var dialog = bootbox.dialog({
                              message: '<p class="text-center">Material Updated Successfully!</p>',
                              closeButton: false
                          });
                          dialog.find('.modal-body').addClass("btn-success");
                          setTimeout(function(){
                              dialog.modal('hide'); 
                          }, 1500);

                          $('#btnsave').text("Update");
                          $('#btnsave').removeAttr('disabled');
                          window.location.href = '#/material';  
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