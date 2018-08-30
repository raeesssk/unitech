// import admin
angular.module('quotation').controller('quotationEditCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route,$filter) {

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

                  $http({
                        method: 'GET',
                        url: $rootScope.baseURL+'/quotation/details/'+$scope.quotationId,
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

                  $http({
                        method: 'GET',
                        url: $rootScope.baseURL+'/quotation/details/machine/'+$scope.quotationId,
                        headers: {'Content-Type': 'application/json',
                                'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
                  })
                  .success(function(machineObj)
                  { 
                        machineObj.forEach(function (value, key) {
                          value.mm_search=value.mm_name+" "+value.mm_price;
                          value.qpmm_total_cost= parseFloat(parseFloat(value.mm_price) * parseFloat(value.qpmm_mm_hr));
                          $scope.quotation.qm_total_cost=$scope.quotation.qm_total_cost + value.qpmm_total_cost;
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
      $scope.quotation.qm_total_cost = 0;
      angular.forEach(obj.machineDetails, function(value,key){

      value.qpmm_total= parseFloat(parseFloat(value.qpmm_mm_id.mm_price) * parseFloat(value.qpmm_mm_hr));
        obj.dtm_total_cost=obj.dtm_total_cost + value.qpmm_total;
      });
      angular.forEach($scope.personalDetails, function(value,key){
        $scope.quotation.qm_total_cost=parseFloat($scope.quotation.qm_total_cost + value.dtm_total_cost);
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
              url: $rootScope.baseURL+'/design/details/'+$scope.quotation.qm_design_no.dm_id,
              headers: {'Content-Type': 'application/json',
                      'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
            })
            .success(function(design)
            {     
                  $scope.quotation.qm_design_no.dm_dely_date=$filter('date')($scope.quotation.qm_design_no.dm_dely_date, "mediumDate");
                 design.forEach(function(value,key){
                  value.machineDetails = [];
                  value.qpmm_mm_hr = 0;
                  value.dtm_total_cost = 0;
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
          orientation: 'bottom',
          /*minDate: (parseInt(new Date().getFullYear()) - 100) + '/01/01',// minimum date(for today use 0 or -1970/01/01)
          maxDate: (parseInt(new Date().getFullYear()) - 18) + '/01/01',//maximum date calendar*/
          onChangeDateTime: function (dp, $input) {
              $scope.quotation.qm_date = $('#qm_date').val();
          }
    });

    $scope.printDetails = function(){

        var printContents = $('#content').html();
        var popupWin = window.open('', 'winname','directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,scrollbars=no,resizable=no, width=400,height=auto');
            // popupWin.document.open();
            popupWin.document.write("<html>" +
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
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='3'><strong>"+$scope.quotation.qm_comment+"</strong></td>" +
                                  "<td align='right'><strong>TOTAL</strong></td>" +
                                  "<td><strong>"+$scope.quotation.qm_total_cost+"</strong></td>" +
                                "</tr>" +
                            "</table>" +
                        "</div>" +
                    "</body>" +
                    "</html>");
            popupWin.document.close();
            // popupWin.close();


    };
});