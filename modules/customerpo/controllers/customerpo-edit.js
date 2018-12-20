// import admin
angular.module('customerpo').controller('customerpoEditCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route, $filter) {

    $scope.customerpo={};
     $scope.materialDetails=[];
     $scope.finalList=[];
    $scope.customerpoId = $routeParams.customerpoId;
    $scope.apiURL = $rootScope.baseURL+'/finalquotation/edit/'+$scope.customerpoId;

    $scope.getCustomerpo = function () {

	     $http({
      	      method: 'GET',
      	      url: $rootScope.baseURL+'/finalquotation/'+$scope.customerpoId,
      	      headers: {'Content-Type': 'application/json',
                        'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
      	    })
      	    .success(function(customerpoObj)
      	    {
              customerpoObj.forEach(function (value, key) {
                  value.fqm_date=$filter('date')(value.fqm_date, "yyyy-MM-dd");
                  value.fqm_po_date=$filter('date')(value.fqm_po_date, "yyyy-MM-dd");
                  value.fqm_dispatch_date=$filter('date')(value.fqm_dispatch_date, "yyyy-MM-dd");
      	          $scope.customerpo = value;

                        $http({
                              method: 'GET',
                              url: $rootScope.baseURL+'/finalquotation/edit/details/'+value.fqm_id,
                              headers: {'Content-Type': 'application/json',
                                      'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
                            })
                            .success(function(quotation)
                            {
                                quotation.forEach(function(value2,key){
                                  if(value2.fqpm_id != null){
                                    value2.qpm_check = true;
                                    value2.qty = value2.fqpm_quantity;
                                    $scope.finalList.push(value2);
                                  }
                                  else{
                                    value2.qty = value2.qpm_qty;
                                  }
                                  $scope.materialDetails.push(value2);
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

 

  $scope.updateCustomerpo = function () {

  		var nameRegex = /^\d+$/;
  		var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    
	      if($('#fqm_date').val() == undefined || $('#fqm_date').val() == ""){
            var dialog = bootbox.dialog({
            message: "<p class='text-center'>Please Select P.O Date!</p>",
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide');
                $('#fqm_date').focus(); 
            }, 1500);
        }
        else if($('#fqm_po_no').val() == undefined || $('#fqm_po_no').val() == ""){
            var dialog = bootbox.dialog({
            message: "<p class='text-center'>Please Select Customer's P.O Number!</p>",
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide');
                $('#fqm_po_no').focus(); 
            }, 1500);
        }
        else if($('#fqm_po_date').val() == undefined || $('#fqm_po_date').val() == ""){
            var dialog = bootbox.dialog({
            message: "<p class='text-center'>Please Select Customer's P.O Date!</p>",
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide');
                $('#fqm_po_date').focus(); 
            }, 1500);
        }
        else if($('#fqm_dispatch_date').val() == undefined || $('#fqm_dispatch_date').val() == ""){
            var dialog = bootbox.dialog({
            message: "<p class='text-center'>Please Select Dispatch Date!</p>",
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide');
                $('#fqm_dispatch_date').focus(); 
            }, 1500);
        }
        else if( $scope.customerpo.fqm_amount == 'NaN' ){
            var dialog = bootbox.dialog({
            message: "<p class='text-center'>Please Update The Quantity!</p>",
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide');
            }, 1500);
        }
        else if( $scope.finalList.length == 0 ){
            var dialog = bootbox.dialog({
            message: "<p class='text-center'>Atleast 1 list to be present!</p>",
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
            $scope.obj={
              finalquotation : $scope.customerpo,
              purchaseMultipleData : $scope.finalList
            }
      	    $http({
      	      method: 'POST',
      	      url: $scope.apiURL,
      	      data: $scope.obj,
      	      headers: {'Content-Type': 'application/json',
                        'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
      	    })
      	    .success(function(login)
      	    {    
                var dialog = bootbox.dialog({
                  message: '<p class="text-center">Record Updated Successfully.</p>',
                      closeButton: false
                  });
                  dialog.find('.modal-body').addClass("btn-success");
                  setTimeout(function(){
                    $('#btnsave').text("Update");
                    $('#btnsave').removeAttr('disabled');
                   window.location.href = '#/customerpo'; 
                      dialog.modal('hide'); 
                  }, 1500); 

      	    })
      	    .error(function(data) 
      	    {   
      	      var dialog = bootbox.dialog({
                  message: '<p class="text-center">Oops, Something Went Wrong! Please Refresh the Page.</p>',
                      closeButton: false
                  });
                  dialog.find('.modal-body').addClass("btn-danger");
                  setTimeout(function(){
                    $('#btnsave').text("Update");
                    $('#btnsave').removeAttr('disabled');
                      dialog.modal('hide'); 
                  }, 1500);            
      	    });
		}
	};
  
  $scope.calculate = function(){
    $scope.customerpo.fqm_quantity=0;
    $scope.customerpo.fqm_amount=0;
    // var i = 1;
    angular.forEach($scope.finalList, function(value,key){
      $scope.customerpo.fqm_quantity=parseFloat(parseFloat($scope.customerpo.fqm_quantity) + parseFloat(value.qty));
      $scope.customerpo.fqm_amount=parseFloat(parseFloat($scope.customerpo.fqm_amount) + parseFloat(parseFloat(value.qty)* parseFloat(value.qpm_cost_pc))).toFixed(2);
     // value.srno = i++;
    });  
  };
  // checkBox

    $scope.checkBox = function(index){ 
        if($scope.materialDetails[index].qpm_check){
            $scope.finalList.push($scope.materialDetails[index]);
            $scope.calculate();
        }
        else{
           $scope.finalList.forEach(function(value, key){
            if(value.qpm_id == $scope.materialDetails[index].qpm_id)
                $scope.finalList.splice(key,1);
          });
          console.log($scope.finalList);
            $scope.calculate();
        } 
    };



  // tab key
    $("#fqm_no").keydown(function(objEvent) {
        if (objEvent.keyCode == 9) {  //tab pressed
            objEvent.preventDefault(); // stops its action
        }
    })

    //date P.O Date
    $('#fqm_date').datepicker({
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
              $scope.customerpo.fqm_date = $('#fqm_date').val();
          }
    });
        //date P.O Date
    $('#fqm_po_date').datepicker({
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
              $scope.customerpo.fqm_po_date = $('#fqm_po_date').val();
          }
    });
         //date cpm_dispatch_date
    $('#fqm_dispatch_date').datepicker({
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
              $scope.customerpo.fqm_dispatch_date = $('#fqm_dispatch_date').val();
          }
    });

});