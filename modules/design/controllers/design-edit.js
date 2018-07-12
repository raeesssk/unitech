// import admin
angular.module('design').controller('designEditCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {

    $scope.designId = $routeParams.designId;
    $scope.apiURL = $rootScope.baseURL+'/design/edit/'+$scope.designId;

  $scope.getDesign = function () {
         $http({
              method: 'GET',
              url: $rootScope.baseURL+'/design/'+$scope.designId,
              headers: {'Content-Type': 'application/json',
                      'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
        })
        .success(function(designObj)
        {
            designObj.forEach(function (value, key) {
                $scope.design = value;
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
      
        if($('#dm_design_no').val() == undefined || $('#dm_design_no').val() == "" ){
          var dialog = bootbox.dialog({
              message: '<p class="text-center">Please Enter The Design Number!</p>',
                  closeButton: false
              });
              dialog.find('.modal-body').addClass("btn-danger");
              setTimeout(function(){
                  dialog.modal('hide'); 
                  $('#dm_design_no').focus();
              }, 1500);
          }
          else if($('#dm_cm_name').val() == undefined || $('#dm_cm_name').val() == "" || $scope.design.dm_cm_name == undefined){
            var dialog = bootbox.dialog({
                message: '<p class="text-center">Please Enter The Customer Name!</p>',
                    closeButton: false
                });
                dialog.find('.modal-body').addClass("btn-danger");
                setTimeout(function(){
                    dialog.modal('hide'); 
                    $('#dm_cm_name').focus();
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
          else if($('#dm_delivery_date').val() == undefined || $('#dm_delivery_date').val() == ""){
            var dialog = bootbox.dialog({
                message: '<p class="text-center">Please Enter The Delivery Date!</p>',
                    closeButton: false
                });
                dialog.find('.modal-body').addClass("btn-danger");
                setTimeout(function(){
                    dialog.modal('hide');
                    $('#dm_delivery_date').focus(); 
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
        else{

                $('#btnsave').attr('disabled','true');
                $('#btnsave').text("please wait...");

                $http({
                  method: 'POST',
                  url: $rootScope.baseURL+'/design/checkname',
                  data: $scope.design,
                  headers: {'Content-Type': 'application/json',
                          'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
                })
                .success(function(orderno)
                {
                    if(orderno.length > 1){
                         var dialog = bootbox.dialog({
                                message: '<p class="text-center">Design Already Exits!</p>',
                                    closeButton: false
                                });
                                dialog.find('.modal-body').addClass("btn-warning");
                                setTimeout(function(){
                                    dialog.modal('hide'); 
                                }, 1500);

                              $('#btnsave').text("Update");
                              $('#btnsave').removeAttr('disabled');
                      }
                    else
                      { 
                        var filename = $('#emp_image').val().split('\\').pop();
                        var fd = new FormData();
                        fd.append('emp_no', $scope.design.emp_no);
                        fd.append('emp_name', $scope.design.emp_name);
                        fd.append('emp_mobile', $scope.design.emp_mobile);
                        fd.append('emp_birth_date', $scope.design.emp_birth_date);
                        fd.append('emp_designation', $scope.design.emp_designation);
                        fd.append('emp_qualification', $scope.design.emp_qualification);
                        fd.append('emp_res_address', $scope.design.emp_res_address);
                        fd.append('emp_cor_address', $scope.design.emp_cor_address);
                        fd.append('emp_aadhar', $scope.design.emp_aadhar);
                        fd.append('emp_pan', $scope.design.emp_pan);
                        fd.append('emp_bank_name', $scope.design.emp_bank_name);
                        fd.append('emp_account_no', $scope.design.emp_account_no);
                        fd.append('emp_ifsc_code', $scope.design.emp_ifsc_code);
                        fd.append('emp_branch', $scope.design.emp_branch);
                        fd.append('emp_email', $scope.design.emp_email);
                        fd.append('emp_image', $scope.design.file);

                          $http({
                            method: 'POST',
                            url: $scope.apiURL,
                            data: fd,
                            transformRequest: angular.identity,
                            headers: {'Content-Type': undefined,
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
                    
                })
                .error(function(data) 
                {   
                    var dialog = bootbox.dialog({
                    message: '<p class="text-center">Oops, Something Went Wrong!</p>',
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
    $scope.remove = function(){
      var newDataList=[];
          $scope.selectedAll = false;
          angular.forEach($scope.personalDetails, function(selected){
              if(!selected.selected){
                  newDataList.push(selected);
              }
          }); 
          $scope.personalDetails = newDataList;
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