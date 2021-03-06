// import admin
angular.module('inventory').controller('inventoryEditCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {
  
  	$scope.inventoryId = $routeParams.inventoryId;
    $scope.apiURL = $rootScope.baseURL+'/inventory/edit/'+$scope.inventoryId;

    $scope.getInventory = function () {
	      $http({
    	      method: 'GET',
    	      url: $rootScope.baseURL+'/inventory/'+$scope.inventoryId,
    	      headers: {'Content-Type': 'application/json',
                      'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
	      })
	      .success(function(inventoryObj)
	      {
    	    	inventoryObj.forEach(function (value, key) {
                value.old_im_opening_quantity = value.im_opening_quantity;
    	      		$scope.inventory = value;
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

    $scope.updateInventory = function () {
    		var nameRegex = /^\d+$/;
        var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      
          if($('#im_part_no').val() == undefined || $('#im_part_no').val() == ""){
            var dialog = bootbox.dialog({
                message: '<p class="text-center">Please Enter Part Number!</p>',
                    closeButton: false
                });
                dialog.find('.modal-body').addClass("btn-danger");
                setTimeout(function(){
                    dialog.modal('hide'); 
                    $('#im_part_no').focus();
                }, 1500);
        }
        else if($('#im_part_name').val() == undefined || $('#im_part_name').val() == ""){
            var dialog = bootbox.dialog({
                message: '<p class="text-center">Please Enter Part Name!</p>',
                    closeButton: false
                });
                dialog.find('.modal-body').addClass("btn-danger");
                setTimeout(function(){
                    dialog.modal('hide'); 
                    $('#im_part_name').focus();
                }, 1500);
        }
        else if($('#im_opening_quantity').val() == undefined || $('#im_opening_quantity').val() == ""){
            var dialog = bootbox.dialog({
                message: '<p class="text-center">Please Enter Opening Quantity!</p>',
                    closeButton: false
                });
                dialog.find('.modal-body').addClass("btn-danger");
                setTimeout(function(){
                    dialog.modal('hide'); 
                    $('#im_opening_quantity').focus();
                }, 1500);
        }
        else if($('#im_price').val() == undefined || $('#im_price').val() == ""){
            var dialog = bootbox.dialog({
                message: '<p class="text-center">Please Enter Price!</p>',
                    closeButton: false
                });
                dialog.find('.modal-body').addClass("btn-danger");
                setTimeout(function(){
                    dialog.modal('hide'); 
                    $('#im_price').focus();
                }, 1500);
        }
        else if($('#im_mrp').val() == undefined || $('#im_mrp').val() == ""){
            var dialog = bootbox.dialog({
                message: '<p class="text-center">Please Enter M R P!</p>',
                    closeButton: false
                });
                dialog.find('.modal-body').addClass("btn-danger");
                setTimeout(function(){
                    dialog.modal('hide'); 
                    $('#im_mrp').focus();
                }, 1500);
        }
	        else{
              $('#btnsave').attr('disabled','true');
              $('#btnsave').text("please wait...");

              $http({
                  method: 'POST',
                  url: $rootScope.baseURL+'/inventory/checkname',
                  data: $scope.inventory,
                  headers: {'Content-Type': 'application/json',
                          'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
              })
              .success(function(orderno)
              {
                  if(orderno.length > 1){
                      var dialog = bootbox.dialog({
                          message: '<p class="text-center">Inventory Already Exits!</p>',
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
                          data: $scope.inventory,
                          headers: {'Content-Type': 'application/json',
                                  'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
                      })
                      .success(function(login)
                      {     
                          var dialog = bootbox.dialog({
                              message: '<p class="text-center">Inventory Updated Successfully!</p>',
                              closeButton: false
                          });
                          dialog.find('.modal-body').addClass("btn-success");
                          setTimeout(function(){
                              dialog.modal('hide'); 
                          }, 1500);

                          $('#btnsave').text("Update");
                          $('#btnsave').removeAttr('disabled');
                          window.location.href = '#/inventory';  
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