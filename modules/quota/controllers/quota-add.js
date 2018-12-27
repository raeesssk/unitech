// import admin
angular.module('quota').controller('quotaAddCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route, $filter) {

    $scope.quota = {};
    
    $scope.quota.qm_cgst_per=9;
    $scope.quota.qm_sgst_per=9;
    $scope.quota.qm_igst_per=0;
    $scope.quota.qm_transport=0;
    $scope.quota.qm_other_charges=0;
    $scope.quota.qm_discount=0; 
    $scope.quota.qm_net_cost=0;
    $scope.quota.qm_cgst_amount=0;
    $scope.quota.qm_sgst_amount=0;
    $scope.quota.qm_igst_amount=0;
    $scope.quota.qm_total_cost=0; 

    $scope.displayImages = "resources/assets/img/default-image.png";

    var d = new Date();
    var yyyy = d.getFullYear().toString();
    var mm = (d.getMonth()).toString(); // getMonth() is zero-based
    var dd  = d.getDate().toString();
    $scope.quota.qm_date = yyyy +"-"+ (parseInt(mm)+parseInt(1)) +"-"+ dd;

    // VALIDATION & MAIN
  $scope.apiURL = $rootScope.baseURL+'/quotation/add';
  // console.log($rootScope.designObj);
    $('#qm_cm_id').focus();
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
            else if($('#qm_cm_id').val() == undefined || $('#qm_cm_id').val() == "" || $scope.quota.qm_cm_id.cm_id == undefined ){
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
            else if($('#qm_date_of_email').val() == undefined || $('#qm_date_of_email').val() == ""){
              var dialog = bootbox.dialog({
                  message: '<p class="text-center">Please Enter Date Of Email!</p>',
                      closeButton: false
                  });
                  dialog.find('.modal-body').addClass("btn-danger");
                  setTimeout(function(){
                      dialog.modal('hide'); 
                      
                      $('#qm_date_of_email').focus(); 
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
            else if( $scope.materialDetails.length == 0 ){
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

                      $scope.quota.qm_date = $('#qm_date').val();

                      
                        $scope.pruchaseForm = {
                            quotation : $scope.quota,
                            purchaseMultipleData : $scope.materialDetails
                        };
                      
                        $http({
                          method: 'POST',
                          url: $scope.apiURL,
                          data: $scope.pruchaseForm,
                          // data: fd,
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


      // Auto Generate Serial Number for quota
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
                  $scope.quota.qm_quotation_no = parseInt(login[0].qm_quotation_no)+1;
                }  
                else{
                  $scope.quota.qm_quotation_no = 1;
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

// ADD Material Details
     $scope.materialDetails = []; 
    $scope.btnAddMaterial = function(index){
        
        if($('#qpm_pr_no').val() == undefined || $('#qpm_pr_no').val() == ""){
              var dialog = bootbox.dialog({
              message: '<p class="text-center">Please Enter Project Number!</p>',
                  closeButton: false
              });
              dialog.find('.modal-body').addClass("btn-danger");
              setTimeout(function(){
                  dialog.modal('hide'); 
                  $('#qpm_pr_no').focus();
              }, 1500);
        }
        // else if($('#qpm_item').val() == undefined || $('#qpm_item').val() == ""){
        //       var dialog = bootbox.dialog({
        //       message: '<p class="text-center">Please Enter The Item!</p>',
        //           closeButton: false
        //       });
        //       dialog.find('.modal-body').addClass("btn-danger");
        //       setTimeout(function(){
        //           dialog.modal('hide'); 
        //           $('#qpm_item').focus();
        //       }, 1500);
        // }
        else if($('#qpm_material_code').val() == undefined || $('#qpm_material_code').val() == ""){
              var dialog = bootbox.dialog({
              message: '<p class="text-center">Please Enter Material Code!</p>',
                  closeButton: false
              });
              dialog.find('.modal-body').addClass("btn-danger");
              setTimeout(function(){
                  dialog.modal('hide'); 
                  $('#qpm_material_code').focus();
              }, 1500);
        }
        else if($('#qpm_part').val() == undefined || $('#qpm_part').val() == ""){
              var dialog = bootbox.dialog({
              message: '<p class="text-center">Please Enter The Part Name!</p>',
                  closeButton: false
              });
              dialog.find('.modal-body').addClass("btn-danger");
              setTimeout(function(){
                  dialog.modal('hide'); 
                  $('#qpm_part').focus();
              }, 1500);
        }
        else if($('#qpm_qty').val() == undefined || $('#qpm_qty').val() == ""){
              var dialog = bootbox.dialog({
              message: '<p class="text-center">Please Enter The Quantity!</p>',
                  closeButton: false
              });
              dialog.find('.modal-body').addClass("btn-danger");
              setTimeout(function(){
                  dialog.modal('hide'); 
                  $('#qpm_qty').focus();
              }, 1500);
        }
        // else if($('#qpm_image').val() != "" && ($('#qpm_image').data('max-size') < $('#qpm_image').get(0).files[0].size )){
        //     var dialog = bootbox.dialog({
        //       message: '<p class="text-center">Please Select Image size less than 200KB!</p>',
        //           closeButton: false
        //       });
        //       dialog.find('.modal-body').addClass("btn-danger");
        //       setTimeout(function(){
        //           dialog.modal('hide'); 
        //           $('#qpm_image').focus();
        //       }, 1500);
        //     $('#qpm_image').val("");
        //     $('#blah').attr('src', "resources/default-image.png");
        // }
      else{ 
        

          if($scope.material.qpm_part_name[0])
          {
              
              $scope.material.qpm_part = $scope.material.qpm_part_name;
              // $scope.material.flcuts = [];
              // $scope.material.turnings = [];
              // $scope.material.millings = [];
              $scope.material.borings = [];
              $scope.material.drillings = [];
              $scope.material.tapings = [];
              // $scope.material.grindings = [];
              // $scope.material.cncs = [];
              // $scope.material.wires = [];
              // $scope.material.fabrications = [];
              // $scope.material.hards = [];
              // $scope.material.blacodisings = [];
              // $scope.material.punchings = [];
              // $scope.material.surfs = [];
              // $scope.material.qpmm_mm_hr = 0;
              $scope.material.dtm_total_cost = 0;

              $scope.material.dtm_sub_total = 0;
              $scope.material.dtm_profit = 0;
              $scope.material.dtm_cost_pc = 0;

              $scope.material.qpm_fl_price = 250;
              $scope.material.qpm_fl_qty = 0;
              $scope.material.qpm_fl_cut = 0;

              $scope.material.qpm_tn_price = 300;
              $scope.material.qpm_tn_qty = 0;
              $scope.material.qpm_turning = 0;

              $scope.material.qpm_ml_price = 50;
              $scope.material.qpm_ml_qty = 0;
              $scope.material.qpm_milling = 0;

              $scope.material.qpm_boring = 0;

              $scope.material.qpm_drilling = 0;
              
              $scope.material.qpm_taping = 0;

              $scope.material.qpm_gd_price = 350;
              $scope.material.qpm_gd_qty = 0;
              $scope.material.qpm_grinding = 0;

              $scope.material.qpm_cnc_price = 100;
              $scope.material.qpm_cnc_qty = 0;
              $scope.material.qpm_cnc_mc = 0;

              $scope.material.qpm_wire_price = 20;
              $scope.material.qpm_wire_qty = 0;
              $scope.material.qpm_wire_cut = 0;

              $scope.material.qpm_fab_price = 75;
              $scope.material.qpm_fab_qty = 0;
              $scope.material.qpm_fabrication = 0;

              $scope.material.qpm_hard_price = 80;
              $scope.material.qpm_hard_qty = 0;
              $scope.material.qpm_hard = 0;

              $scope.material.qpm_bc_price = 80;
              $scope.material.qpm_bc_qty = 0;
              $scope.material.qpm_blacodising = 0;

              $scope.material.qpm_pc_price = 200;
              $scope.material.qpm_pc_qty = 0;
              $scope.material.qpm_punching = 0;

              $scope.material.qpm_surf_price = 250;
              $scope.material.qpm_surf_qty = 0;
              $scope.material.qpm_surf_treat = 0;

              $scope.material.qpm_profit_per=15;
  

              $scope.materialDetails.push($scope.material);
              $scope.material="";
              // $('#qpm_image').val("");
              // $('#blah').attr('src', "resources/default-image.png");
              $('#qpm_pr_no').focus();
              $scope.calculate();
          }
          else
          {

            $scope.material.qpm_part = $scope.material.qpm_part_name.qpm_part;
            // $scope.material.flcuts = [];
            // $scope.material.turnings = [];
            // $scope.material.millings = [];
            // $scope.material.grindings = [];
            // $scope.material.cncs = [];
            // $scope.material.wires = [];
            // $scope.material.fabrications = [];
            // $scope.material.hards = [];
            // $scope.material.blacodisings = [];
            // $scope.material.punchings = [];
            // $scope.material.surfs = [];
            // $scope.material.qpmm_mm_hr = 0;
            
            $scope.material.dtm_total_cost = $scope.material.qpm_part_name.qpm_cost_pc * $scope.material.qpm_qty;

            $scope.material.dtm_sub_total = $scope.material.qpm_part_name.qpm_sub_total;
            $scope.material.dtm_profit = $scope.material.qpm_part_name.qpm_profit;
            $scope.material.dtm_cost_pc = $scope.material.qpm_part_name.qpm_cost_pc;

            $scope.material.qpm_fl_price = $scope.material.qpm_part_name.qpm_fl_price;
            $scope.material.qpm_fl_qty = $scope.material.qpm_part_name.qpm_fl_qty;
            $scope.material.qpm_fl_cut = $scope.material.qpm_part_name.qpm_fl_cut;

            $scope.material.qpm_tn_price = $scope.material.qpm_part_name.qpm_tn_price;
            $scope.material.qpm_tn_qty = $scope.material.qpm_part_name.qpm_tn_qty;
            $scope.material.qpm_turning = $scope.material.qpm_part_name.qpm_turning;

            $scope.material.qpm_ml_price = $scope.material.qpm_part_name.qpm_ml_price;
            $scope.material.qpm_ml_qty = $scope.material.qpm_part_name.qpm_ml_qty;
            $scope.material.qpm_milling = $scope.material.qpm_part_name.qpm_milling;

            $scope.material.qpm_boring = $scope.material.qpm_part_name.qpm_boring;

            $scope.material.qpm_drilling = $scope.material.qpm_part_name.qpm_drilling;
            
            $scope.material.qpm_taping = $scope.material.qpm_part_name.qpm_taping;

            $scope.material.qpm_gd_price = $scope.material.qpm_part_name.qpm_gd_price;
            $scope.material.qpm_gd_qty = $scope.material.qpm_part_name.qpm_gd_qty;
            $scope.material.qpm_grinding = $scope.material.qpm_part_name.qpm_grinding;

            $scope.material.qpm_cnc_price = $scope.material.qpm_part_name.qpm_cnc_price;
            $scope.material.qpm_cnc_qty = $scope.material.qpm_part_name.qpm_cnc_qty;
            $scope.material.qpm_cnc_mc = $scope.material.qpm_part_name.qpm_cnc_mc;

            $scope.material.qpm_wire_price = $scope.material.qpm_part_name.qpm_wire_price;
            $scope.material.qpm_wire_qty = $scope.material.qpm_part_name.qpm_wire_qty;
            $scope.material.qpm_wire_cut = $scope.material.qpm_part_name.qpm_wire_cut;

            $scope.material.qpm_fab_price = $scope.material.qpm_part_name.qpm_fab_price;
            $scope.material.qpm_fab_qty = $scope.material.qpm_part_name.qpm_fab_qty;
            $scope.material.qpm_fabrication = $scope.material.qpm_part_name.qpm_fabrication;

            $scope.material.qpm_hard_price = $scope.material.qpm_part_name.qpm_hard_price;
            $scope.material.qpm_hard_qty = $scope.material.qpm_part_name.qpm_hard_qty;
            $scope.material.qpm_hard = $scope.material.qpm_part_name.qpm_hard;

            $scope.material.qpm_bc_price = $scope.material.qpm_part_name.qpm_bc_price;
            $scope.material.qpm_bc_qty = $scope.material.qpm_part_name.qpm_bc_qty;
            $scope.material.qpm_blacodising = $scope.material.qpm_part_name.qpm_blacodising;

            $scope.material.qpm_pc_price = $scope.material.qpm_part_name.qpm_pc_price;
            $scope.material.qpm_pc_qty = $scope.material.qpm_part_name.qpm_pc_qty;
            $scope.material.qpm_punching = $scope.material.qpm_part_name.qpm_punching;

            $scope.material.qpm_surf_price = $scope.material.qpm_part_name.qpm_surf_price;
            $scope.material.qpm_surf_qty = $scope.material.qpm_part_name.qpm_surf_qty;
            $scope.material.qpm_surf_treat = $scope.material.qpm_part_name.qpm_surf_treat;

            $scope.material.qpm_profit_per=$scope.material.qpm_part_name.qpm_profit_per;

            $scope.material.qpm_mtm_id=$scope.material.qpm_part_name.qpm_mtm_id;
            $scope.material.qpm_shape=$scope.material.qpm_part_name.qpm_shape;
            $scope.material.qpm_material_cost=$scope.material.qpm_part_name.qpm_material_cost;
            $scope.material.qpm_length=$scope.material.qpm_part_name.qpm_length;
            $scope.material.qpm_width=$scope.material.qpm_part_name.qpm_width;
            $scope.material.qpm_thickness=$scope.material.qpm_part_name.qpm_thickness;
            $scope.material.qpm_edge_length=$scope.material.qpm_part_name.qpm_edge_length;
            $scope.material.qpm_diameter=$scope.material.qpm_part_name.qpm_diameter;
            $scope.material.qpm_raw_mat_wt=$scope.material.qpm_part_name.qpm_raw_mat_wt;
            $scope.material.qpm_rm=$scope.material.qpm_part_name.qpm_rm;

            $http({
                method: 'GET',
                url: $rootScope.baseURL+'/quotation/details/machine/boring/'+$scope.material.qpm_part_name.qpm_id,
                headers: {'Content-Type': 'application/json',
                        'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
              })
              .success(function(machineObj)
              {   
                  $scope.material.borings = angular.copy(machineObj);
                      // machineObj.forEach(function (value1, key1) {
                      //   $scope.material.borings.push(value1);
                      // });
                  $http({
                    method: 'GET',
                    url: $rootScope.baseURL+'/quotation/details/machine/drilling/'+$scope.material.qpm_part_name.qpm_id,
                    headers: {'Content-Type': 'application/json',
                            'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
                  })
                  .success(function(machineObj)
                  {   
                      $scope.material.drillings = angular.copy(machineObj);
                          // machineObj.forEach(function (value1, key1) {
                          //   $scope.material.borings.push(value1);
                          // });

                      $http({
                        method: 'GET',
                        url: $rootScope.baseURL+'/quotation/details/machine/taping/'+$scope.material.qpm_part_name.qpm_id,
                        headers: {'Content-Type': 'application/json',
                                'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
                      })
                      .success(function(machineObj)
                      {   
                          $scope.material.tapings = angular.copy(machineObj);
                              // machineObj.forEach(function (value1, key1) {
                              //   $scope.material.borings.push(value1);
                              // });    

                          $scope.materialDetails.push($scope.material);
                          $scope.material="";
                          // $('#qpm_image').val("");
                          // $('#blah').attr('src', "resources/default-image.png");
                          $('#qpm_pr_no').focus();
                          $scope.calculate();

                      })
                      .error(function(data) 
                      {   
                            var dialog = bootbox.dialog({
                            message: '<p class="text-center">Oops, Something Went Wrong! Please Refresh the Page.</p>',
                                closeButton: false
                            });
                            setTimeout(function(){
                                dialog.modal('hide'); 
                            }, 3001);             
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
                        }, 3001);             
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
                    }, 3001);             
              });

              
          }
          
            
      }
    }; 

    $scope.removeMatItem = function(index){
        $scope.materialDetails.splice(index,1);
        $scope.calculate();
    };
    
    $scope.qpm_total_qty=0;
    $scope.calculate = function(){
      var i =1;
      $scope.qpm_total_qty=0;
     angular.forEach($scope.materialDetails, function(value,key){
        value.qpm_sr_no = i++;
        $scope.qpm_total_qty=parseFloat(parseFloat($scope.qpm_total_qty) + parseFloat(value.qpm_qty) );
      });
    };
    
  //typeahead customer list record for Customer Name input
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
    
  //typeahead customer list record for Customer Name input
    $scope.getSearchProd = function(vals) {
        var searchTerms = {search: vals};
        const httpOptions = {
            headers: {
              'Content-Type':  'application/json',
              'Authorization': 'Bearer '+localStorage.getItem("unitech_admin_access_token")
            }
        };
        return $http.post($rootScope.baseURL+'/quotation/product/typeahead/search', searchTerms, httpOptions).then((result) => {
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
              $scope.quota.qm_date = $('#qm_date').val();
          }
    });
  //date for Date for email
    $('#qm_date_of_email').datepicker({
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
              $scope.quota.qm_date_of_email = $('#qm_date_of_email').val();
          }
    });


});