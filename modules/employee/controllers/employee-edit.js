// import admin
angular.module('employee').controller('employeeEditCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route, $filter) {

  
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
            value.epm_date = $filter('date')(value.emp_birth_date, "mediumDate");
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
      
        if($('#emp_no').val() == undefined || $('#emp_no').val() == ""){
        var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter The Employee Number!</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
                $('#emp_no').focus();
            }, 1500);
      }
      else if($('#emp_name').val() == undefined || $('#emp_name').val() == ""){
        var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter The Employee Name!</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
                $('#emp_name').focus();
            }, 1500);
      }
      else if($('#emp_mobile').val() == undefined || $('#emp_mobile').val() == ""){
        var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter The Contact Number!</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide');
                $('#emp_mobile').focus(); 
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
      else if($('#emp_birth_date').val() == undefined || $('#emp_birth_date').val() == ""){
        var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter The Date-Of-Birth!</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide');
                $('#emp_birth_date').focus(); 
            }, 1500);
      }
      else if($('#emp_designation').val() == undefined || $('#emp_designation').val() == ""){
        var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter Designation!</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
                $('#emp_designation').focus();
            }, 1500);
      }
        else if($('#emp_qualification').val() == undefined || $('#emp_qualification').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter Qualification!</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
                $('#emp_qualification').focus();
            }, 1500);
        }
        else if($('#emp_res_address').val() == undefined || $('#emp_res_address').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter Residential Address!</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
                $('#emp_res_address').focus();
            }, 1500);
        }
        else if($('#emp_cor_address').val() == undefined || $('#emp_cor_address').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter Correspondence Address!</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide');
                $('#emp_cor_address').focus(); 
            }, 1500);
        }
        else if($('#emp_aadhar').val() == undefined || $('#emp_aadhar').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter The Aadhar Number!</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide');
                $('#emp_aadhar').focus(); 
            }, 1500);
        }
        else if($('#emp_pan').val() == undefined || $('#emp_pan').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter The PAN Number!</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide');
                $('#emp_pan').focus(); 
            }, 1500);
        }
        else if($('#emp_bank_name').val() == undefined || $('#emp_bank_name').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter The Bank Name!</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide');
                $('#emp_bank_name').focus(); 
            }, 1500);
        }
        else if($('#emp_account_no').val() == undefined || $('#emp_account_no').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter The Bank Account Number!</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide');
                $('#emp_account_no').focus(); 
            }, 1500);
        }
        else if($('#emp_ifsc_code').val() == undefined || $('#emp_ifsc_code').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter The Bank IFS Code!</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide');
                $('#emp_ifsc_code').focus(); 
            }, 1500);
        }
        else if($('#emp_branch').val() == undefined || $('#emp_branch').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter The Bank Branch!</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide');
                $('#emp_branch').focus(); 
            }, 1500);
        }
        else if($('#emp_email').val() == undefined || $('#emp_email').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter The Email ID!</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide');
                $('#emp_email').focus(); 
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
                        // console.log($scope.employee.emp_email);
                        var filename = $('#emp_image').val().split('\\').pop();
                        var fd = new FormData();
                        fd.append('emp_no', $scope.employee.emp_no);
                        fd.append('emp_name', $scope.employee.emp_name);
                        fd.append('emp_mobile', $scope.employee.emp_mobile);
                        fd.append('emp_birth_date', $scope.employee.emp_birth_date);
                        fd.append('emp_designation', $scope.employee.emp_designation);
                        fd.append('emp_qualification', $scope.employee.emp_qualification);
                        fd.append('emp_res_address', $scope.employee.emp_res_address);
                        fd.append('emp_cor_address', $scope.employee.emp_cor_address);
                        fd.append('emp_aadhar', $scope.employee.emp_aadhar);
                        fd.append('emp_pan', $scope.employee.emp_pan);
                        fd.append('emp_bank_name', $scope.employee.emp_bank_name);
                        fd.append('emp_account_no', $scope.employee.emp_account_no);
                        fd.append('emp_ifsc_code', $scope.employee.emp_ifsc_code);
                        fd.append('emp_branch', $scope.employee.emp_branch);
                        fd.append('emp_email', $scope.employee.emp_email);
                        fd.append('emp_image', $scope.employee.file);

                          $http({
                            method: 'POST',
                            url: $scope.apiURL,
                            data: fd,
                            transformRequest: angular.identity,
                            headers: {'Content-Type': undefined,
                                    'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
                          })
                          .success(function(login)
                          {   
                              var dialog = bootbox.dialog({
                                message: '<p class="text-center">Employee Updated Successfully!</p>',
                                    closeButton: false
                                });
                                dialog.find('.modal-body').addClass("btn-success");
                                setTimeout(function(){
                                    dialog.modal('hide'); 
                                }, 1500);

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
        // else{
        //         $('#btnsave').attr('disabled','true');
        //         $('#btnsave').text("please wait...");

        //         $http({
        //           method: 'POST',
        //           url: $rootScope.baseURL+'/employee/checkname',
        //           data: $scope.employee,
        //           headers: {'Content-Type': 'application/json',
        //                   'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
        //         })
        //         .success(function(orderno)
        //         {
        //             if(orderno.length > 1){
        //                  var dialog = bootbox.dialog({
        //                         message: '<p class="text-center">Employee Already Exits!</p>',
        //                             closeButton: false
        //                         });
        //                         dialog.find('.modal-body').addClass("btn-warning");
        //                         setTimeout(function(){
        //                             dialog.modal('hide'); 
        //                         }, 1500);

        //                       $('#btnsave').text("Update");
        //                       $('#btnsave').removeAttr('disabled');
        //               }
        //             else
        //               {
        //                   $http({
        //                     method: 'POST',
        //                     url: $scope.apiURL,
        //                     data: $scope.employee,
        //                     headers: {'Content-Type': 'application/json',
        //                             'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
        //                   })
        //                   .success(function(login)
        //                   {   
        //                       $('#btnsave').text("Update");
        //                         $('#btnsave').removeAttr('disabled');
        //                        window.location.href = '#/employee';  
        //                   })
        //                 .error(function(data) 
        //                   {   
        //                     var dialog = bootbox.dialog({
        //                       message: '<p class="text-center">Oops, Something Went Wrong! Please Refresh the Page.</p>',
        //                           closeButton: false
        //                       });
        //                       setTimeout(function(){
        //                       $('#btnsave').text("Update");
        //                       $('#btnsave').removeAttr('disabled');
        //                           dialog.modal('hide'); 
        //                       }, 1500);            
        //                   });
        //               }
                    
        //         })
        //         .error(function(data) 
        //         {   
        //             var dialog = bootbox.dialog({
        //             message: '<p class="text-center">Oops, Something Went Wrong!</p>',
        //                 closeButton: false
        //             });
        //             setTimeout(function(){
        //                 $('#btnsave').text("Update");
        //                 $('#btnsave').removeAttr('disabled');
        //                 dialog.modal('hide');  
        //             }, 1500);
        //         });
        //   }
	};


//Image
$scope.displayImage = "resources/default-image.png";
  function readURL(input) {
    if (input.files && input.files[0]) {
          var reader = new FileReader();

              $scope.employee.file = input.files[0];
          reader.onload = function (e) {
              $('#blah').attr('src', e.target.result);
          }
          reader.readAsDataURL(input.files[0]);

      }
  }

  $("#emp_image").change(function(){
      readURL(this);
  });
//date
$('#emp_birth_date').datepicker({
        validateOnBlur: false,
        todayButton: false,
        timepicker: false,
        scrollInput: false,
        format: 'yyyy-mm-dd',
        autoclose: true,
        orientation: 'bottom',
        /*minDate: (parseInt(new Date().getFullYear()) - 100) + '/01/01',// minimum date(for today use 0 or -1970/01/01)
        maxDate: (parseInt(new Date().getFullYear()) - 18) + '/01/01',//maximum date calendar*/
        onChangeDateTime: function (dp, $input) {
            $scope.employee.emp_birth_date = $('#emp_birth_date').val();
        }
    });
});