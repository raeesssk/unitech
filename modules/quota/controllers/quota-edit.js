// import admin
angular.module('quota').controller('quotaEditCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route,$filter) {

  $scope.quotation={};
  $scope.quotaId = $routeParams.quotaId;
  $scope.apiURL = $rootScope.baseURL+'/quotation/edit/'+$scope.quotaId;
  $scope.materialDetails=[];
  $scope.removeMaterial=[];
  // $scope.materialNewDetails=[];
  // $scope.materialRemoveDetails=[];    

    var sr = 0;
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
                  url: $rootScope.baseURL+'/quotation/details/edit/'+$scope.quotaId,
                  headers: {'Content-Type': 'application/json',
                          'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
                })
                .success(function(designObj)
                {
                    sr = designObj.length;
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

                        if (value.mtm_id != null) 
                        {
                              $http({
                                method: 'GET',
                                url: $rootScope.baseURL+'/material/'+value.mtm_id,
                                headers: {'Content-Type': 'application/json',
                                        'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
                              })
                              .success(function(materialObj)
                              {   
                                      materialObj.forEach(function (value1, key1) {
                                          value.mtm_id = value1;
                                      });
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
                                                value.oldBorings.push(value1);
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
                                                        value.oldDrillings.push(value1);
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
                                                          value.oldTapings.push(value1);
                                                        });
                                                        value.dtm_sub_total = value.qpm_sub_total;
                                                        value.dtm_profit = value.qpm_profit;
                                                        value.dtm_cost_pc = value.qpm_cost_pc;
                                                        value.dtm_total_cost = value.qpm_total_cost;
                                                        
                                                        $scope.materialDetails.push(value);
                                                        $scope.calculateMach(value);
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
                        }
                        else{
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
                                        value.oldBorings.push(value1);
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
                                                value.oldDrillings.push(value1);
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
                                                  value.oldTapings.push(value1);
                                                });
                                                value.dtm_sub_total = value.qpm_sub_total;
                                                value.dtm_profit = value.qpm_profit;
                                                value.dtm_cost_pc = value.qpm_cost_pc;
                                                value.dtm_total_cost = value.qpm_total_cost;
                                                
                                                $scope.materialDetails.push(value);
                                                $scope.calculateMach(value);
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
                        } 
                    });

                })  //designObj
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

      }); //quotationObj
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
      // else if($('#qm_transport').val() == undefined || $('#qm_transport').val() == ""){
      //     var dialog = bootbox.dialog({
      //         message: '<p class="text-center">Please Enter The Transport!</p>',
      //             closeButton: false
      //         });
      //         dialog.find('.modal-body').addClass("btn-danger");
      //         setTimeout(function(){
      //             dialog.modal('hide'); 
                  
      //             $('#qm_transport').focus(); 
      //         }, 1500);
      // }
      // else if($('#qm_other_charges').val() == undefined || $('#qm_other_charges').val() == ""){
      //     var dialog = bootbox.dialog({
      //         message: '<p class="text-center">Please Enter The Other Charges!</p>',
      //             closeButton: false
      //         });
      //         dialog.find('.modal-body').addClass("btn-danger");
      //         setTimeout(function(){
      //             dialog.modal('hide'); 
                  
      //             $('#qm_other_charges').focus(); 
      //         }, 1500);
      // }
      // else if($('#qm_discount').val() == undefined || $('#qm_discount').val() == ""){
      //     var dialog = bootbox.dialog({
      //         message: '<p class="text-center">Please Enter The Discount!</p>',
      //             closeButton: false
      //         });
      //         dialog.find('.modal-body').addClass("btn-danger");
      //         setTimeout(function(){
      //             dialog.modal('hide'); 
                  
      //             $('#qm_discount').focus(); 
      //         }, 1500);
      // }
      else{ 
            $('#btnsave').attr('disabled','true');
            $('#btnsave').text("please wait...");

            $scope.quotation.qm_date = $('#qm_date').val();
            $scope.quotation.qm_date_of_email = $('#qm_date_of_email').val();

            $scope.obj={
              quotation : $scope.quotation,
              purchaseMultipleData : $scope.materialDetails,
              materialNewDetails : $scope.materialNewDetails,
              removeMaterial : $scope.removeMaterial
            }
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
                        $('#btnsave').text("Update");
                        $('#btnsave').removeAttr('disabled');
                       // window.location.href = '#/';  
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

    $scope.getMaterialNewDetails = function(value, index){
        $scope.materialNewDetails[index].qpm_material_cost = value.mtm_price;
        $scope.materialNewDetails[index].qm_density = value.mtm_density;
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
            // $('#boring_focus').focus();
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

    $scope.addToBoringNewCart = function(index){
        var nameRegex = /^\d+$/;
        var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var numRegex = /^\d+(\.\d{1,2})?$/;

        if($scope.materialNewDetails[index].borings.qpmm_mm_id == "" || $scope.materialNewDetails[index].borings.qpmm_mm_id == undefined || $scope.materialNewDetails[index].borings.qpmm_mm_id.mm_id == undefined){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Select Machine!</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else if($scope.materialNewDetails[index].borings.qpmm_mm_hr == undefined || $scope.materialNewDetails[index].borings.qpmm_mm_hr < 0){
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
              'qpmm_mm_id':$scope.materialNewDetails[index].borings.qpmm_mm_id,
              'qpmm_mm_hr':$scope.materialNewDetails[index].borings.qpmm_mm_hr
            }
            $scope.materialNewDetails[index].borings.push($scope.machineList);
            $scope.materialNewDetails[index].borings.qpmm_mm_id = null;
            $scope.materialNewDetails[index].borings.qpmm_mm_hr = 0;
            $scope.calculateMach($scope.materialNewDetails[index]);
            // $('#boring_focus').focus();
        }
    };
    $scope.removeBoringNewItem = function(pindex,index){
        $scope.materialNewDetails[pindex].borings.splice(index,1);
        $scope.calculateMach($scope.materialNewDetails[pindex]);
    };
    $scope.removeOldBoringNewItem = function(pindex,index){
        $scope.materialNewDetails[pindex].removeBorings.push($scope.materialNewDetails[pindex].oldBorings[index]);
        $scope.materialNewDetails[pindex].oldBorings.splice(index,1);
        $scope.calculateMach($scope.materialNewDetails[pindex]);
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
            // $('#drilling_focus').focus();
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

    $scope.addToDrillingNewCart = function(index){
        var nameRegex = /^\d+$/;
        var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var numRegex = /^\d+(\.\d{1,2})?$/;

        if($scope.materialNewDetails[index].drillings.qpmm_mm_id == "" || $scope.materialNewDetails[index].drillings.qpmm_mm_id == undefined || $scope.materialNewDetails[index].drillings.qpmm_mm_id.mm_id == undefined){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Select Machine!</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else if($scope.materialNewDetails[index].drillings.qpmm_mm_hr == undefined || $scope.materialNewDetails[index].drillings.qpmm_mm_hr < 0){
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
              'qpmm_mm_id':$scope.materialNewDetails[index].drillings.qpmm_mm_id,
              'qpmm_mm_hr':$scope.materialNewDetails[index].drillings.qpmm_mm_hr
            }
            $scope.materialNewDetails[index].drillings.push($scope.machineList);
            $scope.materialNewDetails[index].drillings.qpmm_mm_id = null;
            $scope.materialNewDetails[index].drillings.qpmm_mm_hr = 0;
            $scope.calculateMach($scope.materialNewDetails[index]);
            // $('#drilling_focus').focus();
        }
    };
    $scope.removeDrillingNewItem = function(pindex,index){
        $scope.materialNewDetails[pindex].drillings.splice(index,1);
        $scope.calculateMach($scope.materialNewDetails[pindex]);
    };
    $scope.removeOldDrillingNewItem = function(pindex,index){
        $scope.materialNewDetails[pindex].removeDrillings.push($scope.materialNewDetails[pindex].oldDrillings[index]);
        $scope.materialNewDetails[pindex].oldDrillings.splice(index,1);
        $scope.calculateMach($scope.materialNewDetails[pindex]);
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
            // $('#taping_focus').focus();
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

    $scope.addToTapingNewCart = function(index){
        var nameRegex = /^\d+$/;
        var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var numRegex = /^\d+(\.\d{1,2})?$/;

        if($scope.materialNewDetails[index].tapings.qpmm_mm_id == "" || $scope.materialNewDetails[index].tapings.qpmm_mm_id == undefined || $scope.materialNewDetails[index].tapings.qpmm_mm_id.mm_id == undefined){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Select Machine!</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else if($scope.materialNewDetails[index].tapings.qpmm_mm_hr == undefined || $scope.materialNewDetails[index].tapings.qpmm_mm_hr < 0){
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
              'qpmm_mm_id':$scope.materialNewDetails[index].tapings.qpmm_mm_id,
              'qpmm_mm_hr':$scope.materialNewDetails[index].tapings.qpmm_mm_hr
            }
            $scope.materialNewDetails[index].tapings.push($scope.machineList);
            $scope.materialNewDetails[index].tapings.qpmm_mm_id = null;
            $scope.materialNewDetails[index].tapings.qpmm_mm_hr = 0;
            $scope.calculateMach($scope.materialNewDetails[index]);
            // $('#taping_focus').focus();
        }
    };
    $scope.removeTapingNewItem = function(pindex,index){
        $scope.materialNewDetails[pindex].tapings.splice(index,1);
        $scope.calculateMach($scope.materialNewDetails[pindex]);
    };
    $scope.removeOldTapingNewItem = function(pindex,index){
        $scope.materialNewDetails[pindex].removeTapings.push($scope.materialNewDetails[pindex].oldTapings[index]);
        $scope.materialNewDetails[pindex].oldTapings.splice(index,1);
        $scope.calculateMach($scope.materialNewDetails[pindex]);
    };


     // ADD Material Details
    $scope.materialNewDetails = []; 
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
      else{ 
            if($scope.material.qpm_part_name[0])
            {
                if($scope.materialDetails.length == 0){
                  $scope.material.qpm_sr_no = 1;
                }
                else{
                   $scope.material.qpm_sr_no = parseInt($scope.materialDetails[0].qpm_sr_no+1);
                }
                
                $scope.material.qpm_part = $scope.material.qpm_part_name;
                // $scope.material.flcuts = [];
                // $scope.material.turnings = [];
                // $scope.material.millings = [];
                $scope.material.borings = [];
                $scope.material.drillings = [];
                $scope.material.tapings = [];
                // $scope.material.grindings = [];
                // $scope.material.cncs = [];
                // $scope.material.vmc = [];
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

                $scope.material.qpm_ml_price = 150;
                $scope.material.qpm_ml_qty = 0;
                $scope.material.qpm_milling = 0;

                $scope.material.qpm_boring = 0;

                $scope.material.qpm_drilling = 0;
                
                $scope.material.qpm_taping = 0;

                $scope.material.qpm_gd_price = 350;
                $scope.material.qpm_gd_qty = 0;
                $scope.material.qpm_grinding = 0;

                $scope.material.qpm_cnc_price = 500;
                $scope.material.qpm_cnc_qty = 0;
                $scope.material.qpm_cnc_mc = 0;

                $scope.material.qpm_vmc_price = 500;
                $scope.material.qpm_vmc_qty = 0;
                $scope.material.qpm_vmc_mc = 0;

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

                $scope.material.qpm_pc_price = 30;
                $scope.material.qpm_pc_qty = 0;
                $scope.material.qpm_punching = 0;

                $scope.material.qpm_surf_price = 250;
                $scope.material.qpm_surf_qty = 0;
                $scope.material.qpm_surf_treat = 0;

                $scope.material.qpm_profit_per=15;
    
                $('#qpm_pr_no').focus();

                $http({
                  method: 'POST',
                  url:  $rootScope.baseURL+'/quotation/update/new/'+ $scope.quotaId,
                  data: $scope.material,
                  headers: {'Content-Type': 'application/json',
                          'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
                })
                .success(function(login)
                {   
                            $scope.material="";
                   var dialog = bootbox.dialog({
                      message: '<p class="text-center">Material Added!</p>',
                          closeButton: false
                      });
                      dialog.find('.modal-body').addClass("btn-success");
                      setTimeout(function(){
                          dialog.modal('hide');
                            // $('#btnSaveNewItemLine').text("Save");
                            $('#btnAddMaterial').removeAttr('disabled');
                            $('#qpm_pr_no').focus();

                            login[0].borings = [];
                              login[0].oldBorings = [];
                              login[0].removeBorings = [];
                            login[0].drillings = [];
                              login[0].oldDrillings = [];
                              login[0].removeDrillings = [];
                            login[0].tapings = [];
                              login[0].oldTapings = [];
                              login[0].removeTapings = [];

                              $scope.materialDetails.splice(0, 0, login[0]);
                            // $scope.materialDetails.push(login[0]);
                            // $route.reload();  
                      }, 1500);
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
            }
            else
            {
              if($scope.materialDetails.length == 0){
                  $scope.material.qpm_sr_no = 1;
                }
                else{
                   $scope.material.qpm_sr_no = parseInt($scope.materialDetails[0].qpm_sr_no+1);
                }

               $scope.material.qpm_part = $scope.material.qpm_part_name.qpm_part;
                // $scope.material.flcuts = [];
                // $scope.material.turnings = [];
                // $scope.material.millings = [];
                // $scope.material.grindings = [];
                // $scope.material.cncs = [];
                // $scope.material.vmc = [];
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
                $scope.material.dtm_cost_pc = parseFloat($scope.material.qpm_part_name.qpm_cost_pc);

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

                $scope.material.qpm_vmc_price = $scope.material.qpm_part_name.qpm_vmc_price;
                $scope.material.qpm_vmc_qty = $scope.material.qpm_part_name.qpm_vmc_qty;
                $scope.material.qpm_vmc_mc = $scope.material.qpm_part_name.qpm_vmc_mc;

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
                $scope.material.qpm_image = $scope.material.qpm_part_name.qpm_image;

                var pom = $scope.material.qpm_part_name.qpm_id;

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

                                  $http({
                                    method: 'GET',
                                    url: $rootScope.baseURL+'/material/'+$scope.material.qpm_part_name.qpm_mtm_id,
                                    headers: {'Content-Type': 'application/json',
                                            'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
                                  })
                                  .success(function(materialObj)
                                  {   
                                      materialObj.forEach(function (value1, key1) {
                                          $scope.material.mtm_id = value1;
                                      });

                                        $http({
                                          method: 'POST',
                                          url:  $rootScope.baseURL+'/quotation/update/new/'+ $scope.quotaId,
                                          data: $scope.material,
                                          headers: {'Content-Type': 'application/json',
                                                  'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
                                        })
                                        .success(function(login)
                                        {   
                                           var dialog = bootbox.dialog({
                                            message: '<p class="text-center">Material Added!</p>',
                                                closeButton: false
                                            });
                                            dialog.find('.modal-body').addClass("btn-success");
                                            setTimeout(function(){
                                                dialog.modal('hide');
                                                  // $('#btnSaveNewItemLine').text("Save");
                                                  $('#btnAddMaterial').removeAttr('disabled');
                                                  $('#qpm_pr_no').focus();

                                                  login[0].borings = [];
                                                   login[0].oldBorings = angular.copy($scope.material.borings);
                                                    login[0].removeBorings = [];
                                                  login[0].drillings = [];
                                                   login[0].oldDrillings = angular.copy($scope.material.drillings);
                                                    login[0].removeDrillings = [];
                                                  login[0].tapings = [];
                                                   login[0].oldTapings = angular.copy($scope.material.tapings);
                                                    login[0].removeTapings = [];
                                                    login[0].mtm_id = $scope.material.mtm_id;

                                                    login[0].dtm_total_cost = login[0].qpm_total_cost;

                                                    login[0].dtm_sub_total = login[0].qpm_sub_total;
                                                    login[0].dtm_profit = login[0].qpm_profit;
                                                    login[0].dtm_cost_pc = login[0].qpm_cost_pc;

                                                  $scope.material="";

                                                  $scope.materialDetails.splice(0, 0, login[0]);
                                                  // $scope.materialDetails.push(login[0]);
                                                  // $route.reload();  
                                              }, 1500);
                                        })
                                      .error(function(data) 
                                      {   
                                          var dialog = bootbox.dialog({
                                            message: '<p class="text-center">Oops, Something Went Wrong! Please Refresh the Page.</p>',
                                                closeButton: false
                                            });
                                            setTimeout(function(){
                                            // $('#btnSaveNewItemLine').text("Save");
                                            $('#btnAddMaterial').removeAttr('disabled');
                                                dialog.modal('hide'); 
                                            }, 1500);            
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
            

                              // $scope.materialDetails.push($scope.material);
                              // $scope.material="";
                              // $('#qpm_image').val("");
                              // $('#blah').attr('src', "resources/default-image.png");
                              // $('#qpm_pr_no').focus();
                              // $scope.calculate();

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
    // $scope.removeMatItem = function(index){
    //     $scope.removeMaterial.push($scope.materialDetails[index]);
    //     $scope.materialDetails.splice(index,1);
    //     // $scope.calculateMach($scope.materialDetails[index]);
    //     $scope.calculateNet();
    // };
    
    $scope.deleteMaterial = function (qpm_delete_id, index) {
        $('#confirm-delete').modal('show'); 
          $scope.qpm_delete_id=qpm_delete_id;

          $scope.indexObj = index;
    };    

    $scope.deleteConfirm = function () {
          $('#del').attr('disabled','true');
          $('#del').text("please wait...");
              
          $scope.materialDetails.splice($scope.indexObj,1);
          $scope.calculateNet();
  console.log($scope.materialDetails);
          $scope.qpm_delete = {
              delete : $scope.qpm_delete_id,
              quotation : $scope.quotation
          }
          $http({
              method: 'POST',
              url: $rootScope.baseURL+'/quotation/update/remove/'+$scope.quotaId,
              data: $scope.qpm_delete,
              headers: {'Content-Type': 'application/json',
                        'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
          })
          .success(function(quotationObj)
          { 
              $('#del').text("Delete");
              $('#del').removeAttr('disabled');
              $scope.qpm_delete_id = {};
              // $scope.getAll();
              $('#confirm-delete').modal('hide');
          })
          .error(function(data) 
          {   
            var dialog = bootbox.dialog({
                message: '<p class="text-center">Oops, Something Went Wrong! Please Refresh the Page.</p>',
                    closeButton: false
            });
            setTimeout(function(){
                $('#del').text("Delete");
                $('#del').removeAttr('disabled');
                dialog.modal('hide'); 
            }, 1500);            
          });
      };



// Save list => Action=====
     $scope.saveMatItem = function(index){
          $scope.calculateNet();
          
          $scope.qpm_update = {
              update : $scope.materialDetails[index],
              quotation : $scope.quotation
          }

          $http({
              method: 'POST',
              url:  $rootScope.baseURL+'/quotation/update/old/'+$scope.quotaId,
              data:  $scope.qpm_update,
              headers: {'Content-Type': 'application/json',
                      'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
            })
            .success(function(login)
            {   
               var dialog = bootbox.dialog({
                  message: '<p class="text-center">Saved!</p>',
                      closeButton: false
                  });
                  dialog.find('.modal-body').addClass("btn-success");
                  setTimeout(function(){
                      dialog.modal('hide');
                        // $('#btnSaveItemLine').text("Save");
                        $('#btnSaveItemLine').removeAttr('disabled');

                        // $scope.materialDetails[index].oldBorings = $scope.materialDetails[index].borings;
                        // $scope.materialDetails[index].oldDrillings = $scope.materialDetails[index].drillings;
                        // $scope.materialDetails[index].oldTapings = $scope.materialDetails[index].tapings;

                        // $scope.materialDetails[index].borings=[];
                        // $scope.materialDetails[index].drillings=[];
                        // $scope.materialDetails[index].tapings=[];
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
                  // $('#btnSaveItemLine').text("Save");
                  $('#btnSaveItemLine').removeAttr('disabled');
                      dialog.modal('hide'); 
                  }, 1500);            
            });
        

    };

//     $scope.saveNewMatItem = function(index){
//           $http({
//               method: 'POST',
//               url:  $rootScope.baseURL+'/quotation/update/new/'+ $scope.quotaId,
//               data: $scope.materialNewDetails[index],
//               headers: {'Content-Type': 'application/json',
//                       'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
//             })
//             .success(function(login)
//             {   
//                var dialog = bootbox.dialog({
//                   message: '<p class="text-center">Saved!</p>',
//                       closeButton: false
//                   });
//                   dialog.find('.modal-body').addClass("btn-success");
//                   setTimeout(function(){
//                       dialog.modal('hide');
//                         // $('#btnSaveNewItemLine').text("Save");
//                         $('#btnSaveNewItemLine').removeAttr('disabled');
//                         $route.reload();  
//                   }, 1500);
//             })
//             .error(function(data) 
//             {   
//                 var dialog = bootbox.dialog({
//                   message: '<p class="text-center">Oops, Something Went Wrong! Please Refresh the Page.</p>',
//                       closeButton: false
//                   });
//                   setTimeout(function(){
//                   // $('#btnSaveNewItemLine').text("Save");
//                   $('#btnSaveNewItemLine').removeAttr('disabled');
//                       dialog.modal('hide'); 
//                   }, 1500);            
//             });

//     };
// //end Save List

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

    $scope.disableNewField = function(index){
        var hello = $scope.materialNewDetails[index].qpm_shape;
        if(hello == "Rectangle" || hello == "Sheet" || hello == "Plate"){
            // $('#dtm_radius').prop('disabled', 'disabled');
            $scope.materialNewDetails[index].qpm_diameter = undefined;
            $scope.materialNewDetails[index].qpm_edge_length = undefined;
            // $("#qpm_diameter").hide();
            // $("#qpm_edge_length").hide();
            // $("#qpm_width").show();
            // $("#qpm_thickness").show();
        }
        else if(hello == "Round" || hello == "Hexagonal"){
            $scope.materialNewDetails[index].qpm_width = undefined;
            $scope.materialNewDetails[index].qpm_thickness = undefined;
            $scope.materialNewDetails[index].qpm_edge_length = undefined;
            // $("#qpm_width").hide();
            // $("#qpm_thickness").hide();
            // $("#qpm_edge_length").hide();
            // $("#qpm_diameter").show();
        }
        else if(hello == "Square"){
            $scope.materialNewDetails[index].qpm_diameter = undefined;
            $scope.materialNewDetails[index].qpm_thickness = undefined;
            $scope.materialNewDetails[index].qpm_edge_length = undefined;
            // $("#qpm_diameter").hide();          
            // $("#qpm_thickness").hide();
            // $("#qpm_edge_length").hide();
            // $("#qpm_width").show();
        }
        else if(hello == "Flat-Tube"){
            $scope.materialNewDetails[index].qpm_diameter = undefined;
            // $("#qpm_diameter").hide();

            // $("#qpm_edge_length").show();
            // $("#qpm_width").show();          
            // $("#qpm_thickness").show();
        }
        else if(hello == "Square-Tube" || hello == "Equal-Leg-Angle" || hello == "Unequal-Leg-Angle"){
            $scope.materialNewDetails[index].qpm_diameter = undefined;
            $scope.materialNewDetails[index].qpm_edge_length = undefined;
            // $("#qpm_diameter").hide();
            // $("#qpm_edge_length").hide();
            
            // $("#qpm_width").show();          
            // $("#qpm_thickness").show();
        }
        else if(hello == "Circular-Tube"){
            $scope.materialNewDetails[index].qpm_width = undefined;
            $scope.materialNewDetails[index].qpm_edge_length = undefined;
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
        $scope.calculateMach(value);
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
        angular.forEach(obj.oldBorings, function(value,key){
          value.qpmm_total= parseFloat(value.mm_price * value.qpmm_mm_hr);
          obj.qpm_boring = parseFloat(obj.qpm_boring + value.qpmm_total); 
        });
        angular.forEach(obj.borings, function(value,key){
          value.qpmm_total= parseFloat(value.qpmm_mm_id.mm_price * value.qpmm_mm_hr);
          obj.qpm_boring = parseFloat(obj.qpm_boring + value.qpmm_total); 
        });
        
        obj.qpm_drilling = 0;
        angular.forEach(obj.oldDrillings, function(value,key){
          value.qpmm_total= parseFloat(value.mm_price * value.qpmm_mm_hr);
          obj.qpm_drilling = parseFloat(obj.qpm_drilling + value.qpmm_total); 
        });
        angular.forEach(obj.drillings, function(value,key){
          value.qpmm_total= parseFloat(value.qpmm_mm_id.mm_price * value.qpmm_mm_hr);
          obj.qpm_drilling = parseFloat(obj.qpm_drilling + value.qpmm_total); 
        });

        obj.qpm_taping = 0;
        angular.forEach(obj.oldTapings, function(value,key){
          value.qpmm_total= parseFloat(value.mm_price * value.qpmm_mm_hr);
          obj.qpm_taping = parseFloat(obj.qpm_taping + value.qpmm_total); 
        });
        angular.forEach(obj.tapings, function(value,key){
          value.qpmm_total= parseFloat(value.qpmm_mm_id.mm_price * value.qpmm_mm_hr);
          obj.qpm_taping = parseFloat(obj.qpm_taping + value.qpmm_total); 
        });
      
        obj.qpm_grinding = 0;
        obj.qpm_grinding= parseFloat(obj.qpm_gd_price * obj.qpm_gd_qty);

        obj.qpm_cnc_mc = 0;
        obj.qpm_cnc_mc= parseFloat(obj.qpm_cnc_price * obj.qpm_cnc_qty);

        obj.qpm_vmc_mc = 0;
        obj.qpm_vmc_mc= parseFloat(obj.qpm_vmc_price * obj.qpm_vmc_qty);
        
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

        if(obj.qpm_rm != null){
          obj.dtm_sub_total = parseFloat(parseFloat(obj.qpm_fl_cut) + parseFloat(obj.qpm_turning) + parseFloat(obj.qpm_milling) + parseFloat(obj.qpm_boring) + parseFloat(obj.qpm_drilling) + parseFloat(obj.qpm_taping) + parseFloat(obj.qpm_grinding) + parseFloat(obj.qpm_cnc_mc) + parseFloat(obj.qpm_vmc_mc) + parseFloat(obj.qpm_wire_cut) + parseFloat(obj.qpm_fabrication) + parseFloat(obj.qpm_hard) + parseFloat(obj.qpm_blacodising) + parseFloat(obj.qpm_punching) + parseFloat(obj.qpm_surf_treat) + parseFloat(obj.qpm_rm));
        }
        else{
          obj.dtm_sub_total = parseFloat(parseFloat(obj.qpm_fl_cut) + parseFloat(obj.qpm_turning) + parseFloat(obj.qpm_milling) + parseFloat(obj.qpm_boring) + parseFloat(obj.qpm_drilling) + parseFloat(obj.qpm_taping) + parseFloat(obj.qpm_grinding) + parseFloat(obj.qpm_cnc_mc) + parseFloat(obj.qpm_vmc_mc) + parseFloat(obj.qpm_wire_cut) + parseFloat(obj.qpm_fabrication) + parseFloat(obj.qpm_hard) + parseFloat(obj.qpm_blacodising) + parseFloat(obj.qpm_punching) + parseFloat(obj.qpm_surf_treat) + parseFloat(0));
        }

        obj.dtm_profit = parseFloat(obj.dtm_sub_total * (obj.qpm_profit_per / 100)).toFixed(2);
        obj.dtm_cost_pc = parseFloat(parseFloat(obj.dtm_sub_total) + parseFloat(obj.dtm_profit)).toFixed(2);


        obj.dtm_total_cost = parseFloat(obj.dtm_total_cost + parseFloat(obj.dtm_cost_pc * obj.qpm_qty)).toFixed(2);

        $scope.calculateNet();        
    };
        
 
    $scope.calculateNet = function(){
        $scope.quotation.qm_net_cost=0;
        $scope.quotation.qm_cgst_amount=0;
        $scope.quotation.qm_sgst_amount=0;
        $scope.quotation.qm_igst_amount=0;
        $scope.quotation.qm_total_cost=0;
        // var i = 1;

        angular.forEach($scope.materialDetails, function(value,key){
          $scope.quotation.qm_net_cost=parseFloat(parseFloat($scope.quotation.qm_net_cost) + parseFloat(value.dtm_total_cost)).toFixed(2);
          // value.srno = i++;
        });


        // $scope.quotation.qm_cgst_amount = parseFloat($scope.quotation.qm_net_cost * ($scope.quotation.qm_cgst_per / 100)).toFixed(2);
        // $scope.quotation.qm_sgst_amount = parseFloat($scope.quotation.qm_net_cost * ($scope.quotation.qm_sgst_per / 100)).toFixed(2);
        // $scope.quotation.qm_igst_amount = parseFloat($scope.quotation.qm_net_cost * ($scope.quotation.qm_igst_per / 100)).toFixed(2);

        $scope.quotation.qm_cgst_amount = parseFloat($scope.quotation.qm_net_cost * (0 / 100)).toFixed(2);
        $scope.quotation.qm_sgst_amount = parseFloat($scope.quotation.qm_net_cost * (0 / 100)).toFixed(2);
        $scope.quotation.qm_igst_amount = parseFloat($scope.quotation.qm_net_cost * (0 / 100)).toFixed(2);

        $scope.quotation.qm_total_cost = parseFloat(parseFloat($scope.quotation.qm_net_cost) + parseFloat($scope.quotation.qm_cgst_amount) + parseFloat($scope.quotation.qm_sgst_amount) + parseFloat($scope.quotation.qm_igst_amount) + parseFloat($scope.quotation.qm_transport) + parseFloat($scope.quotation.qm_other_charges) - parseFloat($scope.quotation.qm_discount)).toFixed(2);

    }

    $scope.calculateTotal = function(){
      $scope.quotation.qm_total_cost = parseFloat(parseFloat($scope.quotation.qm_net_cost) + parseFloat($scope.quotation.qm_cgst_amount) + parseFloat($scope.quotation.qm_sgst_amount) + parseFloat($scope.quotation.qm_igst_amount) + parseFloat($scope.quotation.qm_transport) + parseFloat($scope.quotation.qm_other_charges) - parseFloat($scope.quotation.qm_discount));
    }

  //design list record for Design Name input
    // $scope.getSearchDesign = function(vals) {
    //     var searchTerms = {search: vals};
    //     const httpOptions = {
    //         headers: {
    //           'Content-Type':  'application/json',
    //           'Authorization': 'Bearer '+localStorage.getItem("unitech_admin_access_token")
    //         }
    //     };
    //     return $http.post($rootScope.baseURL+'/design/typeahead/search', searchTerms, httpOptions).then((result) => {
    //         return result.data;
    //     });
    // };

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


   // Drawing adding of image 
    function readURL(input) {

      if (input.files && input.files[0]) {

            var reader = new FileReader();
                $scope.quotation.file = input.files[0];
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

    $scope.uploadImage = function(qpmid,index){
      
      if($('#qpm_image').val() != "" && ($('#qpm_image').data('max-size') < $('#qpm_image').get(0).files[0].size )){
        
          var dialog = bootbox.dialog({
          message: '<p class="text-center">Please Select Image size less than 200KB.</p>',
              closeButton: false
          });
          dialog.find('.modal-body').addClass("btn-danger");
          setTimeout(function(){
              dialog.modal('hide'); 
              $('#qpm_image').val("");
              $('#blah').attr('src', "resources/default-image.png");
          }, 1500);
      }
      else{
          // var filename = $('#qpm_image').val().split('\\').pop();
          var fd = new FormData();
          fd.append('qpm_image', $scope.quotation.file);

            $http({
              method: 'POST',
              url: $rootScope.baseURL+'/quotation/image/'+qpmid,
              data: fd,
              transformRequest: angular.identity,
              headers: {'Content-Type': undefined,
                      'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
            })
            .success(function(login)
            {   
                var dialog = bootbox.dialog({
                  message: '<p class="text-center">FIle Added Successfully!</p>',
                      closeButton: false
                  });
                  dialog.find('.modal-body').addClass("btn-success");
                  setTimeout(function(){
                      dialog.modal('hide'); 
                      $scope.materialDetails[index].qpm_image = login[0].qpm_image;
                      $('#qpm_image').val("");
                  }, 1500);
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
      }
    };

    $scope.viewPdf = function(objs){
        $scope.qpmimage = objs;
        $('#view-pdf').modal('show'); 
    };
    
    // $('#uploadImage').click(function() {
    //     $(this).hide();
    // });

      // $(document).ready(function(){
      //   if ($scope.quotation.file == "" || $scope.quotation.file == undefined) {
      //     // $('#uploadImage').hide();
      //     $('#uploadImage').attr('disabled','true');
      //   }
      //   else{
      //     console.log('sels');
      //   }
      // });
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

    // tab key
    // $("#content").keydown(function(objEvent) {
    //     if (objEvent.keyCode == 9) {  //tab pressed
    //         objEvent.preventDefault(); // stops its action
    //     }
    // })

    $scope.name = 'World';
    $(document).ready(function() {
      $('tbody').scroll(function(e) { //detect a scroll event on the tbody
        /*
        Setting the thead left value to the negative valule of tbody.scrollLeft will make it track the movement
        of the tbody element. Setting an elements left value to that of the tbody.scrollLeft left makes it maintain       it's relative position at the left of the table.    
        */
        $('thead').css("left", -$("tbody").scrollLeft()); //fix the thead relative to the body scrolling
        $('thead th:nth-child(1)').css("left", $("tbody").scrollLeft()); //fix the first cell of the header
        $('tbody td:nth-child(1)').css("left", $("tbody").scrollLeft()); //fix the first column of tdbody
      });
    });
});