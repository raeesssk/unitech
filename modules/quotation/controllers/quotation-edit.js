// import admin
angular.module('quotation').controller('quotationEditCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {

  $scope.quotation={};
  $scope.quotationId = $routeParams.quotationId;
  $scope.apiURL = $rootScope.baseURL+'/quotation/edit/'+$scope.quotationId;
  $scope.personalDetails = []; 
  $scope.oldProductDetails=[];
  $scope.oldMachineDetails=[];
  $scope.removeProductDetails=[];
  $scope.removeMachineDetails=[];
  
  $scope.getQuotation = function () {
      $http({
          method: 'GET',
          url: $rootScope.baseURL+'/quotation/'+$scope.quotationId,
          headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
      })
      .success(function(quotationObj)
      {   
              quotationObj.forEach(function(value,key){
                  value.qm_date=$filter('date')(value.qm_date, "mediumDate");
                   $http({
                        method: 'GET',
                        url: $rootScope.baseURL+'/customer/'+value.cm_id,
                        headers: {'Content-Type': 'application/json',
                                'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
                  })
                  .success(function(custObj)
                  {
                    custObj.forEach(function(value1,key){
                      value.old_qm_cm_id = value1;
                      value.qm_cm = value1; 
                    });                      
                        
                    $scope.quotation=value;
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


    // Fetch old details of table
    $scope.quotationDetails = function () {
    $http({
        method: 'GET',
        url: $rootScope.baseURL+'/quotation/product/'+$scope.quotationId,
        headers: {'Content-Type': 'application/json',
                'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
          })
          .success(function(quotationObj)
          {
              quotationObj.forEach(function (value, key) {
                  $scope.oldProductDetails.push(value);
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
  $scope.quotationDetails();

  // Fetch old details of table
    $scope.machineDetails = function () {
    $http({
        method: 'GET',
        url: $rootScope.baseURL+'/quotation/machine/'+$scope.quotationId,
        headers: {'Content-Type': 'application/json',
                'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
          })
          .success(function(machineObj)
          { 
              machineObj.forEach(function (value, key) {
                value.mm_search=value.mm_name+" "+value.mm_price;
                  $scope.oldMachineDetails.push(value);
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
  $scope.machineDetails();

    //Update Quotation button
    $scope.updateQuotation = function () {

        var nameRegex = /^\d+$/;
        var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        if($('#qm_design_no').val() == undefined || $('#qm_design_no').val() == ""){
              var dialog = bootbox.dialog({
                message: "<p class='text-center'>Please Enter Design Number!</p>",
                    closeButton: false
                }); 
                dialog.find('.modal-body').addClass("btn-danger");
                setTimeout(function(){
                    dialog.modal('hide'); 
                $('#qm_design_no').focus();
                }, 1500);
            }
            else if($('#qm_quotation_no').val() == undefined || $('#qm_quotation_no').val() == ""){
              var dialog = bootbox.dialog({
                message: '<p class="text-center">Please Enter Quotation Number!</p>',
                    closeButton: false
                });
                dialog.find('.modal-body').addClass("btn-danger");
                setTimeout(function(){
                    dialog.modal('hide');
                    $('#qm_quotation_no').focus(); 
                }, 1500);
            }
            else if($('#qm_cm').val() == undefined || $('#qm_cm').val() == ""){
              var dialog = bootbox.dialog({
                  message: "<p class='text-center'>Please Enter Customer's Name!</p>",
                      closeButton: false
                  });
                  dialog.find('.modal-body').addClass("btn-danger");
                  setTimeout(function(){
                      dialog.modal('hide');
                      $('#qm_cm_id').focus();  
                  }, 1500);
            }
            else if($('#qm_date').val() == undefined || $('#qm_date').val() == ""){
              var dialog = bootbox.dialog({
                  message: '<p class="text-center">Please Enter The Date!</p>',
                      closeButton: false
                  });
                  dialog.find('.modal-body').addClass("btn-danger");
                  setTimeout(function(){
                      dialog.modal('hide'); 
                      
                      $('#qm_date').focus(); 
                  }, 1500);
            }
            else if($('#qm_ref_no').val() == undefined || $('#qm_ref_no').val() == ""){
              var dialog = bootbox.dialog({
                  message: '<p class="text-center">Please Enter The Reference Number!</p>',
                      closeButton: false
                  });
                  dialog.find('.modal-body').addClass("btn-danger");
                  setTimeout(function(){
                      dialog.modal('hide'); 
                      
                      $('#qm_ref_no').focus(); 
                  }, 1500);
            }
        else{
                $('#btnsave').attr('disabled','true');
                $('#btnsave').text("please wait...");

                          $scope.obj={
                            quotation : $scope.quotation,
                            machineDetails : $scope.machineDetails,
                            personalDetails : $scope.personalDetails,
                            oldProductDetails : $scope.oldProductDetails,
                            oldMachineDetails : $scope.oldMachineDetails,
                            removeProductDetails : $scope.removeProductDetails,
                            removeMachineDetails : $scope.removeMachineDetails 
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
                                message: '<p class="text-center">Quotation Updated Successfully!</p>',
                                    closeButton: false
                                });
                                dialog.find('.modal-body').addClass("btn-success");
                                setTimeout(function(){
                                    dialog.modal('hide'); 
                                }, 1500);
                                $('#btnsave').text("Update");
                                $('#btnsave').removeAttr('disabled');
                               window.location.href = '#/quotation';  
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
    };

     // Bill Of Material ADD/Remove Table   
      $scope.addNew = function(personalDetail){
          $scope.personalDetails.push({ 
              'qpm_part_no': "", 
              'qpm_part_name': "",
              'qpm_qty': "",
          });
      };
    $scope.removeProduct = function(index){
      $scope.personalDetails.splice(index,1);
     };

    $scope.removeOldProduct = function(index){
      $scope.removeProductDetails.push($scope.oldProductDetails[index]);
      $scope.oldProductDetails.splice(index,1);
    };
    $scope.checkAll = function () {
        if (!$scope.selectedAll) {
            $scope.selectedAll = true;
        } else {
            $scope.selectedAll = false;
        }
        angular.forEach($scope.personalDetails, function(personalDetail) {
            personalDetail.selected = $scope.selectedAll;
        });
    };   
    // END Bill Of Material ADD/Remove Table 
    

      // Machine Details ADD/Remove Table
       
  $scope.machineDetails = []; 
      $scope.addmachine = function(machineDetails){
          $scope.machineDetails.push({ 
              'qpmm_mm_id': "",
              'qpmm_mm_hr': "",
          });
           $('#qpmm_mm_id').focus();
      };
    $scope.removeMachine = function(index){
      $scope.machineDetails.splice(index,1);
    };

    $scope.removeOldMachine = function(index){
      $scope.removeMachineDetails.push($scope.oldMachineDetails[index]);
      $scope.oldMachineDetails.splice(index,1);
    };

    $scope.checkAll = function () {
        if (!$scope.selectedAll) {
            $scope.selectedAll = true;
        } else {
            $scope.selectedAll = false;
        }
        angular.forEach($scope.machineDetails, function(machineDetail) {
            machineDetail.selected = $scope.selectedAll;
        });
    };   
    // END Machine Details ADD/Remove Table 
    $scope.calculate=function(){

    }

    //design list record for Design Name input
    $scope.getSearchDesign = function(vals) {
      var searchTerms = {search: vals};
        const httpOptions = {
            headers: {
              'Content-Type':  'application/json',
              'Authorization': 'Bearer '+localStorage.getItem("unitech_admin_access_token")
            }
        };
        return $http.post($rootScope.baseURL+'/quotation/typeahead/search', searchTerms, httpOptions).then((result) => {
            return result.data;
        });
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
          /*minDate: (parseInt(new Date().getFullYear()) - 100) + '/01/01',// minimum date(for today use 0 or -1970/01/01)
          maxDate: (parseInt(new Date().getFullYear()) - 18) + '/01/01',//maximum date calendar*/
          onChangeDateTime: function (dp, $input) {
              $scope.quotation.qm_date = $('#qm_date').val();
          }
    });

});