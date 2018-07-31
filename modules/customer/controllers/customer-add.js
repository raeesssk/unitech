// import admin
angular.module('customer').controller('customerAddCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {

    $scope.customer = {};

    $scope.customer.cm_gst = "N/A";
    $scope.customer.cm_address = "N/A";
    $scope.customer.cm_email = "N/A";
    $scope.customer.cm_debit = 0;
    $scope.customer.cm_credit = 0;
    $scope.customer.cm_dept_name = "N/A";
    $scope.customer.cm_contact_person_number = "N/A";

    // VALIDATION & Main
	$scope.apiURL = $rootScope.baseURL+'/customer/add';
    $('#cm_name').focus();
        $scope.addCustomer = function () {
      		  var nameRegex = /^\d+$/;
        		var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    
            if($('#cm_name').val() == undefined || $('#cm_name').val() == ""){
    	    	  var dialog = bootbox.dialog({
                message: "<p class='text-center'>Please Enter Customer's Name!</p>",
                    closeButton: false
                }); 
                dialog.find('.modal-body').addClass("btn-danger");
                setTimeout(function(){
                    dialog.modal('hide'); 
                $('#cm_name').focus();
                }, 1500);
    	      }
            else if($('#cm_gst').val() == undefined || $('#cm_gst').val() == ""){
              var dialog = bootbox.dialog({
                message: '<p class="text-center">Please Enter GST Number!</p>',
                    closeButton: false
                });
                dialog.find('.modal-body').addClass("btn-danger");
                setTimeout(function(){
                    dialog.modal('hide');
                    $('#cm_gst').focus(); 
                }, 1500);
            }
            else if($('#cm_address').val() == undefined || $('#cm_address').val() == ""){
              var dialog = bootbox.dialog({
                  message: '<p class="text-center">Please Enter The Address!</p>',
                      closeButton: false
                  });
                  dialog.find('.modal-body').addClass("btn-danger");
                  setTimeout(function(){
                      dialog.modal('hide'); 
                      
                      $('#cm_address').focus(); 
                  }, 1500);
            }
      	    else if($('#cm_mobile').val() == undefined || $('#cm_mobile').val() == ""){
      	    	var dialog = bootbox.dialog({
                  message: "<p class='text-center'>Please Enter Customer's Contact Number!</p>",
                      closeButton: false
                  });
                  dialog.find('.modal-body').addClass("btn-danger");
                  setTimeout(function(){
                      dialog.modal('hide');
                      $('#cm_mobile').focus();  
                  }, 1500);
                  $("#cm_mobile").keydown(function(event) {
                      k = event.which;
                      if ((k >= 96 && k <= 105) || k == 8) {
                        if ($(this).val().length == 10) {
                          if (k == 8) {
                            return true;
                          } else {
                            event.preventDefault();
                            return false;

                          }
                        }
                      } else {
                        event.preventDefault();
                        return false;
                      }

                    });
      	    }
            else if($('#cm_email').val() == undefined || $('#cm_email').val() == ""){
              var dialog = bootbox.dialog({
                  message: '<p class="text-center">Please Enter The Email ID!</p>',
                      closeButton: false
                  });
                  dialog.find('.modal-body').addClass("btn-danger");
                  setTimeout(function(){
                      dialog.modal('hide'); 
                      $('#cm_email').focus(); 
                  }, 1500);
            }
            else if($('#cm_debit').val() == undefined || $('#cm_debit').val() == ""){
                var dialog = bootbox.dialog({
                message: '<p class="text-center">Please Enter Opening Debit!</p>',
                    closeButton: false
                });
                dialog.find('.modal-body').addClass("btn-danger");
                setTimeout(function(){
                    dialog.modal('hide'); 
                    $('#cm_debit').focus(); 
                }, 1500);
            }
            else if($('#cm_credit').val() == undefined || $('#cm_credit').val() == ""){
                var dialog = bootbox.dialog({
                message: '<p class="text-center">Please Enter Opening Credit!</p>',
                    closeButton: false
                });
                dialog.find('.modal-body').addClass("btn-danger");
                setTimeout(function(){
                    dialog.modal('hide'); 
                    $('#cm_credit').focus(); 
                }, 1500);
            }
            else if($('#cm_contact_person_name').val() == undefined || $('#cm_contact_person_name').val() == ""){
                var dialog = bootbox.dialog({
                message: "<p class='text-center'>Please Enter Contact Person Name!</p>",
                    closeButton: false
                });
                dialog.find('.modal-body').addClass("btn-danger");
                setTimeout(function(){
                    dialog.modal('hide'); 
                    $('#cm_contact_person_name').focus();
                }, 1500);
                $("#cm_contact_person_name").keydown(function(event) {
                      k = event.which;
                      if ((k >= 96 && k <= 105) || k == 8) {
                        if ($(this).val().length == 10) {
                          if (k == 8) {
                            return true;
                          } else {
                            event.preventDefault();
                            return false;

                          }
                        }
                      } else {
                        event.preventDefault();
                        return false;
                      }

                    });
            }
            else if($('#cm_dept_name').val() == undefined || $('#cm_dept_name').val() == ""){
                var dialog = bootbox.dialog({
                message: "<p class='text-center'>Please Enter Department Name!</p>",
                    closeButton: false
                });
                dialog.find('.modal-body').addClass("btn-danger");
                setTimeout(function(){
                    dialog.modal('hide');
                    $('#cm_dept_name').focus(); 
                }, 1500);
            }
            else if($('#cm_contact_person_number').val() == undefined || $('#cm_contact_person_number').val() == ""){
                var dialog = bootbox.dialog({
                message: "<p class='text-center'>Please Enter Contact Person Number!</p>",
                    closeButton: false
                });
                dialog.find('.modal-body').addClass("btn-danger");
                setTimeout(function(){
                    dialog.modal('hide'); 
                    $('#cm_contact_person_number').focus(); 
                }, 1500);
                $("#cm_contact_person_number").keydown(function(event) {
                      k = event.which;
                      if ((k >= 96 && k <= 105) || k == 8) {
                        if ($(this).val().length == 10) {
                          if (k == 8) {
                            return true;
                          } else {
                            event.preventDefault();
                            return false;

                          }
                        }
                      } else {
                        event.preventDefault();
                        return false;
                      }

                    });
            }

	          else{
                $('#btnsave').attr('disabled','true');
                $('#btnsave').text("please wait...");

                $http({
                  method: 'POST',
                  url: $rootScope.baseURL+'/customer/checkname',
                  data: $scope.customer,
                  headers: {'Content-Type': 'application/json',
                          'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
                })
                .success(function(orderno)
                {
                    if(orderno.length > 0){
                        var dialog = bootbox.dialog({
                          message: '<p class="text-center">Customer Already Exits!</p>',
                              closeButton: false
                          });
                          dialog.find('.modal-body').addClass("btn-warning");
                          setTimeout(function(){
                              dialog.modal('hide'); 
                          }, 1500);

                        $('#btnsave').text("Save");
                        $('#btnsave').removeAttr('disabled');
                    }
                    else
                    {
                        $http({
                          method: 'POST',
                          url: $scope.apiURL,
                          data: $scope.customer,
                          headers: {'Content-Type': 'application/json',
                                  'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
                        })
                        .success(function(login)
                        {   
                            var dialog = bootbox.dialog({
                              message: '<p class="text-center">Customer Added Successfully!</p>',
                                  closeButton: false
                              });
                              dialog.find('.modal-body').addClass("btn-success");
                              setTimeout(function(){
                                  dialog.modal('hide'); 
                              }, 1500);

                            $('#btnsave').text("Save");
                            $('#btnsave').removeAttr('disabled');
                            $route.reload();  
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
                    
                })
                .error(function(data) 
                {   
                    var dialog = bootbox.dialog({
                    message: '<p class="text-center">Oops, Something Went Wrong!</p>',
                        closeButton: false
                    });
                    setTimeout(function(){
                        $('#btnsave').text("Save");
                        $('#btnsave').removeAttr('disabled');
                        dialog.modal('hide');  
                    }, 1500);
                });
		        }
	      };
      // End VALIDATION & Main

});