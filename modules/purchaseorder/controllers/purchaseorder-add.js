// import admin
angular.module('purchaseorder').controller('purchaseorderAddCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {

  $scope.purchaseorder = {};

	$scope.apiURL = $rootScope.baseURL+'/purchaseorder/add';

  // Role Permission
   var permission=JSON.parse(localStorage.getItem('permission'));
      var value = '#/purchaseorder/add';
      var access = permission.includes(value);
        $scope.getrolepermission=function(){
          
          // for(var i=0;i<permission.length;i++)
          // {
            if(access)
            {
              return true
            }
            else
            {
               var dialog = bootbox.dialog({
              message: '<p class="text-center">You Are Not Authorized</p>',
                  closeButton: false
              });
              dialog.find('.modal-body').addClass("btn-danger");
              setTimeout(function(){
                  dialog.modal('hide'); 
              }, 1500);
              $location.path('/')

            }
        /*
        break;
      }*/

    };
    $scope.getrolepermission();

  // Auto Generate Serial Number for purchaseorder
      $scope.getSerial = function(){
        
        $http({
                method: 'POST',
                url:  $rootScope.baseURL+'/purchaseorder/serial/no',
                headers: {'Content-Type':'application/json',
                        'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
              })
              .success(function(login)
              {   
                if (login.length > 0) {
                  $scope.purchaseorder.pom_no = parseInt(login[0].pom_no)+1;
                }  
                else{
                  $scope.purchaseorder.pom_no = 1;
                }
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
          };
          $scope.getSerial();


    $scope.addPurchaseorder = function () {
        $('#pom_qm_id').focus();
      		var nameRegex = /^\d+$/;
        	var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    
        if($('#pom_qm_id').val() == undefined || $('#pom_qm_id').val() == ""){
	    	    var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter The Quotation Number!</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide');
                $('#pom_qm_id').focus(); 
            }, 1500);
  	    }
        else if($('#pom_sm_id').val() == undefined || $('#pom_sm_id').val() == ""){
            var dialog = bootbox.dialog({
            message: "<p class='text-center'>Please Enter Supplier's Name!</p>",
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide');
                $('#pom_sm_id').focus(); 
            }, 1500);
        }
        else if($('#pom_date').val() == undefined || $('#pom_date').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter Purchase Order Date!</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide');
                $('#pom_date').focus(); 
            }, 1500);
        }
  	    else{
            $('#btnsave').attr('disabled','true');
            $('#btnsave').text("please wait...");

            $http({
              method: 'POST',
              url: $scope.apiURL,
              data: $scope.purchaseorder,
              headers: {'Content-Type': 'application/json',
                      'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
            })
            .success(function(login)
            {   
                var dialog = bootbox.dialog({
                  message: '<p class="text-center">Purchase Order Added Successfully!</p>',
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
	  };

   

  

    //date P.O Date
    $('#pom_date').datepicker({
          validateOnBlur: false,
          todayButton: false,
          timepicker: false,
          scrollInput: false,
          format: 'yyyy-mm-dd',
          autoclose: true,
          orientation: 'bottom',
          // minDate: (parseInt(new Date().getFullYear()) - 100) + '/01/01',// minimum date(for today use 0 or -1970/01/01)
          // maxDate: (parseInt(new Date().getFullYear()) - 18) + '/01/01',//maximum date calendar
          onChangeDateTime: function (dp, $input) {
              $scope.design.pom_date = $('#pom_date').val();
          }
    });
    
        // //Quotation list record for Quotation Name input
    // $scope.getSearchQuotation = function(vals) {
    //   var searchTerms = {search: vals};
    //     const httpOptions = {
    //         headers: {
    //           'Content-Type':  'application/json',
    //           'Authorization': 'Bearer '+localStorage.getItem("unitech_admin_access_token")
    //         }
    //     };
    //     return $http.post($rootScope.baseURL+'/quotation/typeahead/search', searchTerms, httpOptions).then((result) => {
    //         return result.data;
    //     });
    // };

    // // Add Supplier
    // $scope.addSupplierModal = function(){
    //     $('#add-supplier-modal').modal('show');
    // };
    // $scope.addSupplier = function () {
    //   var nameRegex = /^\d+$/;
    //   var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      
    //       if($('#sm_name').val() == undefined || $('#sm_name').val() == ""){
    //       var dialog = bootbox.dialog({
    //           message: "<p class='text-center'>Please Enter Supplier's Name!</p>",
    //               closeButton: false
    //           });
    //           dialog.find('.modal-body').addClass("btn-danger");
    //           setTimeout(function(){
    //               dialog.modal('hide'); 
    //               $('#sm_name').focus();
    //           }, 1500);
    //       }
    //       else if($('#sm_gst_no').val() == undefined || $('#sm_gst_no').val() == ""){
    //       var dialog = bootbox.dialog({
    //           message: "<p class='text-center'>Please Enter The GST!</p>",
    //               closeButton: false
    //           });
    //           dialog.find('.modal-body').addClass("btn-danger");
    //           setTimeout(function(){
    //               dialog.modal('hide'); 
    //               $('#sm_gst_no').focus();
    //           }, 1500);
    //       }
    //       else if($('#sm_address').val() == undefined || $('#sm_address').val() == ""){
    //       var dialog = bootbox.dialog({
    //           message: "<p class='text-center'>Please Enter The Address!</p>",
    //               closeButton: false
    //           });
    //           dialog.find('.modal-body').addClass("btn-danger");
    //           setTimeout(function(){
    //               dialog.modal('hide'); 
    //               $('#sm_address').focus();
    //           }, 1500);
    //       }
    //       else if($('#sm_state').val() == undefined || $('#sm_state').val() == ""){
    //       var dialog = bootbox.dialog({
    //           message: "<p class='text-center'>Please Enter The State!</p>",
    //               closeButton: false
    //           });
    //           dialog.find('.modal-body').addClass("btn-danger");
    //           setTimeout(function(){
    //               dialog.modal('hide'); 
    //               $('#sm_state').focus();
    //           }, 1500);
    //       }
    //       else if($('#sm_city').val() == undefined || $('#sm_city').val() == ""){
    //       var dialog = bootbox.dialog({
    //           message: "<p class='text-center'>Please Enter The City!</p>",
    //               closeButton: false
    //           });
    //           dialog.find('.modal-body').addClass("btn-danger");
    //           setTimeout(function(){
    //               dialog.modal('hide'); 
    //               $('#sm_city').focus();
    //           }, 1500);
    //       }
    //       else if($('#sm_pin').val() == undefined || $('#sm_pin').val() == ""){
    //       var dialog = bootbox.dialog({
    //           message: "<p class='text-center'>Please Enter The Pincode!</p>",
    //               closeButton: false
    //           });
    //           dialog.find('.modal-body').addClass("btn-danger");
    //           setTimeout(function(){
    //               dialog.modal('hide'); 
    //               $('#sm_pin').focus();
    //           }, 1500);
    //       }
    //       else if($('#sm_mobile').val() == undefined || $('#sm_mobile').val() == ""){
    //       var dialog = bootbox.dialog({
    //           message: "<p class='text-center'>Please Enter Contact Number!</p>",
    //               closeButton: false
    //           });
    //           dialog.find('.modal-body').addClass("btn-danger");
    //           setTimeout(function(){
    //               dialog.modal('hide'); 
    //               $('#sm_mobile').focus();
    //           }, 1500);
    //       }
    //       else if($('#sm_email').val() == undefined || $('#sm_email').val() == ""){
    //       var dialog = bootbox.dialog({
    //           message: "<p class='text-center'>Please Enter The Email ID!</p>",
    //               closeButton: false
    //           });
    //           dialog.find('.modal-body').addClass("btn-danger");
    //           setTimeout(function(){
    //               dialog.modal('hide'); 
    //               $('#sm_email').focus();
    //           }, 1500);
    //       }
    //       else if($('#sm_opening_debit').val() == undefined || $('#sm_opening_debit').val() == ""){
    //       var dialog = bootbox.dialog({
    //           message: "<p class='text-center'>Please Enter The Opening Debit!</p>",
    //               closeButton: false
    //           });
    //           dialog.find('.modal-body').addClass("btn-danger");
    //           setTimeout(function(){
    //               dialog.modal('hide'); 
    //               $('#sm_opening_debit').focus();
    //           }, 1500);
    //       }
    //       else if($('#sm_opening_credit').val() == undefined || $('#sm_opening_credit').val() == ""){
    //       var dialog = bootbox.dialog({
    //           message: "<p class='text-center'>Please Enter The Opening Credit!</p>",
    //               closeButton: false
    //           });
    //           dialog.find('.modal-body').addClass("btn-danger");
    //           setTimeout(function(){
    //               dialog.modal('hide'); 
    //               $('#sm_opening_credit').focus();
    //           }, 1500);
    //       }
    //       else if($('#sm_contact_person_name').val() == undefined || $('#sm_contact_person_name').val() == ""){
    //       var dialog = bootbox.dialog({
    //           message: "<p class='text-center'>Please Enter The Contact Person Name!</p>",
    //               closeButton: false
    //           });
    //           dialog.find('.modal-body').addClass("btn-danger");
    //           setTimeout(function(){
    //               dialog.modal('hide'); 
    //               $('#sm_contact_person_name').focus();
    //           }, 1500);
    //       }
    //       else if($('#sm_contact_person_number').val() == undefined || $('#sm_contact_person_number').val() == ""){
    //       var dialog = bootbox.dialog({
    //           message: "<p class='text-center'>Please Enter The Contact Person Number!</p>",
    //               closeButton: false
    //           });
    //           dialog.find('.modal-body').addClass("btn-danger");
    //           setTimeout(function(){
    //               dialog.modal('hide'); 
    //               $('#sm_contact_person_number').focus();
    //           }, 1500);
    //       }
    //       else{
    //             $('#addSupplier').attr('disabled','true');
    //             $('#addSupplier').text("please wait...");

    //             $http({
    //               method: 'POST',
    //               url: $rootScope.baseURL+'/supplier/checkname',
    //               data: $scope.supplier,
    //               headers: {'Content-Type': 'application/json',
    //                       'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
    //             })
    //             .success(function(orderno)
    //             {
    //                 if(orderno.length > 0){
    //                     var dialog = bootbox.dialog({
    //                       message: '<p class="text-center">Supplier Already Exits!</p>',
    //                           closeButton: false
    //                       });
    //                       dialog.find('.modal-body').addClass("btn-warning");
    //                       setTimeout(function(){
    //                           dialog.modal('hide'); 
    //                       }, 1500);

    //                     $('#addSupplier').text("Add Supplier");
    //                     $('#addSupplier').removeAttr('disabled');
    //                 }
    //                 else
    //                 {
    //                     $http({
    //                       method: 'POST',
    //                       url: $rootScope.baseURL+'/supplier/add',
    //                       data: $scope.supplier,
    //                       headers: {'Content-Type': 'application/json',
    //                               'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
    //                     })
    //                     .success(function(login)
    //                     {   
    //                         var dialog = bootbox.dialog({
    //                           message: '<p class="text-center">Supplier Added Successfully!</p>',
    //                               closeButton: false
    //                           });
    //                           dialog.find('.modal-body').addClass("btn-success");
    //                           setTimeout(function(){
    //                               dialog.modal('hide'); 
    //                           }, 1500);

    //                         $('#addSupplier').text("Add Supplier");
    //                         $('#addSupplier').removeAttr('disabled');
    //                         $scope.supplier = []; 
    //                         $('#add-supplier-modal').modal('hide');
                            
    //                     })
    //                     .error(function(data) 
    //                     {   
    //                         var dialog = bootbox.dialog({
    //                           message: '<p class="text-center">Oops, Something Went Wrong! Please Refresh the Page.</p>',
    //                               closeButton: false
    //                           });
    //                           setTimeout(function(){
    //                           $('#addSupplier').text("Add Supplier");
    //                           $('#addSupplier').removeAttr('disabled');
    //                               dialog.modal('hide'); 
    //                           }, 1500);            
    //                     });
    //                 }
                    
    //             })
    //             .error(function(data) 
    //             {   
    //                 var dialog = bootbox.dialog({
    //                 message: '<p class="text-center">Oops, Something Went Wrong!</p>',
    //                     closeButton: false
    //                 });
    //                 setTimeout(function(){
    //                     $('#btnsave').text("Save");
    //                     $('#btnsave').removeAttr('disabled');
    //                     dialog.modal('hide');  
    //                 }, 1500);
    //             });
    //       }
    // };
    // //END Add Supplier

});