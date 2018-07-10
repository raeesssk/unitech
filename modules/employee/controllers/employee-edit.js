// import admin
angular.module('employee').controller('employeeEditCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {

  
	$scope.employeeId = $routeParams.employeeId;
    $scope.apiURL = $rootScope.baseURL+'/employee/edit/'+$scope.employeeId;

  $scope.getEmployee = function () {
	     $http({
    	      method: 'GET',
    	      url: $rootScope.baseURL+'/employee/'+$scope.employeeId,
    	      headers: {'Content-Type': 'application/json',
                      'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
	    })
	    .success(function(employeeObj)
	    {
	    	employeeObj.forEach(function (value, key) {
	      		$scope.employee = value;
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


  $scope.updateEmployee = function () {

  		var nameRegex = /^\d+$/;
  		var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    
	    if($('#em_name').val() == undefined || $('#em_name').val() == ""){
        var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter The Employee Name!</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
                $('#em_name').focus();
            }, 1500);
      }
      else if($('#em_mobile').val() == undefined || $('#em_mobile').val() == ""){
        var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter The Mobile Number!</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide');
                $('#em_mobile').focus(); 
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
      else if($('#em_designation').val() == undefined || $('#em_designation').val() == ""){
        var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter Designation!</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
                $('#em_designation').focus();
            }, 1500);
      }
        else if($('#em_qualification').val() == undefined || $('#em_qualification').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter Qualification!</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
                $('#em_qualification').focus();
            }, 1500);
        }
        else if($('#em_residential_address').val() == undefined || $('#em_residential_address').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter Residential Address!</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
                $('#em_residential_address').focus();
            }, 1500);
        }
        else if($('#em_correspondence_address').val() == undefined || $('#em_correspondence_address').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter Correspondence Address!</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide');
                $('#em_correspondence_address').focus(); 
            }, 1500);
        }
        else if($('#em_aadhar_number').val() == undefined || $('#em_aadhar_number').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter The Aadhar Number!</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide');
                $('#em_aadhar_number').focus(); 
            }, 1500);
        }
        else if($('#em_pan_number').val() == undefined || $('#em_pan_number').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter The PAN Number!</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide');
                $('#em_pan_number').focus(); 
            }, 1500);
        }
        else if($('#em_bank_name').val() == undefined || $('#em_bank_name').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter The Bank Name!</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide');
                $('#em_bank_name').focus(); 
            }, 1500);
        }
        else if($('#em_bank_account_number').val() == undefined || $('#em_bank_account_number').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter The Bank Account Number!</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide');
                $('#em_bank_account_number').focus(); 
            }, 1500);
        }
        else if($('#em_bank_ifsc').val() == undefined || $('#em_bank_ifsc').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter The Bank IFS Code!</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide');
                $('#em_bank_ifsc').focus(); 
            }, 1500);
        }
        else if($('#em_bank_branch').val() == undefined || $('#em_bank_branch').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter The Bank Branch!</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide');
                $('#em_bank_branch').focus(); 
            }, 1500);
        }
        else if($('#em_email').val() == undefined || $('#em_email').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter The Email ID!</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide');
                $('#em_email').focus(); 
            }, 1500);
        }
        else{
                $('#btnsave').attr('disabled','true');
                $('#btnsave').text("please wait...");

                $http({
                  method: 'POST',
                  url: $rootScope.baseURL+'/employee/checkname',
                  data: $scope.employee,
                  headers: {'Content-Type': 'application/json',
                          'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
                })
                .success(function(orderno)
                {
                    if(orderno.length > 1){
                         var dialog = bootbox.dialog({
                                message: '<p class="text-center">Employee Already Exits!</p>',
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
                            data: $scope.employee,
                            headers: {'Content-Type': 'application/json',
                                    'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
                          })
                          .success(function(login)
                          {   
                              $('#btnsave').text("Update");
                                $('#btnsave').removeAttr('disabled');
                               window.location.href = '#/employee';  
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
	 //    else{
  //               $('#btnsave').attr('disabled','true');
  //               $('#btnsave').text("please wait...");

  //   		    $http({
  //   		      method: 'POST',
  //   		      url: $scope.apiURL,
  //   		      data: $scope.employee,
  //   		      headers: {'Content-Type': 'application/json',
  //   	                  'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
  //   		    })
  //   		    .success(function(login)
  //   		    {
  //                   $('#btnsave').text("Update");
  //                   $('#btnsave').removeAttr('disabled');
  //   		       window.location.href = '#/employee';  
  //   		    })
  //   		    .error(function(data) 
  //   		    {   
  //   		      var dialog = bootbox.dialog({
  //   	            message: '<p class="text-center">Oops, Something Went Wrong! Please Refresh the Page.</p>',
  //   	                closeButton: false
  //   	            });
  //   	            setTimeout(function(){
  //                   $('#btnsave').text("Update");
  //                   $('#btnsave').removeAttr('disabled');
  //   	                dialog.modal('hide'); 
  //   	            }, 1500);            
  //   		    });
		// }
	};

});