// import admin
angular.module('quota').controller('quotaEditCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route,$filter) {

  $scope.quotation={};
  $scope.quotaId = $routeParams.quotaId;
  $scope.apiURL = $rootScope.baseURL+'/quotation/edit/'+$scope.quotaId;
  $scope.materialDetails=[];
  // $scope.materialNewDetails=[];
  // $scope.materialRemoveDetails=[];    
    
  $scope.getQuotation = function () {
      $http({
          method: 'GET',
          url: $rootScope.baseURL+'/quotation/'+$scope.quotaId,
          headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
      })
      .success(function(quotationObj)
      {   
            quotationObj.forEach(function(value,key){
                value.qm_date=$filter('date')(value.qm_date, "mediumDate");
                value.qm_date_of_email=$filter('date')(value.qm_date_of_email, "mediumDate");
                $scope.quotation=value;
                  
                $http({
                  method: 'GET',
                  url: $rootScope.baseURL+'/quotation/details/'+$scope.quotaId,
                  headers: {'Content-Type': 'application/json',
                          'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
                })
                .success(function(designObj)
                {
                    designObj.forEach(function (value, key) {
                      value.borings = [];
                        value.oldBorings = [];
                        value.removeBorings = [];
                      value.drillings = [];
                        value.oldDrillings = [];
                        value.removeDrillings = [];
                      value.tapings = [];
                        value.oldTapings = [];
                        value.removeTapings = [];
              // boring
                        $http({
                          method: 'GET',
                          url: $rootScope.baseURL+'/quotation/details/machine/boring/'+value.qpm_id,
                          headers: {'Content-Type': 'application/json',
                                  'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
                        })
                        .success(function(machineObj)
                        {   
                          machineObj.forEach(function (value1, key1) {
                            value.oldBorings.push(value1)
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
              // drilling      
                        $http({
                          method: 'GET',
                          url: $rootScope.baseURL+'/quotation/details/machine/drilling/'+value.qpm_id,
                          headers: {'Content-Type': 'application/json',
                                  'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
                        })
                        .success(function(machineObj)
                        {   
                          machineObj.forEach(function (value1, key1) {
                            value.oldBorings.push(value1)
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
               // taping    
                        $http({
                          method: 'GET',
                          url: $rootScope.baseURL+'/quotation/details/machine/taping/'+value.qpm_id,
                          headers: {'Content-Type': 'application/json',
                                  'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
                        })
                        .success(function(machineObj)
                        {   
                          machineObj.forEach(function (value1, key1) {
                            value.oldBorings.push(value1)
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
                            value.dtm_sub_total = value.qpm_sub_total;
                            value.dtm_profit = value.qpm_profit;
                            value.dtm_cost_pc = value.qpm_cost_pc;
                            value.dtm_total_cost = value.qpm_total_cost;

                            $scope.materialDetails.push(value);
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

  // $scope.getQuotation = function () {
  //     $http({
  //         method: 'GET',
  //         url: $rootScope.baseURL+'/quotation/'+$scope.quotaId,
  //         headers: {'Content-Type': 'application/json',
  //                 'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
  //     })
  //     .success(function(quotationObj)
  //     {   
  //           quotationObj.forEach(function(value,key){
  //                 value.qm_date=$filter('date')(value.qm_date, "mediumDate");
  //                 value.qm_date_of_email=$filter('date')(value.qm_date_of_email, "mediumDate");
                  
  //                 $scope.quotation=value;
                  
  //                 $http({
  //                       method: 'GET',
  //                       url: $rootScope.baseURL+'/quotation/details/'+$scope.quotaId,
  //                       headers: {'Content-Type': 'application/json',
  //                               'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
  //                 })
  //                 .success(function(quotationObj)
  //                 {
  //                       quotationObj.forEach(function (value, key) {
  //                         value.machineDetails=[];
  //                           $http({
  //                                 method: 'GET',
  //                                 url: $rootScope.baseURL+'/quotation/details/machine/'+value.qpm_id,
  //                                 headers: {'Content-Type': 'application/json',
  //                                         'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
  //                           })
  //                           .success(function(machineObj)
  //                           { 
  //                                 machineObj.forEach(function (value1, key1) {
  //                                   value.machineDetails.push(value1);
  //                                 });
  //                                 console.log(value.machineDetails);
  //                           })
  //                           .error(function(data) 
  //                                 {   
  //                                   var dialog = bootbox.dialog({
  //                                     message: '<p class="text-center">Oops, Something Went Wrong! Please Refresh the Page.</p>',
  //                                         closeButton: false
  //                                     });
  //                                     setTimeout(function(){
  //                                         dialog.modal('hide'); 
  //                                     }, 1500);            
  //                           });
  //                       });     
  //                 })
  //                 .error(function(data) 
  //                 {   
  //                       var dialog = bootbox.dialog({
  //                         message: '<p class="text-center">Oops, Something Went Wrong! Please Refresh the Page.</p>',
  //                         closeButton: false
  //                       });
  //                       setTimeout(function(){
  //                           dialog.modal('hide'); 
  //                       }, 1500); 
  //                 });

  //           });
  //     })
  //     .error(function(data) 
  //     {   
  //         var dialog = bootbox.dialog({
  //           message: '<p class="text-center">Oops, Something Went Wrong! Please Refresh the Page.</p>',
  //               closeButton: false
  //           });
  //           setTimeout(function(){
  //               dialog.modal('hide'); 
  //           }, 1500);            
  //     });
  //   };


    //Update Quotation button
    $scope.updateQuotation = function () {

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
                      $scope.quotation.qm_date_of_email = $('#qm_date_of_email').val();

                          $scope.obj={
                            quotation : $scope.quotation,
                            purchaseMultipleData : $scope.materialDetails 
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
                                     window.location.href = '#/quota';  
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
    $scope.getMaterialDetails = function(value, index){
        $scope.materialDetails[index].qpm_material_cost = value.mtm_price;
        $scope.materialDetails[index].qm_density = value.mtm_density;
    };

    $scope.addToBoringCart = function(index){
        var nameRegex = /^\d+$/;
        var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var numRegex = /^\d+(\.\d{1,2})?$/;

        if($scope.materialDetails[index].borings.qpmm_mm_id == "" || $scope.materialDetails[index].borings.qpmm_mm_id == undefined || $scope.materialDetails[index].borings.qpmm_mm_id.mm_id == undefined){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Select Machine!</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else if($scope.materialDetails[index].borings.qpmm_mm_hr == undefined || $scope.materialDetails[index].borings.qpmm_mm_hr < 0){
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
              'qpmm_mm_id':$scope.materialDetails[index].borings.qpmm_mm_id,
              'qpmm_mm_hr':$scope.materialDetails[index].borings.qpmm_mm_hr
            }
            $scope.materialDetails[index].borings.push($scope.machineList);
            $scope.materialDetails[index].borings.qpmm_mm_id = null;
            $scope.materialDetails[index].borings.qpmm_mm_hr = 0;
            $scope.calculateMach($scope.materialDetails[index]);
            $('#boring_focus').focus();
        }
    };
    $scope.removeBoringItem = function(pindex,index){
        $scope.materialDetails[pindex].borings.splice(index,1);
        $scope.calculateMach($scope.materialDetails[pindex]);
    };
    $scope.removeOldBoringItem = function(pindex,index){
        $scope.materialDetails[pindex].removeBorings.push($scope.materialDetails[pindex].oldBorings[index]);
        $scope.materialDetails[pindex].oldBorings.splice(index,1);
        $scope.calculateMach($scope.materialDetails[pindex]);
    };

    $scope.addToDrillingCart = function(index){
        var nameRegex = /^\d+$/;
        var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var numRegex = /^\d+(\.\d{1,2})?$/;

        if($scope.materialDetails[index].drillings.qpmm_mm_id == "" || $scope.materialDetails[index].drillings.qpmm_mm_id == undefined || $scope.materialDetails[index].drillings.qpmm_mm_id.mm_id == undefined){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Select Machine!</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else if($scope.materialDetails[index].drillings.qpmm_mm_hr == undefined || $scope.materialDetails[index].drillings.qpmm_mm_hr < 0){
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
              'qpmm_mm_id':$scope.materialDetails[index].drillings.qpmm_mm_id,
              'qpmm_mm_hr':$scope.materialDetails[index].drillings.qpmm_mm_hr
            }
            $scope.materialDetails[index].drillings.push($scope.machineList);
            $scope.materialDetails[index].drillings.qpmm_mm_id = null;
            $scope.materialDetails[index].drillings.qpmm_mm_hr = 0;
            $scope.calculateMach($scope.materialDetails[index]);
            $('#drilling_focus').focus();
        }
    };

    $scope.removeDrillingItem = function(pindex,index){
        $scope.materialDetails[pindex].drillings.splice(index,1);
        $scope.calculateMach($scope.materialDetails[pindex]);
    };
    $scope.removeOldDrillingItem = function(pindex,index){
        $scope.materialDetails[pindex].removeDrillings.push($scope.materialDetails[pindex].oldDrillings[index]);
        $scope.materialDetails[pindex].oldDrillings.splice(index,1);
        $scope.calculateMach($scope.materialDetails[pindex]);
    };

    $scope.addToTapingCart = function(index){
        var nameRegex = /^\d+$/;
        var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var numRegex = /^\d+(\.\d{1,2})?$/;

        if($scope.materialDetails[index].tapings.qpmm_mm_id == "" || $scope.materialDetails[index].tapings.qpmm_mm_id == undefined || $scope.materialDetails[index].tapings.qpmm_mm_id.mm_id == undefined){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Select Machine!</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else if($scope.materialDetails[index].tapings.qpmm_mm_hr == undefined || $scope.materialDetails[index].tapings.qpmm_mm_hr < 0){
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
              'qpmm_mm_id':$scope.materialDetails[index].tapings.qpmm_mm_id,
              'qpmm_mm_hr':$scope.materialDetails[index].tapings.qpmm_mm_hr
            }
            $scope.materialDetails[index].tapings.push($scope.machineList);
            $scope.materialDetails[index].tapings.qpmm_mm_id = null;
            $scope.materialDetails[index].tapings.qpmm_mm_hr = 0;
            $scope.calculateMach($scope.materialDetails[index]);
            $('#taping_focus').focus();
        }
    };
    $scope.removeTapingItem = function(pindex,index){
        $scope.materialDetails[pindex].tapings.splice(index,1);
        $scope.calculateMach($scope.materialDetails[pindex]);
    };
    $scope.removeOldTapingItem = function(pindex,index){
        $scope.materialDetails[pindex].removeTapings.push($scope.materialDetails[pindex].oldTapings[index]);
        $scope.materialDetails[pindex].oldTapings.splice(index,1);
        $scope.calculateMach($scope.materialDetails[pindex]);
    };

    $scope.disableField = function(index){
      var hello = $scope.materialDetails[index].qpm_shape;
      if(hello == "Rectangle" || hello == "Sheet" || hello == "Plate"){
          // $('#dtm_radius').prop('disabled', 'disabled');
          $scope.materialDetails[index].qpm_diameter = undefined;
          $scope.materialDetails[index].qpm_edge_length = undefined;

          // $("#qpm_diameter").hide();
          // $("#qpm_edge_length").hide();

          // $("#qpm_width").show();
          // $("#qpm_thickness").show();
       }
       else if(hello == "Round" || hello == "Hexagonal"){
          $scope.materialDetails[index].qpm_width = undefined;
          $scope.materialDetails[index].qpm_thickness = undefined;
          $scope.materialDetails[index].qpm_edge_length = undefined;
          // $("#qpm_width").hide();
          // $("#qpm_thickness").hide();
          // $("#qpm_edge_length").hide();

          // $("#qpm_diameter").show();
       }
       else if(hello == "Square"){
          $scope.materialDetails[index].qpm_diameter = undefined;
          $scope.materialDetails[index].qpm_thickness = undefined;
          $scope.materialDetails[index].qpm_edge_length = undefined;
          // $("#qpm_diameter").hide();          
          // $("#qpm_thickness").hide();
          // $("#qpm_edge_length").hide();

          // $("#qpm_width").show();
       }
       else if(hello == "Flat-Tube"){
          $scope.materialDetails[index].qpm_diameter = undefined;
          // $("#qpm_diameter").hide();

          // $("#qpm_edge_length").show();
          // $("#qpm_width").show();          
          // $("#qpm_thickness").show();
       }
       else if(hello == "Square-Tube" || hello == "Equal-Leg-Angle" || hello == "Unequal-Leg-Angle"){
          $scope.materialDetails[index].qpm_diameter = undefined;
          $scope.materialDetails[index].qpm_edge_length = undefined;
          // $("#qpm_diameter").hide();
          // $("#qpm_edge_length").hide();
          
          // $("#qpm_width").show();          
          // $("#qpm_thickness").show();
       }
       else if(hello == "Circular-Tube"){
          $scope.materialDetails[index].qpm_width = undefined;
          $scope.materialDetails[index].qpm_edge_length = undefined;
          // $("#qpm_width").hide();
          // $("#qpm_edge_length").hide();

          // $("#qpm_thickness").show();
          // $("#qpm_diameter").show();
       }
    };
// calculate RM with price
    $scope.calculate = function(value){
      var shape = value.qpm_shape;
          if(shape == "Rectangle" || shape == "Sheet" || shape == "Plate"){
            value.qpm_raw_mat_wt = parseFloat(parseFloat(value.qpm_width * value.qpm_thickness * value.qpm_length * value.mtm_id.mtm_density) / 1000000).toFixed(2);
           }  
          else if(shape == "Round"){
            value.qpm_raw_mat_wt = parseFloat(parseFloat( 3.14 * parseFloat(parseFloat(value.qpm_diameter/2) * parseFloat(value.qpm_diameter/2)) * value.qpm_length * value.mtm_id.mtm_density) / 1000000).toFixed(2);
          }   
          else if(shape == "Square"){
              value.qpm_raw_mat_wt = parseFloat(parseFloat(value.qpm_width * value.qpm_width * value.qpm_length * value.mtm_id.mtm_density) / 1000000).toFixed(2);
          }   
          else if(shape == "Hexagonal"){
              value.qpm_raw_mat_wt = parseFloat(parseFloat(value.qpm_diameter * value.qpm_diameter * value.qpm_length * value.mtm_id.mtm_density) / 1000000).toFixed(2);
          }   
          else if(shape == "Flat-Tube"){
              value.qpm_raw_mat_wt = parseFloat(parseFloat(parseFloat(parseFloat(value.qpm_edge_length) + parseFloat(value.qpm_width)) * 2 * value.qpm_thickness * value.qpm_length *  value.mtm_id.mtm_density) / 1000000).toFixed(2);
          }  
          else if(shape == "Square-Tube"){
              value.qpm_raw_mat_wt = parseFloat(parseFloat(value.qpm_width * 4 * value.qpm_thickness * value.qpm_length * value.mtm_id.mtm_density) / 1000000).toFixed(2);
          }   
          else if(shape == "Circular-Tube"){
              value.qpm_raw_mat_wt = parseFloat(parseFloat(parseFloat(parseFloat(value.qpm_diameter) - parseFloat(value.qpm_thickness)) * value.qpm_thickness * value.qpm_length * value.mtm_id.mtm_density) / 1000000).toFixed(2);
          }    
          else if(shape == "Equal-Leg-Angle"){
              value.qpm_raw_mat_wt = parseFloat(parseFloat(parseFloat(parseFloat(value.qpm_width) * 2 - parseFloat(value.qpm_thickness)) * value.qpm_thickness * value.qpm_length * value.mtm_id.mtm_density) / 1000000).toFixed(2);
          }    
          else if(shape == "Unequal-Leg-Angle"){
              value.qpm_raw_mat_wt = parseFloat(parseFloat(parseFloat(parseFloat(value.qpm_width) + parseFloat(value.qpm_width) - parseFloat(value.qpm_thickness)) * value.qpm_thickness * value.qpm_length * value.mtm_id.mtm_density) / 1000000).toFixed(2);
          }    
      // value.qpm_raw_mat_wt = parseFloat(parseFloat(value.dtm_width * 4 * value.dtm_thickness * value.dtm_length * value.mtm_id.mtm_density) / 1000000).toFixed(2);
      
      value.qpm_rm = Math.ceil(value.qpm_raw_mat_wt * value.qpm_material_cost);
  };
    $scope.calculateMach=function(obj){
      obj.dtm_total_cost=0;
      obj.dtm_sub_total=0;
      $scope.quotation.qm_net_cost=0;
      $scope.quotation.qm_cgst_amount=0;
      $scope.quotation.qm_sgst_amount=0;
      $scope.quotation.qm_igst_amount=0;
      $scope.quotation.qm_total_cost=0;

      obj.qpm_fl_cut=0;
      obj.qpm_fl_cut = parseFloat(obj.qpm_fl_price * obj.qpm_fl_qty);

      obj.qpm_turning = 0;
      obj.qpm_turning= parseFloat(obj.qpm_tn_price * obj.qpm_tn_qty);

      obj.qpm_milling = 0;
      obj.qpm_milling= parseFloat(obj.qpm_ml_price * obj.qpm_ml_qty);

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

      obj.qpm_cnc_mc = 0;
      obj.qpm_cnc_mc= parseFloat(obj.qpm_cnc_price * obj.qpm_cnc_qty);
      
      obj.qpm_wire_cut = 0;
      obj.qpm_wire_cut= parseFloat(obj.qpm_wire_price * obj.qpm_wire_qty);
      
      obj.qpm_fabrication = 0;
      obj.qpm_fabrication= parseFloat(obj.qpm_fab_price * obj.qpm_fab_qty);

      obj.qpm_hard = 0;
      obj.qpm_hard= parseFloat(obj.qpm_hard_price * obj.qpm_hard_qty);
      
      obj.qpm_blacodising = 0;
      obj.qpm_blacodising= parseFloat(obj.qpm_bc_price * obj.qpm_bc_qty);

      obj.qpm_punching = 0;
      obj.qpm_punching= parseFloat(obj.qpm_pc_price * obj.qpm_pc_qty);

      obj.qpm_surf_treat = 0;
      obj.qpm_surf_treat= parseFloat(obj.qpm_surf_price * obj.qpm_surf_qty);


      obj.dtm_sub_total = parseFloat(parseFloat(obj.qpm_fl_cut) + parseFloat(obj.qpm_turning) + parseFloat(obj.qpm_milling) + parseFloat(obj.qpm_boring) + parseFloat(obj.qpm_drilling) + parseFloat(obj.qpm_taping) + parseFloat(obj.qpm_grinding) + parseFloat(obj.qpm_cnc_mc) + parseFloat(obj.qpm_wire_cut) + parseFloat(obj.qpm_fabrication) + parseFloat(obj.qpm_hard) + parseFloat(obj.qpm_blacodising) + parseFloat(obj.qpm_punching) + parseFloat(obj.qpm_surf_treat) + parseFloat(obj.qpm_rm));
      obj.dtm_profit = parseFloat(obj.dtm_sub_total * (15 / 100)).toFixed(2);
      obj.dtm_cost_pc = parseFloat(parseFloat(obj.dtm_sub_total) + parseFloat(obj.dtm_profit)).toFixed(2);

      obj.dtm_total_cost = parseFloat(obj.dtm_total_cost + parseFloat(obj.dtm_cost_pc * obj.qpm_qty)).toFixed(2);

      angular.forEach($scope.materialDetails, function(value,key){
        $scope.quotation.qm_net_cost=parseFloat(parseFloat($scope.quotation.qm_net_cost) + parseFloat(value.dtm_total_cost)).toFixed(2);
        
      });

      $scope.quotation.qm_cgst_amount = parseFloat($scope.quotation.qm_net_cost * ($scope.quotation.qm_cgst_per / 100)).toFixed(2);
      $scope.quotation.qm_sgst_amount = parseFloat($scope.quotation.qm_net_cost * ($scope.quotation.qm_sgst_per / 100)).toFixed(2);
      $scope.quotation.qm_igst_amount = parseFloat($scope.quotation.qm_net_cost * ($scope.quotation.qm_igst_per / 100)).toFixed(2);

      $scope.quotation.qm_total_cost = Math.ceil(parseFloat($scope.quotation.qm_net_cost) + parseFloat($scope.quotation.qm_cgst_amount) + parseFloat($scope.quotation.qm_sgst_amount) + parseFloat($scope.quotation.qm_igst_amount) + parseFloat($scope.quotation.qm_transport) + parseFloat($scope.quotation.qm_other_charges) - parseFloat($scope.quotation.qm_discount));

    };
    $scope.calculateTotal = function(){
      $scope.quotation.qm_total_cost = parseFloat(parseFloat($scope.quotation.qm_net_cost) + parseFloat($scope.quotation.qm_cgst_amount) + parseFloat($scope.quotation.qm_sgst_amount) + parseFloat($scope.quotation.qm_igst_amount) + parseFloat($scope.quotation.qm_transport) + parseFloat($scope.quotation.qm_other_charges) - parseFloat($scope.quotation.qm_discount));
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