// import admin
angular.module('quotation').controller('quotationAddCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route, $filter) {

    $scope.quotation = {};
    $scope.quotation.qm_ref = "N/A";

    // $scope.quotation.qm_comment = "<b>Terms & Conditions</b> <br>"+
    //                               "1. delivery: as per specific requirement. <br>"+
    //                               "2. Taxes extra as applicable. <br>"+
    //                               "3. Payment terms: 30 DAYS After Delivery. <br>"+
    //                               "4. Packing Charges: NIL. <br>"+
    //                               "5. <strong>TRANSPORT CHARGES TO BE BORN BY YOU.</strong>";
    
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

    // VALIDATION & MAIN
  $scope.apiURL = $rootScope.baseURL+'/quotation/add';
  $scope.quotation.qm_dm_id=$rootScope.designObj;
  // console.log($rootScope.designObj);
    $('#qm_date').focus();
        $scope.addQuotation = function () {
            var nameRegex = /^\d+$/;
            var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
            if($('#qm_date').val() == undefined || $('#qm_date').val() == ""){
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
            else if($('#qm_dm_id').val() == undefined || $('#qm_dm_id').val() == "" || $scope.quotation.qm_dm_id.dm_id == undefined ){
              var dialog = bootbox.dialog({
                message: "<p class='text-center'>Please Enter Project Number!</p>",
                    closeButton: false
                }); 
                dialog.find('.modal-body').addClass("btn-danger");
                setTimeout(function(){
                    dialog.modal('hide'); 
                $('#qm_dm_id').focus();
                }, 1500);
            }
            else if($('#qm_attend_by').val() == undefined || $('#qm_attend_by').val() == ""){
              var dialog = bootbox.dialog({
                  message: '<p class="text-center">Please Enter Attend By!</p>',
                      closeButton: false
                  });
                  dialog.find('.modal-body').addClass("btn-danger");
                  setTimeout(function(){
                      dialog.modal('hide'); 
                      
                      $('#qm_attend_by').focus(); 
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


    $scope.addToFlcutCart = function(index){

        var nameRegex = /^\d+$/;
        var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var numRegex = /^\d+(\.\d{1,2})?$/;

        if($scope.personalDetails[index].flcuts.qpmm_mm_id == "" || $scope.personalDetails[index].flcuts.qpmm_mm_id == undefined || $scope.personalDetails[index].flcuts.qpmm_mm_id.mm_id == undefined){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Select Machine!</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else if($scope.personalDetails[index].flcuts.qpmm_mm_hr == undefined || $scope.personalDetails[index].flcuts.qpmm_mm_hr < 0){
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
              'qpmm_mm_id':$scope.personalDetails[index].flcuts.qpmm_mm_id,
              'qpmm_mm_hr':$scope.personalDetails[index].flcuts.qpmm_mm_hr
            }
            $scope.personalDetails[index].flcuts.push($scope.machineList);
            $scope.personalDetails[index].flcuts.qpmm_mm_id = null;
            $scope.personalDetails[index].flcuts.qpmm_mm_hr = 0;
            $scope.calculate($scope.personalDetails[index]);
                // $('#qpmm_mm_id').focus();
        }
    };

    $scope.removeFlcutItem = function(pindex,index){
        $scope.personalDetails[pindex].flcuts.splice(index,1);
        $scope.calculate($scope.personalDetails[pindex]);
        // $('#qpmm_mm_id').focus();
    };

    $scope.addToTurningCart = function(index){

        var nameRegex = /^\d+$/;
        var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var numRegex = /^\d+(\.\d{1,2})?$/;

        if($scope.personalDetails[index].turnings.qpmm_mm_id == "" || $scope.personalDetails[index].turnings.qpmm_mm_id == undefined || $scope.personalDetails[index].turnings.qpmm_mm_id.mm_id == undefined){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Select Machine!</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else if($scope.personalDetails[index].turnings.qpmm_mm_hr == undefined || $scope.personalDetails[index].turnings.qpmm_mm_hr < 0){
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
              'qpmm_mm_id':$scope.personalDetails[index].turnings.qpmm_mm_id,
              'qpmm_mm_hr':$scope.personalDetails[index].turnings.qpmm_mm_hr
            }
            $scope.personalDetails[index].turnings.push($scope.machineList);
            $scope.personalDetails[index].turnings.qpmm_mm_id = null;
            $scope.personalDetails[index].turnings.qpmm_mm_hr = 0;
            $scope.calculate($scope.personalDetails[index]);
                // $('#qpmm_mm_id').focus();
        }
    };

    $scope.removeTurningItem = function(pindex,index){
        $scope.personalDetails[pindex].turnings.splice(index,1);
        $scope.calculate($scope.personalDetails[pindex]);
        // $('#qpmm_mm_id').focus();
    };

    $scope.addToMillingCart = function(index){

        var nameRegex = /^\d+$/;
        var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var numRegex = /^\d+(\.\d{1,2})?$/;

        if($scope.personalDetails[index].millings.qpmm_mm_id == "" || $scope.personalDetails[index].millings.qpmm_mm_id == undefined || $scope.personalDetails[index].millings.qpmm_mm_id.mm_id == undefined){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Select Machine!</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else if($scope.personalDetails[index].millings.qpmm_mm_hr == undefined || $scope.personalDetails[index].millings.qpmm_mm_hr < 0){
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
              'qpmm_mm_id':$scope.personalDetails[index].millings.qpmm_mm_id,
              'qpmm_mm_hr':$scope.personalDetails[index].millings.qpmm_mm_hr
            }
            $scope.personalDetails[index].millings.push($scope.machineList);
            $scope.personalDetails[index].millings.qpmm_mm_id = null;
            $scope.personalDetails[index].millings.qpmm_mm_hr = 0;
            $scope.calculate($scope.personalDetails[index]);
                // $('#qpmm_mm_id').focus();
        }
    };

    $scope.removeMillingItem = function(pindex,index){
        $scope.personalDetails[pindex].millings.splice(index,1);
        $scope.calculate($scope.personalDetails[pindex]);
        // $('#qpmm_mm_id').focus();
    };

    $scope.addToBoringCart = function(index){

        var nameRegex = /^\d+$/;
        var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var numRegex = /^\d+(\.\d{1,2})?$/;

        if($scope.personalDetails[index].borings.qpmm_mm_id == "" || $scope.personalDetails[index].borings.qpmm_mm_id == undefined || $scope.personalDetails[index].borings.qpmm_mm_id.mm_id == undefined){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Select Machine!</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else if($scope.personalDetails[index].borings.qpmm_mm_hr == undefined || $scope.personalDetails[index].borings.qpmm_mm_hr < 0){
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
              'qpmm_mm_id':$scope.personalDetails[index].borings.qpmm_mm_id,
              'qpmm_mm_hr':$scope.personalDetails[index].borings.qpmm_mm_hr
            }
            $scope.personalDetails[index].borings.push($scope.machineList);
            $scope.personalDetails[index].borings.qpmm_mm_id = null;
            $scope.personalDetails[index].borings.qpmm_mm_hr = 0;
            $scope.calculate($scope.personalDetails[index]);
                // $('#qpmm_mm_id').focus();
        }
    };

    $scope.removeBoringItem = function(pindex,index){
        $scope.personalDetails[pindex].borings.splice(index,1);
        $scope.calculate($scope.personalDetails[pindex]);
        // $('#qpmm_mm_id').focus();
    };

    $scope.addToDrillingCart = function(index){

        var nameRegex = /^\d+$/;
        var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var numRegex = /^\d+(\.\d{1,2})?$/;

        if($scope.personalDetails[index].drillings.qpmm_mm_id == "" || $scope.personalDetails[index].drillings.qpmm_mm_id == undefined || $scope.personalDetails[index].drillings.qpmm_mm_id.mm_id == undefined){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Select Machine!</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else if($scope.personalDetails[index].drillings.qpmm_mm_hr == undefined || $scope.personalDetails[index].drillings.qpmm_mm_hr < 0){
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
              'qpmm_mm_id':$scope.personalDetails[index].drillings.qpmm_mm_id,
              'qpmm_mm_hr':$scope.personalDetails[index].drillings.qpmm_mm_hr
            }
            $scope.personalDetails[index].drillings.push($scope.machineList);
            $scope.personalDetails[index].drillings.qpmm_mm_id = null;
            $scope.personalDetails[index].drillings.qpmm_mm_hr = 0;
            $scope.calculate($scope.personalDetails[index]);
                // $('#qpmm_mm_id').focus();
        }
    };

    $scope.removeDrillingItem = function(pindex,index){
        $scope.personalDetails[pindex].drillings.splice(index,1);
        $scope.calculate($scope.personalDetails[pindex]);
        // $('#qpmm_mm_id').focus();
    };

    $scope.addToTapingCart = function(index){

        var nameRegex = /^\d+$/;
        var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var numRegex = /^\d+(\.\d{1,2})?$/;

        if($scope.personalDetails[index].tapings.qpmm_mm_id == "" || $scope.personalDetails[index].tapings.qpmm_mm_id == undefined || $scope.personalDetails[index].tapings.qpmm_mm_id.mm_id == undefined){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Select Machine!</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else if($scope.personalDetails[index].tapings.qpmm_mm_hr == undefined || $scope.personalDetails[index].tapings.qpmm_mm_hr < 0){
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
              'qpmm_mm_id':$scope.personalDetails[index].tapings.qpmm_mm_id,
              'qpmm_mm_hr':$scope.personalDetails[index].tapings.qpmm_mm_hr
            }
            $scope.personalDetails[index].tapings.push($scope.machineList);
            $scope.personalDetails[index].tapings.qpmm_mm_id = null;
            $scope.personalDetails[index].tapings.qpmm_mm_hr = 0;
            $scope.calculate($scope.personalDetails[index]);
                // $('#qpmm_mm_id').focus();
        }
    };

    $scope.removeTapingItem = function(pindex,index){
        $scope.personalDetails[pindex].tapings.splice(index,1);
        $scope.calculate($scope.personalDetails[pindex]);
        // $('#qpmm_mm_id').focus();
    };

    $scope.addToGrindingCart = function(index){

        var nameRegex = /^\d+$/;
        var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var numRegex = /^\d+(\.\d{1,2})?$/;

        if($scope.personalDetails[index].grindings.qpmm_mm_id == "" || $scope.personalDetails[index].grindings.qpmm_mm_id == undefined || $scope.personalDetails[index].grindings.qpmm_mm_id.mm_id == undefined){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Select Machine!</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else if($scope.personalDetails[index].grindings.qpmm_mm_hr == undefined || $scope.personalDetails[index].grindings.qpmm_mm_hr < 0){
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
              'qpmm_mm_id':$scope.personalDetails[index].grindings.qpmm_mm_id,
              'qpmm_mm_hr':$scope.personalDetails[index].grindings.qpmm_mm_hr
            }
            $scope.personalDetails[index].grindings.push($scope.machineList);
            $scope.personalDetails[index].grindings.qpmm_mm_id = null;
            $scope.personalDetails[index].grindings.qpmm_mm_hr = 0;
            $scope.calculate($scope.personalDetails[index]);
                // $('#qpmm_mm_id').focus();
        }
    };

    $scope.removeGrindingItem = function(pindex,index){
        $scope.personalDetails[pindex].grindings.splice(index,1);
        $scope.calculate($scope.personalDetails[pindex]);
        // $('#qpmm_mm_id').focus();
    };

    $scope.addToCncCart = function(index){

        var nameRegex = /^\d+$/;
        var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var numRegex = /^\d+(\.\d{1,2})?$/;

        if($scope.personalDetails[index].cncs.qpmm_mm_id == "" || $scope.personalDetails[index].cncs.qpmm_mm_id == undefined || $scope.personalDetails[index].cncs.qpmm_mm_id.mm_id == undefined){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Select Machine!</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else if($scope.personalDetails[index].cncs.qpmm_mm_hr == undefined || $scope.personalDetails[index].cncs.qpmm_mm_hr < 0){
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
              'qpmm_mm_id':$scope.personalDetails[index].cncs.qpmm_mm_id,
              'qpmm_mm_hr':$scope.personalDetails[index].cncs.qpmm_mm_hr
            }
            $scope.personalDetails[index].cncs.push($scope.machineList);
            $scope.personalDetails[index].cncs.qpmm_mm_id = null;
            $scope.personalDetails[index].cncs.qpmm_mm_hr = 0;
            $scope.calculate($scope.personalDetails[index]);
                // $('#qpmm_mm_id').focus();
        }
    };

    $scope.removeCncItem = function(pindex,index){
        $scope.personalDetails[pindex].cncs.splice(index,1);
        $scope.calculate($scope.personalDetails[pindex]);
        // $('#qpmm_mm_id').focus();
    };

    $scope.addToWireCart = function(index){

        var nameRegex = /^\d+$/;
        var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var numRegex = /^\d+(\.\d{1,2})?$/;

        if($scope.personalDetails[index].wires.qpmm_mm_id == "" || $scope.personalDetails[index].wires.qpmm_mm_id == undefined || $scope.personalDetails[index].wires.qpmm_mm_id.mm_id == undefined){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Select Machine!</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else if($scope.personalDetails[index].wires.qpmm_mm_hr == undefined || $scope.personalDetails[index].wires.qpmm_mm_hr < 0){
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
              'qpmm_mm_id':$scope.personalDetails[index].wires.qpmm_mm_id,
              'qpmm_mm_hr':$scope.personalDetails[index].wires.qpmm_mm_hr
            }
            $scope.personalDetails[index].wires.push($scope.machineList);
            $scope.personalDetails[index].wires.qpmm_mm_id = null;
            $scope.personalDetails[index].wires.qpmm_mm_hr = 0;
            $scope.calculate($scope.personalDetails[index]);
                // $('#qpmm_mm_id').focus();
        }
    };

    $scope.removeWireItem = function(pindex,index){
        $scope.personalDetails[pindex].wires.splice(index,1);
        $scope.calculate($scope.personalDetails[pindex]);
        // $('#qpmm_mm_id').focus();
    };

    $scope.addToFabricationCart = function(index){

        var nameRegex = /^\d+$/;
        var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var numRegex = /^\d+(\.\d{1,2})?$/;

        if($scope.personalDetails[index].fabrications.qpmm_mm_id == "" || $scope.personalDetails[index].fabrications.qpmm_mm_id == undefined || $scope.personalDetails[index].fabrications.qpmm_mm_id.mm_id == undefined){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Select Machine!</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else if($scope.personalDetails[index].fabrications.qpmm_mm_hr == undefined || $scope.personalDetails[index].fabrications.qpmm_mm_hr < 0){
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
              'qpmm_mm_id':$scope.personalDetails[index].fabrications.qpmm_mm_id,
              'qpmm_mm_hr':$scope.personalDetails[index].fabrications.qpmm_mm_hr
            }
            $scope.personalDetails[index].fabrications.push($scope.machineList);
            $scope.personalDetails[index].fabrications.qpmm_mm_id = null;
            $scope.personalDetails[index].fabrications.qpmm_mm_hr = 0;
            $scope.calculate($scope.personalDetails[index]);
                // $('#qpmm_mm_id').focus();
        }
    };

    $scope.removeFabricationItem = function(pindex,index){
        $scope.personalDetails[pindex].fabrications.splice(index,1);
        $scope.calculate($scope.personalDetails[pindex]);
        // $('#qpmm_mm_id').focus();
    };

    $scope.addToHardCart = function(index){

        var nameRegex = /^\d+$/;
        var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var numRegex = /^\d+(\.\d{1,2})?$/;

        if($scope.personalDetails[index].hards.qpmm_mm_id == "" || $scope.personalDetails[index].hards.qpmm_mm_id == undefined || $scope.personalDetails[index].hards.qpmm_mm_id.mm_id == undefined){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Select Machine!</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else if($scope.personalDetails[index].hards.qpmm_mm_hr == undefined || $scope.personalDetails[index].hards.qpmm_mm_hr < 0){
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
              'qpmm_mm_id':$scope.personalDetails[index].hards.qpmm_mm_id,
              'qpmm_mm_hr':$scope.personalDetails[index].hards.qpmm_mm_hr
            }
            $scope.personalDetails[index].hards.push($scope.machineList);
            $scope.personalDetails[index].hards.qpmm_mm_id = null;
            $scope.personalDetails[index].hards.qpmm_mm_hr = 0;
            $scope.calculate($scope.personalDetails[index]);
                // $('#qpmm_mm_id').focus();
        }
    };

    $scope.removeHardItem = function(pindex,index){
        $scope.personalDetails[pindex].hards.splice(index,1);
        $scope.calculate($scope.personalDetails[pindex]);
        // $('#qpmm_mm_id').focus();
    };

    $scope.addToBlacodisingCart = function(index){

        var nameRegex = /^\d+$/;
        var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var numRegex = /^\d+(\.\d{1,2})?$/;

        if($scope.personalDetails[index].blacodisings.qpmm_mm_id == "" || $scope.personalDetails[index].blacodisings.qpmm_mm_id == undefined || $scope.personalDetails[index].blacodisings.qpmm_mm_id.mm_id == undefined){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Select Machine!</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else if($scope.personalDetails[index].blacodisings.qpmm_mm_hr == undefined || $scope.personalDetails[index].blacodisings.qpmm_mm_hr < 0){
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
              'qpmm_mm_id':$scope.personalDetails[index].blacodisings.qpmm_mm_id,
              'qpmm_mm_hr':$scope.personalDetails[index].blacodisings.qpmm_mm_hr
            }
            $scope.personalDetails[index].blacodisings.push($scope.machineList);
            $scope.personalDetails[index].blacodisings.qpmm_mm_id = null;
            $scope.personalDetails[index].blacodisings.qpmm_mm_hr = 0;
            $scope.calculate($scope.personalDetails[index]);
                // $('#qpmm_mm_id').focus();
        }
    };

    $scope.removeBlacodisingItem = function(pindex,index){
        $scope.personalDetails[pindex].blacodisings.splice(index,1);
        $scope.calculate($scope.personalDetails[pindex]);
        // $('#qpmm_mm_id').focus();
    };

    $scope.addToPunchingCart = function(index){

        var nameRegex = /^\d+$/;
        var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var numRegex = /^\d+(\.\d{1,2})?$/;

        if($scope.personalDetails[index].punchings.qpmm_mm_id == "" || $scope.personalDetails[index].punchings.qpmm_mm_id == undefined || $scope.personalDetails[index].punchings.qpmm_mm_id.mm_id == undefined){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Select Machine!</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else if($scope.personalDetails[index].punchings.qpmm_mm_hr == undefined || $scope.personalDetails[index].punchings.qpmm_mm_hr < 0){
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
              'qpmm_mm_id':$scope.personalDetails[index].punchings.qpmm_mm_id,
              'qpmm_mm_hr':$scope.personalDetails[index].punchings.qpmm_mm_hr
            }
            $scope.personalDetails[index].punchings.push($scope.machineList);
            $scope.personalDetails[index].punchings.qpmm_mm_id = null;
            $scope.personalDetails[index].punchings.qpmm_mm_hr = 0;
            $scope.calculate($scope.personalDetails[index]);
                // $('#qpmm_mm_id').focus();
        }
    };

    $scope.removePunchingItem = function(pindex,index){
        $scope.personalDetails[pindex].punchings.splice(index,1);
        $scope.calculate($scope.personalDetails[pindex]);
        // $('#qpmm_mm_id').focus();
    };

    $scope.addToSurfCart = function(index){

        var nameRegex = /^\d+$/;
        var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var numRegex = /^\d+(\.\d{1,2})?$/;

        if($scope.personalDetails[index].surfs.qpmm_mm_id == "" || $scope.personalDetails[index].surfs.qpmm_mm_id == undefined || $scope.personalDetails[index].surfs.qpmm_mm_id.mm_id == undefined){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Select Machine!</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else if($scope.personalDetails[index].surfs.qpmm_mm_hr == undefined || $scope.personalDetails[index].surfs.qpmm_mm_hr < 0){
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
              'qpmm_mm_id':$scope.personalDetails[index].surfs.qpmm_mm_id,
              'qpmm_mm_hr':$scope.personalDetails[index].surfs.qpmm_mm_hr
            }
            $scope.personalDetails[index].surfs.push($scope.machineList);
            $scope.personalDetails[index].surfs.qpmm_mm_id = null;
            $scope.personalDetails[index].surfs.qpmm_mm_hr = 0;
            $scope.calculate($scope.personalDetails[index]);
                // $('#qpmm_mm_id').focus();
        }
    };

    $scope.removeSurfItem = function(pindex,index){
        $scope.personalDetails[pindex].surfs.splice(index,1);
        $scope.calculate($scope.personalDetails[pindex]);
        // $('#qpmm_mm_id').focus();
    };

    // $scope.calculate=function(obj){
      
    // }

    $scope.calculate=function(obj){
      obj.dtm_total_cost=0;
      obj.dtm_sub_total=0;
      $scope.quotation.qm_net_cost=0;
      $scope.quotation.qm_cgst_amount=0;
      $scope.quotation.qm_sgst_amount=0;
      $scope.quotation.qm_igst_amount=0;
      $scope.quotation.qm_total_cost=0;

      obj.qpm_fl_cut=0;
      obj.qpm_fl_cut = parseFloat(obj.qpm_fl_price * obj.qpm_fl_qty);
      // obj.qpm_fl_cut = 0;
      // angular.forEach(obj.flcuts, function(value,key){
      //   value.qpmm_total= parseFloat(value.flcuts.price * value.flcuts.qty);
      //   obj.qpm_fl_cut = parseFloat(obj.qpm_fl_cut + value.qpmm_total); 
      // });
      obj.qpm_turning = 0;
      obj.qpm_turning= parseFloat(obj.qpm_tn_price * obj.qpm_tn_qty);
      // obj.qpm_turning = 0;
      // angular.forEach(obj.turnings, function(value,key){
      //   value.qpmm_total= parseFloat(value.qpmm_mm_id.mm_price * value.qpmm_mm_hr);
      //   obj.qpm_turning = parseFloat(obj.qpm_turning + value.qpmm_total); 
      // });

      obj.qpm_milling = 0;
      obj.qpm_milling= parseFloat(obj.qpm_ml_price * obj.qpm_ml_qty);
      // obj.qpm_milling = 0;
      // angular.forEach(obj.millings, function(value,key){
      //   value.qpmm_total= parseFloat(value.qpmm_mm_id.mm_price * value.qpmm_mm_hr);
      //   obj.qpm_milling = parseFloat(obj.qpm_milling + value.qpmm_total); 
      // });

      obj.qpm_boring = 0;
      angular.forEach(obj.borings, function(value,key){
        value.qpmm_total= parseFloat(value.qpmm_mm_id.mm_price * value.qpmm_mm_hr);
        obj.qpm_boring = parseFloat(obj.qpm_boring + value.qpmm_total); 

      });
      
      obj.qpm_drilling = 0;
      angular.forEach(obj.drillings, function(value,key){
        value.qpmm_total= parseFloat(value.qpmm_mm_id.mm_price * value.qpmm_mm_hr);
        obj.qpm_drilling = parseFloat(obj.qpm_drilling + value.qpmm_total); 

      });

      obj.qpm_taping = 0;
      angular.forEach(obj.tapings, function(value,key){
        value.qpmm_total= parseFloat(value.qpmm_mm_id.mm_price * value.qpmm_mm_hr);
        obj.qpm_taping = parseFloat(obj.qpm_taping + value.qpmm_total); 

      });
      
      obj.qpm_grinding = 0;
      obj.qpm_grinding= parseFloat(obj.qpm_gd_price * obj.qpm_gd_qty);
      // obj.qpm_grinding = 0;
      // angular.forEach(obj.grindings, function(value,key){
      //   value.qpmm_total= parseFloat(value.qpmm_mm_id.mm_price * value.qpmm_mm_hr);
      //   obj.qpm_grinding = parseFloat(obj.qpm_grinding + value.qpmm_total); 
      // });

      obj.qpm_cnc_mc = 0;
      obj.qpm_cnc_mc= parseFloat(obj.qpm_cnc_price * obj.qpm_cnc_qty);
      // obj.qpm_cnc_mc = 0;
      // angular.forEach(obj.cncs, function(value,key){
      //   value.qpmm_total= parseFloat(value.qpmm_mm_id.mm_price * value.qpmm_mm_hr);
      //   obj.qpm_cnc_mc = parseFloat(obj.qpm_cnc_mc + value.qpmm_total); 
      // });
      
      obj.qpm_wire_cut = 0;
      obj.qpm_wire_cut= parseFloat(obj.qpm_wire_price * obj.qpm_wire_qty);
      // obj.qpm_wire_cut = 0;
      // angular.forEach(obj.wires, function(value,key){
      //   value.qpmm_total= parseFloat(value.qpmm_mm_id.mm_price * value.qpmm_mm_hr);
      //   obj.qpm_wire_cut = parseFloat(obj.qpm_wire_cut + value.qpmm_total); 
      // });
      
      obj.qpm_fabrication = 0;
      obj.qpm_fabrication= parseFloat(obj.qpm_fab_price * obj.qpm_fab_qty);
      // obj.qpm_fabrication = 0;
      // angular.forEach(obj.fabrications, function(value,key){
      //   value.qpmm_total= parseFloat(value.qpmm_mm_id.mm_price * value.qpmm_mm_hr);
      //   obj.qpm_fabrication = parseFloat(obj.qpm_fabrication + value.qpmm_total); 
      // });

      obj.qpm_hard = 0;
      obj.qpm_hard= parseFloat(obj.qpm_hard_price * obj.qpm_hard_qty);
      // obj.qpm_hard = 0;
      // angular.forEach(obj.hards, function(value,key){
      //   value.qpmm_total= parseFloat(value.qpmm_mm_id.mm_price * value.qpmm_mm_hr);
      //   obj.qpm_hard = parseFloat(obj.qpm_hard + value.qpmm_total); 
      // });
      
      obj.qpm_blacodising = 0;
      obj.qpm_blacodising= parseFloat(obj.qpm_bc_price * obj.qpm_bc_qty);
      // obj.qpm_blacodising = 0;
      // angular.forEach(obj.blacodisings, function(value,key){
      //   value.qpmm_total= parseFloat(value.qpmm_mm_id.mm_price * value.qpmm_mm_hr);
      //   obj.qpm_blacodising = parseFloat(obj.qpm_blacodising + value.qpmm_total); 
      // });

      obj.qpm_punching = 0;
      obj.qpm_punching= parseFloat(obj.qpm_pc_price * obj.qpm_pc_qty);
      // obj.qpm_punching = 0;
      // angular.forEach(obj.punchings, function(value,key){
      //   value.qpmm_total= parseFloat(value.qpmm_mm_id.mm_price * value.qpmm_mm_hr);
      //   obj.qpm_punching = parseFloat(obj.qpm_punching + value.qpmm_total); 
      // });

      obj.qpm_surf_treat = 0;
      obj.qpm_surf_treat= parseFloat(obj.qpm_surf_price * obj.qpm_surf_qty);
      // obj.qpm_surf_treat = 0;
      // angular.forEach(obj.surfs, function(value,key){
      //   value.qpmm_total= parseFloat(value.qpmm_mm_id.mm_price * value.qpmm_mm_hr);
      //   obj.qpm_surf_treat = parseFloat(obj.qpm_surf_treat + value.qpmm_total); 
      // });


      obj.dtm_sub_total = parseFloat(parseFloat(obj.qpm_fl_cut) + parseFloat(obj.qpm_turning) + parseFloat(obj.qpm_milling) + parseFloat(obj.qpm_boring) + parseFloat(obj.qpm_drilling) + parseFloat(obj.qpm_taping) + parseFloat(obj.qpm_grinding) + parseFloat(obj.qpm_cnc_mc) + parseFloat(obj.qpm_wire_cut) + parseFloat(obj.qpm_fabrication) + parseFloat(obj.qpm_hard) + parseFloat(obj.qpm_blacodising) + parseFloat(obj.qpm_punching) + parseFloat(obj.qpm_surf_treat) + parseFloat(obj.dtm_rm));
      obj.dtm_profit = parseFloat(obj.dtm_sub_total * (15 / 100)).toFixed(2);
      obj.dtm_cost_pc = parseFloat(parseFloat(obj.dtm_sub_total) + parseFloat(obj.dtm_profit)).toFixed(2);

      obj.dtm_total_cost = parseFloat(obj.dtm_total_cost + parseFloat(obj.dtm_cost_pc * obj.dtm_qty)).toFixed(2);

      angular.forEach($scope.personalDetails, function(value,key){
        $scope.quotation.qm_net_cost=parseFloat(parseFloat($scope.quotation.qm_net_cost) + parseFloat(value.dtm_total_cost) );
      });

      $scope.quotation.qm_cgst_amount = parseFloat($scope.quotation.qm_net_cost * ($scope.quotation.qm_cgst_per / 100)).toFixed(2);
      $scope.quotation.qm_sgst_amount = parseFloat($scope.quotation.qm_net_cost * ($scope.quotation.qm_sgst_per / 100)).toFixed(2);
      $scope.quotation.qm_igst_amount = parseFloat($scope.quotation.qm_net_cost * ($scope.quotation.qm_igst_per / 100)).toFixed(2);

      $scope.quotation.qm_total_cost = Math.ceil(parseFloat($scope.quotation.qm_net_cost) + parseFloat($scope.quotation.qm_cgst_amount) + parseFloat($scope.quotation.qm_sgst_amount) + parseFloat($scope.quotation.qm_igst_amount) + parseFloat($scope.quotation.qm_transport) + parseFloat($scope.quotation.qm_other_charges) - parseFloat($scope.quotation.qm_discount));

    };

    $scope.calculateTotal = function(){
      $scope.quotation.qm_total_cost = parseFloat(parseFloat($scope.quotation.qm_net_cost) + parseFloat($scope.quotation.qm_cgst_amount) + parseFloat($scope.quotation.qm_sgst_amount) + parseFloat($scope.quotation.qm_igst_amount) + parseFloat($scope.quotation.qm_transport) + parseFloat($scope.quotation.qm_other_charges) - parseFloat($scope.quotation.qm_discount));
    }


    //design details on typeahead select
    $scope.getDesignDetails=function(){

        $scope.personalDetails=[];

        $http({
              method: 'GET',
              url: $rootScope.baseURL+'/design/details/'+$scope.quotation.qm_dm_id.dm_id,
              headers: {'Content-Type': 'application/json',
                      'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
            })
            .success(function(design)
            {     

                 design.forEach(function(value,key){
                  value.flcuts = [];
                  value.turnings = [];
                  value.millings = [];
                  value.borings = [];
                  value.drillings = [];
                  value.tapings = [];
                  value.grindings = [];
                  value.cncs = [];
                  value.wires = [];
                  value.fabrications = [];
                  value.hards = [];
                  value.blacodisings = [];
                  value.punchings = [];
                  value.surfs = [];
                  value.qpmm_mm_hr = 0;
                  value.dtm_total_cost = 0;

                  value.qpm_fl_price = 250;
                  value.qpm_fl_qty = 0;
                  value.qpm_tn_price = 300;
                  value.qpm_tn_qty = 0;
                  value.qpm_ml_price = 50;
                  value.qpm_ml_qty = 0;
                  value.qpm_gd_price = 350;
                  value.qpm_gd_qty = 0;
                  value.qpm_cnc_price = 100;
                  value.qpm_cnc_qty = 0;
                  value.qpm_wire_price = 20;
                  value.qpm_wire_qty = 0;
                  value.qpm_fab_price = 75;
                  value.qpm_fab_qty = 0;
                  value.qpm_hard_price = 80;
                  value.qpm_hard_qty = 0;
                  value.qpm_bc_price = 150;
                  value.qpm_bc_qty = 0;
                  value.qpm_pc_price = 200;
                  value.qpm_pc_qty = 0;
                  value.qpm_surf_price = 250;
                  value.qpm_surf_qty = 0;
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
    $scope.getDesignDetails();


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

    $scope.getSearchBoringMachine = function(vals) {
      var searchTerms = {search: vals};
        const httpOptions = {
            headers: {
              'Content-Type':  'application/json',
              'Authorization': 'Bearer '+localStorage.getItem("unitech_admin_access_token")
            }
        };
        return $http.post($rootScope.baseURL+'/machine/typeahead/boring/search', searchTerms, httpOptions).then((result) => {
            return result.data;
        });
    };

    $scope.getSearchDrillingMachine = function(vals) {
      var searchTerms = {search: vals};
        const httpOptions = {
            headers: {
              'Content-Type':  'application/json',
              'Authorization': 'Bearer '+localStorage.getItem("unitech_admin_access_token")
            }
        };
        return $http.post($rootScope.baseURL+'/machine/typeahead/drilling/search', searchTerms, httpOptions).then((result) => {
            return result.data;
        });
    };

    $scope.getSearchTapingMachine = function(vals) {
      var searchTerms = {search: vals};
        const httpOptions = {
            headers: {
              'Content-Type':  'application/json',
              'Authorization': 'Bearer '+localStorage.getItem("unitech_admin_access_token")
            }
        };
        return $http.post($rootScope.baseURL+'/machine/typeahead/taping/search', searchTerms, httpOptions).then((result) => {
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
                    "<body onload='window.print()' style='font-size:11pt;'>" +
                        "<div>" +
                            "<center><h5 style='font-size:11pt'>Quotation</h5></center>"+
                            "<table class='table table-stripped table-bordered' style='font-size:11pt'>" +
                                "<tr>" +
                                    "<td colspan='17' align='center'>" +
                                        "<h3>Unitech Engineering Works</h3><br>" +
                                        "S.No. 6/6/4, Shanti Nagar, MIDC, Bhosari, Pune - 411039, Maharashtra, India<br>" +
                                        "Email: info@unitechautomations.com * +91-9890757909 / +91-9860490510 * +91-20-27124557" +
                                    "</td>" +
                                "</tr>" +
                            "</table>" +
                            "<table class='table table-stripped table-bordered' style='font-size:11pt'>" +
                              "<tr>" +
                                "<td colspan='2'>To: <strong>"+$scope.quotation.qm_dm_id.cm_name+" ("+$scope.quotation.qm_dm_id.cm_address+")</strong></td>"+
                                "<td>Assemble No : <strong>"+$scope.quotation.qm_dm_id.dm_design_no+"</strong></td>" +
                                "<td>Quotation No : <strong>"+$scope.quotation.qm_quotation_no+"</strong></td>" +
                              "</tr>" +
                              "<tr>" +
                                "<td>Date : <strong>"+$filter('date')($scope.quotation.qm_date,'mediumDate')+"</strong></td>" +
                                "<td>Reference : <strong>"+$scope.quotation.qm_ref+"</strong></td>" +
                                "<td>Attend By : <strong>"+$scope.quotation.qm_attend_by+"</strong></td>" +
                                "<td>Project No : <strong>"+$scope.quotation.qm_dm_id.dm_project_no+"</strong></td>" +
                              "</tr>" +
                            "</table>" +
                            "<table class='table table-stripped table-bordered' style='font-size:10pt; page-break-after: always;'>" +
                                "<tr>" +
                                    " "+$('#content').html()+" " +
                                "</tr>" ;
                              if($scope.quotation.qm_discount == 0 && $scope.quotation.qm_transport == 0 && $scope.quotation.qm_other_charges == 0)
                              {
                                page = page + "<tr>" +
                                  "<td colspan='2' rowspan='5'><strong>"+$scope.quotation.qm_comment+"</strong></td>" +
                                  "<td colspan='2' align='right'><strong>Net Amount</strong></td>" +
                                  "<td ><strong>"+$scope.quotation.qm_net_cost+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='2' align='right'><strong>CGST "+$scope.quotation.qm_cgst_per+"%</strong></td>" +
                                  "<td><strong>"+$scope.quotation.qm_cgst_amount+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='2' align='right'><strong>SGST "+$scope.quotation.qm_sgst_per+"%</strong></td>" +
                                  "<td><strong>"+$scope.quotation.qm_sgst_amount+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='2' align='right'><strong>IGST "+$scope.quotation.qm_igst_per+"%</strong></td>" +
                                  "<td><strong>"+$scope.quotation.qm_igst_amount+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='2' align='right'><strong>Total Amount</strong></td>" +
                                  "<td><strong>"+$scope.quotation.qm_total_cost+"</strong></td>" +
                                "</tr>" ;
                              }
                              else if($scope.quotation.qm_discount == 0 && $scope.quotation.qm_transport == 0 && $scope.quotation.qm_other_charges != 0)
                              {
                                page = page + "<tr>" +
                                  "<td colspan='2' rowspan='6'><strong>"+$scope.quotation.qm_comment+"</strong></td>" +
                                  "<td colspan='2' align='right'><strong>Net Amount</strong></td>" +
                                  "<td><strong>"+$scope.quotation.qm_net_cost+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='2' align='right'><strong>CGST "+$scope.quotation.qm_cgst_per+"%</strong></td>" +
                                  "<td><strong>"+$scope.quotation.qm_cgst_amount+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='2' align='right'><strong>SGST "+$scope.quotation.qm_sgst_per+"%</strong></td>" +
                                  "<td><strong>"+$scope.quotation.qm_sgst_amount+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='2' align='right'><strong>IGST "+$scope.quotation.qm_igst_per+"%</strong></td>" +
                                  "<td><strong>"+$scope.quotation.qm_igst_amount+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='2' align='right'><strong>Other Charges</strong></td>" +
                                  "<td><strong>"+$scope.quotation.qm_other_charges+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='2' align='right'><strong>Total Amount</strong></td>" +
                                  "<td><strong>"+$scope.quotation.qm_total_cost+"</strong></td>" +
                                "</tr>" ;
                              }
                              else if($scope.quotation.qm_discount == 0 && $scope.quotation.qm_transport != 0 && $scope.quotation.qm_other_charges != 0)
                              {
                                page = page + "<tr>" +
                                  "<td colspan='2' rowspan='7'><strong>"+$scope.quotation.qm_comment+"</strong></td>" +
                                  "<td colspan='2' align='right'><strong>Net Amount</strong></td>" +
                                  "<td><strong>"+$scope.quotation.qm_net_cost+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='2' align='right'><strong>CGST "+$scope.quotation.qm_cgst_per+"%</strong></td>" +
                                  "<td><strong>"+$scope.quotation.qm_cgst_amount+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='2' align='right'><strong>SGST "+$scope.quotation.qm_sgst_per+"%</strong></td>" +
                                  "<td><strong>"+$scope.quotation.qm_sgst_amount+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='2' align='right'><strong>IGST "+$scope.quotation.qm_igst_per+"%</strong></td>" +
                                  "<td><strong>"+$scope.quotation.qm_igst_amount+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='2' align='right'><strong>Transport</strong></td>" +
                                  "<td><strong>"+$scope.quotation.qm_transport+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='2' align='right'><strong>Other Charges</strong></td>" +
                                  "<td><strong>"+$scope.quotation.qm_other_charges+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='2' align='right'><strong>Total Amount</strong></td>" +
                                  "<td><strong>"+$scope.quotation.qm_total_cost+"</strong></td>" +
                                "</tr>" ;
                              }
                              else if($scope.quotation.qm_discount != 0 && $scope.quotation.qm_transport != 0 && $scope.quotation.qm_other_charges != 0)
                              {
                                page = page + "<tr>" +
                                  "<td colspan='2' rowspan='8'><strong>"+$scope.quotation.qm_comment+"</strong></td>" +
                                  "<td colspan='2' align='right'><strong>Net Amount</strong></td>" +
                                  "<td><strong>"+$scope.quotation.qm_net_cost+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='2' align='right'><strong>CGST "+$scope.quotation.qm_cgst_per+"%</strong></td>" +
                                  "<td><strong>"+$scope.quotation.qm_cgst_amount+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='2' align='right'><strong>SGST "+$scope.quotation.qm_sgst_per+"%</strong></td>" +
                                  "<td><strong>"+$scope.quotation.qm_sgst_amount+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='2' align='right'><strong>IGST "+$scope.quotation.qm_igst_per+"%</strong></td>" +
                                  "<td><strong>"+$scope.quotation.qm_igst_amount+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='2' align='right'><strong>Transport (+)</strong></td>" +
                                  "<td><strong>"+$scope.quotation.qm_transport+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='2' align='right'><strong>Other Charges (+)</strong></td>" +
                                  "<td><strong>"+$scope.quotation.qm_other_charges+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='2' align='right'><strong>Discount (-)</strong></td>" +
                                  "<td><strong>"+$scope.quotation.qm_discount+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='2' align='right'><strong>Total Amount</strong></td>" +
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