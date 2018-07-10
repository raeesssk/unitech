// import admin
angular.module('customer').controller('customerEditCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {

  
    $scope.customerId = $routeParams.customerId;
    $scope.apiURL = $rootScope.baseURL+'/customer/edit/'+$scope.customerId;

  $scope.getCustomer = function () {

      $http({
  	      method: 'GET',
  	      url: $rootScope.baseURL+'/customer/'+$scope.customerId,
  	      headers: {'Content-Type': 'application/json',
                    'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
	    })
	    .success(function(customerObj)
	    {
	    	  customerObj.forEach(function (value, key) {
                value.old_cm_credit = value.cm_credit;
                value.old_cm_debit = value.cm_debit; 
	      		 $scope.customer = value;
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


  $scope.updateCustomer = function () {

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
            }, 1500);
        }
        // else if(!nameRegex.test($('#cm_mobile').val())){
        //  var dialog = bootbox.dialog({
     //        message: '<p class="text-center">please enter Mobile no. in digits</p>',
     //            closeButton: false
     //        });
     //        dialog.find('.modal-body').addClass("btn-danger");
     //        setTimeout(function(){
     //            dialog.modal('hide'); 
     //        }, 1500);
        // }
        // else if($('#cm_mobile').val().length < 10){
        //  var dialog = bootbox.dialog({
     //        message: '<p class="text-center">please enter a valid Mobile no.</p>',
     //            closeButton: false
     //        });
     //        dialog.find('.modal-body').addClass("btn-danger");
     //        setTimeout(function(){
     //            dialog.modal('hide'); 
     //        }, 1500);
        // }
      else if($('#cm_email').val() == undefined || $('#cm_email').val() == ""){
        var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter The Email ID!</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
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
            }, 1500);
        }
        else if($('#cm_dept_name').val() == undefined || $('#cm_dept_name').val() == ""){
            var dialog = bootbox.dialog({
            message: "<p class='text-center'>Please Enter Department Name!</p>",
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
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
            }, 1500);
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
                    if(orderno.length > 1){
                         var dialog = bootbox.dialog({
                                message: '<p class="text-center">Customer Already Exits!</p>',
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
                            data: $scope.customer,
                            headers: {'Content-Type': 'application/json',
                                    'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
                          })
                          .success(function(login)
                          {   
                              $('#btnsave').text("Update");
                                $('#btnsave').removeAttr('disabled');
                               window.location.href = '#/customer';  
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