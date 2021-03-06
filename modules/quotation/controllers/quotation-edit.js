// import admin
angular.module('quotation').controller('quotationEditCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route,$filter) {

  $scope.quotation={};
  $scope.quotationId = $routeParams.quotationId;
  $scope.apiURL = $rootScope.baseURL+'/quotation/edit/'+$scope.quotationId;
  $scope.personalDetails = []; 
  
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

                  $scope.quotation=value;
                  
                  $http({
                        method: 'GET',
                        url: $rootScope.baseURL+'/quotation/details/'+$scope.quotationId,
                        headers: {'Content-Type': 'application/json',
                                'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
                  })
                  .success(function(quotationObj)
                  {
                        quotationObj.forEach(function (value, key) {
                          value.machineDetails=[];
                          value.newMachineDetails=[];
                          value.removeMachineDetails=[];
                            $http({
                                  method: 'GET',
                                  url: $rootScope.baseURL+'/quotation/details/machine/'+value.qpm_id,
                                  headers: {'Content-Type': 'application/json',
                                          'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
                            })
                            .success(function(machineObj)
                            { 
                                  machineObj.forEach(function (value1, key1) {
                                    value.machineDetails.push(value1);
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
        
       if($('#qm_ref').val() == undefined || $('#qm_ref').val() == ""){
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

                          $scope.obj={
                            quotation : $scope.quotation,
                            purchaseMultipleData : $scope.personalDetails 
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
                                      $scope.printDetails();
                                      $('#btnsave').text("Update");
                                      $('#btnsave').removeAttr('disabled');
                                     window.location.href = '#/quotation';  
                                }, 1500);
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
            $scope.personalDetails[index].newMachineDetails.push($scope.machineList);
            $scope.personalDetails[index].qpmm_mm_id = null;
            $scope.personalDetails[index].qpmm_mm_hr = 0;
            $scope.calculate($scope.personalDetails[index]);
                // $('#qpmm_mm_id').focus();
        }
    };

    $scope.removeItem = function(pindex,index){
        $scope.personalDetails[pindex].newMachineDetails.splice(index,1);
        $scope.calculate($scope.personalDetails[pindex]);
        // $('#qpmm_mm_id').focus();
    };

    $scope.removeItemOld = function(pindex,index){
        $scope.personalDetails[pindex].removeMachineDetails.push($scope.personalDetails[pindex].machineDetails[index]);
        $scope.personalDetails[pindex].machineDetails.splice(index,1);
        $scope.calculate($scope.personalDetails[pindex]);
        // $('#qpmm_mm_id').focus();
    };

    
    $scope.calculate=function(obj){
      obj.qpm_total_cost=0;
      $scope.quotation.qm_net_cost=0;
      $scope.quotation.qm_cgst_amount=0;
      $scope.quotation.qm_sgst_amount=0;
      $scope.quotation.qm_igst_amount=0;
      $scope.quotation.qm_total_cost=0;
      
      var ts = 0;
      angular.forEach(obj.machineDetails, function(value,key){
        value.qpmm_total= parseFloat(parseFloat(value.mm_price) * parseFloat(value.qpmm_mm_hr));
        ts = parseFloat(ts + value.qpmm_total); 
      });

      angular.forEach(obj.newMachineDetails, function(value,key){
        value.qpmm_total= parseFloat(parseFloat(value.qpmm_mm_id.mm_price) * parseFloat(value.qpmm_mm_hr));
        ts = parseFloat(ts + value.qpmm_total); 
      });

      obj.qpm_total_cost = parseFloat(obj.qpm_total_cost + (parseFloat(ts + obj.qpm_price) * obj.qpm_qty));

      angular.forEach($scope.personalDetails, function(value,key){
        $scope.quotation.qm_net_cost=parseFloat($scope.quotation.qm_net_cost + value.qpm_total_cost );
      });

      $scope.quotation.qm_cgst_amount = ($scope.quotation.qm_net_cost * ($scope.quotation.qm_cgst_per / 100));
      $scope.quotation.qm_sgst_amount = ($scope.quotation.qm_net_cost * ($scope.quotation.qm_sgst_per / 100));
      $scope.quotation.qm_igst_amount = ($scope.quotation.qm_net_cost * ($scope.quotation.qm_igst_per / 100));

      $scope.quotation.qm_total_cost = parseFloat(parseFloat($scope.quotation.qm_net_cost) + parseFloat($scope.quotation.qm_cgst_amount) + parseFloat($scope.quotation.qm_sgst_amount) + parseFloat($scope.quotation.qm_igst_amount) + parseFloat($scope.quotation.qm_transport) + parseFloat($scope.quotation.qm_other_charges) - parseFloat($scope.quotation.qm_discount));

    };
    $scope.calculateTotal = function(){
      $scope.quotation.qm_total_cost = parseFloat(parseFloat($scope.quotation.qm_net_cost) + parseFloat($scope.quotation.qm_cgst_amount) + parseFloat($scope.quotation.qm_sgst_amount) + parseFloat($scope.quotation.qm_igst_amount) + parseFloat($scope.quotation.qm_transport) + parseFloat($scope.quotation.qm_other_charges) - parseFloat($scope.quotation.qm_discount));
    }

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
                                "<td colspan='2'>To: <strong>"+$scope.quotation.cm_name+" ("+$scope.quotation.cm_address+")</strong></td>"+
                              "</tr>" +
                              "<tr>" +
                                "<td>Date : <strong>"+$filter('date')($scope.quotation.qm_date,'mediumDate')+"</strong></td>" +
                                "<td>Reference : <strong>"+$scope.quotation.qm_ref+"</strong></td>" +
                              "</tr>" +
                              "<tr>" +
                                "<td>Design No : <strong>"+$scope.quotation.dm_design_no+"</strong></td>" +
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
});