 // import admin
angular.module('design').controller('designAddCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route, $filter) {

  
    $scope.design = {};
    $scope.product={};
    $scope.designList = [];
    // $scope.design.totalqty = 0;
    $scope.design.totalQty = 0;
    // $scope.materialDetail.dtm_totalqty = 0;
    $scope.imageDetails = []; 
    $scope.material ={};
// VALIDATION & Main
    $scope.apiURL = $rootScope.baseURL+'/design/add';
      $('#dm_cm_id').focus();
      
      $scope.addDesign = function () {
        var nameRegex = /^\d+$/;
        var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      
          if($('#dm_cm_id').val() == undefined || $('#dm_cm_id').val() == "" || $scope.design.dm_cm_id == undefined){
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
          else if($scope.materialDetails.length == 0){
              var dialog = bootbox.dialog({
              message: '<p class="text-center">Please add bill material!</p>',
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
                if ($scope.imageDetails.length < 0){
                  angular.forEach($scope.imageDetails, function(value, key) {

                    var fd = new FormData();
                    fd.append('dim_dm_id', login[0].dm_id);
                    fd.append('dm_image', value.dm_image);

                    $http({
                      method: 'POST',
                      url: $rootScope.baseURL+'/design/image/add',
                      data: fd,
                      transformRequest: angular.identity,
                      headers: {'Content-Type': undefined,
                              'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
                    })
                    .success(function(login)
                    {   
                        if($scope.imageDetails.length - 1 == key){
                          var dialog = bootbox.dialog({
                          message: '<p class="text-center">Design Added Successfully!</p>',
                              closeButton: false
                          });
                          dialog.find('.modal-body').addClass("btn-success");
                          setTimeout(function(){
                              dialog.modal('hide'); 
                          }, 1500);
                          $scope.printDetails();
                          $('#btnsave').text("Save");
                          $('#btnsave').removeAttr('disabled');
                          $route.reload();  
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
                  });
                }
                else {
                  var dialog = bootbox.dialog({
                          message: '<p class="text-center">Design Added Successfully!</p>',
                              closeButton: false
                          });
                          dialog.find('.modal-body').addClass("btn-success");
                          setTimeout(function(){
                              dialog.modal('hide'); 
                          }, 1500);
                          $scope.printDetails();
                          $('#btnsave').text("Save");
                          $('#btnsave').removeAttr('disabled');
                          $route.reload(); 
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
    
     $scope.materialDetails = []; 
    $scope.btnAddMaterial = function(index){
      $scope.materialDetails.push($scope.material);
      $scope.material="";
      $('#dtm_part_no').focus();
      $scope.calculate();
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
        $('#dtm_part_no').focus();
        $scope.calculate();
    };
    // $scope.calculate = function(){
    //   $scope.material.totalqty = 0;
    //     angular.forEach($scope.materialDetails, function(value, key) {
    //       if(value.dtm_qty != undefined )
    //         $scope.material.totalqty = parseInt($scope.material.totalqty) + parseInt(value.dtm_qty);

    //     });
    // };
     

    $scope.addToCart = function(){

        if($('#dm_image').val() == undefined || $('#dm_image').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please select image.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else{
            $scope.imageDetails.push({
              'dm_image': $scope.design.file,
              'dm_image_file': $('#blah').attr('src')
            });
            $('#blah').attr('src', $scope.displayImage);
            $('#dm_image').val("");
        }
    };

    $scope.removeItem = function(index){
        $scope.imageDetails.splice(index,1);
    };
   
    //Drawing Image TABLE Defau
       
    // var ij = 1;
    //   $scope.addNewImg = function(imageDetail){
    //       $scope.imageDetails.push({ 
    //           'srno': ij++,
    //           'dm_drawing_img': ""
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
    $('#dm_dely_date').datepicker({
          validateOnBlur: false,
          todayButton: false,
          timepicker: false,
          scrollInput: false,
          format: 'yyyy-mm-dd',
          autoclose: true,
          /*minDate: (parseInt(new Date().getFullYear()) - 100) + '/01/01',// minimum date(for today use 0 or -1970/01/01)
          maxDate: (parseInt(new Date().getFullYear()) - 18) + '/01/01',//maximum date calendar*/
          onChangeDateTime: function (dp, $input) {
              $scope.design.dm_dely_date = $('#dm_dely_date').val();
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
          // minDate: (parseInt(new Date().getFullYear()) - 100) + '/01/01',// minimum date(for today use 0 or -1970/01/01)
          // maxDate: (parseInt(new Date().getFullYear()) - 18) + '/01/01',//maximum date calendar
          onChangeDateTime: function (dp, $input) {
              $scope.design.dm_po_date = $('#dm_po_date').val();
          }
    });

    // $("#dm_po_date").datepicker({
    //     dateFormat: 'dd/mm/yy',
    //     changeMonth: true,
    //     changeYear: true,
    //     constrainInput: false
    // });

    
    $scope.printDetails = function(){

        var popupWin = window.open('', 'winname','directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,scrollbars=no,resizable=no, width=400,height=auto');
            // popupWin.document.open();
            popupWin.document.write("<html>" +
                    "<head>" +
                        "<link rel='stylesheet' href='./././bower_components/bootstrap/dist/css/bootstrap.min.css' />" +
                        "<style>.action{display:none;} .print-hide{display:none;} .printshow{display:block;}</style>"+
                    "</head>" +
                    "<body onload='window.print()' style='font-size:11pt'>" +
                        "<div class='container'>" +
                            "<center><h5 style='font-size:11pt'>Design</h5></center>"+
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
                                "<td colspan='2'>Name : <strong>"+$scope.design.dm_cm_id.cm_name+"</strong></td>"+
                              "</tr>" +
                              "<tr>" +
                                "<td>Manufacturing Date : <strong>"+$filter('date')($scope.design.dm_mft_date,'mediumDate')+"</strong></td>"+
                                "<td>P.O. Date : <strong>"+$filter('date')($scope.design.dm_po_date,'mediumDate')+"</strong></td>"+
                              "</tr>" +
                              "<tr>" +
                                "<td>Delivery Date : <strong>"+$filter('date')($scope.design.dm_dely_date,'mediumDate')+"</strong></td>" +
                                "<td>P.O. No : <strong>"+$scope.design.dm_po_no+"</strong></td>" +
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

            angular.forEach($scope.imageDetails, function(value, key) {

            popupWin.document.write("<html>" +
                    "<head>" +
                        "<link rel='stylesheet' href='./././bower_components/bootstrap/dist/css/bootstrap.min.css' />" +
                        "<style>.action{display:none;} .print-hide{display:none;} .printshow{display:block;}</style>"+
                    "</head>" +
                    "<body onload='window.print()' style='font-size:11pt'>" +
                        "<div class='container'>" +
                            "<center><h5 style='font-size:11pt'>Design</h5></center>"+
                            "<table class='table table-stripped table-bordered' style='font-size:11pt'>" +
                                "<tr>" +
                                    "<td colspan='2' align='center'>" +
                                        "<h3>Unitech Engineering Works</h3><br>" +
                                        "S.No. 6/6/4, Shanti Nagar, MIDC, Bhosari, Pune - 411039, Maharashtra, India<br>" +
                                        "Email: info@unitechautomations.com * +91-9890757909 / +91-9860490510 * +91-20-27124557" +
                                    "</td>" +
                                "</tr>" +
                            "</table>" +
                            "<table class='table table-stripped table-bordered' style='font-size:10pt; page-break-after: always;'>" +
                                "<tr>" +
                                    "<td><img alt='your image' height='100' width='100' ng-src="+value.dm_image_file+"/></td>" +
                                "</tr>" +
                            "</table>" +
                        "</div>" +
                    "</body>" +
                    "</html>");
            });
            popupWin.document.close();
            // popupWin.close();


    };

});