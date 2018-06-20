//angular.module('business',['ngRoute','ui.bootstrap']);
angular.module('invoice').controller('invoiceAddCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route, $timeout, $filter) { 	
	
  $('#dashboardindex').removeClass("active");
  $('#customerindex').removeClass("active");
  $('#customeraddindex').removeClass("active");
  $('#customerlsitindex').removeClass("active");
  $('#productindex').removeClass("active");
  $('#productaddindex').removeClass("active");
  $('#productlsitindex').removeClass("active");
  $('#invoicelistindex').removeClass("active");
  $('#cashbookindex').removeClass("active");
  $('#cashbookaddindex').removeClass("active");
  $('#cashbooklistindex').removeClass("active");
  $('#reportindex').removeClass("active");
  $('#reportinvoiceindex').removeClass("active");
  $('#invoiceindex').addClass("active");
  $('#invoiceaddindex').addClass("active");
    $scope.productList = [];
    $scope.customerList = [];
    $scope.selectedProductList = [];
    $scope.invoice = {};
    $scope.productObj = {};
    $scope.customer = {};
    $scope.product = {};
    $scope.invoice.amount = 0;
    $scope.invoice.vat = 0;
    $scope.invoice.igst = 0;
    // $scope.airline.am_total_amount = 0;
    $scope.parseFloat = parseFloat;

    $("#im_cm_id").focus();
    var d = new Date();
    var yyyy = d.getFullYear().toString();
    var mm = (d.getMonth()).toString(); // getMonth() is zero-based
    var dd  = d.getDate().toString();
    $scope.invoice.im_date = yyyy +"-"+ (parseInt(mm)+parseInt(1)) +"-"+ dd;

    $('#pDate').datepicker({
        validateOnBlur: false,
        todayButton: false,
        timepicker: false,
        scrollInput: false,
        format: 'yyyy-mm-dd',
        autoclose: true,
        /*minDate: (parseInt(new Date().getFullYear()) - 100) + '/01/01',// minimum date(for today use 0 or -1970/01/01)
        maxDate: (parseInt(new Date().getFullYear()) - 18) + '/01/01',//maximum date calendar*/
        onChangeDateTime: function (dp, $input) {
            $scope.invoice.im_date = $('#pDate').val();
        }
    });
/*
    $('#apm_travel_date').datepicker({
        validateOnBlur: false,
        todayButton: false,
        timepicker: false,
        scrollInput: false,
        format: 'yyyy-mm-dd',
        autoclose: true,
        minDate: (parseInt(new Date().getFullYear()) - 100) + '/01/01',// minimum date(for today use 0 or -1970/01/01)
        maxDate: (parseInt(new Date().getFullYear()) - 18) + '/01/01',//maximum date calendar
        onChangeDateTime: function (dp, $input) {
            $scope.productObj.apm_travel_date = $('#apm_travel_date').val();
        }
    });*/

    $scope.getSerialNo = function() {
        $http({
          method: 'GET',
          url: $rootScope.baseURL+'/invoice/serial/no',
          //data: $scope.data,
          headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
        })
        .success(function(orderno)
        {
            if(orderno.length >0)
                $scope.invoice.im_invoice_no = parseInt(orderno[0].im_invoice_no) + 1;
            else
                $scope.invoice.im_invoice_no = 1;
        })
        .error(function(data) 
        {   
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Oops, Something Went Wrong!</p>',
                closeButton: false
            });
            setTimeout(function(){
                dialog.modal('hide'); 
                //$scope.vendor = null;
            }, 1500);
        });
    };
    $scope.getSerialNo();

    $scope.getCustomerList = function() {
        $scope.apiURL = $rootScope.baseURL+'/customer/';
    	$http({
	      method: 'GET',
	      url: $scope.apiURL,
	      //data: $scope.data,
	      headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
	    })
	    .success(function(customerList)
	    {
	    	$scope.customerList = angular.copy(customerList);
	    })
	    .error(function(data) 
	    {   
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Oops, Something Went Wrong!</p>',
                closeButton: false
            });
            setTimeout(function(){
                dialog.modal('hide');  
                $('#addCustomer').modal('hide');
            }, 1500);
	    });
	};
    $scope.getCustomerList();

    $scope.getProductList = function() {
        
        $http({
          method: 'GET',
          url: $rootScope.baseURL+'/product/',
          //data: $scope.data,
          headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
        })
        .success(function(productList)
        {
            $scope.productList = angular.copy(productList);
        })
        .error(function(data) 
        {   
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Oops, Something Went Wrong!</p>',
                closeButton: false
            });
            setTimeout(function(){
                dialog.modal('hide');  
            }, 1500);
        });
    };
    $scope.getProductList();

    $scope.setProductData = function() {
        $scope.productObj.pm_qty = 1;
        $scope.productObj.price = $scope.productObj.pm_id.pm_price;
    }

    $scope.openCustomerForm = function(){
        $scope.getCode();
        $scope.customer.cm_mobile = "N/A";
        $scope.customer.cm_email = "N/A";
        $scope.customer.cm_address = "N/A";
        $scope.customer.cm_gst = "N/A";
        $('#addCustomer').modal('show');
    };

    $scope.openProductForm = function(){
        $scope.product.pm_unit = "Set";
        $scope.product.pm_cgst = 9;
        $scope.product.pm_sgst = 9;
        $('#addProduct').modal('show');
    };

    $scope.getCode = function() {
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
        })
        .error(function(data) 
        {   
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Oops, Something Went Wrong!</p>',
                closeButton: false
            });
            setTimeout(function(){
                dialog.modal('hide');  
                $('#addCustomer').modal('hide');
                //$scope.vendor = null;
            }, 1500);
        });
    };

    $scope.saveCustomer = function(){
        $scope.apiURL = $rootScope.baseURL+'/customer/add';
        var nameRegex = /^\d+$/;
        var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        if($('#cm_name').val() == undefined || $('#cm_name').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter name.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else if($('#cm_mobile').val() == undefined || $('#cm_mobile').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter Mobile no.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        // else if(!nameRegex.test($('#cm_mobile').val())){
        //     var dialog = bootbox.dialog({
        //     message: '<p class="text-center">please enter Mobile no. in digits</p>',
        //         closeButton: false
        //     });
        //     dialog.find('.modal-body').addClass("btn-danger");
        //     setTimeout(function(){
        //         dialog.modal('hide'); 
        //     }, 1500);
        // }
        // else if($('#cm_mobile').val().length < 10){
        //     var dialog = bootbox.dialog({
        //     message: '<p class="text-center">please enter a valid Mobile no.</p>',
        //         closeButton: false
        //     });
        //     dialog.find('.modal-body').addClass("btn-danger");
        //     setTimeout(function(){
        //         dialog.modal('hide'); 
        //     }, 1500);
        // }
      else if($('#cm_email').val() == undefined || $('#cm_email').val() == ""){
        var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter email id.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
      }
        else if($('#cm_address').val() == undefined || $('#cm_address').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter address.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else if($('#cm_gst').val() == undefined || $('#cm_gst').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter GST.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else{
            $('#addCust').attr('disabled','true');
            $('#addCust').text("please wait...");
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
                var dialog = bootbox.dialog({
                message: '<p class="text-center">Data Saved Successfully!</p>',
                    closeButton: false
                });
                setTimeout(function(){
                $('#addCust').text("Save changes");
                $('#addCust').removeAttr('disabled');
                    //do something special
                    $scope.customerList = [];
                    $scope.getCustomerList();
                    dialog.modal('hide');  
                    $('#addCustomer').modal('hide');
                    $scope.customer = null;
                }, 1500);
            })
            .error(function(data) 
            {   
                var dialog = bootbox.dialog({
                message: '<p class="text-center">Oops, Something Went Wrong!</p>',
                    closeButton: false
                });
                setTimeout(function(){
                $('#addCust').text("Save changes");
                $('#addCust').removeAttr('disabled');
                    dialog.modal('hide');  
                    $('#addCustomer').modal('hide');
                    //$scope.vendor = null;
                }, 1500);
            });
  
        }
    };

    $scope.addProduct = function () {
        var nameRegex = /^\d+$/;
        var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
      if($('#pm_name').val() == undefined || $('#pm_name').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter product name.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
      else if($('#pm_unit').val() == undefined || $('#pm_unit').val() == ""){
        var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter unit.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
      }
      else if($('#pm_hsn').val() == undefined || $('#pm_hsn').val() == ""){
        var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter HSN.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
      }
        else if($('#pm_price').val() == undefined || $('#pm_price').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter price.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else if($('#pm_cgst').val() == undefined || $('#pm_cgst').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter CGST.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
      else if($('#pm_sgst').val() == undefined || $('#pm_sgst').val() == ""){
        var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter SGST.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
      }
        else{

                $('#addProd').attr('disabled','true');
                $('#addProd').text("please wait...");

                $http({
                  method: 'POST',
                  url: $rootScope.baseURL+'/product/add',
                  data: $scope.product,
                  headers: {'Content-Type': 'application/json',
                          'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
                })
                .success(function(login)
                {
                    var dialog = bootbox.dialog({
                    message: '<p class="text-center">Data Saved Successfully!</p>',
                        closeButton: false
                    });
                    setTimeout(function(){
                    $('#addProd').text("Save changes");
                    $('#addProd').removeAttr('disabled');
                        //do something special
                        $scope.productList = [];
                        $scope.getProductList();
                        dialog.modal('hide');  
                        $('#addProduct').modal('hide');
                        $scope.product = null;
                    }, 1500);
                })
                .error(function(data) 
                {   
                  var dialog = bootbox.dialog({
                    message: '<p class="text-center">Oops, Something Went Wrong! Please Refresh the Page.</p>',
                        closeButton: false
                    });
                    setTimeout(function(){
                    $('#addProd').text("Save changes");
                    $('#addProd').removeAttr('disabled');
                        dialog.modal('hide'); 
                    }, 1500);            
                });
        }
    };

    $scope.addToCart = function(){

        var nameRegex = /^\d+$/;
        var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var numRegex = /^\d+(\.\d{1,2})?$/;

        if($('#pm_id').val() == undefined || $('#pm_id').val() == "" || $scope.productObj.pm_id == undefined){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please select Product</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
                $('#pm_id').focus();
            }, 1500);
        }
        else if($('#pm_qty').val() == undefined || $('#pm_qty').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter quantity.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
                $('#pm_qty').focus();
            }, 1500);
        }
        else if($('#price').val() == undefined || $('#price').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter price.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
                $('#price').focus();
            }, 1500);
        }
        else
        {
            $scope.selectedProductList.push($scope.productObj);
            $scope.productObj = null;
            $scope.calculateTotal();
           $('#pm_id').focus();
          }
    };

    $scope.removeItem = function(index){
        $scope.selectedProductList.splice(index,1);
        $scope.calculateTotal();
           $('#pm_id').focus();
    };

    $scope.calculateTotal = function(){
        var i = 1;
        $scope.invoice.amount = 0;
        $scope.invoice.totaltax=0;
        $scope.invoice.totalamount=0;
        $scope.invoice.vat=0;
        $scope.invoice.sgst=0;

        angular.forEach($scope.selectedProductList, function(value, key) {
            
            value.srno = i++;
        
            $scope.invoice.amount = parseFloat($scope.invoice.amount) + parseFloat(value.pm_qty)*parseFloat(value.price);
            $scope.invoice.vat = parseFloat(parseFloat($scope.invoice.vat) + parseFloat((value.pm_id.pm_cgst/100) * (parseFloat(value.pm_qty)*parseFloat(value.price)))).toFixed(2);
            $scope.invoice.sgst = parseFloat(parseFloat($scope.invoice.sgst) + parseFloat((value.pm_id.pm_sgst/100) * (parseFloat(value.pm_qty)*parseFloat(value.price)))).toFixed(2);
        });
            $scope.invoice.totaltax=parseFloat(parseFloat($scope.invoice.totaltax)+parseFloat($scope.invoice.vat)+parseFloat($scope.invoice.sgst));
            $scope.invoice.totalamount=parseFloat(parseFloat($scope.invoice.amount)+parseFloat($scope.invoice.totaltax));
        $scope.convertNumberToWords($scope.invoice.totalamount);
    };

    $scope.convertNumberToWords = function (amount) {
        var words = new Array();
        words[0] = '';
        words[1] = 'One';
        words[2] = 'Two';
        words[3] = 'Three';
        words[4] = 'Four';
        words[5] = 'Five';
        words[6] = 'Six';
        words[7] = 'Seven';
        words[8] = 'Eight';
        words[9] = 'Nine';
        words[10] = 'Ten';
        words[11] = 'Eleven';
        words[12] = 'Twelve';
        words[13] = 'Thirteen';
        words[14] = 'Fourteen';
        words[15] = 'Fifteen';
        words[16] = 'Sixteen';
        words[17] = 'Seventeen';
        words[18] = 'Eighteen';
        words[19] = 'Nineteen';
        words[20] = 'Twenty';
        words[30] = 'Thirty';
        words[40] = 'Forty';
        words[50] = 'Fifty';
        words[60] = 'Sixty';
        words[70] = 'Seventy';
        words[80] = 'Eighty';
        words[90] = 'Ninety';
        amount = amount.toString();
        var atemp = amount.split(".");
        var number = atemp[0].split(",").join("");
        var n_length = number.length;
        var words_string = "";
        if (n_length <= 9) {
            var n_array = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
            var received_n_array = new Array();
            for (var i = 0; i < n_length; i++) {
                received_n_array[i] = number.substr(i, 1);
            }
            for (var i = 9 - n_length, j = 0; i < 9; i++, j++) {
                n_array[i] = received_n_array[j];
            }
            for (var i = 0, j = 1; i < 9; i++, j++) {
                if (i == 0 || i == 2 || i == 4 || i == 7) {
                    if (n_array[i] == 1) {
                        n_array[j] = 10 + parseInt(n_array[j]);
                        n_array[i] = 0;
                    }
                }
            }
            value = "";
            for (var i = 0; i < 9; i++) {
                if (i == 0 || i == 2 || i == 4 || i == 7) {
                    value = n_array[i] * 10;
                } else {
                    value = n_array[i];
                }
                if (value != 0) {
                    words_string += words[value] + " ";
                }
                if ((i == 1 && value != 0) || (i == 0 && value != 0 && n_array[i + 1] == 0)) {
                    words_string += "Crores ";
                }
                if ((i == 3 && value != 0) || (i == 2 && value != 0 && n_array[i + 1] == 0)) {
                    words_string += "Lakhs ";
                }
                if ((i == 5 && value != 0) || (i == 4 && value != 0 && n_array[i + 1] == 0)) {
                    words_string += "Thousand ";
                }
                if (i == 6 && value != 0 && (n_array[i + 1] != 0 && n_array[i + 2] != 0)) {
                    words_string += "Hundred and ";
                } else if (i == 6 && value != 0) {
                    words_string += "Hundred ";
                }
            }
            words_string = words_string.split("  ").join(" ");
        }
        $scope.amountinwords = words_string;
    }

    $scope.saveData = function(){

        if($scope.selectedProductList.length == 0)
        {
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please add product to list.</p>',
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

                if ($scope.invoice.im_cm_id.cm_id == undefined) {

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
                        $scope.customer.cm_name = $('#im_cm_id').val();
                        $scope.customer.cm_mobile = "N/A";
                        $scope.customer.cm_email = "N/A";
                        $scope.customer.cm_address = "N/A";
                        $scope.customer.cm_gst = "N/A";
                        $scope.customer.cm_debit = 0;
                        $scope.customer.cm_balance = 0;

                        $http({
                          method: 'POST',
                          url: $rootScope.baseURL+'/customer/add',
                          data: $scope.customer,
                          headers: {'Content-Type': 'application/json',
                                  'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
                        })
                        .success(function(cust)
                        {
                            $scope.invoice.im_cm_id = cust[cust.length-1];  

                            $scope.invoice.im_date = $('#pDate').val();

                            $scope.pruchaseForm = {
                                purchaseSingleData : $scope.invoice,
                                purchaseMultipleData : $scope.selectedProductList
                            };
                            $http({
                              method: 'POST',
                              url: $rootScope.baseURL+'/invoice/add',
                              data: $scope.pruchaseForm,
                              headers: {'Content-Type': 'application/json',
                                      'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
                            })
                            .success(function(response)
                            {
                                $('#btnsave').text("SAVE");
                                $('#btnsave').removeAttr('disabled');
                                $scope.printDetails();
                                window.location.href = '#/invoice'; 
                            })
                            .error(function(data) 
                            {   
                                var dialog = bootbox.dialog({
                                message: '<p class="text-center">Oops, Something Went Wrong! Please try again!</p>',
                                    closeButton: false
                                });
                                setTimeout(function(){
                                $('#btnsave').text("SAVE");
                                $('#btnsave').removeAttr('disabled');
                                    dialog.modal('hide');  
                                    $('#addCustomer').modal('hide');
                                }, 1500);
                            });
                        })
                        .error(function(data) 
                        {   
                          var dialog = bootbox.dialog({
                            message: '<p class="text-center">Oops, Something Went Wrong! Please Refresh the Page.</p>',
                                closeButton: false
                            });
                            setTimeout(function(){
                            $('#btnsave').text("SAVE");
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
                            $('#btnsave').text("SAVE");
                            $('#btnsave').removeAttr('disabled');
                            dialog.modal('hide');  
                            $('#addCustomer').modal('hide');
                            //$scope.vendor = null;
                        }, 1500);
                    });

                }
                else{
                    $scope.invoice.im_date = $('#pDate').val();

                    $scope.pruchaseForm = {
                        purchaseSingleData : $scope.invoice,
                        purchaseMultipleData : $scope.selectedProductList
                    };
                    $http({
                      method: 'POST',
                      url: $rootScope.baseURL+'/invoice/add',
                      data: $scope.pruchaseForm,
                      headers: {'Content-Type': 'application/json',
                              'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
                    })
                    .success(function(response)
                    {
                        $('#btnsave').text("SAVE");
                        $('#btnsave').removeAttr('disabled');
                        $scope.printDetails();
                        window.location.href = '#/invoice'; 
                    })
                    .error(function(data) 
                    {   
                        var dialog = bootbox.dialog({
                        message: '<p class="text-center">Oops, Something Went Wrong! Please try again!</p>',
                            closeButton: false
                        });
                        setTimeout(function(){
                        $('#btnsave').text("SAVE");
                        $('#btnsave').removeAttr('disabled');
                            dialog.modal('hide');  
                            $('#addCustomer').modal('hide');
                        }, 1500);
                    });
                }
            }

        };

    $scope.printDetails = function(){

        var popupWin = window.open('', 'winname','directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,scrollbars=no,resizable=no');
          
        var page1 = "<html>" +
         " <head>" +
            "<link rel='stylesheet' href='./././resources/vendor/bootstrap/css/bootstrap.min.css' />" +
            "<style>.action{display:none;} .print-hide{display:none;}</style>"+
            "   <style type='text/css' media='print'>" +
            "  @page " +
             " {" +
              "    size:  A4 portrait;" +  /* auto is the initial value */
               "   margin: 0; " + /* this affects the margin in the printer settings */
              "}" +

              "html" +
              "{" +
               "   background-color: #FFFFFF;" + 
                "  margin: 0px; " + /* this affects the margin on the html before sending to printer */
              "}" +

              "body" +
              "{" +
                "font-size:11pt;"+
                "font-family:'Open Sans', sans-serif;"+
               // "   border: solid 1px black ;" +
                "  margin: 5mm 10mm 0mm 7.5mm;" + /* margin you want for the content */
              "}" +
              "</style>" +
          "</head>" +
          "<body onload='window.print()'>" +
           "<table width='100%' height='95%'>" +
            "<thead>"+
              "<tr>"+
                "<td colspan='12' style=' border-style: solid; border-width:0px;'>"+
                  "<table width='100%'>"+
                    "<tr>" +
                      "<td colspan='2' style='text-align:left; padding: 10px; border-style: solid solid none solid; border-width:1px; font-size:10pt;' valign='top'>" +
                          "<img src='./././resources/header.png' width='100%' height='100%'>"+
                      "</td>" +
                    "</tr>" +
                    "<tr>" +
                      "<td colspan='2' style='text-align:center; padding: 4px; border-style: solid solid none solid; border-width:1px; font-size:13pt;' valign='top'>" +
                          "<strong>Tax Invoice</strong>"+
                      "</td>" +
                    "</tr>" +
                    "<tr>" +
                      "<td width='60%' style='text-align:left; padding: 4px; border-style: solid solid none solid; border-width:1px; font-size:10pt;' valign='top'>" +
                          "<table width='100%'>"+
                            "<tr>"+
                              "<td  colspan='2' style='text-align:center; padding: 4px; border-style: none none solid none; border-width:1px; font-size:10pt;'>"+
                                "<strong>Bill To Party</strong>"+
                              "</td>"+
                            "</tr>"+
                            "<tr>"+
                              "<td width='30%' style='text-align:left; padding: 4px; border-style: none solid none none; border-width:1px; font-size:10pt;'>"+
                                "Name: "+
                              "</td>"+
                              "<td width='70%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "<strong>"+$scope.invoice.im_cm_id.cm_name+"</strong>"+
                              "</td>"+
                            "</tr>"+
                            "<tr>"+
                              "<td width='30%' style='text-align:left; padding: 4px; border-style: none solid none none; border-width:1px; font-size:10pt;'>"+
                                "Address: "+
                              "</td>"+
                              "<td width='70%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "<strong>"+$scope.invoice.im_cm_id.cm_address+"</strong>"+
                              "</td>"+
                            "</tr>"+
                            "<tr>"+
                              "<td width='30%' style='text-align:left; padding: 4px; border-style: none solid none none; border-width:1px; font-size:10pt;'>"+
                                "Contact No.: "+
                              "</td>"+
                              "<td width='70%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "<strong>"+$scope.invoice.im_cm_id.cm_mobile+"</strong>"+
                              "</td>"+
                            "</tr>"+
                            "<tr>"+
                              "<td width='30%' style='text-align:left; padding: 4px; border-style: none solid none none; border-width:1px; font-size:10pt;'>"+
                                "GSTIN: "+
                              "</td>"+
                              "<td width='70%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "<strong>"+$scope.invoice.im_cm_id.cm_gst+"</strong>"+
                              "</td>"+
                            "</tr>"+
                          "</table>"+
                      "</td>" +
                      "<td width='40%' style='text-align:left; padding: 4px; border-style: solid solid none none; border-width:1px; font-size:10pt;' valign='top'>" +
                          "<table width='100%'>"+
                            "<tr>"+
                              "<td width='50%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "Invoice No.: "+
                              "</td>"+
                              "<td width='50%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "<strong>"+$scope.invoice.im_invoice_no+"</strong>"+
                              "</td>"+
                            "</tr>"+
                            "<tr>"+
                              "<td width='50%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "Invoice Date: "+
                              "</td>"+
                              "<td width='50%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "<strong>"+$filter('date')($scope.invoice.im_date, "mediumDate")+"</strong>"+
                              "</td>"+
                            "</tr>"+
                            "<tr>"+
                              "<td width='50%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "Vehical No.: "+
                              "</td>"+
                              "<td width='50%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "<strong>"+$scope.invoice.im_vehical_no+"</strong>"+
                              "</td>"+
                            "</tr>"+
                          "</table>"+
                      "</td>" +
                    "</tr>" +
                  "</table>"+
                "</td>"+
              "</tr>"+
            "</thead>"+
            "<tbody>"+
              "<tr>"+
                "<td colspan='12' valign='top' style=' border-style: solid; border-width:1px;'>"+
                  "<table width='100%'>" +
                    "<thead>"+
                      "<tr>"+      
                        "<th width='5%' rowspan='2' style='text-align:center; padding: 4px; font-size: 10pt; border-style: none solid solid none; border-width:1px;'>Sr.No.</th>" +
                        "<th width='20%' rowspan='2' style='text-align:center; padding: 4px; font-size: 10pt; border-style: none solid solid none; border-width:1px;'>Product Description</th> " +
                        "<th width='5%' rowspan='2' style='text-align:center; padding: 4px; font-size: 10pt; border-style: none solid solid none; border-width:1px;'>HSN Code</th>" +
                        "<th width='5%' rowspan='2' style='text-align:center; padding: 4px; font-size: 10pt; border-style: none solid solid none; border-width:1px;'>Qty</th>"+
                        "<th width='5%' rowspan='2' style='text-align:center; padding: 4px; font-size: 10pt; border-style: none solid solid none; border-width:1px;'>Unit</th>" +
                        "<th width='10%' rowspan='2' style='text-align:center; padding: 4px; font-size: 10pt; border-style: none solid solid none; border-width:1px;'>Rate</th>" +
                        "<th width='10%' rowspan='2' style='text-align:center; padding: 4px; font-size: 10pt; border-style: none solid solid none; border-width:1px;'>Amount</th>" +
                        "<th width='15%' colspan='2' style='text-align:center; padding: 4px; font-size: 10pt; border-style: none solid solid none; border-width:1px;'>SGST</th>" +
                        "<th width='15%' colspan='2' style='text-align:center; padding: 4px; font-size: 10pt; border-style: none solid solid none; border-width:1px;'>CGST</th>" +
                        "<th width='10%' rowspan='2' style='text-align:center; padding: 4px; font-size: 10pt; border-style: none none solid none; border-width:1px;'>Total</th>" +
                      "</tr>"+
                      "<tr>"+      
                        "<th width='5%' style='padding: 4px; text-align:center; font-size: 9pt; border-style: none solid solid none; border-width:1px;'>Rate</th>" +
                        "<th width='10%' style='padding: 4px; text-align:center; font-size: 9pt; border-style: none solid solid none; border-width:1px;'>Amount</th>" +
                        "<th width='5%' style='padding: 4px; text-align:center; font-size: 9pt; border-style: none solid solid none; border-width:1px;'>Rate</th>" +
                        "<th width='10%' style='padding: 4px; text-align:center; font-size: 9pt; border-style: none solid solid none; border-width:1px;'>Amount</th>" +
                      "</tr>"+
                    "</thead>"+
                    " "+$('#content').html()+" " +
                  "</table>"+
                "</td>"+
              "</tr>"+
            "</tbody>"+
            "<tfoot>"+
            "<tr>"+
              "<td width='50%' colspan='6' style='text-align:center; padding:4px; font-size:10pt; border-style: solid solid solid solid; border-width:1px;'><strong>Total</strong></td>"+
              "<td width='10%' style='text-align:center; padding:4px; font-size:10pt; border-style: solid solid solid none; border-width:1px;'>"+$scope.invoice.amount+"</td>"+
              "<td width='15%' colspan='2' style='text-align:center; padding:4px; font-size:10pt; border-style: solid solid solid none; border-width:1px;'>"+$scope.invoice.vat+"</td>"+
              "<td width='15%' colspan='2' style='text-align:center; padding:4px; font-size:10pt; border-style: solid solid solid none; border-width:1px;'>"+$scope.invoice.sgst+"</td>"+
              "<td width='10%' style='text-align:center; padding:4px; font-size:10pt; border-style: solid solid solid none; border-width:1px;'>"+$scope.invoice.totalamount+"</td>"+
            "</tr>"+
            "<tr>" +
                  "<td colspan='7' rowspan='2' width='60%' style='padding:4px; font-size:10pt; border-style: none solid solid solid; border-width:1px;'>Amount in words : "+$scope.amountinwords+"</td>" +
                  "<td colspan='4' width='30%' style='padding:4px; font-size:10pt; border-style: none solid solid solid; border-width:1px;'>Total Amount Before Tax</td>" +
                  "<td width='10%' style='padding:4px; font-size:10pt; border-style: none solid none none; border-width:1px;'><strong>"+$filter('number')($scope.invoice.amount, "2")+"</strong></td>" +
              "</tr>"+
              "<tr>"+
                  "<td colspan='4' width='30%' style='padding:4px; font-size:10pt; border-style: solid; border-width:1px;'>Add: CGST + SGST</td>" +
                  "<td width='10%' style='padding:4px; font-size:10pt; border-style: solid; border-width:1px;'><strong>"+$filter('number')($scope.invoice.totaltax, "2")+"</strong></td>" +
              "</tr>"+
              "<tr>"+
                  "<td colspan='7' rowspan='2' width='60%' style='padding:4px; font-size:9pt; border-style: none none solid solid; border-width:1px;'>"+
                  "Bank Details : <br>"+
                  "A/C Name : Master Sofa<br>"+
                  "Bank Name : IDBI Bank<br>"+
                  "A/C No.: 0769102000004312<br>"+
                  "IFSC : IBKL0000769<br>"+
                  "Bank Branch : Nibm Road Kondhwa, Pune<br><br>"+
                  "<strong>Terms & Conditions</strong><br>"+
                  "1. Goods once sold shall not be taken back.<br>"+
                  "2. Our responsibility ceases once the goods leave our premises.<br>"+
                  "3. Subject to Pune jurisdiction Only.<br>"+
                  "4. GST No : <strong>27CSJPK1869E1ZI</strong>"+
                  "</td>"+
                  "<td colspan='4' width='30%' style='padding:4px; font-size:10pt; border-style: solid; border-width:1px;'>Total Amount After Tax</td>" +
                  "<td width='10%' style='padding:4px; font-size:10pt; border-style: solid; border-width:1px;'><strong>"+$filter('number')($scope.invoice.totalamount, "2")+"</strong></td>" +
              "</tr>"+
              "<tr>"+
                  "<td colspan='5' width='40%' colspan='2' valign='bottom' style='text-align:center; padding:4px; font-size:10pt; border-style: solid solid solid solid; border-width:1px;'><span style='font-size:7pt;'>Ceritified that the particulars given above are true and correct</span><br><strong>for Master Sofa</strong><br><br><br><br><br><br><br><br><br><strong>Authorized Signatory</strong></td>" +
              "</tr>" +
            "</tfoot>"+
          "</table>"+
          "</body>" +
        "</html>";
        popupWin.document.write(page1);
        popupWin.document.close();
    }

});