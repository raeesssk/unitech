// import admin
angular.module('salary').controller('salaryAddCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {

    $scope.salary = {};

    $scope.salary.sm_adv_salary = "N/A";
    $scope.salary.sm_salary_slip = "N/A";
    $scope.salary.sm_psi = "N/A";
    $scope.salary.sm_pf = "N/A";

	$scope.apiURL = $rootScope.baseURL+'/salary/add';
    $('#sm_emp_name').focus();
    $scope.addSalary = function () {
      
		var nameRegex = /^\d+$/;
  		var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    
        if($('#sm_emp_name').val() == undefined || $('#sm_emp_name').val() == ""){
	    	var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter The Employee Name!</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
                $('#sm_emp_name').focus();
            }, 1500);
	    }
	    else if($('#sm_salary').val() == undefined || $('#sm_salary').val() == ""){
        var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter The Salary!</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
                $('#sm_salary').focus();
            }, 1500);
      }
	    // else if(!nameRegex.test($('#cm_mobile').val())){
	    // 	var dialog = bootbox.dialog({
     //        message: '<p class="text-center">please enter Mobile no. in digits</p>',
     //            closeButton: false
     //        });
     //        dialog.find('.modal-body').addClass("btn-danger");
     //        setTimeout(function(){
     //            dialog.modal('hide'); 
     //        }, 1500);
	    // }
	    // else if($('#cm_mobile').val().length < 10){
	    // 	var dialog = bootbox.dialog({
     //        message: '<p class="text-center">please enter a valid Mobile no.</p>',
     //            closeButton: false
     //        });
     //        dialog.find('.modal-body').addClass("btn-danger");
     //        setTimeout(function(){
     //            dialog.modal('hide'); 
     //        }, 1500);
	    // }
      else if($('#sm_date').val() == undefined || $('#sm_date').val() == ""){
        var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter The Date!</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
                $('#sm_date').focus();
            }, 1500);
      }
      else if($('#sm_adv_salary').val() == undefined || $('#sm_adv_salary').val() == ""){
        var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter The Advance Salary!</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
                $('#sm_adv_salary').focus();
            }, 1500);
      }
      else if($('#sm_total_salary').val() == undefined || $('#sm_total_salary').val() == ""){
        var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter The Total Salary!</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
                $('#sm_total_salary').focus();
            }, 1500);
      }
      else if($('#sm_salary_slip').val() == undefined || $('#sm_salary_slip').val() == ""){
        var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter The Salary Slip!</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
                $('#sm_salary_slip').focus();
            }, 1500);
      }
      else if($('#sm_ot').val() == undefined || $('#sm_ot').val() == ""){
        var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter The O.T./Working Hours!</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
                $('#sm_ot').focus();
            }, 1500);
      }
      else if($('#sm_psi').val() == undefined || $('#sm_psi').val() == ""){
        var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter The PSI!</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
                $('#sm_psi').focus();
            }, 1500);
      }
      else if($('#sm_pf').val() == undefined || $('#sm_pf').val() == ""){
        var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter The P.F!</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
                $('#sm_pf').focus();
            }, 1500);
      }
	    else{

                $('#btnsave').attr('disabled','true');
                $('#btnsave').text("please wait...");

                $http({
                  method: 'GET',
                  url: $rootScope.baseURL+'/customer/code/no',
                  //data: $scope.data,
                  headers: {'Content-Type': 'application/json',
                          'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
                })
                .success(function(orderno)
                {
                    if(orderno.length >0)
                        $scope.customer.cm_code = parseInt(orderno[0].cm_code) + 1;
                    else
                        $scope.customer.cm_code = 1;

                    $scope.customer.cm_debit = 0;
                    $scope.customer.cm_balance = 0;
                    $http({
                      method: 'POST',
                      url: $scope.apiURL,
                      data: $scope.customer,
                      headers: {'Content-Type': 'application/json',
                              'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
                    })
                    .success(function(login)
                    {
                        $('#btnsave').text("Save");
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
                        $('#btnsave').text("Save");
                        $('#btnsave').removeAttr('disabled');
                            dialog.modal('hide'); 
                        }, 1500);            
                    });
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

});