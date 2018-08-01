// import admin
angular.module('quotation').controller('quotationAddCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route, $filter) {

    $scope.quotation = {};
    $scope.personalDetails2={};
    $scope.quotation.qm_ref_no = 0;
    $scope.quotation.qm_total_cost=0;
    // VALIDATION & Main
  $scope.apiURL = $rootScope.baseURL+'/quotation/add';
    $('#qm_design_no').focus();
        $scope.addQuotation = function () {
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

                        $scope.pruchaseForm = {
                            quotation : $scope.quotation,
                            purchaseMultipleData : $scope.personalDetails,
                            machineDetails : $scope.machineDetails
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
      // End VALIDATION & Main


      // Auto Generate Serial Number for Quatation
      $scope.getSerial = function(){
        $scope.url = $rootScope.baseURL+'/quotation/serial/no'; 
        $http({
                method: 'POST',
                url: $scope.url,
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

      // Bill Of Material ADD/Remove Table
    $scope.personalDetails = [];    
      $scope.addNew = function(personalDetail){
          $scope.personalDetails.push({ 
              'qtm_part_no': "", 
              'qtm_part_name': "",
              'qtm_qty': "",
          });
      };
    $scope.remove = function(index){
      $scope.personalDetails.splice(index,1)
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
              'qpmm_mm_price' : "",
              'qpmm_total' : "",
          });
           $('#qpmm_mm_id').focus();
      };
    $scope.removeMachine = function(index){
      $scope.machineDetails.splice(index,1);

           $scope.calculate();
    };
    $scope.calculate=function(){
      $scope.quotation.qm_total_cost=0;
      angular.forEach($scope.machineDetails, function(value,key){

      value.qpmm_total= parseFloat(parseFloat(value.qpmm_mm_id.mm_price) * parseFloat(value.qpmm_mm_hr));
        $scope.quotation.qm_total_cost=$scope.quotation.qm_total_cost + value.qpmm_total;
      });
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


    //design details on typeahead select
    $scope.getDesignDetails=function(){
        $scope.personalDetails=[];
        $http({
              method: 'GET',
              url: $rootScope.baseURL+'/quotation/views/'+$scope.quotation.qm_design_no.dm_id,
              headers: {'Content-Type': 'application/json',
                      'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
            })
            .success(function(design)
            {     
                  $scope.quotation.qm_design_no.dm_cm_id=design[0].cm_name;
                  $scope.quotation.qm_design_no.dm_dely_date=$filter('date')($scope.quotation.qm_design_no.dm_dely_date, "mediumDate");
                 design.forEach(function(value,key){
                 $scope.personalDetails.push(value);

                  });
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


    //design list record for Design Name input
    $scope.getSearchDesign = function(vals) {
      var searchTerms = {search: vals};
        const httpOptions = {
            headers: {
              'Content-Type':  'application/json',
              'Authorization': 'Bearer '+localStorage.getItem("unitech_admin_access_token")
            }
        };
        return $http.post($rootScope.baseURL+'/design/typeahead/search', searchTerms, httpOptions).then((result) => {
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
              $scope.design.qm_date = $('#qm_date').val();
          }
    });

});