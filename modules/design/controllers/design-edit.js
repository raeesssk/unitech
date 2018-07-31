// import admin
angular.module('design').controller('designEditCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {
    $scope.design={};
    $scope.designId = $routeParams.designId;
    $scope.apiURL = $rootScope.baseURL+'/design/edit/'+$scope.designId;
    $scope.oldDetails=[];
    $scope.removeDetails=[];
    
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

  $scope.designDetails = function () {
    $http({
        method: 'GET',
        url: $rootScope.baseURL+'/design/product/'+$scope.designId,
        headers: {'Content-Type': 'application/json',
                'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
          })
          .success(function(designObj)
          {
              designObj.forEach(function (value, key) {
                  $scope.oldDetails.push(value);
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
  $scope.designDetails();

  $scope.updateDesign = function () {

        var nameRegex = /^\d+$/;
      var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      
         if($('#dm_cm_id').val() == undefined || $('#dm_cm_id').val() == "" || $scope.design.dm_cm.cm_id == undefined){
            var dialog = bootbox.dialog({
                message: '<p class="text-center">Please Enter The Customer Name!</p>',
                    closeButton: false
                });
                dialog.find('.modal-body').addClass("btn-danger");
                setTimeout(function(){
                    dialog.modal('hide'); 
                    $('#dm_cm_id').focus();
                }, 1500);
          }
          else if($('#dm_mft_date').val() == undefined || $('#dm_mft_date').val() == ""){
            var dialog = bootbox.dialog({
                message: '<p class="text-center">Please Enter The Manufacturing Date!</p>',
                    closeButton: false
                });
                dialog.find('.modal-body').addClass("btn-danger");
                setTimeout(function(){
                    dialog.modal('hide');
                    $('#dm_mft_date').focus(); 
                }, 1500);
          }
          else if($('#dm_dely_date').val() == undefined || $('#dm_dely_date').val() == ""){
            var dialog = bootbox.dialog({
                message: '<p class="text-center">Please Enter The Delivery Date!</p>',
                    closeButton: false
                });
                dialog.find('.modal-body').addClass("btn-danger");
                setTimeout(function(){
                    dialog.modal('hide');
                    $('#dm_dely_date').focus(); 
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
          else if($('#dm_po_no').val() == undefined || $('#dm_po_no').val() == ""){
                var dialog = bootbox.dialog({
                message: '<p class="text-center">Please Enter P.O Number!</p>',
                    closeButton: false
                });
                dialog.find('.modal-body').addClass("btn-danger");
                setTimeout(function(){
                    dialog.modal('hide'); 
                    $('#dm_po_no').focus();
                }, 1500);
          }
          else if($('#dm_po_date').val() == undefined || $('#dm_po_date').val() == ""){
              var dialog = bootbox.dialog({
              message: '<p class="text-center">Please Enter P.O Date!</p>',
                  closeButton: false
              });
              dialog.find('.modal-body').addClass("btn-danger");
              setTimeout(function(){
                  dialog.modal('hide'); 
                  $('#dm_po_date').focus();
              }, 1500);
          }
          else if($scope.personalDetails.length > 0 && ($scope.personalDetails[$scope.personalDetails.length - 1].dtm_part_no == "")){
              var dialog = bootbox.dialog({
              message: '<p class="text-center">Please Enter Part Number!</p>',
                  closeButton: false
              });
              dialog.find('.modal-body').addClass("btn-danger");
              setTimeout(function(){
                  dialog.modal('hide'); 
              }, 1500);
          }
          else if($scope.personalDetails.length > 0 && ($scope.personalDetails[$scope.personalDetails.length - 1].dtm_part_name == "")){
              var dialog = bootbox.dialog({
              message: '<p class="text-center">Please Enter Part Name!</p>',
                  closeButton: false
              });
              dialog.find('.modal-body').addClass("btn-danger");
              setTimeout(function(){
                  dialog.modal('hide'); 
              }, 1500);
          }
          else if($scope.personalDetails.length > 0 && ($scope.personalDetails[$scope.personalDetails.length - 1].dtm_qty == "")){
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
                     
              $scope.product = {
                  design : $scope.design,
                  personalDetails : $scope.personalDetails,
                  oldDetails : $scope.oldDetails,
                  removeDetails:$scope.removeDetails
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
                    }, 1500);

                  $('#btnsave').text("Update");
                  $('#btnsave').removeAttr('disabled');
                  window.location.href = '#/design';  
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

    // Bill Of Material ADD/Remove Table
    $scope.personalDetails = [];    
      $scope.addNew = function(personalDetail){
          $scope.personalDetails.push({ 
              'dm_part_no': "", 
              'dm_part_name': "",
              'dm_qty': "",
          });
      };
    $scope.remove = function(index){
      $scope.personalDetails.splice(index,1);
    };

    $scope.removeOld=function(index){
      $scope.removeDetails.push($scope.oldDetails[index]);
      $scope.oldDetails.splice(index,1);
       
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

    //Drawing Image TABLE
    $scope.imageDetails = [];    
      $scope.addNewImg = function(imageDetail){
          $scope.imageDetails.push({ 
              'dm_part_no': "", 
              'dm_part_name': "",
              'dm_qty': "",
          });
      };
      $scope.removed = function(){
          var newDataList=[];
          $scope.selectedAll = false;
          angular.forEach($scope.imageDetails, function(selected){
              if(!selected.selected){
                  newDataList.push(selected);
              }
          }); 
          $scope.imageDetails = newDataList;
      };
    $scope.checkAlll = function () {
        if (!$scope.selectedAll) {
            $scope.selectedAll = true;
        } else {
            $scope.selectedAll = false;
        }
        angular.forEach($scope.imageDetails, function(imageDetail) {
            imageDetail.selected = $scope.selectedAll;
        });
    };    
    // Drawing adding of image 
    $scope.displayImage = "resources/default-image.png";
      function readURL(input) {
        if (input.files && input.files[0]) {
              var reader = new FileReader();

                  $scope.design.file = input.files[0];
              reader.onload = function (e) {
                  $(input).parent().parent().children('td:nth-child(2)').children('img').attr('src', e.target.result);
              }
              reader.readAsDataURL(input.files[0]);
          }
      };
      checkButton = function(objs){
          readURL(objs);
      };

      
    //date Manufacturing
    $('#dm_mft_date').datepicker({
          validateOnBlur: false,
          todayButton: false,
          timepicker: false,
          scrollInput: false,
          format: 'yyyy-mm-dd',
          autoclose: true,
          /*minDate: (parseInt(new Date().getFullYear()) - 100) + '/01/01',// minimum date(for today use 0 or -1970/01/01)
          maxDate: (parseInt(new Date().getFullYear()) - 18) + '/01/01',//maximum date calendar*/
          onChangeDateTime: function (dp, $input) {
              $scope.design.dm_mft_date = $('#dm_mft_date').val();
          }
    });
    //date P.O Date
    $('#dm_delivery_date').datepicker({
          validateOnBlur: false,
          todayButton: false,
          timepicker: false,
          scrollInput: false,
          format: 'yyyy-mm-dd',
          autoclose: true,
          /*minDate: (parseInt(new Date().getFullYear()) - 100) + '/01/01',// minimum date(for today use 0 or -1970/01/01)
          maxDate: (parseInt(new Date().getFullYear()) - 18) + '/01/01',//maximum date calendar*/
          onChangeDateTime: function (dp, $input) {
              $scope.design.dm_delivery_date = $('#dm_delivery_date').val();
          }
    });
    //date P.O Date
    $('#dm_po_date').datepicker({
          validateOnBlur: false,
          todayButton: false,
          timepicker: false,
          scrollInput: false,
          format: 'yyyy-mm-dd',
          autoclose: true,
          /*minDate: (parseInt(new Date().getFullYear()) - 100) + '/01/01',// minimum date(for today use 0 or -1970/01/01)
          maxDate: (parseInt(new Date().getFullYear()) - 18) + '/01/01',//maximum date calendar*/
          onChangeDateTime: function (dp, $input) {
              $scope.design.dm_po_date = $('#dm_po_date').val();
          }
    });


});