// import admin
angular.module('supplier').controller('supplierEditCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {
  
  $scope.supplierId = $routeParams.supplierId;
  $scope.apiURL = $rootScope.baseURL+'/supplier/edit/'+$scope.supplierId;

    $scope.getSupplier = function () {

        $http({
          method: 'GET',
          url: $rootScope.baseURL+'/supplier/'+$scope.supplierId,
          headers: {'Content-Type': 'application/json',
                    'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
        })
        .success(function(supplierObj)
        {
              supplierObj.forEach(function (value, key) {
                value.old_sm_opening_credit = value.sm_opening_credit;
                value.old_sm_opening_debit = value.sm_opening_debit; 
                 $scope.supplier = value;
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


    $scope.updateSupplier = function () {

        var nameRegex = /^\d+$/;
        var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        if($('#sm_name').val() == undefined || $('#sm_name').val() == ""){
            var dialog = bootbox.dialog({
              message: "<p class='text-center'>Please Enter Supplier's Name!</p>",
                  closeButton: false
              });
              dialog.find('.modal-body').addClass("btn-danger");
              setTimeout(function(){
                  dialog.modal('hide'); 
                  $('#sm_name').focus();
              }, 1500);
        }
        else if($('#sm_gst_no').val() == undefined || $('#sm_gst_no').val() == ""){
            var dialog = bootbox.dialog({
              message: "<p class='text-center'>Please Enter The GST!</p>",
                  closeButton: false
              });
              dialog.find('.modal-body').addClass("btn-danger");
              setTimeout(function(){
                  dialog.modal('hide'); 
                  $('#sm_gst_no').focus();
              }, 1500);
        }
        else if($('#sm_address').val() == undefined || $('#sm_address').val() == ""){
            var dialog = bootbox.dialog({
              message: "<p class='text-center'>Please Enter The Address!</p>",
                  closeButton: false
              });
              dialog.find('.modal-body').addClass("btn-danger");
              setTimeout(function(){
                  dialog.modal('hide'); 
                  $('#sm_address').focus();
              }, 1500);
        }
        else if($('#sm_state').val() == undefined || $('#sm_state').val() == ""){
            var dialog = bootbox.dialog({
              message: "<p class='text-center'>Please Enter The State!</p>",
                  closeButton: false
              });
              dialog.find('.modal-body').addClass("btn-danger");
              setTimeout(function(){
                  dialog.modal('hide'); 
                  $('#sm_state').focus();
              }, 1500);
        }
        else if($('#sm_city').val() == undefined || $('#sm_city').val() == ""){
            var dialog = bootbox.dialog({
              message: "<p class='text-center'>Please Enter The City!</p>",
                  closeButton: false
              });
              dialog.find('.modal-body').addClass("btn-danger");
              setTimeout(function(){
                  dialog.modal('hide'); 
                  $('#sm_city').focus();
              }, 1500);
        }
        else if($('#sm_pin').val() == undefined || $('#sm_pin').val() == ""){
            var dialog = bootbox.dialog({
              message: "<p class='text-center'>Please Enter The Pincode!</p>",
                  closeButton: false
              });
              dialog.find('.modal-body').addClass("btn-danger");
              setTimeout(function(){
                  dialog.modal('hide'); 
                  $('#sm_pin').focus();
              }, 1500);
        }
        else if($('#sm_mobile').val() == undefined || $('#sm_mobile').val() == ""){
            var dialog = bootbox.dialog({
              message: "<p class='text-center'>Please Enter Contact Number!</p>",
                  closeButton: false
              });
              dialog.find('.modal-body').addClass("btn-danger");
              setTimeout(function(){
                  dialog.modal('hide'); 
                  $('#sm_mobile').focus();
              }, 1500);
        }
        else if($('#sm_email').val() == undefined || $('#sm_email').val() == ""){
            var dialog = bootbox.dialog({
              message: "<p class='text-center'>Please Enter The Email ID!</p>",
                  closeButton: false
              });
              dialog.find('.modal-body').addClass("btn-danger");
              setTimeout(function(){
                  dialog.modal('hide'); 
                  $('#sm_email').focus();
              }, 1500);
        }
        else if($('#sm_opening_debit').val() == undefined || $('#sm_opening_debit').val() == ""){
            var dialog = bootbox.dialog({
              message: "<p class='text-center'>Please Enter The Opening Debit!</p>",
                  closeButton: false
              });
              dialog.find('.modal-body').addClass("btn-danger");
              setTimeout(function(){
                  dialog.modal('hide'); 
                  $('#sm_opening_debit').focus();
              }, 1500);
        }
        else if($('#sm_opening_credit').val() == undefined || $('#sm_opening_credit').val() == ""){
            var dialog = bootbox.dialog({
              message: "<p class='text-center'>Please Enter The Opening Credit!</p>",
                  closeButton: false
              });
              dialog.find('.modal-body').addClass("btn-danger");
              setTimeout(function(){
                  dialog.modal('hide'); 
                  $('#sm_opening_credit').focus();
              }, 1500);
        }
        else if($('#sm_contact_person_name').val() == undefined || $('#sm_contact_person_name').val() == ""){
            var dialog = bootbox.dialog({
              message: "<p class='text-center'>Please Enter The Contact Person Name!</p>",
                  closeButton: false
              });
              dialog.find('.modal-body').addClass("btn-danger");
              setTimeout(function(){
                  dialog.modal('hide'); 
                  $('#sm_contact_person_name').focus();
              }, 1500);
        }
        else if($('#sm_contact_person_number').val() == undefined || $('#sm_contact_person_number').val() == ""){
            var dialog = bootbox.dialog({
              message: "<p class='text-center'>Please Enter The Contact Person Number!</p>",
                  closeButton: false
              });
              dialog.find('.modal-body').addClass("btn-danger");
              setTimeout(function(){
                  dialog.modal('hide'); 
                  $('#sm_contact_person_number').focus();
              }, 1500);
        }
        else{
                $('#btnsave').attr('disabled','true');
                $('#btnsave').text("please wait...");

                $http({
                  method: 'POST',
                  url: $rootScope.baseURL+'/supplier/checkname',
                  data: $scope.supplier,
                  headers: {'Content-Type': 'application/json',
                          'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
                })
                .success(function(orderno)
                {
                    if(orderno.length > 1){
                         var dialog = bootbox.dialog({
                                message: '<p class="text-center">Supplier Already Exits!</p>',
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
                            data: $scope.supplier,
                            headers: {'Content-Type': 'application/json',
                                    'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
                          })
                          .success(function(login)
                          {     
                            var dialog = bootbox.dialog({
                                message: '<p class="text-center">Supplier Updated Successfully!</p>',
                                    closeButton: false
                                });
                                dialog.find('.modal-body').addClass("btn-success");
                                setTimeout(function(){
                                    dialog.modal('hide'); 
                                }, 1500);
                                $('#btnsave').text("Update");
                                $('#btnsave').removeAttr('disabled');
                               window.location.href = '#/supplier';  
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