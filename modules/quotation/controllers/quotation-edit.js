// import admin
angular.module('quotation').controller('quotationEditCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {

  
  $scope.quotationId = $routeParams.quotationId;
  $scope.apiURL = $rootScope.baseURL+'/quotation/edit/'+$scope.quotationId;
  $scope.oldProductDetails=[];
  $scope.oldMachineDetails=[];
  $scope
  
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
            else if($('#qm_cm_id').val() == undefined || $('#qm_cm_id').val() == ""){
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


                          $http({
                            method: 'POST',
                            url: $scope.apiURL,
                            data: $scope.quotation,
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
    $scope.personalDetails = [];    
      $scope.addNew = function(personalDetail){
          $scope.personalDetails.push({ 
              'qm_part_no': "", 
              'qm_part_name': "",
              'qm_qty': "",
              'qm_cost': "",
              'qm_total': "",
          });
      };
    $scope.remove = function(){
      var newDataList=[];
          $scope.selectedAll = false;
          angular.forEach($scope.personalDetails, function(selected){
              if(!selected.selected){
                  newDataList.push(selected);
              }
          }); 
          $scope.personalDetails = newDataList;
    };

    $scope.removeOldProduct = function(){
      var removeProductDetails=[];
          $scope.selectedAll = false;
          angular.forEach($scope.personalDetails, function(selected){
              if(!selected.selected){
                  removeProductDetails.push(selected);
              }
          }); 
          $scope.oldProductDetails = removeProductDetails;
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
              'qtm_mm_id': "",
              'qtm_mm_hr': "",
          });
           $('#qpmm_mm_id').focus();
      };
    $scope.removeMachine = function(){
      var newMachineList=[];
          $scope.selectedAll = false;
          angular.forEach($scope.machineDetails, function(selected){
              if(!selected.selected){
                  newMachineList.push(selected);
              }
          }); 
          $scope.machineDetails = newMachineList;
    };

    $scope.removeOldMachine = function(){
      var removeMachineDetails=[];
          $scope.selectedAll = false;
          angular.forEach($scope.machineDetails, function(selected){
              if(!selected.selected){
                  removeMachineDetails.push(selected);
              }
          }); 
          $scope.OldMachineDetails = removeMachineDetails;
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