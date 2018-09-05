// import admin
angular.module('quotation').controller('quotationAddCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route, $filter) {

    $scope.quotation = {};
    $scope.material = {};
    $scope.machineItemList = [];

    // $scope.material.qpm_price =0

    $scope.quotation.qm_ref = "N/A";

    $scope.quotation.qm_comment = "<b>Terms & Conditions</b> <br>"+
                                  "1. delivery: as per specific requirement. <br>"+
                                  "2. Taxes extra as applicable. <br>"+
                                  "3. Payment terms: 30 DAYS After Delivery. <br>"+
                                  "4. Packing Charges: NIL. <br>"+
                                  "5. <strong>TRANSPORT CHARGES TO BE BORN BY YOU.</strong>";
    

    $scope.quotation.qm_cgst_per=9;
    $scope.quotation.qm_sgst_per=9;
    $scope.quotation.qm_igst_per=0;
    $scope.quotation.qm_transport=0;
    $scope.quotation.qm_other_charges=0;
    $scope.quotation.qm_discount=0;
    $scope.quotation.qm_net_cost=0;
    $scope.quotation.qm_cgst_amount=0;
    $scope.quotation.qm_sgst_amount=0;
    $scope.quotation.qm_igst_amount=0;
    $scope.quotation.qm_total_cost=0;

    $scope.personalDetails = {};

    var d = new Date();
    var yyyy = d.getFullYear().toString();
    var mm = (d.getMonth()).toString(); // getMonth() is zero-based
    var dd  = d.getDate().toString();
    $scope.quotation.qm_date = yyyy +"-"+ (parseInt(mm)+parseInt(1)) +"-"+ dd;

    // VALIDATION & Main
  $scope.apiURL = $rootScope.baseURL+'/quotation/add';
    $('#qm_dm_id').focus();
        $scope.addQuotation = function () {
            var nameRegex = /^\d+$/;
            var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
            if($('#qm_dm_id').val() == undefined || $('#qm_dm_id').val() == "" || $scope.quotation.qm_dm_id.dm_id == undefined ){
              var dialog = bootbox.dialog({
                message: "<p class='text-center'>Please Enter Design Number!</p>",
                    closeButton: false
                }); 
                dialog.find('.modal-body').addClass("btn-danger");
                setTimeout(function(){
                    dialog.modal('hide'); 
                $('#qm_dm_id').focus();
                }, 1500);
            }
            else if($('#qm_ref').val() == undefined || $('#qm_ref').val() == ""){
              var dialog = bootbox.dialog({
                  message: '<p class="text-center">Please Enter The Reference!</p>',
                      closeButton: false
                  });
                  dialog.find('.modal-body').addClass("btn-danger");
                  setTimeout(function(){
                      dialog.modal('hide'); 
                      
                      $('#qm_ref').focus(); 
                  }, 1500);
            }
            else if($('#qm_comment').val() == undefined || $('#qm_comment').val() == ""){
              var dialog = bootbox.dialog({
                  message: '<p class="text-center">Please Enter The Comment!</p>',
                      closeButton: false
                  });
                  dialog.find('.modal-body').addClass("btn-danger");
                  setTimeout(function(){
                      dialog.modal('hide'); 
                      
                      $('#qm_comment').focus(); 
                  }, 1500);
            }
            else if($('#qm_transport').val() == undefined || $('#qm_transport').val() == ""){
              var dialog = bootbox.dialog({
                  message: '<p class="text-center">Please Enter The Transport!</p>',
                      closeButton: false
                  });
                  dialog.find('.modal-body').addClass("btn-danger");
                  setTimeout(function(){
                      dialog.modal('hide'); 
                      
                      $('#qm_transport').focus(); 
                  }, 1500);
            }
            else if($('#qm_other_charges').val() == undefined || $('#qm_other_charges').val() == ""){
              var dialog = bootbox.dialog({
                  message: '<p class="text-center">Please Enter The Other Charges!</p>',
                      closeButton: false
                  });
                  dialog.find('.modal-body').addClass("btn-danger");
                  setTimeout(function(){
                      dialog.modal('hide'); 
                      
                      $('#qm_other_charges').focus(); 
                  }, 1500);
            }
            else if($('#qm_discount').val() == undefined || $('#qm_discount').val() == ""){
              var dialog = bootbox.dialog({
                  message: '<p class="text-center">Please Enter The Discount!</p>',
                      closeButton: false
                  });
                  dialog.find('.modal-body').addClass("btn-danger");
                  setTimeout(function(){
                      dialog.modal('hide'); 
                      
                      $('#qm_discount').focus(); 
                  }, 1500);
            }
            else{
                $('#btnsave').attr('disabled','true');
                $('#btnsave').text("please wait...");

                      $scope.quotation.qm_date = $('#qm_date').val();

                        $scope.pruchaseForm = {
                            quotation : $scope.quotation,
                            purchaseMultipleData : $scope.personalDetails
                        };
                    
                        $http({
                          method: 'POST',
                          url: $scope.apiURL,
                          data: $scope.pruchaseForm,
                          headers: {'Content-Type': 'application/json',
                                  'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
                        })
                        .success(function(login)
                        {   
                           var dialog = bootbox.dialog({
                              message: '<p class="text-center">Quotation Added Successfully!</p>',
                                  closeButton: false
                              });
                              dialog.find('.modal-body').addClass("btn-success");
                              setTimeout(function(){
                                  dialog.modal('hide');
                                    $scope.printDetails();
                                    $('#btnsave').text("Save");
                                    $('#btnsave').removeAttr('disabled');
                                    $route.reload();  
                              }, 1500);
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
      // End VALIDATION & Main


      // Auto Generate Serial Number for Quotation
      $scope.getSerial = function(){
        
        $http({
                method: 'POST',
                url:  $rootScope.baseURL+'/quotation/serial/no',
                headers: {'Content-Type':'application/json',
                        'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
              })
              .success(function(login)
              {   
                if (login.length > 0) {
                  $scope.quotation.qm_quotation_no = parseInt(login[0].qm_quotation_no)+1;
                }  
                else{
                  $scope.quotation.qm_quotation_no = 1;
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



    $scope.addToCart = function(index){

        var nameRegex = /^\d+$/;
        var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var numRegex = /^\d+(\.\d{1,2})?$/;

        if($scope.personalDetails[index].qpmm_mm_id == "" || $scope.personalDetails[index].qpmm_mm_id == undefined || $scope.personalDetails[index].qpmm_mm_id.mm_id == undefined){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Select Machine!</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else if($scope.personalDetails[index].qpmm_mm_hr == "" || $scope.personalDetails[index].qpmm_mm_hr == undefined){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter Quantity!</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else{
            $scope.machineList = {
              'qpmm_mm_id':$scope.personalDetails[index].qpmm_mm_id,
              'qpmm_mm_hr':$scope.personalDetails[index].qpmm_mm_hr
            }
            $scope.personalDetails[index].machineDetails.push($scope.machineList);
            $scope.personalDetails[index].qpmm_mm_id = null;
            $scope.personalDetails[index].qpmm_mm_hr = 0;
            $scope.calculate($scope.personalDetails[index]);
                // $('#qpmm_mm_id').focus();
        }
    };

    $scope.removeItem = function(pindex,index){
        $scope.personalDetails[pindex].machineDetails.splice(index,1);
        $scope.calculate($scope.personalDetails[pindex]);
        // $('#qpmm_mm_id').focus();
    };

    $scope.calculate=function(obj){
      obj.dtm_total_cost=0;
      $scope.quotation.qm_net_cost=0;
      $scope.quotation.qm_cgst_amount=0;
      $scope.quotation.qm_sgst_amount=0;
      $scope.quotation.qm_igst_amount=0;
      $scope.quotation.qm_total_cost=0;
      
      var ts = 0;
      angular.forEach(obj.machineDetails, function(value,key){
        value.qpmm_total= parseFloat(parseFloat(value.qpmm_mm_id.mm_price) * parseFloat(value.qpmm_mm_hr));
        ts = parseFloat(ts + value.qpmm_total); 
      });

      obj.dtm_total_cost = parseFloat(obj.dtm_total_cost + (parseFloat(ts + obj.qpm_price) * obj.dtm_qty));

      angular.forEach($scope.personalDetails, function(value,key){
        $scope.quotation.qm_net_cost=parseFloat($scope.quotation.qm_net_cost + value.dtm_total_cost );
      });

      $scope.quotation.qm_cgst_amount = ($scope.quotation.qm_net_cost * ($scope.quotation.qm_cgst_per / 100));
      $scope.quotation.qm_sgst_amount = ($scope.quotation.qm_net_cost * ($scope.quotation.qm_sgst_per / 100));
      $scope.quotation.qm_igst_amount = ($scope.quotation.qm_net_cost * ($scope.quotation.qm_igst_per / 100));

      $scope.quotation.qm_total_cost = parseFloat(parseFloat($scope.quotation.qm_net_cost) + parseFloat($scope.quotation.qm_cgst_amount) + parseFloat($scope.quotation.qm_sgst_amount) + parseFloat($scope.quotation.qm_igst_amount) + parseFloat($scope.quotation.qm_transport) + parseFloat($scope.quotation.qm_other_charges) - parseFloat($scope.quotation.qm_discount));

    };

    $scope.calculateTotal = function(){
      $scope.quotation.qm_total_cost = parseFloat(parseFloat($scope.quotation.qm_net_cost) + parseFloat($scope.quotation.qm_cgst_amount) + parseFloat($scope.quotation.qm_sgst_amount) + parseFloat($scope.quotation.qm_igst_amount) + parseFloat($scope.quotation.qm_transport) + parseFloat($scope.quotation.qm_other_charges) - parseFloat($scope.quotation.qm_discount));
    }
 
//Add Machine Item
    $scope.addItemofMachine = function(index){
        if($('#mm_id').val() == undefined || $('#mm_id').val() == ""){
              var dialog = bootbox.dialog({
                message: '<p class="text-center">Please Enter Machine!</p>',
                    closeButton: false
                });
                dialog.find('.modal-body').addClass("btn-danger");
                setTimeout(function(){
                    dialog.modal('hide');
                    $('#mm_id').focus(); 
                }, 1500);
        }
        else if($('#mm_qty').val() == undefined || $('#mm_qty').val() == ""){
              var dialog = bootbox.dialog({
                message: '<p class="text-center">Please Enter Quantity!</p>',
                    closeButton: false
                });
                dialog.find('.modal-body').addClass("btn-danger");
                setTimeout(function(){
                    dialog.modal('hide');
                    $('#mm_qty').focus(); 
                }, 1500);
        }
        else{
              $scope.machineItemList.push($scope.machineItem);
              $scope.machineItem = null;
              $scope.calculateSubTotal();       
        }
    };

    //design details on typeahead select
    // $scope.getDesignDetails=function(){
    //     $scope.personalDetails=[];
    //     $http({
    //           method: 'GET',
    //           url: $rootScope.baseURL+'/design/details/'+$scope.quotation.qm_dm_id.dm_id,
    //           headers: {'Content-Type': 'application/json',
    //                   'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
    //         })
    //         .success(function(design)
    //         {     

    //              design.forEach(function(value,key){
    //               value.machineDetails = [];
    //               value.qpmm_mm_hr = 0;
    //               value.dtm_total_cost = 0;
    //               value.qpm_price = value.im_mrp;
    //              $scope.personalDetails.push(value);

    //               });
    //         })
    //         .error(function(data) 
    //         {   
    //             var dialog = bootbox.dialog({
    //               message: '<p class="text-center">Oops, Something Went Wrong! Please Refresh the Page.</p>',
    //                   closeButton: false
    //               });
    //               setTimeout(function(){
    //               $('#btnsave').text("Save");
    //               $('#btnsave').removeAttr('disabled');
    //                   dialog.modal('hide'); 
    //               }, 1500);            
    //         });
    // };


    //design list record for Design Name input
    // $scope.getSearchDesign = function(vals) {
    //   var searchTerms = {search: vals};
    //     const httpOptions = {
    //         headers: {
    //           'Content-Type':  'application/json',
    //           'Authorization': 'Bearer '+localStorage.getItem("unitech_admin_access_token")
    //         }
    //     };
    //     return $http.post($rootScope.baseURL+'/design/typeahead/search', searchTerms, httpOptions).then((result) => {
    //         return result.data;
    //     });
    // };

 //typeahead item name list record for item name Name input
    $scope.getSearchInventory = function(vals) {
      var searchTerms = {search: vals};
        const httpOptions = {
            headers: {
              'Content-Type':  'application/json',
              'Authorization': 'Bearer '+localStorage.getItem("unitech_admin_access_token")
            }
        };
        return $http.post($rootScope.baseURL+'/inventory/typeahead/search', searchTerms, httpOptions).then((result) => {
            return result.data;
        });
    };   
//typeahead Material list record for Material Name input
    $scope.getSearchMaterial = function(vals) {
      var searchTerms = {search: vals};
        const httpOptions = {
            headers: {
              'Content-Type':  'application/json',
              'Authorization': 'Bearer '+localStorage.getItem("unitech_admin_access_token")
            }
        };
        return $http.post($rootScope.baseURL+'/material/typeahead/search', searchTerms, httpOptions).then((result) => {
            return result.data;
        });
    };
  // design details on typeahead select
    $scope.getMaterialDetails = function(value){
       $scope.material.qpm_material_cost = value.mtm_price;
       $scope.material.qpm_density = value.mtm_density;
    };

    // calculate RM with price
    $scope.calculateRM = function(){
      $scope.material.qpm_rw = parseFloat(parseFloat($scope.material.qpm_length * $scope.material.qpm_width * $scope.material.qpm_thickness * $scope.material.mtm_id.mtm_density) / 1000000).toFixed(2);
      $scope.material.qpm_price = Math.ceil($scope.material.qpm_rw * $scope.material.qpm_material_cost);
    };
    $scope.calculateSubTotal = function(){
      temp = 0;
      angular.forEach($scope.machineItemList, function(value,key){
        value.subtotally= parseFloat(parseFloat(value.mm_price) * parseFloat(value.mm_qty));
        temp = parseFloat(temp + value.subtotally); 
      });
      $scope.material.subtotal = Math.ceil(($scope.material.qpm_rw * $scope.material.qpm_material_cost) + temp);

    };

    //customer list record for Customer Name input
    $scope.getSearchCust = function(vals) {
      var searchTerms = {search: vals};
        const httpOptions = {
            headers: {
              'Content-Type':  'application/json',
              'Authorization': 'Bearer '+localStorage.getItem("unitech_admin_access_token")
            }
        };
        return $http.post($rootScope.baseURL+'/customer/typeahead/search', searchTerms, httpOptions).then((result) => {
            return result.data;
        });
    };

    $scope.getSearchMachine = function(vals) {
      var searchTerms = {search: vals};
        const httpOptions = {
            headers: {
              'Content-Type':  'application/json',
              'Authorization': 'Bearer '+localStorage.getItem("unitech_admin_access_token")
            }
        };
        return $http.post($rootScope.baseURL+'/machine/typeahead/search', searchTerms, httpOptions).then((result) => {
            return result.data;
        });
    };

    //date for Date
    $('#qm_date').datepicker({
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
              $scope.quotation.qm_date = $('#qm_date').val();
          }
    });


    // Add Customer
    $scope.addCustomerModal = function(){
      $scope.customer = {};
      $scope.customer.cm_gst = "N/A";
      $scope.customer.cm_address = "N/A";
      $scope.customer.cm_email = "N/A";
      $scope.customer.cm_debit = 0;
      $scope.customer.cm_credit = 0;
      $scope.customer.cm_dept_name = "N/A";
      $scope.customer.cm_contact_person_number = "N/A";
        $('#add-customer-modal').modal('show');
    };
    $scope.addCustomer = function(){

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
                $('#addCustomer').attr('disabled','true');
                $('#addCustomer').text("please wait...");

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

                        $('#addCustomer').text("Add Customer");
                        $('#addCustomer').removeAttr('disabled');
                    }
                    else
                    {
                        $http({
                          method: 'POST',
                          url: $rootScope.baseURL+'/customer/add',
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

                            $('#addCustomer').text("Add Customer");
                            $('#addCustomer').removeAttr('disabled');
                            $scope.customer = []; 
                            $('#add-customer-modal').modal('hide');
                        })
                        .error(function(data) 
                        {   
                            var dialog = bootbox.dialog({
                              message: '<p class="text-center">Oops, Something Went Wrong! Please Refresh the Page.</p>',
                                  closeButton: false
                              });
                              setTimeout(function(){
                              $('#addCustomer').text("Add Customer");
                              $('#addCustomer').removeAttr('disabled');
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
//END Add Customer

// Add Inventory
    $scope.addInventoryModal = function(){
        $('#add-inventory-modal').modal('show');
    };
    $scope.addInventory = function () {
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
                    if(orderno.length > 0){
                         var dialog = bootbox.dialog({
                                message: '<p class="text-center">Inventory Already Exits!</p>',
                                    closeButton: false
                                });
                                dialog.find('.modal-body').addClass("btn-warning");
                                setTimeout(function(){
                                    dialog.modal('hide'); 
                                }, 1500);

                              $('#addInventory').text("Add Inventory");
                              $('#addInventory').removeAttr('disabled');
                      }
                    else
                      {
                          $http({
                            method: 'POST',
                            url: $rootScope.baseURL+'/inventory/add',
                            data: $scope.inventory,
                            headers: {'Content-Type': 'application/json',
                                    'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
                          })
                          .success(function(login)
                          {   
                              var dialog = bootbox.dialog({
                                message: '<p class="text-center">Inventory Added Successfully!</p>',
                                    closeButton: false
                                });
                                dialog.find('.modal-body').addClass("btn-success");
                                setTimeout(function(){
                                    dialog.modal('hide'); 
                                }, 1500);

                              $('#addInventory').text("Add Inventory");
                              $('#addInventory').removeAttr('disabled');
                              $scope.inventory = [];
                              $('#add-inventory-modal').modal('hide');
                          })
                        .error(function(data) 
                          {   
                            var dialog = bootbox.dialog({
                              message: '<p class="text-center">Oops, Something Went Wrong! Please Refresh the Page.</p>',
                                  closeButton: false
                              });
                              setTimeout(function(){
                              $('#addInventory').text("Add Inventory");
                              $('#addInventory').removeAttr('disabled');
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
//END Add Inventory

    $scope.printDetails = function(){

        var printContents = $('#content').html();
        var popupWin = window.open('', 'winname','directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,scrollbars=no,resizable=no, width=400,height=auto');
            // popupWin.document.open();
            var page = "<html>" +
                    "<head>" +
                        "<link rel='stylesheet' href='./././bower_components/bootstrap/dist/css/bootstrap.min.css' />" +
                        "<style>.action{display:none;} .print-hide{display:none;} .printshow{display:block;}</style>"+
                    "</head>" +
                    "<body onload='window.print()' style='font-size:11pt'>" +
                        "<div class='container'>" +
                            "<center><h5 style='font-size:11pt'>Quotation</h5></center>"+
                            "<table class='table table-stripped table-bordered' style='font-size:11pt'>" +
                                "<tr>" +
                                    "<td colspan='2' align='center'>" +
                                        "<h3>Unitech Engineering Works</h3><br>" +
                                        "S.No. 6/6/4, Shanti Nagar, MIDC, Bhosari, Pune - 411039, Maharashtra, India<br>" +
                                        "Email: info@unitechautomations.com * +91-9890757909 / +91-9860490510 * +91-20-27124557" +
                                    "</td>" +
                                "</tr>" +
                            "</table>" +
                            "<table class='table table-stripped table-bordered' style='font-size:11pt'>" +
                              "<tr>" +
                                "<td colspan='2'>To: <strong>"+$scope.quotation.qm_dm_id.cm_name+" ("+$scope.quotation.qm_dm_id.cm_address+")</strong></td>"+
                              "</tr>" +
                              "<tr>" +
                                "<td>Date : <strong>"+$filter('date')($scope.quotation.qm_date,'mediumDate')+"</strong></td>" +
                                "<td>Reference : <strong>"+$scope.quotation.qm_ref+"</strong></td>" +
                              "</tr>" +
                              "<tr>" +
                                "<td>Design No : <strong>"+$scope.quotation.qm_dm_id.dm_design_no+"</strong></td>" +
                                "<td>Quotation No : <strong>"+$scope.quotation.qm_quotation_no+"</strong></td>" +
                              "</tr>" +
                            "</table>" +
                            "<table class='table table-stripped table-bordered' style='font-size:10pt; page-break-after: always;'>" +
                                "<tr>" +
                                    " "+$('#content').html()+" " +
                                "</tr>" ;
                              if($scope.quotation.qm_discount == 0 && $scope.quotation.qm_transport == 0 && $scope.quotation.qm_other_charges == 0)
                              {
                                page = page + "<tr>" +
                                  "<td colspan='5' rowspan='5'><strong>"+$scope.quotation.qm_comment+"</strong></td>" +
                                  "<td align='right'><strong>Net Amount</strong></td>" +
                                  "<td><strong>"+$scope.quotation.qm_net_cost+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td align='right'><strong>CGST "+$scope.quotation.qm_cgst_per+"%</strong></td>" +
                                  "<td><strong>"+$scope.quotation.qm_cgst_amount+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td align='right'><strong>SGST "+$scope.quotation.qm_sgst_per+"%</strong></td>" +
                                  "<td><strong>"+$scope.quotation.qm_sgst_amount+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td align='right'><strong>IGST "+$scope.quotation.qm_igst_per+"%</strong></td>" +
                                  "<td><strong>"+$scope.quotation.qm_igst_amount+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td align='right'><strong>Total Amount</strong></td>" +
                                  "<td><strong>"+$scope.quotation.qm_total_cost+"</strong></td>" +
                                "</tr>" ;
                              }
                              else if($scope.quotation.qm_discount == 0 && $scope.quotation.qm_transport == 0 && $scope.quotation.qm_other_charges != 0)
                              {
                                page = page + "<tr>" +
                                  "<td colspan='5' rowspan='6'><strong>"+$scope.quotation.qm_comment+"</strong></td>" +
                                  "<td align='right'><strong>Net Amount</strong></td>" +
                                  "<td><strong>"+$scope.quotation.qm_net_cost+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td align='right'><strong>CGST "+$scope.quotation.qm_cgst_per+"%</strong></td>" +
                                  "<td><strong>"+$scope.quotation.qm_cgst_amount+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td align='right'><strong>SGST "+$scope.quotation.qm_sgst_per+"%</strong></td>" +
                                  "<td><strong>"+$scope.quotation.qm_sgst_amount+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td align='right'><strong>IGST "+$scope.quotation.qm_igst_per+"%</strong></td>" +
                                  "<td><strong>"+$scope.quotation.qm_igst_amount+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td align='right'><strong>Other Charges</strong></td>" +
                                  "<td><strong>"+$scope.quotation.qm_other_charges+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td align='right'><strong>Total Amount</strong></td>" +
                                  "<td><strong>"+$scope.quotation.qm_total_cost+"</strong></td>" +
                                "</tr>" ;
                              }
                              else if($scope.quotation.qm_discount == 0 && $scope.quotation.qm_transport != 0 && $scope.quotation.qm_other_charges != 0)
                              {
                                page = page + "<tr>" +
                                  "<td colspan='5' rowspan='7'><strong>"+$scope.quotation.qm_comment+"</strong></td>" +
                                  "<td align='right'><strong>Net Amount</strong></td>" +
                                  "<td><strong>"+$scope.quotation.qm_net_cost+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td align='right'><strong>CGST "+$scope.quotation.qm_cgst_per+"%</strong></td>" +
                                  "<td><strong>"+$scope.quotation.qm_cgst_amount+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td align='right'><strong>SGST "+$scope.quotation.qm_sgst_per+"%</strong></td>" +
                                  "<td><strong>"+$scope.quotation.qm_sgst_amount+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td align='right'><strong>IGST "+$scope.quotation.qm_igst_per+"%</strong></td>" +
                                  "<td><strong>"+$scope.quotation.qm_igst_amount+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td align='right'><strong>Transport</strong></td>" +
                                  "<td><strong>"+$scope.quotation.qm_transport+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td align='right'><strong>Other Charges</strong></td>" +
                                  "<td><strong>"+$scope.quotation.qm_other_charges+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td align='right'><strong>Total Amount</strong></td>" +
                                  "<td><strong>"+$scope.quotation.qm_total_cost+"</strong></td>" +
                                "</tr>" ;
                              }
                              else if($scope.quotation.qm_discount != 0 && $scope.quotation.qm_transport != 0 && $scope.quotation.qm_other_charges != 0)
                              {
                                page = page + "<tr>" +
                                  "<td colspan='5' rowspan='8'><strong>"+$scope.quotation.qm_comment+"</strong></td>" +
                                  "<td align='right'><strong>Net Amount</strong></td>" +
                                  "<td><strong>"+$scope.quotation.qm_net_cost+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td align='right'><strong>CGST "+$scope.quotation.qm_cgst_per+"%</strong></td>" +
                                  "<td><strong>"+$scope.quotation.qm_cgst_amount+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td align='right'><strong>SGST "+$scope.quotation.qm_sgst_per+"%</strong></td>" +
                                  "<td><strong>"+$scope.quotation.qm_sgst_amount+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td align='right'><strong>IGST "+$scope.quotation.qm_igst_per+"%</strong></td>" +
                                  "<td><strong>"+$scope.quotation.qm_igst_amount+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td align='right'><strong>Transport (+)</strong></td>" +
                                  "<td><strong>"+$scope.quotation.qm_transport+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td align='right'><strong>Other Charges (+)</strong></td>" +
                                  "<td><strong>"+$scope.quotation.qm_other_charges+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td align='right'><strong>Discount (-)</strong></td>" +
                                  "<td><strong>"+$scope.quotation.qm_discount+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td align='right'><strong>Total Amount</strong></td>" +
                                  "<td><strong>"+$scope.quotation.qm_total_cost+"</strong></td>" +
                                "</tr>" ;
                              }
                            page = page + "</table>" +
                        "</div>" +
                    "</body>" +
                    "</html>";
                    popupWin.document.write(page);
            popupWin.document.close();
            // popupWin.close();


    };

    // $scope.itemDetails = []; 
    // $scope.addNewItem = function(itemDetail){
    //       $scope.itemDetails.push({ 
    //           'dm_part_no': "", 
    //           'dm_part_name': "",
    //           'dm_qty': "",
    //       });
    //   };

    // addItem
    // $scope.addItem = function(value){
      
    // }
    
});