 // import admin
angular.module('design').controller('designAddCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route, $filter) {

  
    $scope.design = {};
    $scope.product={};
    $scope.designList = [];
    // $scope.design.totalqty = 0;
    $scope.design.totalQty = 0;
    // $scope.materialDetail.dtm_totalqty = 0;
    // $scope.imageDetails = []; 
    $scope.material ={};    
    $scope.material.dtm_qty = 1;

    var d = new Date();
    var yyyy = d.getFullYear().toString();
    var mm = (d.getMonth()).toString(); // getMonth() is zero-based
    var dd  = d.getDate().toString();
    $scope.design.dm_date = yyyy +"-"+ (parseInt(mm)+parseInt(1)) +"-"+ dd;

// VALIDATION & Main
    $scope.apiURL = $rootScope.baseURL+'/design/add';
      // $('#dm_cm_id').focus();
      $('#dm_date').focus();

      $scope.addDesign = function () {
        var nameRegex = /^\d+$/;
        var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      
          // if($('#dm_cm_id').val() == undefined || $('#dm_cm_id').val() == "" || $scope.design.dm_cm_id == undefined){
          //   var dialog = bootbox.dialog({
          //       message: '<p class="text-center">Please Enter The Customer Name!</p>',
          //           closeButton: false
          //       });
          //       dialog.find('.modal-body').addClass("btn-danger");
          //       setTimeout(function(){
          //           dialog.modal('hide'); 
          //           $('#dm_cm_id').focus();
          //       }, 1500);
          // }
          // else 
            if($('#dm_date').val() == undefined || $('#dm_date').val() == ""){
            var dialog = bootbox.dialog({
                message: '<p class="text-center">Please Enter The Date!</p>',
                    closeButton: false
                });
                dialog.find('.modal-body').addClass("btn-danger");
                setTimeout(function(){
                    dialog.modal('hide');
                    $('#dm_date').focus(); 
                }, 1500);
          }
          else if($('#dm_project_no').val() == undefined || $('#dm_project_no').val() == ""){
            var dialog = bootbox.dialog({
                message: '<p class="text-center">Please Enter Project Number!</p>',
                    closeButton: false
                });
                dialog.find('.modal-body').addClass("btn-danger");
                setTimeout(function(){
                    dialog.modal('hide'); 
                    $('#dm_project_no').focus();
                }, 1500);
          }
          else if($scope.materialDetails.length == 0){
              var dialog = bootbox.dialog({
              message: '<p class="text-center">Please Add Bill Material Details!</p>',
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

                     
              $scope.pruchaseForm = {
                  design : $scope.design,
                  purchaseMultipleData : $scope.materialDetails                  
              }

              $http({
                method: 'POST',
                url: $scope.apiURL,
                data: $scope.pruchaseForm,
                headers: {'Content-Type':'application/json',
                        'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
              })
              .success(function(login)
              {   
                  var dialog = bootbox.dialog({
                          message: '<p class="text-center">Project Added Successfully!</p>',
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

                  // angular.forEach($scope.materialDetails, function(value, key) {

                  //   var fd = new FormData();
                  //   fd.append('dim_dm_id', login[0].dm_id);
                  //   fd.append('dm_image', value.dm_image);
                  //   fd.append('dtm_im_id', value.im_id.im_id);
                  //   fd.append('dtm_qty', value.dtm_qty);

                  //   $http({
                  //     method: 'POST',
                  //     url: $rootScope.baseURL+'/design/image/add',
                  //     data: fd,
                  //     transformRequest: angular.identity,
                  //     headers: {'Content-Type': undefined,
                  //             'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
                  //   })
                  //   .success(function(login)
                  //   {   
                  //       if($scope.materialDetails.length - 1 == key){
                  //         var dialog = bootbox.dialog({
                  //         message: '<p class="text-center">Assemble Added Successfully!</p>',
                  //             closeButton: false
                  //         });
                  //         dialog.find('.modal-body').addClass("btn-success");
                  //         setTimeout(function(){
                  //             dialog.modal('hide'); 
                  //               $scope.printDetails();
                  //               $('#btnsave').text("Save");
                  //               $('#btnsave').removeAttr('disabled');
                  //               $route.reload();
                  //         }, 1500);
                            
                  //       }

                  //   })
                  // .error(function(data) 
                  //   {   
                  //     var dialog = bootbox.dialog({
                  //       message: '<p class="text-center">Oops, Something Went Wrong! Please Refresh the Page.</p>',
                  //           closeButton: false
                  //       });
                  //       setTimeout(function(){
                  //       $('#btnsave').text("Save");
                  //       $('#btnsave').removeAttr('disabled');
                  //           dialog.modal('hide'); 
                  //       }, 1500);            
                  //   });
                  // });
                
                
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

      // Auto Generate Serial Number for Design
      $scope.getSerial = function(){
        $scope.url = $rootScope.baseURL+'/design/serial/no'; 
        $http({
                method: 'POST',
                url: $scope.url,
                headers: {'Content-Type':'application/json',
                        'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
              })
              .success(function(login)
              {   
                if (login.length > 0) {
                  $scope.design.dm_design_no = parseInt(login[0].dm_design_no)+1;
                }  
                else{
                  $scope.design.dm_design_no = 1;
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
       $scope.material.dtm_material_cost = value.mtm_price;
       $scope.material.dm_density = value.mtm_density;
    };
    
    // calculate RM with price
    $scope.calculateRM = function(value){
      // if (shape=="Rectangle") {
      //       $scope.material.dtm_raw_mat_wt = parseFloat(parseFloat($scope.material.dtm_width * 4 * $scope.material.dtm_thickness * $scope.material.dtm_length * $scope.material.mtm_id.mtm_density) / 1000000).toFixed(2);
      //       console.log("hello");
      //       $scope.material.dtm_rm = Math.ceil($scope.material.dtm_raw_mat_wt * $scope.material.dtm_material_cost);
      //   }

        var shape = value.dtm_shape;

        if(shape == "Rectangle" || shape == "Sheet" || shape == "Plate"){
            value.dtm_raw_mat_wt = parseFloat(parseFloat(value.dtm_width * value.dtm_thickness * value.dtm_length * value.mtm_id.mtm_density) / 1000000).toFixed(2);
         }  
        else if(shape == "Round"){
            value.dtm_raw_mat_wt = parseFloat(parseFloat( 3.14 * parseFloat(parseFloat(value.dtm_diameter/2) * parseFloat(value.dtm_diameter/2)) * value.dtm_length * value.mtm_id.mtm_density) / 1000000).toFixed(2);
        }   
        else if(shape == "Square"){
            value.dtm_raw_mat_wt = parseFloat(parseFloat(value.dtm_width * value.dtm_width * value.dtm_length * value.mtm_id.mtm_density) / 1000000).toFixed(2);
        }   
        else if(shape == "Hexagonal"){
            value.dtm_raw_mat_wt = parseFloat(parseFloat(value.dtm_diameter * value.dtm_diameter * value.dtm_length * value.mtm_id.mtm_density) / 1000000).toFixed(2);
        }   
        else if(shape == "Flat-Tube"){
            value.dtm_raw_mat_wt = parseFloat(parseFloat(parseFloat(parseFloat(value.dtm_edge_length) + parseFloat(value.dtm_width)) * 2 * value.dtm_thickness * value.dtm_length *  value.mtm_id.mtm_density) / 1000000).toFixed(2);
        }  
        else if(shape == "Square-Tube"){
            value.dtm_raw_mat_wt = parseFloat(parseFloat(value.dtm_width * 4 * value.dtm_thickness * value.dtm_length * value.mtm_id.mtm_density) / 1000000).toFixed(2);
        }   
        else if(shape == "Circular-Tube"){
            value.dtm_raw_mat_wt = parseFloat(parseFloat(parseFloat(parseFloat(value.dtm_diameter) - parseFloat(value.dtm_thickness)) * value.dtm_thickness * value.dtm_length * value.mtm_id.mtm_density) / 1000000).toFixed(2);
        }    
        else if(shape == "Equal-Leg-Angle"){
            value.dtm_raw_mat_wt = parseFloat(parseFloat(parseFloat(parseFloat(value.dtm_width) * 2 - parseFloat(value.dtm_thickness)) * value.dtm_thickness * value.dtm_length * value.mtm_id.mtm_density) / 1000000).toFixed(2);
        }    
        else if(shape == "Unequal-Leg-Angle"){
            value.dtm_raw_mat_wt = parseFloat(parseFloat(parseFloat(parseFloat(value.dtm_width) + parseFloat(value.dtm_width) - parseFloat(value.dtm_thickness)) * value.dtm_thickness * value.dtm_length * value.mtm_id.mtm_density) / 1000000).toFixed(2);
        }          

      // value.dtm_raw_mat_wt = parseFloat(parseFloat(value.dtm_width * 4 * value.dtm_thickness * value.dtm_length * value.mtm_id.mtm_density) / 1000000).toFixed(2);
      value.dtm_rm = Math.ceil(value.dtm_raw_mat_wt * value.dtm_material_cost);
    };

    $scope.disableField = function(){
      var hello = $('#dtm_shape option:selected').val();
      if(hello == "Rectangle" || hello == "Sheet" || hello == "Plate"){
          // $('#dtm_radius').prop('disabled', 'disabled');
          $scope.material.dtm_diameter = undefined;
          $scope.material.dtm_edge_length = undefined;
          $("#diameter").hide();
          $("#edge_length").hide();

          $("#width").show();
          $("#thickness").show();

       }
       else if(hello == "Round" || hello == "Hexagonal"){
          $scope.material.dtm_width = undefined;
          $scope.material.dtm_thickness = undefined;
          $scope.material.dtm_edge_length = undefined;
          $("#width").hide();
          $("#thickness").hide();
          $("#edge_length").hide();

          $("#diameter").show();
       }
       else if(hello == "Square"){
          $scope.material.dtm_diameter = undefined;
          $scope.material.dtm_thickness = undefined;
          $scope.material.dtm_edge_length = undefined;
          $("#diameter").hide();          
          $("#thickness").hide();
          $("#edge_length").hide();

          $("#width").show();
       }
       else if(hello == "Flat-Tube"){
          $scope.material.dtm_diameter = undefined;
          $("#diameter").hide();

          $("#edge_length").show();
          $("#width").show();          
          $("#thickness").show();
       }
       else if(hello == "Square-Tube" || hello == "Equal-Leg-Angle" || hello == "Unequal-Leg-Angle"){
          $scope.material.dtm_diameter = undefined;
          $scope.material.dtm_edge_length = undefined;
          $("#diameter").hide();
          $("#edge_length").hide();
          
          $("#width").show();          
          $("#thickness").show();
       }
       else if(hello == "Circular-Tube"){
          $scope.material.dtm_width = undefined;
          $scope.material.dtm_edge_length = undefined;
          $("#width").hide();
          $("#edge_length").hide();

          $("#thickness").show();
          $("#diameter").show();
       }
    };


    // $scope.calculateGrinding = function(){
    //   $scope.material.dtm_grinding = $scope.material.qpmm_mm_id.mm_price * $scope.material.dtm_grinding_qty;
    // };

// ADD Material Details
     $scope.materialDetails = []; 
    $scope.btnAddMaterial = function(index){
        
        if($('#dtm_material_code').val() == undefined || $('#dtm_material_code').val() == ""){
              var dialog = bootbox.dialog({
              message: '<p class="text-center">Please Enter Material Code!</p>',
                  closeButton: false
              });
              dialog.find('.modal-body').addClass("btn-danger");
              setTimeout(function(){
                  dialog.modal('hide'); 
                  $('#dtm_material_code').focus();
              }, 1500);
        }
        else if($('#dtm_part_name').val() == undefined || $('#dtm_part_name').val() == ""){
              var dialog = bootbox.dialog({
              message: '<p class="text-center">Please Enter The Part Name!</p>',
                  closeButton: false
              });
              dialog.find('.modal-body').addClass("btn-danger");
              setTimeout(function(){
                  dialog.modal('hide'); 
                  $('#dtm_part_name').focus();
              }, 1500);
        }
        else if($('#dtm_qty').val() == undefined || $('#dtm_qty').val() == ""){
              var dialog = bootbox.dialog({
              message: '<p class="text-center">Please Enter The Quantity!</p>',
                  closeButton: false
              });
              dialog.find('.modal-body').addClass("btn-danger");
              setTimeout(function(){
                  dialog.modal('hide'); 
                  $('#dtm_qty').focus();
              }, 1500);
        }
        else if($('#mtm_id').val() == undefined || $('#mtm_id').val() == "" || $scope.material.mtm_id.mtm_id == undefined){
              var dialog = bootbox.dialog({
              message: '<p class="text-center">Please Enter Material!</p>',
                  closeButton: false
              });
              dialog.find('.modal-body').addClass("btn-danger");
              setTimeout(function(){
                  dialog.modal('hide'); 
                  $('#mtm_id').focus();
              }, 1500);
        }
        else if($('#dtm_shape').val() == undefined || $('#dtm_shape').val() == ""){
              var dialog = bootbox.dialog({
              message: '<p class="text-center">Please Enter Material Shape!</p>',
                  closeButton: false
              });
              dialog.find('.modal-body').addClass("btn-danger");
              setTimeout(function(){
                  dialog.modal('hide'); 
                  $('#dtm_shape').focus();
              }, 1500);
        }
        else if($('#dtm_material_cost').val() == undefined || $('#dtm_material_cost').val() == ""){
              var dialog = bootbox.dialog({
              message: '<p class="text-center">Please Enter Material Cost!</p>',
                  closeButton: false
              });
              dialog.find('.modal-body').addClass("btn-danger");
              setTimeout(function(){
                  dialog.modal('hide'); 
                  $('#dtm_material_cost').focus();
              }, 1500);
        }
        else if($('#dtm_length').val() == undefined || $('#dtm_length').val() == ""){
              var dialog = bootbox.dialog({
              message: '<p class="text-center">Please Enter The Length!</p>',
                  closeButton: false
              });
              dialog.find('.modal-body').addClass("btn-danger");
              setTimeout(function(){
                  dialog.modal('hide'); 
                  $('#dtm_length').focus();
              }, 1500);
        }
        else if(($scope.material.dtm_shape == "Rectangle" || $scope.material.dtm_shape == "Sheet" || $scope.material.dtm_shape == "Plate" || $scope.material.dtm_shape == "Square" || $scope.material.dtm_shape == "Flat-Tube" || $scope.material.dtm_shape == "Square-Tube" || $scope.material.dtm_shape == "Equal-Leg-Angle" || $scope.material.dtm_shape == "Unequal-Leg-Angle") && ($('#dtm_width').val() == undefined || $('#dtm_width').val() == "")){
              var dialog = bootbox.dialog({
              message: '<p class="text-center">Please Enter The Width!</p>',
                  closeButton: false
              });
              dialog.find('.modal-body').addClass("btn-danger");
              setTimeout(function(){
                  dialog.modal('hide'); 
                  $('#dtm_width').focus();
              }, 1500);
        }
        else if(($scope.material.dtm_shape == "Rectangle" || $scope.material.dtm_shape == "Sheet" || $scope.material.dtm_shape == "Plate" || $scope.material.dtm_shape == "Flat-Tube" || $scope.material.dtm_shape == "Square-Tube" || $scope.material.dtm_shape == "Equal-Leg-Angle" || $scope.material.dtm_shape == "Unequal-Leg-Angle" || $scope.material.dtm_shape == "Circular-Tube") && ($('#dtm_thickness').val() == undefined || $('#dtm_thickness').val() == "")){
              var dialog = bootbox.dialog({
              message: '<p class="text-center">Please Enter The Thickness!</p>',
                  closeButton: false
              });
              dialog.find('.modal-body').addClass("btn-danger");
              setTimeout(function(){
                  dialog.modal('hide'); 
                  $('#dtm_thickness').focus();
              }, 1500);
        }
        else if(($scope.material.dtm_shape == "Round" || $scope.material.dtm_shape == "Hexagonal" || $scope.material.dtm_shape == "Circular-Tube") && ($('#dtm_diameter').val() == undefined || $('#dtm_diameter').val() == "")){
              var dialog = bootbox.dialog({
              message: '<p class="text-center">Please Enter The Diameter!</p>',
                  closeButton: false
              });
              dialog.find('.modal-body').addClass("btn-danger");
              setTimeout(function(){
                  dialog.modal('hide'); 
                  $('#dtm_diameter').focus();
              }, 1500);
        }
        else if(($scope.material.dtm_shape == "Flat-Tube") && ($('#dtm_edge_length').val() == undefined || $('#dtm_edge_length').val() == "")){
              var dialog = bootbox.dialog({
              message: '<p class="text-center">Please Enter The Edge Length!</p>',
                  closeButton: false
              });
              dialog.find('.modal-body').addClass("btn-danger");
              setTimeout(function(){
                  dialog.modal('hide'); 
                  $('#dtm_edge_length').focus();
              }, 1500);
        }
        // else if($('#qpmm_mm_id').val() == undefined || $('#qpmm_mm_id').val() == "" || $scope.material.qpmm_mm_id.mm_id == undefined){
        //       var dialog = bootbox.dialog({
        //       message: '<p class="text-center">Please Enter Grinding!</p>',
        //           closeButton: false
        //       });
        //       dialog.find('.modal-body').addClass("btn-danger");
        //       setTimeout(function(){
        //           dialog.modal('hide'); 
        //           $('#qpmm_mm_id').focus();
        //       }, 1500);
        // }
        // else if($('#dtm_grinding_qty').val() == undefined || $('#dtm_grinding_qty').val() == ""){
        //       var dialog = bootbox.dialog({
        //       message: '<p class="text-center">Please Enter The Grinding totalQty!</p>',
        //           closeButton: false
        //       });
        //       dialog.find('.modal-body').addClass("btn-danger");
        //       setTimeout(function(){
        //           dialog.modal('hide'); 
        //           $('#dtm_grinding_qty').focus();
        //       }, 1500);
        // }
// IMAGE WITH SIZE VALIDATION        
      //  else if($('#dm_image').val() != "" && ($('#dm_image').data('max-size') < $('#dm_image').get(0).files[0].size )){
        
      //     var dialog = bootbox.dialog({
      //     message: '<p class="text-center">Please Select Image size less than 200KB.</p>',
      //         closeButton: false
      //     });
      //     dialog.find('.modal-body').addClass("btn-danger");
      //     setTimeout(function(){
      //         dialog.modal('hide'); 
      //         $('#dm_image').val("");
      //         $('#blah').attr('src', "resources/default-image.png");
      //     }, 1500);
      // }
      else{
        $scope.material.dm_image = $scope.design.file;
        // $scope.material.dm_image_file = $('#blah').attr('src');
            $scope.materialDetails.push($scope.material);
            $scope.material="";
            // $('#blah').attr('src', $scope.displayImage);
            // $('#dm_image').val("");
            // $scope.design.file = undefined;
             // console.log($scope.materialDetails);
            $('#dtm_material_code').focus();
            $scope.calculate();
      }
    }; 
    $scope.calculate = function(){
      $scope.design.totalQty = 0;
        angular.forEach($scope.materialDetails, function(value, key) {
          if(value.dtm_qty != undefined )
            $scope.design.totalQty = parseInt(parseInt($scope.design.totalQty) + parseInt(value.dtm_qty));
        });
    };
    $scope.removeMatItem = function(index){
        $scope.materialDetails.splice(index,1);
        // $scope.imageDetails.splice(index,1);
        $('#dtm_material_code').focus();
        $scope.calculate();
    };


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

    // Drawing adding of image 
    $scope.displayImage = "resources/default-image.png";
      function readURL(input) {

        if (input.files && input.files[0]) {

              var reader = new FileReader();
                  $scope.design.file = input.files[0];
              reader.onload = function (e) {
                  $('#blah').attr('src', e.target.result);
                  // $scope.productObj.displayImage =  e.target.result;
              }
              reader.readAsDataURL(input.files[0]);
          }
          
      };

      checkButton = function(objs){
          readURL(objs);
      };


    //date 
    $('#dm_date').datepicker({
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
              $scope.design.dm_date = $('#dm_date').val();
          }
    });

    // $("#dm_po_date").datepicker({
    //     dateFormat: 'dd/mm/yy',
    //     changeMonth: true,
    //     changeYear: true,
    //     constrainInput: false
    // });

    
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
                        "<div>" +
                            "<center><h5 style='font-size:11pt'>Project</h5></center>"+
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
                                "<td>Name : <strong>"+$scope.design.dm_cm_id.cm_name+"</strong></td>"+
                                "<td>Address : <strong>"+$scope.design.dm_cm_id.cm_address+"</strong></td>"+
                                "<td>Assemble No : <strong>"+$scope.design.dm_design_no+"</strong></td>" +
                                "<td>Date : <strong>"+$filter('date')($scope.design.dm_date,'mediumDate')+"</strong></td>"+
                              "</tr>" +
                            "</table>" +
                            "<table class='table table-stripped table-bordered' style='font-size:10pt; page-break-after: always;'>" +
                                "<tr>" +
                                    " "+$('#content').html()+" " +
                                "</tr>" +
                            "</table>" +
                        "</div>" +
                    "</body>" +
                    "</html>");

            // angular.forEach($scope.imageDetails, function(value, key) {
              
            // popupWin.document.write("<html>" +
            //         "<head>" +
            //             "<link rel='stylesheet' href='./././bower_components/bootstrap/dist/css/bootstrap.min.css' />" +
            //             "<script type='text/javascript' src='./././resources/lib/angular.min.js'></script>" +
            //             "<style>.action{display:none;} .print-hide{display:none;} .printshow{display:block;}</style>"+
            //         "</head>" +
            //         "<body onload='window.print()' style='font-size:11pt'>" +
            //             "<div class='container'>" +
            //                 "<center><h5 style='font-size:11pt'>Assemble</h5></center>"+
            //                 "<table class='table table-stripped table-bordered' style='font-size:11pt'>" +
            //                     "<tr>" +
            //                         "<td colspan='2' align='center'>" +
            //                             "<h3>Unitech Engineering Works</h3><br>" +
            //                             "S.No. 6/6/4, Shanti Nagar, MIDC, Bhosari, Pune - 411039, Maharashtra, India<br>" +
            //                             "Email: info@unitechautomations.com * +91-9890757909 / +91-9860490510 * +91-20-27124557" +
            //                         "</td>" +
            //                     "</tr>" +
            //                 "</table>" +
            //                 "<table class='table table-stripped table-bordered' style='font-size:10pt; page-break-after: always;'>" +
            //                     "<tr>" +
            //                         "<td align='center'><img alt='your image' height='50%' width='50%' src='"+value.dim_image+"'/></td>" +
            //                     "</tr>" +
            //                 "</table>" +
            //             "</div>" +
            //         "</body>" +
            //         "</html>");
            // });
            popupWin.document.close();
            // popupWin.close();


    };

});