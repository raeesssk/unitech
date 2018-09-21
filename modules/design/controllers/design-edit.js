// import admin
angular.module('design').controller('designEditCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route, $filter) {
    $scope.design={};
    $scope.designId = $routeParams.designId;
    $scope.apiURL = $rootScope.baseURL+'/design/edit/'+$scope.designId;
    $scope.materialDetails=[];
    $scope.materialNewDetails=[];
    $scope.materialRemoveDetails=[];

  $scope.getDesign = function () {
      $http({
          method: 'GET',
          url: $rootScope.baseURL+'/design/'+$scope.designId,
          headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
      })
      .success(function(designObj)
      {   
              
          designObj.forEach(function(value,key){
              value.dm_date = $filter('date')(value.dm_date, "mediumDate");
        
              $http({
                    method: 'GET',
                    url: $rootScope.baseURL+'/customer/'+value.cm_id,
                    headers: {'Content-Type': 'application/json',
                            'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
              })
              .success(function(custObj)
              {
                custObj.forEach(function(value1,key){
                  value.old_dm_cm_id = value1;
                  value.dm_cm = value1; 
                });                      
                    
                $scope.design=value;
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
                url: $rootScope.baseURL+'/design/details/'+$scope.designId,
                headers: {'Content-Type': 'application/json',
                        'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
              })
              .success(function(designObj)
              {
                  designObj.forEach(function (value, key) {
                      $scope.materialDetails.push(value);
                    });
                  // console.log($scope.oldDetails);
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
                  }, 1500);            
              });
              // $http({
              //   method: 'GET',
              //   url: $rootScope.baseURL+'/design/details/images/'+$scope.designId,
              //   headers: {'Content-Type': 'application/json',
              //           'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
              // })
              // .success(function(designObj)
              // {
              //     designObj.forEach(function (value, key) {
              //         $scope.oldImagesDetails.push(value);
              //       });
              // })
              // .error(function(data) 
              // {   
              //   var dialog = bootbox.dialog({
              //     message: '<p class="text-center">Oops, Something Went Wrong! Please Refresh the Page.</p>',
              //         closeButton: false
              //     });
              //     setTimeout(function(){
              //         dialog.modal('hide'); 
              //     }, 1500);            
              // });
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


  $scope.updateDesign = function () {
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

              // var filename = $('#dm_image').val().split('\\').pop();
              // var fd = new FormData();
              // fd.append('dm_design_no', $scope.design.dm_design_no);
              // fd.append('dm_cm_id', $scope.design.dm_cm_id);
              // fd.append('dm_mft_date', $scope.design.dm_mft_date);
              // fd.append('dm_dely_date', $scope.design.dm_dely_date);
              // fd.append('dm_project_no', $scope.design.dm_project_no);
              // fd.append('dm_po_no', $scope.design.dm_po_no);
              // fd.append('dm_po_date', $scope.design.dm_po_date);
              $scope.design.dm_mft_date = $('#dm_mft_date').val();
              $scope.product = {
                  design : $scope.design,
                  // personalDetails : $scope.materialDetails,
                  materialDetails : $scope.materialDetails,
                  materialNewDetails : $scope.materialNewDetails,
                  materialRemoveDetails : $scope.materialRemoveDetails                   
              };
              $http({
                method: 'POST',
                url: $scope.apiURL,
                data: $scope.product,
                headers: {'Content-Type':'application/json',
                        'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
              })
              .success(function(login)
              {   
                  var dialog = bootbox.dialog({
                    message: '<p class="text-center">Design Updated Successfully!</p>',
                        closeButton: false
                    });
                    dialog.find('.modal-body').addClass("btn-success");
                    setTimeout(function(){
                        dialog.modal('hide');
                          $scope.printDetails();
                          $('#btnsave').text("Update");
                          $('#btnsave').removeAttr('disabled');
                          // $route.reload(); 
                          window.location.href = '#/design';   
                    }, 1500);
                
                
                  // var dialog = bootbox.dialog({
                  //         message: '<p class="text-center">Design Updated Successfully!</p>',
                  //             closeButton: false
                  //         });
                  //         dialog.find('.modal-body').addClass("btn-success");
                  //         setTimeout(function(){
                  //             dialog.modal('hide'); 
                  //         }, 1500);
                  //         $scope.printDetails();
                  //         $('#btnsave').text("Update");
                  //         $('#btnsave').removeAttr('disabled');
                  //         window.location.href = '#/design'; 
                
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

// for materialNewDetails
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

  // for materialDetails      
        angular.forEach($scope.materialDetails, function(value, key) {
          var shape = value.dtm_shape;

                if(shape == "Rectangle" || shape == "Sheet" || shape == "Plate"){
                  value.dtm_raw_mat_wt = parseFloat(parseFloat(value.dtm_width * value.dtm_thickness * value.dtm_length * value.mtm_density) / 1000000).toFixed(2);
                 }  
                else if(shape == "Round"){
                  value.dtm_raw_mat_wt = parseFloat(parseFloat( 3.14 * parseFloat(parseFloat(value.dtm_diameter/2) * parseFloat(value.dtm_diameter/2)) * value.dtm_length * value.mtm_density) / 1000000).toFixed(2);
                }   
                else if(shape == "Square"){
                    value.dtm_raw_mat_wt = parseFloat(parseFloat(value.dtm_width * value.dtm_width * value.dtm_length * value.mtm_density) / 1000000).toFixed(2);
                }   
                else if(shape == "Hexagonal"){
                    value.dtm_raw_mat_wt = parseFloat(parseFloat(value.dtm_diameter * value.dtm_diameter * value.dtm_length * value.mtm_density) / 1000000).toFixed(2);
                }   
                else if(shape == "Flat-Tube"){
                    value.dtm_raw_mat_wt = parseFloat(parseFloat(parseFloat(parseFloat(value.dtm_edge_length) + parseFloat(value.dtm_width)) * 2 * value.dtm_thickness * value.dtm_length *  value.mtm_density) / 1000000).toFixed(2);
                }  
                else if(shape == "Square-Tube"){
                    value.dtm_raw_mat_wt = parseFloat(parseFloat(value.dtm_width * 4 * value.dtm_thickness * value.dtm_length * value.mtm_density) / 1000000).toFixed(2);
                }   
                else if(shape == "Circular-Tube"){
                    value.dtm_raw_mat_wt = parseFloat(parseFloat(parseFloat(parseFloat(value.dtm_diameter) - parseFloat(value.dtm_thickness)) * value.dtm_thickness * value.dtm_length * value.mtm_density) / 1000000).toFixed(2);
                }    
                else if(shape == "Equal-Leg-Angle"){
                    value.dtm_raw_mat_wt = parseFloat(parseFloat(parseFloat(parseFloat(value.dtm_width) * 2 - parseFloat(value.dtm_thickness)) * value.dtm_thickness * value.dtm_length * value.mtm_density) / 1000000).toFixed(2);
                }    
                else if(shape == "Unequal-Leg-Angle"){
                    value.dtm_raw_mat_wt = parseFloat(parseFloat(parseFloat(parseFloat(value.dtm_width) + parseFloat(value.dtm_width) - parseFloat(value.dtm_thickness)) * value.dtm_thickness * value.dtm_length * value.mtm_density) / 1000000).toFixed(2);
                }          

              // value.dtm_raw_mat_wt = parseFloat(parseFloat(value.dtm_width * 4 * value.dtm_thickness * value.dtm_length * value.mtm_density) / 1000000).toFixed(2);
              value.dtm_rm = Math.ceil(value.dtm_raw_mat_wt * value.dtm_material_cost);
      });

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
 

// ADD Material Details 
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
            $scope.materialNewDetails.push($scope.material);
            $scope.material="";
            
            //  $scope.imageDetails.push({
            //   'dm_image': $scope.design.file,
            //   'dm_image_file': $('#blah').attr('src')
            // });
             
            // $('#blah').attr('src', $scope.displayImage);
            // $('#dm_image').val("");
            // $scope.design.file = undefined;

            $('#dtm_material_code').focus();
            $scope.calculate();
      }
    };
    $scope.calculate = function(){
      $scope.design.totalQty = 0;
      var i=1;

      angular.forEach($scope.materialDetails, function(value, key) {
        value.srno = i++;
        if(value.dtm_qty != undefined )
          $scope.design.totalQty = parseInt(parseInt($scope.design.totalQty) + parseInt(value.dtm_qty));
      });

      angular.forEach($scope.materialNewDetails, function(value, key) {
        value.srno = i++;
          if(value.dtm_qty != undefined )
            $scope.design.totalQty = parseInt(parseInt($scope.design.totalQty) + parseInt(value.dtm_qty));
        });
      // var i=1;
      // angular.forEach($scope.oldDetails, function(value, key) {
      //   value.srno = i++;
      //   $scope.design.totalQty = parseInt($scope.design.totalQty + value.dtm_qty);
      // });
      // angular.forEach($scope.materialDetails, function(value, key) {
      //   value.srno = i++;
      //   $scope.design.totalQty = parseInt($scope.design.totalQty +value.dtm_qty);
      // });
    };

    $scope.removeMatItem = function(index){
      $scope.materialNewDetails.splice(index,1);
        // $scope.imageDetails.splice(index,1);
        // $('#dtm_material_code').focus();
        $scope.calculate();
    };
    $scope.removeMatOldItem = function(index){
      $scope.materialRemoveDetails.push($scope.materialDetails[index]);

      $scope.materialDetails.splice(index,1);
        // $('#dtm_material_code').focus();
        $scope.calculate();
    };
// END Material Details

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



// Add Image
// $scope.addToCart = function(){
//         if($('#dm_image').val() == undefined || $('#dm_image').val() == ""){
//             var dialog = bootbox.dialog({
//             message: '<p class="text-center">Please Select Image.</p>',
//                 closeButton: false
//             });
//             dialog.find('.modal-body').addClass("btn-danger");
//             setTimeout(function(){
//                 dialog.modal('hide'); 
//             }, 1500);
//         }
//         else{
//             $scope.imageDetails.push({
//               'dm_image': $scope.design.file,
//               'dm_image_file': $('#blah').attr('src')
//             });
//             $('#blah').attr('src', $scope.displayImage);
//             $('#dm_image').val("");
//         }
//     };

    // $scope.removeItem = function(index){
    //     $scope.imageDetails.splice(index,1);
    // };
    // $scope.removeOldItem = function(index){
    //     $scope.removeImagesDetails.push($scope.oldImagesDetails[index]);
    //     $scope.oldImagesDetails.splice(index,1);
    // };
// END Add Image

//Drawing Image TABLE
    // $scope.imageDetails = [];    
    //   $scope.addNewImg = function(imageDetail){
    //       $scope.imageDetails.push({ 
    //           'dm_part_no': "", 
    //           'dm_part_name': "",
    //           'dm_qty': "",
    //       });
    //   };
    //   $scope.removed = function(){
    //       var newDataList=[];
    //       $scope.selectedAll = false;
    //       angular.forEach($scope.imageDetails, function(selected){
    //           if(!selected.selected){
    //               newDataList.push(selected);
    //           }
    //       }); 
    //       $scope.imageDetails = newDataList;
    //   };
    // $scope.checkAlll = function () {
    //     if (!$scope.selectedAll) {
    //         $scope.selectedAll = true;
    //     } else {
    //         $scope.selectedAll = false;
    //     }
    //     angular.forEach($scope.imageDetails, function(imageDetail) {
    //         imageDetail.selected = $scope.selectedAll;
    //     });
    // };    
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

      
    //date 
    $('#dm_date').datepicker({
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
              $scope.design.dm_date = $('#dm_date').val();
          }
    });

    checkButton = function(objs){
          readURL(objs);
      };

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
                                "<td>Name : <strong>"+$scope.design.cm_name+"</strong></td>"+
                                "<td>Address : <strong>"+$scope.design.cm_address+"</strong></td>"+
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