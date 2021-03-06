// import admin
angular.module('quota').controller('quotaApproveListCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route, $filter) {

    $scope.filteredTodos = [];
    $scope.currentPage = 1;
    $scope.maxSize = 5;
    $scope.entryLimit = 5;
    $scope.filterUser = 0;
    $scope.filterUserend = 1;
    $scope.numPerPage = 10;
    $scope.obj_Main = [];
    $scope.quotationList = [];
    $scope.loading1 = 0;
    $scope.limit={};



  $scope.apiURL = $rootScope.baseURL+'/quotation/approve/total';
      $scope.getAll = function () {
          if ($('#searchtext').val() == undefined || $('#searchtext').val() == "") {
            $scope.limit.search = "";
          }
          else{
            $scope.limit.search = $scope.searchtext;
          }
          $http({
            method: 'POST',
            url: $scope.apiURL,
            data:$scope.limit,
            headers: {'Content-Type': 'application/json',
                      'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
          })
          .success(function(category)
          {
            category.forEach(function (value, key) {
                $scope.quotationListcount=value.total;
            });
            $scope.$watch("currentPage + numPerPage",
                function () {
                    $scope.resetpagination();
                });
                // $scope.$apply(); 

          })
          .error(function(data) 
          {   
              $scope.loading1 = 1;
              var dialog = bootbox.dialog({
                  message: '<p class="text-center">No Record Found!</p>',
                    closeButton: false
              });
              dialog.find('.modal-body').addClass("btn-danger");
              setTimeout(function(){
                  dialog.modal('hide'); 
              }, 1500);             
          });
      };

      $scope.resetpagination = function () {
          var begin = (($scope.currentPage - 1) * $scope.numPerPage);
          var end = begin + $scope.numPerPage;
          $scope.filterUserend = begin + 1;
          $scope.filterUser = end;
          if ($scope.filterUser >= $scope.quotationListcount)
              $scope.filterUser = $scope.quotationListcount;

              $scope.filteredTodos = [];
              $scope.limit.number = $scope.numPerPage;
              $scope.limit.begin = begin;
              $scope.limit.end = end;
              $http({
                method: 'POST',
                url: $rootScope.baseURL+'/quotation/approve/limit',
                data: $scope.limit,
                headers: {'Content-Type': 'application/json',
                          'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
              })
              .success(function(quotation)
              {
                $scope.filteredTodos = [];
                if (quotation.length > 0) {
                    quotation.forEach(function (value, key) {
                        $scope.filteredTodos.push(value);
                    });
                }
                else{
                }
                // $scope.obj_Main = $scope.vendorList;
                    $scope.loading1 = 1;
                    // $scope.$apply(); 
              })
              .error(function(data) 
              {   
                  $scope.loading1 = 1;
                    var dialog = bootbox.dialog({
                    message: '<p class="text-center">Oops, Something Went Wrong! Please Refresh the Page.</p>',
                        closeButton: false
                    });
                    setTimeout(function(){
                        dialog.modal('hide'); 
                    }, 3001);             
              });
      };
 
    //search Data
      $scope.getSearch = function () {
          $scope.getAll();
      };

      $scope.deleteQuotation = function (qm_id) {
        $('#confirm-cancel').modal('show'); 
          $scope.qm_id=qm_id;
      }  

      $scope.pendingQuotation = function(qm_id) {
        console.log(qm_id);
        $('#confirm-pending').modal('show'); 
          $scope.app_qm_id=qm_id;
      }
      $scope.pendingConfirm = function() {
          $http({
              method: 'POST',
              url: $rootScope.baseURL+'/quotation/ispending/'+$scope.app_qm_id,
              headers: {'Content-Type': 'application/json',
                        'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
          })
          .success(function(quotationObj)
          { 
                var dialog = bootbox.dialog({
                    message: '<p class="text-center">Back To Pending.</p>',
                        closeButton: false
                });
                setTimeout(function(){
                    $('#pending').text("Pending");          
                    $('#pending').removeAttr('disabled');
                    $scope.quotationList = [];
                    $scope.getAll();
                    dialog.modal('hide'); 
                }, 1500); 
                $('#confirm-pending').modal('hide');
              // $(this).toggleClass('fa-thumbs-up fa-thumbs-down');
          })
          .error(function(data) 
          {   
            var dialog = bootbox.dialog({
                message: '<p class="text-center">Oops, Something Went Wrong! Please Refresh the Page.</p>',
                    closeButton: false
            });
            setTimeout(function(){
                $('#app').text("Pending");
                $('#app').removeAttr('disabled');
                dialog.modal('hide'); 
            }, 1500);            
          });
      };




      $scope.deleteConfirm = function () {
          $('#del').attr('disabled','true');
          $('#del').text("please wait...");
          $http({
              method: 'POST',
              url: $rootScope.baseURL+'/quotation/delete/'+$scope.qm_id,
              headers: {'Content-Type': 'application/json',
                        'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
          })
          .success(function(quotationObj)
          { 
              $('#del').text("Cancel");
              $('#del').removeAttr('disabled');
              $scope.quotationList = [];
              $scope.getAll();
              $('#confirm-cancel').modal('hide');
          })
          .error(function(data) 
          {   
            var dialog = bootbox.dialog({
                message: '<p class="text-center">Oops, Something Went Wrong! Please Refresh the Page.</p>',
                    closeButton: false
            });
            setTimeout(function(){
                $('#del').text("Cancel");
                $('#del').removeAttr('disabled');
                dialog.modal('hide'); 
            }, 1500);            
          });
      };
      

  // Modal Details
      $scope.viewQuotationDetails = function(){
          $scope.viewDetails2=[];
          $('#view_icon').modal('show'); 
          // $("#printdetail").show().delay(5000).queue(function(n) {
          //   $(this).hide(); n();
          // });
          $http({
            method: 'GET',
            url: $rootScope.baseURL+'/quotation/details/'+$scope.quotation.qm_id,
            //data: $scope.data,
            headers: {'Content-Type': 'application/json',
                    'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
          })
          .success(function(obj)
          {   
              obj.forEach(function(value, key){
                $scope.viewDetails2.push(value);
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
          // $scope.viewMachineProductDetails(index);
      };
    // IMP $scope.viewDetails2
      $scope.viewQuotationDetails2 = function(index){
          $scope.viewDetails2=[];
          $scope.viewDetails=[];
          $scope.quotation = $scope.filteredTodos[index];
          // $scope.quotation = $scope.filteredTodos[index];
          $('#view_icon').modal('show'); 
          $http({
            method: 'GET',
            url: $rootScope.baseURL+'/quotation/details/list/group/'+$scope.filteredTodos[index].qm_id,
            //data: $scope.data,
            headers: {'Content-Type': 'application/json',
                    'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
          })
          .success(function(obj)
          {   
              obj.forEach(function(value, key){
                $scope.viewDetails.push(value);
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
        
      $scope.showdetails = function(){
          $scope.viewDetails=[];
          $scope.viewQuotationDetails();
      };
      

      $scope.viewPdf = function(objs){
        $scope.qpmimage = objs;
        $('#view-pdf').modal('show'); 
      };
      // $scope.viewMachineProductDetails = function(index){
          
         
      // };

      $scope.sendMail = function() {
        $('#send_mail').modal('show'); 
      };

      // $scope.sendMail = function(){
      //   var dialog = bootbox.dialog({
      //       title: 'Send Mail',
      //       message: '<p><i class="fa fa-spin fa-spinner fa-3x"></i> Loading...</p>'
      //   });
      //   dialog.init(function(){
      //       setTimeout(function(){
      //           dialog.find('.bootbox-body').html('<i class="fa fa-exclamation-triangle fa-3x"></i> UFF We Are Currently Working On This <br> Stay Tuned!');
      //       }, 1500);
      //   });

      // };

      //  "<style>@media print {.watermark {display: inline;position: fixed !important;opacity: 0.50;font-size: 100px;width: 100%;text-align: center;z-index: 1000;top:270px;right:5px;}}</style>" +
      // "<div class='watermark'>cancelled</p></div>" +
      $scope.printQ = function(){
          if($scope.quotation.qm_status == 0){
              var printContents = $('#content').html();
              var popupWin = window.open('', 'winname','directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,scrollbars=no,resizable=no, width=400,height=auto');
                 // popupWin.document.open();
              var page = "<html>" +
                    "<head>" +
                        "<link rel='stylesheet' href='./././bower_components/bootstrap/dist/css/bootstrap.min.css' />" +
                        "<style>.action{display:none;} .printQ-hide{display:none;} .printQshow{display:block;}</style>"+
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
                                "<td colspan='1'>To: <strong>"+$scope.quotation.cm_name+" ("+$scope.quotation.cm_address+")</strong></td>"+
                                "<td>Quotation No : <strong>"+$scope.quotation.qm_quotation_no+"</strong></td>" +
                                "<td>Date : <strong>"+$filter('date')($scope.quotation.qm_date,'mediumDate')+"</strong></td>" +
                              "</tr>" +
                              "<tr>" +
                                "<td>Date-Of-Email : <strong>"+$filter('date')($scope.quotation.qm_date_of_email,'mediumDate')+"</strong></td>" +
                                "<td>Reference : <strong>"+$scope.quotation.qm_ref+"</strong></td>" +
                                "<td>Attend By : <strong>"+$scope.quotation.qm_attend_by+"</strong></td>" +
                              "</tr>" +
                            "</table>" +
                            "<table class='table table-stripped table-bordered' style='font-size:10pt; page-break-after: always;'>" +
                                "<tr>" +
                                    " "+$('#content').html()+" " +
                                "</tr>" ;
                              if($scope.quotation.qm_discount == 0 && $scope.quotation.qm_transport == 0 && $scope.quotation.qm_other_charges == 0)
                              {
                                page = page + "<tr>" +
                                "<td colspan='3' rowspan='5'><strong>"
                                  +"<b>Terms & Conditions</b> <br>"+
                                  "1. Delivery: as per specific requirement. <br>"+
                                  "2. Taxes extra as applicable. <br>"+
                                  "3. Payment terms: 30 DAYS After Delivery. <br>"+
                                  "4. Packing Charges: NIL. <br>"+
                                  "5. <strong>TRANSPORT CHARGES TO BE BORN BY YOU.</strong>"+
                                  "</strong></td>" + 
                                  "<td colspan='2' align='right'><strong>Total Amount</strong></td>" +
                                  "<td colspan='2' align='right'><strong>"+$scope.quotation.qm_total_cost+"</strong></td>" +
                                //   "<td colspan='2' align='right'><strong>Net Amount</strong></td>" +
                                //   "<td  colspan='2'><strong>"+$scope.quotation.qm_net_cost+"</strong></td>" +
                                // "</tr>" +
                                // "<tr>" +
                                //   "<td colspan='2' align='right'><strong>CGST "+$scope.quotation.qm_cgst_per+"%</strong></td>" +
                                //   "<td colspan='2'><strong>"+$scope.quotation.qm_cgst_amount+"</strong></td>" +
                                // "</tr>" +
                                // "<tr>" +
                                //   "<td colspan='2' align='right'><strong>SGST "+$scope.quotation.qm_sgst_per+"%</strong></td>" +
                                //   "<td colspan='2'><strong>"+$scope.quotation.qm_sgst_amount+"</strong></td>" +
                                // "</tr>" +
                                // "<tr>" +
                                //   "<td colspan='2' align='right'><strong>IGST "+$scope.quotation.qm_igst_per+"%</strong></td>" +
                                //   "<td colspan='2'><strong>"+$scope.quotation.qm_igst_amount+"</strong></td>" +
                                // "</tr>" +
                                // "<tr>" +
                                //   "<td colspan='2' align='right'><strong>Total Amount</strong></td>" +
                                //   "<td colspan='2'><strong>"+$scope.quotation.qm_total_cost+"</strong></td>" +
                                "</tr>" ;
                              }
                              else if($scope.quotation.qm_discount == 0 && $scope.quotation.qm_transport == 0 && $scope.quotation.qm_other_charges != 0)
                              {
                                page = page + "<tr>" +
                                  "<td colspan='3' rowspan='5'><strong>"
                                  +"<b>Terms & Conditions</b> <br>"+
                                  "1. Delivery: as per specific requirement. <br>"+
                                  "2. Taxes extra as applicable. <br>"+
                                  "3. Payment terms: 30 DAYS After Delivery. <br>"+
                                  "4. Packing Charges: NIL. <br>"+
                                  "5. <strong>TRANSPORT CHARGES TO BE BORN BY YOU.</strong>"+
                                  "</strong></td>" +
                                  "<td colspan='2' align='right'><strong>Total Amount</strong></td>" +
                                  "<td colspan='2' align='right'><strong>"+$scope.quotation.qm_total_cost+"</strong></td>" + 
                                  // "<td colspan='2' align='right'><strong>Net Amount</strong></td>" +
                                  // "<td colspan='2'><strong>"+$scope.quotation.qm_net_cost+"</strong></td>" +
                                // "</tr>" +
                                // "<tr>" +
                                //   "<td colspan='2' align='right'><strong>CGST "+$scope.quotation.qm_cgst_per+"%</strong></td>" +
                                //   "<td colspan='2'><strong>"+$scope.quotation.qm_cgst_amount+"</strong></td>" +
                                // "</tr>" +
                                // "<tr>" +
                                //   "<td colspan='2' align='right'><strong>SGST "+$scope.quotation.qm_sgst_per+"%</strong></td>" +
                                //   "<td colspan='2'><strong>"+$scope.quotation.qm_sgst_amount+"</strong></td>" +
                                // "</tr>" +
                                // "<tr>" +
                                //   "<td colspan='3' align='right'><strong>IGST "+$scope.quotation.qm_igst_per+"%</strong></td>" +
                                //   "<td colspan='2'><strong>"+$scope.quotation.qm_igst_amount+"</strong></td>" +
                                // "</tr>" +
                                // "<tr>" +
                                //   "<td colspan='2' align='right'><strong>Other Charges</strong></td>" +
                                //   "<td colspan='2'><strong>"+$scope.quotation.qm_other_charges+"</strong></td>" +
                                // "</tr>" +
                                // "<tr>" +
                                //   "<td colspan='2' align='right'><strong>Total Amount</strong></td>" +
                                //   "<td colspan='2'><strong>"+$scope.quotation.qm_total_cost+"</strong></td>" +
                                "</tr>" ;
                              }
                              else if($scope.quotation.qm_discount == 0 && $scope.quotation.qm_transport != 0 && $scope.quotation.qm_other_charges != 0)
                              {
                                page = page + "<tr>" +
                                  "<td colspan='3' rowspan='5'><strong>"
                                  +"<b>Terms & Conditions</b> <br>"+
                                  "1. Delivery: as per specific requirement. <br>"+
                                  "2. Taxes extra as applicable. <br>"+
                                  "3. Payment terms: 30 DAYS After Delivery. <br>"+
                                  "4. Packing Charges: NIL. <br>"+
                                  "5. <strong>TRANSPORT CHARGES TO BE BORN BY YOU.</strong>"+
                                  "</strong></td>" + 
                                  "<td colspan='2' align='right'><strong>Total Amount</strong></td>" +
                                  "<td colspan='2' align='right'><strong>"+$scope.quotation.qm_total_cost+"</strong></td>" +
                                //   "<td colspan='2' align='right'><strong>Net Amount</strong></td>" +
                                //   "<td colspan='2'><strong>"+$scope.quotation.qm_net_cost+"</strong></td>" +
                                // "</tr>" +
                                // "<tr>" +
                                //   "<td colspan='2' align='right'><strong>CGST "+$scope.quotation.qm_cgst_per+"%</strong></td>" +
                                //   "<td colspan='2'><strong>"+$scope.quotation.qm_cgst_amount+"</strong></td>" +
                                // "</tr>" +
                                // "<tr>" +
                                //   "<td colspan='2' align='right'><strong>SGST "+$scope.quotation.qm_sgst_per+"%</strong></td>" +
                                //   "<td colspan='2'><strong>"+$scope.quotation.qm_sgst_amount+"</strong></td>" +
                                // "</tr>" +
                                // "<tr>" +
                                //   "<td colspan='2' align='right'><strong>IGST "+$scope.quotation.qm_igst_per+"%</strong></td>" +
                                //   "<td colspan='2'><strong>"+$scope.quotation.qm_igst_amount+"</strong></td>" +
                                // "</tr>" +
                                // "<tr>" +
                                //   "<td colspan='2' align='right'><strong>Transport</strong></td>" +
                                //   "<td colspan='2'><strong>"+$scope.quotation.qm_transport+"</strong></td>" +
                                // "</tr>" +
                                // "<tr>" +
                                //   "<td colspan='2' align='right'><strong>Other Charges</strong></td>" +
                                //   "<td colspan='2'><strong>"+$scope.quotation.qm_other_charges+"</strong></td>" +
                                // "</tr>" +
                                // "<tr>" +
                                //   "<td colspan='2' align='right'><strong>Total Amount</strong></td>" +
                                //   "<td colspan='2'><strong>"+$scope.quotation.qm_total_cost+"</strong></td>" +
                                "</tr>" ;
                              }
                              else if($scope.quotation.qm_discount != 0 && $scope.quotation.qm_transport != 0 && $scope.quotation.qm_other_charges != 0)
                              {
                                page = page + "<tr>" +
                                  "<td colspan='3' rowspan='5'><strong>"
                                  +"<b>Terms & Conditions</b> <br>"+
                                  "1. Delivery: as per specific requirement. <br>"+
                                  "2. Taxes extra as applicable. <br>"+
                                  "3. Payment terms: 30 DAYS After Delivery. <br>"+
                                  "4. Packing Charges: NIL. <br>"+
                                  "5. <strong>TRANSPORT CHARGES TO BE BORN BY YOU.</strong>"+
                                  "</strong></td>" + 
                                  "<td colspan='2' align='right'><strong>Total Amount</strong></td>" +
                                  "<td colspan='2' align='right'><strong>"+$scope.quotation.qm_total_cost+"</strong></td>" +
                                //   "<td colspan='2' align='right'><strong>Net Amount</strong></td>" +
                                //   "<td colspan='2'><strong>"+$scope.quotation.qm_net_cost+"</strong></td>" +
                                // "</tr>" +
                                // "<tr>" +
                                //   "<td colspan='2' align='right'><strong>CGST "+$scope.quotation.qm_cgst_per+"%</strong></td>" +
                                //   "<td colspan='2'><strong>"+$scope.quotation.qm_cgst_amount+"</strong></td>" +
                                // "</tr>" +
                                // "<tr>" +
                                //   "<td colspan='2' align='right'><strong>SGST "+$scope.quotation.qm_sgst_per+"%</strong></td>" +
                                //   "<td colspan='2'><strong>"+$scope.quotation.qm_sgst_amount+"</strong></td>" +
                                // "</tr>" +
                                // "<tr>" +
                                //   "<td colspan='2' align='right'><strong>IGST "+$scope.quotation.qm_igst_per+"%</strong></td>" +
                                //   "<td colspan='2'><strong>"+$scope.quotation.qm_igst_amount+"</strong></td>" +
                                // "</tr>" +
                                // "<tr>" +
                                //   "<td colspan='2' align='right'><strong>Transport (+)</strong></td>" +
                                //   "<td colspan='2'><strong>"+$scope.quotation.qm_transport+"</strong></td>" +
                                // "</tr>" +
                                // "<tr>" +
                                //   "<td colspan='2' align='right'><strong>Other Charges (+)</strong></td>" +
                                //   "<td colspan='2'><strong>"+$scope.quotation.qm_other_charges+"</strong></td>" +
                                // "</tr>" +
                                // "<tr>" +
                                //   "<td colspan='2' align='right'><strong>Discount (-)</strong></td>" +
                                //   "<td colspan='2'><strong>"+$scope.quotation.qm_discount+"</strong></td>" +
                                // "</tr>" +
                                // "<tr>" +
                                //   "<td colspan='2' align='right'><strong>Total Amount</strong></td>" +
                                //   "<td colspan='2'><strong>"+$scope.quotation.qm_total_cost+"</strong></td>" +
                                "</tr>" ;
                              }
                            page = page + "</table>" +
                        "</div>" +
                    "</body>" +
                    "</html>";
                    popupWin.document.write(page);
              popupWin.document.close();
              // popupWin.close();
          }
          else{
              var printContents = $('#content').html();
              var popupWin = window.open('', 'winname','directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,scrollbars=no,resizable=no, width=400,height=auto');
              // popupWin.document.open();
              var page = "<html>" +
                    "<head>" +
                        "<link rel='stylesheet' href='./././bower_components/bootstrap/dist/css/bootstrap.min.css' />" +
                        "<style>.action{display:none;} .printQ-hide{display:none;} .printQshow{display:block;}</style>"+
                        "<style>@media print {.watermark {display: inline;position: fixed !important;opacity: 0.35;font-size: 100px;width: 100%;text-align: center;z-index: 1000;top:270px;right:5px;}}</style>" +
                    "</head>" +
                    "<body onload='window.print()' style='font-size:11pt;'>" +
                      "<div class='watermark'>CANCELLED</p></div>" +
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
                                "<td colspan='2'>To: <strong>"+$scope.quotation.cm_name+" ("+$scope.quotation.cm_address+")</strong></td>"+
                                "<td>Quotation No : <strong>"+$scope.quotation.qm_quotation_no+"</strong></td>" +
                                "<td>Date : <strong>"+$filter('date')($scope.quotation.qm_date,'mediumDate')+"</strong></td>" +
                              "</tr>" +
                              "<tr>" +
                                "<td>Date-Of-Email : <strong>"+$filter('date')($scope.quotation.qm_date_of_email,'mediumDate')+"</strong></td>" +
                                "<td>Reference : <strong>"+$scope.quotation.qm_ref+"</strong></td>" +
                                "<td>Attend By : <strong>"+$scope.quotation.qm_attend_by+"</strong></td>" +
                              "</tr>" +
                            "</table>" +
                            "<table class='table table-stripped table-bordered' style='font-size:10pt; page-break-after: always;'>" +
                                "<tr>" +
                                    " "+$('#content').html()+" " +
                                "</tr>" ;
                              if($scope.quotation.qm_discount == 0 && $scope.quotation.qm_transport == 0 && $scope.quotation.qm_other_charges == 0)
                              {
                                page = page + "<tr>" +
                                "<td colspan='3' rowspan='5'><strong>"
                                  +"<b>Terms & Conditions</b> <br>"+
                                  "1. Delivery: as per specific requirement. <br>"+
                                  "2. Taxes extra as applicable. <br>"+
                                  "3. Payment terms: 30 DAYS After Delivery. <br>"+
                                  "4. Packing Charges: NIL. <br>"+
                                  "5. <strong>TRANSPORT CHARGES TO BE BORN BY YOU.</strong>"+
                                  "</strong></td>" + 
                                  "<td colspan='2' align='right'><strong>Total Amount</strong></td>" +
                                  "<td colspan='2' align='right'><strong>"+$scope.quotation.qm_total_cost+"</strong></td>" +
                                //   "<td colspan='2' align='right'><strong>Net Amount</strong></td>" +
                                //   "<td  colspan='2'><strong>"+$scope.quotation.qm_net_cost+"</strong></td>" +
                                // "</tr>" +
                                // "<tr>" +
                                //   "<td colspan='2' align='right'><strong>CGST "+$scope.quotation.qm_cgst_per+"%</strong></td>" +
                                //   "<td colspan='2'><strong>"+$scope.quotation.qm_cgst_amount+"</strong></td>" +
                                // "</tr>" +
                                // "<tr>" +
                                //   "<td colspan='2' align='right'><strong>SGST "+$scope.quotation.qm_sgst_per+"%</strong></td>" +
                                //   "<td colspan='2'><strong>"+$scope.quotation.qm_sgst_amount+"</strong></td>" +
                                // "</tr>" +
                                // "<tr>" +
                                //   "<td colspan='2' align='right'><strong>IGST "+$scope.quotation.qm_igst_per+"%</strong></td>" +
                                //   "<td colspan='2'><strong>"+$scope.quotation.qm_igst_amount+"</strong></td>" +
                                // "</tr>" +
                                // "<tr>" +
                                //   "<td colspan='2' align='right'><strong>Total Amount</strong></td>" +
                                //   "<td colspan='2'><strong>"+$scope.quotation.qm_total_cost+"</strong></td>" +
                                "</tr>" ;
                              }
                              else if($scope.quotation.qm_discount == 0 && $scope.quotation.qm_transport == 0 && $scope.quotation.qm_other_charges != 0)
                              {
                                page = page + "<tr>" +
                                  "<td colspan='3' rowspan='5'><strong>"
                                  +"<b>Terms & Conditions</b> <br>"+
                                  "1. Delivery: as per specific requirement. <br>"+
                                  "2. Taxes extra as applicable. <br>"+
                                  "3. Payment terms: 30 DAYS After Delivery. <br>"+
                                  "4. Packing Charges: NIL. <br>"+
                                  "5. <strong>TRANSPORT CHARGES TO BE BORN BY YOU.</strong>"+
                                  "</strong></td>" +
                                  "<td colspan='2' align='right'><strong>Total Amount</strong></td>" +
                                  "<td colspan='2' align='right'><strong>"+$scope.quotation.qm_total_cost+"</strong></td>" + 
                                  // "<td colspan='2' align='right'><strong>Net Amount</strong></td>" +
                                  // "<td colspan='2'><strong>"+$scope.quotation.qm_net_cost+"</strong></td>" +
                                // "</tr>" +
                                // "<tr>" +
                                //   "<td colspan='2' align='right'><strong>CGST "+$scope.quotation.qm_cgst_per+"%</strong></td>" +
                                //   "<td colspan='2'><strong>"+$scope.quotation.qm_cgst_amount+"</strong></td>" +
                                // "</tr>" +
                                // "<tr>" +
                                //   "<td colspan='2' align='right'><strong>SGST "+$scope.quotation.qm_sgst_per+"%</strong></td>" +
                                //   "<td colspan='2'><strong>"+$scope.quotation.qm_sgst_amount+"</strong></td>" +
                                // "</tr>" +
                                // "<tr>" +
                                //   "<td colspan='3' align='right'><strong>IGST "+$scope.quotation.qm_igst_per+"%</strong></td>" +
                                //   "<td colspan='2'><strong>"+$scope.quotation.qm_igst_amount+"</strong></td>" +
                                // "</tr>" +
                                // "<tr>" +
                                //   "<td colspan='2' align='right'><strong>Other Charges</strong></td>" +
                                //   "<td colspan='2'><strong>"+$scope.quotation.qm_other_charges+"</strong></td>" +
                                // "</tr>" +
                                // "<tr>" +
                                //   "<td colspan='2' align='right'><strong>Total Amount</strong></td>" +
                                //   "<td colspan='2'><strong>"+$scope.quotation.qm_total_cost+"</strong></td>" +
                                "</tr>" ;
                              }
                              else if($scope.quotation.qm_discount == 0 && $scope.quotation.qm_transport != 0 && $scope.quotation.qm_other_charges != 0)
                              {
                                page = page + "<tr>" +
                                  "<td colspan='3' rowspan='5'><strong>"
                                  +"<b>Terms & Conditions</b> <br>"+
                                  "1. Delivery: as per specific requirement. <br>"+
                                  "2. Taxes extra as applicable. <br>"+
                                  "3. Payment terms: 30 DAYS After Delivery. <br>"+
                                  "4. Packing Charges: NIL. <br>"+
                                  "5. <strong>TRANSPORT CHARGES TO BE BORN BY YOU.</strong>"+
                                  "</strong></td>" + 
                                  "<td colspan='2' align='right'><strong>Total Amount</strong></td>" +
                                  "<td colspan='2' align='right'><strong>"+$scope.quotation.qm_total_cost+"</strong></td>" +
                                //   "<td colspan='2' align='right'><strong>Net Amount</strong></td>" +
                                //   "<td colspan='2'><strong>"+$scope.quotation.qm_net_cost+"</strong></td>" +
                                // "</tr>" +
                                // "<tr>" +
                                //   "<td colspan='2' align='right'><strong>CGST "+$scope.quotation.qm_cgst_per+"%</strong></td>" +
                                //   "<td colspan='2'><strong>"+$scope.quotation.qm_cgst_amount+"</strong></td>" +
                                // "</tr>" +
                                // "<tr>" +
                                //   "<td colspan='2' align='right'><strong>SGST "+$scope.quotation.qm_sgst_per+"%</strong></td>" +
                                //   "<td colspan='2'><strong>"+$scope.quotation.qm_sgst_amount+"</strong></td>" +
                                // "</tr>" +
                                // "<tr>" +
                                //   "<td colspan='2' align='right'><strong>IGST "+$scope.quotation.qm_igst_per+"%</strong></td>" +
                                //   "<td colspan='2'><strong>"+$scope.quotation.qm_igst_amount+"</strong></td>" +
                                // "</tr>" +
                                // "<tr>" +
                                //   "<td colspan='2' align='right'><strong>Transport</strong></td>" +
                                //   "<td colspan='2'><strong>"+$scope.quotation.qm_transport+"</strong></td>" +
                                // "</tr>" +
                                // "<tr>" +
                                //   "<td colspan='2' align='right'><strong>Other Charges</strong></td>" +
                                //   "<td colspan='2'><strong>"+$scope.quotation.qm_other_charges+"</strong></td>" +
                                // "</tr>" +
                                // "<tr>" +
                                //   "<td colspan='2' align='right'><strong>Total Amount</strong></td>" +
                                //   "<td colspan='2'><strong>"+$scope.quotation.qm_total_cost+"</strong></td>" +
                                "</tr>" ;
                              }
                              else if($scope.quotation.qm_discount != 0 && $scope.quotation.qm_transport != 0 && $scope.quotation.qm_other_charges != 0)
                              {
                                page = page + "<tr>" +
                                  "<td colspan='3' rowspan='5'><strong>"
                                  +"<b>Terms & Conditions</b> <br>"+
                                  "1. Delivery: as per specific requirement. <br>"+
                                  "2. Taxes extra as applicable. <br>"+
                                  "3. Payment terms: 30 DAYS After Delivery. <br>"+
                                  "4. Packing Charges: NIL. <br>"+
                                  "5. <strong>TRANSPORT CHARGES TO BE BORN BY YOU.</strong>"+
                                  "</strong></td>" + 
                                  "<td colspan='2' align='right'><strong>Total Amount</strong></td>" +
                                  "<td colspan='2' align='right'><strong>"+$scope.quotation.qm_total_cost+"</strong></td>" +
                                //   "<td colspan='2' align='right'><strong>Net Amount</strong></td>" +
                                //   "<td colspan='2'><strong>"+$scope.quotation.qm_net_cost+"</strong></td>" +
                                // "</tr>" +
                                // "<tr>" +
                                //   "<td colspan='2' align='right'><strong>CGST "+$scope.quotation.qm_cgst_per+"%</strong></td>" +
                                //   "<td colspan='2'><strong>"+$scope.quotation.qm_cgst_amount+"</strong></td>" +
                                // "</tr>" +
                                // "<tr>" +
                                //   "<td colspan='2' align='right'><strong>SGST "+$scope.quotation.qm_sgst_per+"%</strong></td>" +
                                //   "<td colspan='2'><strong>"+$scope.quotation.qm_sgst_amount+"</strong></td>" +
                                // "</tr>" +
                                // "<tr>" +
                                //   "<td colspan='2' align='right'><strong>IGST "+$scope.quotation.qm_igst_per+"%</strong></td>" +
                                //   "<td colspan='2'><strong>"+$scope.quotation.qm_igst_amount+"</strong></td>" +
                                // "</tr>" +
                                // "<tr>" +
                                //   "<td colspan='2' align='right'><strong>Transport (+)</strong></td>" +
                                //   "<td colspan='2'><strong>"+$scope.quotation.qm_transport+"</strong></td>" +
                                // "</tr>" +
                                // "<tr>" +
                                //   "<td colspan='2' align='right'><strong>Other Charges (+)</strong></td>" +
                                //   "<td colspan='2'><strong>"+$scope.quotation.qm_other_charges+"</strong></td>" +
                                // "</tr>" +
                                // "<tr>" +
                                //   "<td colspan='2' align='right'><strong>Discount (-)</strong></td>" +
                                //   "<td colspan='2'><strong>"+$scope.quotation.qm_discount+"</strong></td>" +
                                // "</tr>" +
                                // "<tr>" +
                                //   "<td colspan='2' align='right'><strong>Total Amount</strong></td>" +
                                //   "<td colspan='2'><strong>"+$scope.quotation.qm_total_cost+"</strong></td>" +
                                "</tr>" ;
                              }
                            page = page + "</table>" +
                        "</div>" +
                    "</body>" +
                    "</html>";
                    popupWin.document.write(page);
              popupWin.document.close();
              // popupWin.close();
          }
      };  

      $scope.printDetails = function(){

          if($scope.quotation.qm_status == 0){
            var printContents = $('#content').html();
            var popupWin = window.open('', 'winname','directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,scrollbars=no,resizable=no, width=400,height=auto');
                // popupWin.document.open();
            var page = "<html>" +
                    "<head>" +
                        "<link rel='stylesheet' href='./././bower_components/bootstrap/dist/css/bootstrap.min.css' />" +
                        "<style>.action{display:none;} .print-hide{display:none;} .printshow{display:block;} width:100%;</style>"+
                            "<style type='text/css' media='print'>" +
                              " @page " +
                               " {" +
                                  "  size:  A4 landscape;" +
                                  "  margin: 5mm 5mm 5mm 5mm;" +
                                "}" +

                                "body" +
                                "{" +
                                  "zoom:60%;"+
                                "}" +
                            "</style>" +
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
                                "<td colspan='1'>To: <strong>"+$scope.quotation.cm_name+" ("+$scope.quotation.cm_address+")</strong></td>"+
                                "<td>Quotation No : <strong>"+$scope.quotation.qm_quotation_no+"</strong></td>" +
                                "<td>Date : <strong>"+$filter('date')($scope.quotation.qm_date,'mediumDate')+"</strong></td>" +
                              "</tr>" +
                              "<tr>" +
                                "<td>Date-Of-Email : <strong>"+$filter('date')($scope.quotation.qm_date_of_email,'mediumDate')+"</strong></td>" +
                                "<td>Reference : <strong>"+$scope.quotation.qm_ref+"</strong></td>" +
                                "<td>Attend By : <strong>"+$scope.quotation.qm_attend_by+"</strong></td>" +
                              "</tr>" +
                            "</table>" +
                            "<table class='table table-stripped table-bordered' style='font-size:10pt; page-break-after: always;'>" +
                                "<tr>" +
                                    " "+$('#content').html()+" " +
                                "</tr>" ;
                              if($scope.quotation.qm_discount == 0 && $scope.quotation.qm_transport == 0 && $scope.quotation.qm_other_charges == 0)
                              {
                                page = page + "<tr>" +
                                  "<td colspan='34' rowspan='5'><strong>"
                                  +"<b>Terms & Conditions</b> <br>"+
                                  "1. Delivery: as per specific requirement. <br>"+
                                  "2. Taxes extra as applicable. <br>"+
                                  "3. Payment terms: 30 DAYS After Delivery. <br>"+
                                  "4. Packing Charges: NIL. <br>"+
                                  "5. <strong>TRANSPORT CHARGES TO BE BORN BY YOU.</strong>"+
                                  "</strong></td>" + 
                                  "<td colspan='4' align='right'><strong>Total Amount</strong></td>" +
                                  "<td colspan='3' align='right'><strong>"+$scope.quotation.qm_total_cost+"</strong></td>" +
                                //   "<td colspan='4' align='right'><strong>Net Amount</strong></td>" +
                                //   "<td colspan='3'><strong>"+$scope.quotation.qm_net_cost+"</strong></td>" +
                                // "</tr>" +
                                // "<tr>" +
                                //   "<td colspan='4' align='right'><strong>CGST "+$scope.quotation.qm_cgst_per+"%</strong></td>" +
                                //   "<td colspan='3'><strong>"+$scope.quotation.qm_cgst_amount+"</strong></td>" +
                                // "</tr>" +
                                // "<tr>" +
                                //   "<td colspan='4' align='right'><strong>SGST "+$scope.quotation.qm_sgst_per+"%</strong></td>" +
                                //   "<td colspan='3'><strong>"+$scope.quotation.qm_sgst_amount+"</strong></td>" +
                                // "</tr>" +
                                // "<tr>" +
                                //   "<td colspan='4' align='right'><strong>IGST "+$scope.quotation.qm_igst_per+"%</strong></td>" +
                                //   "<td colspan='3'><strong>"+$scope.quotation.qm_igst_amount+"</strong></td>" +
                                // "</tr>" +
                                // "<tr>" +
                                //   "<td colspan='4' align='right'><strong>Total Amount</strong></td>" +
                                //   "<td colspan='3'><strong>"+$scope.quotation.qm_total_cost+"</strong></td>" +
                                "</tr>" ;
                              }
                              else if($scope.quotation.qm_discount == 0 && $scope.quotation.qm_transport == 0 && $scope.quotation.qm_other_charges != 0)
                              {
                                page = page + "<tr>" +
                                  "<td colspan='34' rowspan='5'><strong>"
                                  +"<b>Terms & Conditions</b> <br>"+
                                  "1. Delivery: as per specific requirement. <br>"+
                                  "2. Taxes extra as applicable. <br>"+
                                  "3. Payment terms: 30 DAYS After Delivery. <br>"+
                                  "4. Packing Charges: NIL. <br>"+
                                  "5. <strong>TRANSPORT CHARGES TO BE BORN BY YOU.</strong>"+
                                  "</strong></td>" + 
                                  "<td colspan='4' align='right'><strong>Total Amount</strong></td>" +
                                  "<td colspan='3' align='right'><strong>"+$scope.quotation.qm_total_cost+"</strong></td>" +
                                //   "<td colspan='4' align='right'><strong>Net Amount</strong></td>" +
                                //   "<td colspan='3'><strong>"+$scope.quotation.qm_net_cost+"</strong></td>" +
                                // "</tr>" +
                                // "<tr>" +
                                //   "<td colspan='4' align='right'><strong>CGST "+$scope.quotation.qm_cgst_per+"%</strong></td>" +
                                //   "<td colspan='3'><strong>"+$scope.quotation.qm_cgst_amount+"</strong></td>" +
                                // "</tr>" +
                                // "<tr>" +
                                //   "<td colspan='4' align='right'><strong>SGST "+$scope.quotation.qm_sgst_per+"%</strong></td>" +
                                //   "<td colspan='3'><strong>"+$scope.quotation.qm_sgst_amount+"</strong></td>" +
                                // "</tr>" +
                                // "<tr>" +
                                //   "<td colspan='4' align='right'><strong>IGST "+$scope.quotation.qm_igst_per+"%</strong></td>" +
                                //   "<td colspan='3'><strong>"+$scope.quotation.qm_igst_amount+"</strong></td>" +
                                // "</tr>" +
                                // "<tr>" +
                                //   "<td colspan='4' align='right'><strong>Other Charges</strong></td>" +
                                //   "<td colspan='3'><strong>"+$scope.quotation.qm_other_charges+"</strong></td>" +
                                // "</tr>" +
                                // "<tr>" +
                                //   "<td colspan='4' align='right'><strong>Total Amount</strong></td>" +
                                //   "<td colspan='3'><strong>"+$scope.quotation.qm_total_cost+"</strong></td>" +
                                "</tr>" ;
                              }
                              else if($scope.quotation.qm_discount == 0 && $scope.quotation.qm_transport != 0 && $scope.quotation.qm_other_charges != 0)
                              {
                                page = page + "<tr>" +
                                  "<td colspan='34' rowspan='5'><strong>"
                                  +"<b>Terms & Conditions</b> <br>"+
                                  "1. Delivery: as per specific requirement. <br>"+
                                  "2. Taxes extra as applicable. <br>"+
                                  "3. Payment terms: 30 DAYS After Delivery. <br>"+
                                  "4. Packing Charges: NIL. <br>"+
                                  "5. <strong>TRANSPORT CHARGES TO BE BORN BY YOU.</strong>"+
                                  "</strong></td>" + 
                                  "<td colspan='4' align='right'><strong>Total Amount</strong></td>" +
                                  "<td colspan='3' align='right'><strong>"+$scope.quotation.qm_total_cost+"</strong></td>" +
                                //   "<td colspan='4' align='right'><strong>Net Amount</strong></td>" +
                                //   "<td><strong>"+$scope.quotation.qm_net_cost+"</strong></td>" +
                                // "</tr>" +
                                // "<tr>" +
                                //   "<td colspan='4' align='right'><strong>CGST "+$scope.quotation.qm_cgst_per+"%</strong></td>" +
                                //   "<td colspan='3'><strong>"+$scope.quotation.qm_cgst_amount+"</strong></td>" +
                                // "</tr>" +
                                // "<tr>" +
                                //   "<td colspan='4' align='right'><strong>SGST "+$scope.quotation.qm_sgst_per+"%</strong></td>" +
                                //   "<td colspan='3'><strong>"+$scope.quotation.qm_sgst_amount+"</strong></td>" +
                                // "</tr>" +
                                // "<tr>" +
                                //   "<td colspan='4' align='right'><strong>IGST "+$scope.quotation.qm_igst_per+"%</strong></td>" +
                                //   "<td colspan='3'><strong>"+$scope.quotation.qm_igst_amount+"</strong></td>" +
                                // "</tr>" +
                                // "<tr>" +
                                //   "<td colspan='4' align='right'><strong>Transport</strong></td>" +
                                //   "<td colspan='3'><strong>"+$scope.quotation.qm_transport+"</strong></td>" +
                                // "</tr>" +
                                // "<tr>" +
                                //   "<td colspan='4' align='right'><strong>Other Charges</strong></td>" +
                                //   "<td colspan='3'><strong>"+$scope.quotation.qm_other_charges+"</strong></td>" +
                                // "</tr>" +
                                // "<tr>" +
                                //   "<td colspan='4' align='right'><strong>Total Amount</strong></td>" +
                                //   "<td colspan='3'><strong>"+$scope.quotation.qm_total_cost+"</strong></td>" +
                                "</tr>" ;
                              }
                              else if($scope.quotation.qm_discount != 0 && $scope.quotation.qm_transport != 0 && $scope.quotation.qm_other_charges != 0)
                              {
                                page = page + "<tr>" +
                                  "<td colspan='34' rowspan='5'><strong>"
                                  +"<b>Terms & Conditions</b> <br>"+
                                  "1. Delivery: as per specific requirement. <br>"+
                                  "2. Taxes extra as applicable. <br>"+
                                  "3. Payment terms: 30 DAYS After Delivery. <br>"+
                                  "4. Packing Charges: NIL. <br>"+
                                  "5. <strong>TRANSPORT CHARGES TO BE BORN BY YOU.</strong>"+
                                  "</strong></td>" + 
                                  "<td colspan='4' align='right'><strong>Total Amount</strong></td>" +
                                  "<td colspan='3' align='right'><strong>"+$scope.quotation.qm_total_cost+"</strong></td>" +
                                //   "<td colspan='4' align='right'><strong>Net Amount</strong></td>" +
                                //   "<td colspan='3'><strong>"+$scope.quotation.qm_net_cost+"</strong></td>" +
                                // "</tr>" +
                                // "<tr>" +
                                //   "<td colspan='4' align='right'><strong>CGST "+$scope.quotation.qm_cgst_per+"%</strong></td>" +
                                //   "<td colspan='3'><strong>"+$scope.quotation.qm_cgst_amount+"</strong></td>" +
                                // "</tr>" +
                                // "<tr>" +
                                //   "<td colspan='4' align='right'><strong>SGST "+$scope.quotation.qm_sgst_per+"%</strong></td>" +
                                //   "<td colspan='3'><strong>"+$scope.quotation.qm_sgst_amount+"</strong></td>" +
                                // "</tr>" +
                                // "<tr>" +
                                //   "<td colspan='4' align='right'><strong>IGST "+$scope.quotation.qm_igst_per+"%</strong></td>" +
                                //   "<td colspan='3'><strong>"+$scope.quotation.qm_igst_amount+"</strong></td>" +
                                // "</tr>" +
                                // "<tr>" +
                                //   "<td colspan='4' align='right'><strong>Transport (+)</strong></td>" +
                                //   "<td colspan='3'><strong>"+$scope.quotation.qm_transport+"</strong></td>" +
                                // "</tr>" +
                                // "<tr>" +
                                //   "<td colspan='4' align='right'><strong>Other Charges (+)</strong></td>" +
                                //   "<td colspan='3'><strong>"+$scope.quotation.qm_other_charges+"</strong></td>" +
                                // "</tr>" +
                                // "<tr>" +
                                //   "<td colspan='4' align='right'><strong>Discount (-)</strong></td>" +
                                //   "<td colspan='3'><strong>"+$scope.quotation.qm_discount+"</strong></td>" +
                                // "</tr>" +
                                // "<tr>" +
                                //   "<td colspan='4' align='right'><strong>Total Amount</strong></td>" +
                                //   "<td colspan='3'><strong>"+$scope.quotation.qm_total_cost+"</strong></td>" +
                                "</tr>" ;
                              }
                            page = page + "</table>" +
                        "</div>" +
                    "</body>" +
                    "</html>";
                    popupWin.document.write(page);
              popupWin.document.close();
               // popupWin.close();
          }

          else{
              var printContents = $('#content').html();
              var popupWin = window.open('', 'winname','directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,scrollbars=no,resizable=no, width=400,height=auto');
               // popupWin.document.open();
              var page = "<html>" +
                    "<head>" +
                        "<link rel='stylesheet' href='./././bower_components/bootstrap/dist/css/bootstrap.min.css' />" +
                        "<style>.action{display:none;} .print-hide{display:none;} .printshow{display:block;} width:100%;</style>"+
                        "<style>@media print {.watermark {display: inline;position: fixed !important;opacity: 0.35;font-size: 100px;width: 100%;text-align: center;z-index: 1000;top:270px;right:5px;}}</style>" +
                        "<style type='text/css' media='print'>" +
                              " @page " +
                               " {" +
                                "    size:  A4 landscape;" +
                                "}" +

                                "body" +
                                "{" +
                                  "zoom:60%;"+
                                "}" +
                            "</style>" +
                    "</head>" +
                    "<body onload='window.print()' style='font-size:11pt;'>" +
                      "<div class='watermark'>CANCELLED</p></div>" +
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
                                "<td colspan='1'>To: <strong>"+$scope.quotation.cm_name+" ("+$scope.quotation.cm_address+")</strong></td>"+
                                "<td>Quotation No : <strong>"+$scope.quotation.qm_quotation_no+"</strong></td>" +
                                "<td>Date : <strong>"+$filter('date')($scope.quotation.qm_date,'mediumDate')+"</strong></td>" +
                              "</tr>" +
                              "<tr>" +
                                "<td>Date-Of-Email : <strong>"+$filter('date')($scope.quotation.qm_date_of_email,'mediumDate')+"</strong></td>" +
                                "<td>Reference : <strong>"+$scope.quotation.qm_ref+"</strong></td>" +
                                "<td>Attend By : <strong>"+$scope.quotation.qm_attend_by+"</strong></td>" +
                              "</tr>" +
                            "</table>" +
                            "<table class='table table-stripped table-bordered' style='font-size:10pt; page-break-after: always;'>" +
                                "<tr>" +
                                    " "+$('#content').html()+" " +
                                "</tr>" ;
                              if($scope.quotation.qm_discount == 0 && $scope.quotation.qm_transport == 0 && $scope.quotation.qm_other_charges == 0)
                              {
                                page = page + "<tr>" +
                                  "<td colspan='34' rowspan='5'><strong>"
                                  +"<b>Terms & Conditions</b> <br>"+
                                  "1. Delivery: as per specific requirement. <br>"+
                                  "2. Taxes extra as applicable. <br>"+
                                  "3. Payment terms: 30 DAYS After Delivery. <br>"+
                                  "4. Packing Charges: NIL. <br>"+
                                  "5. <strong>TRANSPORT CHARGES TO BE BORN BY YOU.</strong>"+
                                  "</strong></td>" + 
                                  "<td colspan='4' align='right'><strong>Total Amount</strong></td>" +
                                  "<td colspan='3' align='right'><strong>"+$scope.quotation.qm_total_cost+"</strong></td>" +
                                //   "<td colspan='4' align='right'><strong>Net Amount</strong></td>" +
                                //   "<td colspan='3'><strong>"+$scope.quotation.qm_net_cost+"</strong></td>" +
                                // "</tr>" +
                                // "<tr>" +
                                //   "<td colspan='4' align='right'><strong>CGST "+$scope.quotation.qm_cgst_per+"%</strong></td>" +
                                //   "<td colspan='3'><strong>"+$scope.quotation.qm_cgst_amount+"</strong></td>" +
                                // "</tr>" +
                                // "<tr>" +
                                //   "<td colspan='4' align='right'><strong>SGST "+$scope.quotation.qm_sgst_per+"%</strong></td>" +
                                //   "<td colspan='3'><strong>"+$scope.quotation.qm_sgst_amount+"</strong></td>" +
                                // "</tr>" +
                                // "<tr>" +
                                //   "<td colspan='4' align='right'><strong>IGST "+$scope.quotation.qm_igst_per+"%</strong></td>" +
                                //   "<td colspan='3'><strong>"+$scope.quotation.qm_igst_amount+"</strong></td>" +
                                // "</tr>" +
                                // "<tr>" +
                                //   "<td colspan='4' align='right'><strong>Total Amount</strong></td>" +
                                //   "<td colspan='3'><strong>"+$scope.quotation.qm_total_cost+"</strong></td>" +
                                "</tr>" ;
                              }
                              else if($scope.quotation.qm_discount == 0 && $scope.quotation.qm_transport == 0 && $scope.quotation.qm_other_charges != 0)
                              {
                                page = page + "<tr>" +
                                  "<td colspan='34' rowspan='5'><strong>"
                                  +"<b>Terms & Conditions</b> <br>"+
                                  "1. Delivery: as per specific requirement. <br>"+
                                  "2. Taxes extra as applicable. <br>"+
                                  "3. Payment terms: 30 DAYS After Delivery. <br>"+
                                  "4. Packing Charges: NIL. <br>"+
                                  "5. <strong>TRANSPORT CHARGES TO BE BORN BY YOU.</strong>"+
                                  "</strong></td>" + 
                                  "<td colspan='4' align='right'><strong>Total Amount</strong></td>" +
                                  "<td colspan='3' align='right'><strong>"+$scope.quotation.qm_total_cost+"</strong></td>" +
                                //   "<td colspan='4' align='right'><strong>Net Amount</strong></td>" +
                                //   "<td colspan='3'><strong>"+$scope.quotation.qm_net_cost+"</strong></td>" +
                                // "</tr>" +
                                // "<tr>" +
                                //   "<td colspan='4' align='right'><strong>CGST "+$scope.quotation.qm_cgst_per+"%</strong></td>" +
                                //   "<td colspan='3'><strong>"+$scope.quotation.qm_cgst_amount+"</strong></td>" +
                                // "</tr>" +
                                // "<tr>" +
                                //   "<td colspan='4' align='right'><strong>SGST "+$scope.quotation.qm_sgst_per+"%</strong></td>" +
                                //   "<td colspan='3'><strong>"+$scope.quotation.qm_sgst_amount+"</strong></td>" +
                                // "</tr>" +
                                // "<tr>" +
                                //   "<td colspan='4' align='right'><strong>IGST "+$scope.quotation.qm_igst_per+"%</strong></td>" +
                                //   "<td colspan='3'><strong>"+$scope.quotation.qm_igst_amount+"</strong></td>" +
                                // "</tr>" +
                                // "<tr>" +
                                //   "<td colspan='4' align='right'><strong>Other Charges</strong></td>" +
                                //   "<td colspan='3'><strong>"+$scope.quotation.qm_other_charges+"</strong></td>" +
                                // "</tr>" +
                                // "<tr>" +
                                //   "<td colspan='4' align='right'><strong>Total Amount</strong></td>" +
                                //   "<td colspan='3'><strong>"+$scope.quotation.qm_total_cost+"</strong></td>" +
                                "</tr>" ;
                              }
                              else if($scope.quotation.qm_discount == 0 && $scope.quotation.qm_transport != 0 && $scope.quotation.qm_other_charges != 0)
                              {
                                page = page + "<tr>" +
                                  "<td colspan='34' rowspan='5'><strong>"
                                  +"<b>Terms & Conditions</b> <br>"+
                                  "1. Delivery: as per specific requirement. <br>"+
                                  "2. Taxes extra as applicable. <br>"+
                                  "3. Payment terms: 30 DAYS After Delivery. <br>"+
                                  "4. Packing Charges: NIL. <br>"+
                                  "5. <strong>TRANSPORT CHARGES TO BE BORN BY YOU.</strong>"+
                                  "</strong></td>" + 
                                  "<td colspan='4' align='right'><strong>Total Amount</strong></td>" +
                                  "<td colspan='3' align='right'><strong>"+$scope.quotation.qm_total_cost+"</strong></td>" +
                                //   "<td colspan='4' align='right'><strong>Net Amount</strong></td>" +
                                //   "<td><strong>"+$scope.quotation.qm_net_cost+"</strong></td>" +
                                // "</tr>" +
                                // "<tr>" +
                                //   "<td colspan='4' align='right'><strong>CGST "+$scope.quotation.qm_cgst_per+"%</strong></td>" +
                                //   "<td colspan='3'><strong>"+$scope.quotation.qm_cgst_amount+"</strong></td>" +
                                // "</tr>" +
                                // "<tr>" +
                                //   "<td colspan='4' align='right'><strong>SGST "+$scope.quotation.qm_sgst_per+"%</strong></td>" +
                                //   "<td colspan='3'><strong>"+$scope.quotation.qm_sgst_amount+"</strong></td>" +
                                // "</tr>" +
                                // "<tr>" +
                                //   "<td colspan='4' align='right'><strong>IGST "+$scope.quotation.qm_igst_per+"%</strong></td>" +
                                //   "<td colspan='3'><strong>"+$scope.quotation.qm_igst_amount+"</strong></td>" +
                                // "</tr>" +
                                // "<tr>" +
                                //   "<td colspan='4' align='right'><strong>Transport</strong></td>" +
                                //   "<td colspan='3'><strong>"+$scope.quotation.qm_transport+"</strong></td>" +
                                // "</tr>" +
                                // "<tr>" +
                                //   "<td colspan='4' align='right'><strong>Other Charges</strong></td>" +
                                //   "<td colspan='3'><strong>"+$scope.quotation.qm_other_charges+"</strong></td>" +
                                // "</tr>" +
                                // "<tr>" +
                                //   "<td colspan='4' align='right'><strong>Total Amount</strong></td>" +
                                //   "<td colspan='3'><strong>"+$scope.quotation.qm_total_cost+"</strong></td>" +
                                "</tr>" ;
                              }
                              else if($scope.quotation.qm_discount != 0 && $scope.quotation.qm_transport != 0 && $scope.quotation.qm_other_charges != 0)
                              {
                                page = page + "<tr>" +
                                  "<td colspan='34' rowspan='5'><strong>"
                                  +"<b>Terms & Conditions</b> <br>"+
                                  "1. Delivery: as per specific requirement. <br>"+
                                  "2. Taxes extra as applicable. <br>"+
                                  "3. Payment terms: 30 DAYS After Delivery. <br>"+
                                  "4. Packing Charges: NIL. <br>"+
                                  "5. <strong>TRANSPORT CHARGES TO BE BORN BY YOU.</strong>"+
                                  "</strong></td>" + 
                                  "<td colspan='4' align='right'><strong>Total Amount</strong></td>" +
                                  "<td colspan='3' align='right'><strong>"+$scope.quotation.qm_total_cost+"</strong></td>" +
                                //   "<td colspan='4' align='right'><strong>Net Amount</strong></td>" +
                                //   "<td colspan='3'><strong>"+$scope.quotation.qm_net_cost+"</strong></td>" +
                                // "</tr>" +
                                // "<tr>" +
                                //   "<td colspan='4' align='right'><strong>CGST "+$scope.quotation.qm_cgst_per+"%</strong></td>" +
                                //   "<td colspan='3'><strong>"+$scope.quotation.qm_cgst_amount+"</strong></td>" +
                                // "</tr>" +
                                // "<tr>" +
                                //   "<td colspan='4' align='right'><strong>SGST "+$scope.quotation.qm_sgst_per+"%</strong></td>" +
                                //   "<td colspan='3'><strong>"+$scope.quotation.qm_sgst_amount+"</strong></td>" +
                                // "</tr>" +
                                // "<tr>" +
                                //   "<td colspan='4' align='right'><strong>IGST "+$scope.quotation.qm_igst_per+"%</strong></td>" +
                                //   "<td colspan='3'><strong>"+$scope.quotation.qm_igst_amount+"</strong></td>" +
                                // "</tr>" +
                                // "<tr>" +
                                //   "<td colspan='4' align='right'><strong>Transport (+)</strong></td>" +
                                //   "<td colspan='3'><strong>"+$scope.quotation.qm_transport+"</strong></td>" +
                                // "</tr>" +
                                // "<tr>" +
                                //   "<td colspan='4' align='right'><strong>Other Charges (+)</strong></td>" +
                                //   "<td colspan='3'><strong>"+$scope.quotation.qm_other_charges+"</strong></td>" +
                                // "</tr>" +
                                // "<tr>" +
                                //   "<td colspan='4' align='right'><strong>Discount (-)</strong></td>" +
                                //   "<td colspan='3'><strong>"+$scope.quotation.qm_discount+"</strong></td>" +
                                // "</tr>" +
                                // "<tr>" +
                                //   "<td colspan='4' align='right'><strong>Total Amount</strong></td>" +
                                //   "<td colspan='3'><strong>"+$scope.quotation.qm_total_cost+"</strong></td>" +
                                "</tr>" ;
                              }
                            page = page + "</table>" +
                        "</div>" +
                    "</body>" +
                    "</html>";
                    popupWin.document.write(page);
              popupWin.document.close();
              // popupWin.close();
          }
      };  

});