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

      $scope.aprroveQuotation = function(qm_id) {
        $('#approve').modal('show'); 
          $scope.app_qm_id=qm_id;
      }

      $scope.disaprroveQuotation = function(qm_id) {
        $('#disapprove').modal('show'); 
          $scope.disapp_qm_id=qm_id;
      }

      $scope.approveConfirm = function() {
          $http({
              method: 'POST',
              url: $rootScope.baseURL+'/quotation/isapprove/'+$scope.app_qm_id,
              headers: {'Content-Type': 'application/json',
                        'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
          })
          .success(function(quotationObj)
          { 
                var dialog = bootbox.dialog({
                    message: '<p class="text-center">Quotation Approved.</p>',
                        closeButton: false
                });
                setTimeout(function(){
                    $('#approved').text("Approve");               
                    $('#disapproved').text("Dis-Approve");
                    $('#approved').removeAttr('disabled');     
                    $('#disapproved').removeAttr('disabled');
                    $scope.quotationList = [];
                    $scope.getAll();
                    dialog.modal('hide'); 
                }, 1500); 
                $('#approve').modal('hide');
              // $(this).toggleClass('fa-thumbs-up fa-thumbs-down');
          })
          .error(function(data) 
          {   
            var dialog = bootbox.dialog({
                message: '<p class="text-center">Oops, Something Went Wrong! Please Refresh the Page.</p>',
                    closeButton: false
            });
            setTimeout(function(){
                $('#app').text("Approve");
                $('#app').removeAttr('disabled');
                dialog.modal('hide'); 
            }, 1500);            
          });
      }
      $scope.disapproveConfirm = function() {
          $http({
              method: 'POST',
              url: $rootScope.baseURL+'/quotation/disapprove/'+$scope.disapp_qm_id,
              headers: {'Content-Type': 'application/json',
                        'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
          })
          .success(function(quotationObj)
          { 
              // $('#disapp').text("Disapprove");
              // $('#disapp').removeAttr('disabled');
              // $scope.quotationList = [];
              // $scope.getAll();
              // $('#disapprove').modal('hide');

              var dialog = bootbox.dialog({
                    message: '<p class="text-center">Quotation Dis-Approved.</p>',
                        closeButton: false
                });
                setTimeout(function(){
                    $('#approved').text("Approve");               
                    $('#disapproved').text("Dis-Approve");
                    $('#approved').removeAttr('disabled');     
                    $('#disapproved').removeAttr('disabled');
                    $scope.quotationList = [];
                    $scope.getAll();
                    dialog.modal('hide'); 
                }, 1500); 
                $('#disapprove').modal('hide');
          })
          .error(function(data) 
          {   
            var dialog = bootbox.dialog({
                message: '<p class="text-center">Oops, Something Went Wrong! Please Refresh the Page.</p>',
                    closeButton: false
            });
            setTimeout(function(){
                $('#disapp').text("Disapprove");
                $('#disapp').removeAttr('disabled');
                dialog.modal('hide'); 
            }, 1500);            
          });
      }

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
      $scope.viewQuotationDetails = function(index){
          $scope.viewDetails=[];
          $scope.quotation = $scope.filteredTodos[index];
          $('#view_icon').modal('show'); 
          // $("#printdetail").show().delay(5000).queue(function(n) {
          //   $(this).hide(); n();
          // });

          $http({
            method: 'GET',
            url: $rootScope.baseURL+'/quotation/details/'+$scope.filteredTodos[index].qm_id,
            //data: $scope.data,
            headers: {'Content-Type': 'application/json',
                    'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
          })
          .success(function(obj)
          {   
              obj.forEach(function(value, key){
                $scope.viewDetails.push(value);
              });
          //     obj.forEach(function(value, key){
          //         value.borings=[];
          //         value.drilling=[];
          //         value.taping=[];
          //       // boring  
          //           $http({
          //               method: 'GET',
          //               url: $rootScope.baseURL+'/quotation/details/machine/boring/'+value.qpm_id,
          //               //data: $scope.data,
          //               headers: {'Content-Type': 'application/json',
          //                       'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
          //             })
          //         .success(function(obj1)
          //         {   

          //         $scope.viewDetails.push(value);
          //             obj1.forEach(function(value1, key1){
          //               // value.qpmm_mm_search=value.mm_name+" "+value.mm_price;
                        
          //               value.borings.push(value1);
                        
          //             });
                                             
          //         })
          //         .error(function(data) 
          //         {   
          //             var dialog = bootbox.dialog({
          //               message: '<p class="text-center">Oops, Something Went Wrong! Please Refresh the Page.</p>',
          //                   closeButton: false
          //           });
          //           setTimeout(function(){
          //               dialog.modal('hide'); 
          //           }, 1500);  
          //         });
          //     // drilling
          //         $http({
          //               method: 'GET',
          //               url: $rootScope.baseURL+'/quotation/details/machine/drilling/'+value.qpm_id,
          //               //data: $scope.data,
          //               headers: {'Content-Type': 'application/json',
          //                       'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
          //             })
          //         .success(function(obj1)
          //         {   

                                             
          //         })
          //         .error(function(data) 
          //         {   
          //             var dialog = bootbox.dialog({
          //               message: '<p class="text-center">Oops, Something Went Wrong! Please Refresh the Page.</p>',
          //                   closeButton: false
          //           });
          //           setTimeout(function(){
          //               dialog.modal('hide'); 
          //           }, 1500);  
          //         });
          //     // taping
          //         $http({
          //               method: 'GET',
          //               url: $rootScope.baseURL+'/quotation/details/machine/taping/'+value.qpm_id,
          //               //data: $scope.data,
          //               headers: {'Content-Type': 'application/json',
          //                       'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
          //             })
          //         .success(function(obj1)
          //         {   

                        
          //         })
          //         .error(function(data) 
          //         {   
          //             var dialog = bootbox.dialog({
          //               message: '<p class="text-center">Oops, Something Went Wrong! Please Refresh the Page.</p>',
          //                   closeButton: false
          //           });
          //           setTimeout(function(){
          //               dialog.modal('hide'); 
          //           }, 1500);  
          //         });

          // });
              

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
    
      // $scope.viewMachineProductDetails = function(index){
          
         
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

                                  "<td colspan='2' align='right'><strong>Net Amount</strong></td>" +
                                  "<td  colspan='2'><strong>"+$scope.quotation.qm_net_cost+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='2' align='right'><strong>CGST "+$scope.quotation.qm_cgst_per+"%</strong></td>" +
                                  "<td colspan='2'><strong>"+$scope.quotation.qm_cgst_amount+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='2' align='right'><strong>SGST "+$scope.quotation.qm_sgst_per+"%</strong></td>" +
                                  "<td colspan='2'><strong>"+$scope.quotation.qm_sgst_amount+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='2' align='right'><strong>IGST "+$scope.quotation.qm_igst_per+"%</strong></td>" +
                                  "<td colspan='2'><strong>"+$scope.quotation.qm_igst_amount+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='2' align='right'><strong>Total Amount</strong></td>" +
                                  "<td colspan='2'><strong>"+$scope.quotation.qm_total_cost+"</strong></td>" +
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
                                  "<td colspan='2' align='right'><strong>Net Amount</strong></td>" +
                                  "<td colspan='2'><strong>"+$scope.quotation.qm_net_cost+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='2' align='right'><strong>CGST "+$scope.quotation.qm_cgst_per+"%</strong></td>" +
                                  "<td colspan='2'><strong>"+$scope.quotation.qm_cgst_amount+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='2' align='right'><strong>SGST "+$scope.quotation.qm_sgst_per+"%</strong></td>" +
                                  "<td colspan='2'><strong>"+$scope.quotation.qm_sgst_amount+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='3' align='right'><strong>IGST "+$scope.quotation.qm_igst_per+"%</strong></td>" +
                                  "<td colspan='2'><strong>"+$scope.quotation.qm_igst_amount+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='2' align='right'><strong>Other Charges</strong></td>" +
                                  "<td colspan='2'><strong>"+$scope.quotation.qm_other_charges+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='2' align='right'><strong>Total Amount</strong></td>" +
                                  "<td colspan='2'><strong>"+$scope.quotation.qm_total_cost+"</strong></td>" +
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
                                  "<td colspan='2' align='right'><strong>Net Amount</strong></td>" +
                                  "<td colspan='2'><strong>"+$scope.quotation.qm_net_cost+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='2' align='right'><strong>CGST "+$scope.quotation.qm_cgst_per+"%</strong></td>" +
                                  "<td colspan='2'><strong>"+$scope.quotation.qm_cgst_amount+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='2' align='right'><strong>SGST "+$scope.quotation.qm_sgst_per+"%</strong></td>" +
                                  "<td colspan='2'><strong>"+$scope.quotation.qm_sgst_amount+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='2' align='right'><strong>IGST "+$scope.quotation.qm_igst_per+"%</strong></td>" +
                                  "<td colspan='2'><strong>"+$scope.quotation.qm_igst_amount+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='2' align='right'><strong>Transport</strong></td>" +
                                  "<td colspan='2'><strong>"+$scope.quotation.qm_transport+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='2' align='right'><strong>Other Charges</strong></td>" +
                                  "<td colspan='2'><strong>"+$scope.quotation.qm_other_charges+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='2' align='right'><strong>Total Amount</strong></td>" +
                                  "<td colspan='2'><strong>"+$scope.quotation.qm_total_cost+"</strong></td>" +
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
                                  "<td colspan='2' align='right'><strong>Net Amount</strong></td>" +
                                  "<td colspan='2'><strong>"+$scope.quotation.qm_net_cost+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='2' align='right'><strong>CGST "+$scope.quotation.qm_cgst_per+"%</strong></td>" +
                                  "<td colspan='2'><strong>"+$scope.quotation.qm_cgst_amount+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='2' align='right'><strong>SGST "+$scope.quotation.qm_sgst_per+"%</strong></td>" +
                                  "<td colspan='2'><strong>"+$scope.quotation.qm_sgst_amount+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='2' align='right'><strong>IGST "+$scope.quotation.qm_igst_per+"%</strong></td>" +
                                  "<td colspan='2'><strong>"+$scope.quotation.qm_igst_amount+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='2' align='right'><strong>Transport (+)</strong></td>" +
                                  "<td colspan='2'><strong>"+$scope.quotation.qm_transport+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='2' align='right'><strong>Other Charges (+)</strong></td>" +
                                  "<td colspan='2'><strong>"+$scope.quotation.qm_other_charges+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='2' align='right'><strong>Discount (-)</strong></td>" +
                                  "<td colspan='2'><strong>"+$scope.quotation.qm_discount+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='2' align='right'><strong>Total Amount</strong></td>" +
                                  "<td colspan='2'><strong>"+$scope.quotation.qm_total_cost+"</strong></td>" +
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
                                  "<td colspan='2' align='right'><strong>Net Amount</strong></td>" +
                                  "<td  colspan='2'><strong>"+$scope.quotation.qm_net_cost+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='2' align='right'><strong>CGST "+$scope.quotation.qm_cgst_per+"%</strong></td>" +
                                  "<td colspan='2'><strong>"+$scope.quotation.qm_cgst_amount+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='2' align='right'><strong>SGST "+$scope.quotation.qm_sgst_per+"%</strong></td>" +
                                  "<td colspan='2'><strong>"+$scope.quotation.qm_sgst_amount+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='2' align='right'><strong>IGST "+$scope.quotation.qm_igst_per+"%</strong></td>" +
                                  "<td colspan='2'><strong>"+$scope.quotation.qm_igst_amount+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='2' align='right'><strong>Total Amount</strong></td>" +
                                  "<td colspan='2'><strong>"+$scope.quotation.qm_total_cost+"</strong></td>" +
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
                                  "<td colspan='2' align='right'><strong>Net Amount</strong></td>" +
                                  "<td colspan='2'><strong>"+$scope.quotation.qm_net_cost+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='2' align='right'><strong>CGST "+$scope.quotation.qm_cgst_per+"%</strong></td>" +
                                  "<td colspan='2'><strong>"+$scope.quotation.qm_cgst_amount+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='2' align='right'><strong>SGST "+$scope.quotation.qm_sgst_per+"%</strong></td>" +
                                  "<td colspan='2'><strong>"+$scope.quotation.qm_sgst_amount+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='2' align='right'><strong>IGST "+$scope.quotation.qm_igst_per+"%</strong></td>" +
                                  "<td colspan='2'><strong>"+$scope.quotation.qm_igst_amount+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='2' align='right'><strong>Other Charges</strong></td>" +
                                  "<td colspan='2'><strong>"+$scope.quotation.qm_other_charges+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='2' align='right'><strong>Total Amount</strong></td>" +
                                  "<td colspan='2'><strong>"+$scope.quotation.qm_total_cost+"</strong></td>" +
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
                                  "<td colspan='2' align='right'><strong>Net Amount</strong></td>" +
                                  "<td colspan='2'><strong>"+$scope.quotation.qm_net_cost+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='2' align='right'><strong>CGST "+$scope.quotation.qm_cgst_per+"%</strong></td>" +
                                  "<td colspan='2'><strong>"+$scope.quotation.qm_cgst_amount+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='2' align='right'><strong>SGST "+$scope.quotation.qm_sgst_per+"%</strong></td>" +
                                  "<td colspan='2'><strong>"+$scope.quotation.qm_sgst_amount+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='2' align='right'><strong>IGST "+$scope.quotation.qm_igst_per+"%</strong></td>" +
                                  "<td colspan='2'><strong>"+$scope.quotation.qm_igst_amount+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='2' align='right'><strong>Transport</strong></td>" +
                                  "<td colspan='2'><strong>"+$scope.quotation.qm_transport+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='2' align='right'><strong>Other Charges</strong></td>" +
                                  "<td colspan='2'><strong>"+$scope.quotation.qm_other_charges+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='2' align='right'><strong>Total Amount</strong></td>" +
                                  "<td colspan='2'><strong>"+$scope.quotation.qm_total_cost+"</strong></td>" +
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
                                  "<td colspan='2' align='right'><strong>Net Amount</strong></td>" +
                                  "<td colspan='2'><strong>"+$scope.quotation.qm_net_cost+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='2' align='right'><strong>CGST "+$scope.quotation.qm_cgst_per+"%</strong></td>" +
                                  "<td colspan='2'><strong>"+$scope.quotation.qm_cgst_amount+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='2' align='right'><strong>SGST "+$scope.quotation.qm_sgst_per+"%</strong></td>" +
                                  "<td colspan='2'><strong>"+$scope.quotation.qm_sgst_amount+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='2' align='right'><strong>IGST "+$scope.quotation.qm_igst_per+"%</strong></td>" +
                                  "<td colspan='2'><strong>"+$scope.quotation.qm_igst_amount+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='2' align='right'><strong>Transport (+)</strong></td>" +
                                  "<td colspan='2'><strong>"+$scope.quotation.qm_transport+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='2' align='right'><strong>Other Charges (+)</strong></td>" +
                                  "<td colspan='2'><strong>"+$scope.quotation.qm_other_charges+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='2' align='right'><strong>Discount (-)</strong></td>" +
                                  "<td colspan='2'><strong>"+$scope.quotation.qm_discount+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='2' align='right'><strong>Total Amount</strong></td>" +
                                  "<td colspan='2'><strong>"+$scope.quotation.qm_total_cost+"</strong></td>" +
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
                                  "zoom:75%;"+
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
                                  "<td colspan='26' rowspan='5'><strong>"
                                  +"<b>Terms & Conditions</b> <br>"+
                                  "1. Delivery: as per specific requirement. <br>"+
                                  "2. Taxes extra as applicable. <br>"+
                                  "3. Payment terms: 30 DAYS After Delivery. <br>"+
                                  "4. Packing Charges: NIL. <br>"+
                                  "5. <strong>TRANSPORT CHARGES TO BE BORN BY YOU.</strong>"+
                                  "</strong></td>" + 
                                  "<td colspan='4' align='right'><strong>Net Amount</strong></td>" +
                                  "<td colspan='3'><strong>"+$scope.quotation.qm_net_cost+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='4' align='right'><strong>CGST "+$scope.quotation.qm_cgst_per+"%</strong></td>" +
                                  "<td colspan='3'><strong>"+$scope.quotation.qm_cgst_amount+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='4' align='right'><strong>SGST "+$scope.quotation.qm_sgst_per+"%</strong></td>" +
                                  "<td colspan='3'><strong>"+$scope.quotation.qm_sgst_amount+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='4' align='right'><strong>IGST "+$scope.quotation.qm_igst_per+"%</strong></td>" +
                                  "<td colspan='3'><strong>"+$scope.quotation.qm_igst_amount+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='4' align='right'><strong>Total Amount</strong></td>" +
                                  "<td colspan='3'><strong>"+$scope.quotation.qm_total_cost+"</strong></td>" +
                                "</tr>" ;
                              }
                              else if($scope.quotation.qm_discount == 0 && $scope.quotation.qm_transport == 0 && $scope.quotation.qm_other_charges != 0)
                              {
                                page = page + "<tr>" +
                                  "<td colspan='26' rowspan='5'><strong>"
                                  +"<b>Terms & Conditions</b> <br>"+
                                  "1. Delivery: as per specific requirement. <br>"+
                                  "2. Taxes extra as applicable. <br>"+
                                  "3. Payment terms: 30 DAYS After Delivery. <br>"+
                                  "4. Packing Charges: NIL. <br>"+
                                  "5. <strong>TRANSPORT CHARGES TO BE BORN BY YOU.</strong>"+
                                  "</strong></td>" + 
                                  "<td colspan='4' align='right'><strong>Net Amount</strong></td>" +
                                  "<td colspan='3'><strong>"+$scope.quotation.qm_net_cost+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='4' align='right'><strong>CGST "+$scope.quotation.qm_cgst_per+"%</strong></td>" +
                                  "<td colspan='3'><strong>"+$scope.quotation.qm_cgst_amount+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='4' align='right'><strong>SGST "+$scope.quotation.qm_sgst_per+"%</strong></td>" +
                                  "<td colspan='3'><strong>"+$scope.quotation.qm_sgst_amount+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='4' align='right'><strong>IGST "+$scope.quotation.qm_igst_per+"%</strong></td>" +
                                  "<td colspan='3'><strong>"+$scope.quotation.qm_igst_amount+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='4' align='right'><strong>Other Charges</strong></td>" +
                                  "<td colspan='3'><strong>"+$scope.quotation.qm_other_charges+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='4' align='right'><strong>Total Amount</strong></td>" +
                                  "<td colspan='3'><strong>"+$scope.quotation.qm_total_cost+"</strong></td>" +
                                "</tr>" ;
                              }
                              else if($scope.quotation.qm_discount == 0 && $scope.quotation.qm_transport != 0 && $scope.quotation.qm_other_charges != 0)
                              {
                                page = page + "<tr>" +
                                  "<td colspan='26' rowspan='5'><strong>"
                                  +"<b>Terms & Conditions</b> <br>"+
                                  "1. Delivery: as per specific requirement. <br>"+
                                  "2. Taxes extra as applicable. <br>"+
                                  "3. Payment terms: 30 DAYS After Delivery. <br>"+
                                  "4. Packing Charges: NIL. <br>"+
                                  "5. <strong>TRANSPORT CHARGES TO BE BORN BY YOU.</strong>"+
                                  "</strong></td>" + 
                                  "<td colspan='4' align='right'><strong>Net Amount</strong></td>" +
                                  "<td><strong>"+$scope.quotation.qm_net_cost+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='4' align='right'><strong>CGST "+$scope.quotation.qm_cgst_per+"%</strong></td>" +
                                  "<td colspan='3'><strong>"+$scope.quotation.qm_cgst_amount+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='4' align='right'><strong>SGST "+$scope.quotation.qm_sgst_per+"%</strong></td>" +
                                  "<td colspan='3'><strong>"+$scope.quotation.qm_sgst_amount+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='4' align='right'><strong>IGST "+$scope.quotation.qm_igst_per+"%</strong></td>" +
                                  "<td colspan='3'><strong>"+$scope.quotation.qm_igst_amount+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='4' align='right'><strong>Transport</strong></td>" +
                                  "<td colspan='3'><strong>"+$scope.quotation.qm_transport+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='4' align='right'><strong>Other Charges</strong></td>" +
                                  "<td colspan='3'><strong>"+$scope.quotation.qm_other_charges+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='4' align='right'><strong>Total Amount</strong></td>" +
                                  "<td colspan='3'><strong>"+$scope.quotation.qm_total_cost+"</strong></td>" +
                                "</tr>" ;
                              }
                              else if($scope.quotation.qm_discount != 0 && $scope.quotation.qm_transport != 0 && $scope.quotation.qm_other_charges != 0)
                              {
                                page = page + "<tr>" +
                                  "<td colspan='26' rowspan='5'><strong>"
                                  +"<b>Terms & Conditions</b> <br>"+
                                  "1. Delivery: as per specific requirement. <br>"+
                                  "2. Taxes extra as applicable. <br>"+
                                  "3. Payment terms: 30 DAYS After Delivery. <br>"+
                                  "4. Packing Charges: NIL. <br>"+
                                  "5. <strong>TRANSPORT CHARGES TO BE BORN BY YOU.</strong>"+
                                  "</strong></td>" + 
                                  "<td colspan='4' align='right'><strong>Net Amount</strong></td>" +
                                  "<td colspan='3'><strong>"+$scope.quotation.qm_net_cost+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='4' align='right'><strong>CGST "+$scope.quotation.qm_cgst_per+"%</strong></td>" +
                                  "<td colspan='3'><strong>"+$scope.quotation.qm_cgst_amount+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='4' align='right'><strong>SGST "+$scope.quotation.qm_sgst_per+"%</strong></td>" +
                                  "<td colspan='3'><strong>"+$scope.quotation.qm_sgst_amount+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='4' align='right'><strong>IGST "+$scope.quotation.qm_igst_per+"%</strong></td>" +
                                  "<td colspan='3'><strong>"+$scope.quotation.qm_igst_amount+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='4' align='right'><strong>Transport (+)</strong></td>" +
                                  "<td colspan='3'><strong>"+$scope.quotation.qm_transport+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='4' align='right'><strong>Other Charges (+)</strong></td>" +
                                  "<td colspan='3'><strong>"+$scope.quotation.qm_other_charges+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='4' align='right'><strong>Discount (-)</strong></td>" +
                                  "<td colspan='3'><strong>"+$scope.quotation.qm_discount+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='4' align='right'><strong>Total Amount</strong></td>" +
                                  "<td colspan='3'><strong>"+$scope.quotation.qm_total_cost+"</strong></td>" +
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
                                  "zoom:75%;"+
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
                                  "<td colspan='26' rowspan='5'><strong>"
                                  +"<b>Terms & Conditions</b> <br>"+
                                  "1. Delivery: as per specific requirement. <br>"+
                                  "2. Taxes extra as applicable. <br>"+
                                  "3. Payment terms: 30 DAYS After Delivery. <br>"+
                                  "4. Packing Charges: NIL. <br>"+
                                  "5. <strong>TRANSPORT CHARGES TO BE BORN BY YOU.</strong>"+
                                  "</strong></td>" + 
                                  "<td colspan='4' align='right'><strong>Net Amount</strong></td>" +
                                  "<td  colspan='3'><strong>"+$scope.quotation.qm_net_cost+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='4' align='right'><strong>CGST "+$scope.quotation.qm_cgst_per+"%</strong></td>" +
                                  "<td colspan='3'><strong>"+$scope.quotation.qm_cgst_amount+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='4' align='right'><strong>SGST "+$scope.quotation.qm_sgst_per+"%</strong></td>" +
                                  "<td colspan='3'><strong>"+$scope.quotation.qm_sgst_amount+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='4' align='right'><strong>IGST "+$scope.quotation.qm_igst_per+"%</strong></td>" +
                                  "<td colspan='3'><strong>"+$scope.quotation.qm_igst_amount+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='4' align='right'><strong>Total Amount</strong></td>" +
                                  "<td colspan='3'><strong>"+$scope.quotation.qm_total_cost+"</strong></td>" +
                                "</tr>" ;
                              }
                              else if($scope.quotation.qm_discount == 0 && $scope.quotation.qm_transport == 0 && $scope.quotation.qm_other_charges != 0)
                              {
                                page = page + "<tr>" +
                                  "<td colspan='26' rowspan='5'><strong>"
                                  +"<b>Terms & Conditions</b> <br>"+
                                  "1. Delivery: as per specific requirement. <br>"+
                                  "2. Taxes extra as applicable. <br>"+
                                  "3. Payment terms: 30 DAYS After Delivery. <br>"+
                                  "4. Packing Charges: NIL. <br>"+
                                  "5. <strong>TRANSPORT CHARGES TO BE BORN BY YOU.</strong>"+
                                  "</strong></td>" + 
                                  "<td colspan='4' align='right'><strong>Net Amount</strong></td>" +
                                  "<td colspan='3'><strong>"+$scope.quotation.qm_net_cost+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='4' align='right'><strong>CGST "+$scope.quotation.qm_cgst_per+"%</strong></td>" +
                                  "<td colspan='3'><strong>"+$scope.quotation.qm_cgst_amount+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='4' align='right'><strong>SGST "+$scope.quotation.qm_sgst_per+"%</strong></td>" +
                                  "<td colspan='3'><strong>"+$scope.quotation.qm_sgst_amount+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='4' align='right'><strong>IGST "+$scope.quotation.qm_igst_per+"%</strong></td>" +
                                  "<td colspan='3'><strong>"+$scope.quotation.qm_igst_amount+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='4' align='right'><strong>Other Charges</strong></td>" +
                                  "<td colspan='3'><strong>"+$scope.quotation.qm_other_charges+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='4' align='right'><strong>Total Amount</strong></td>" +
                                  "<td colspan='3'><strong>"+$scope.quotation.qm_total_cost+"</strong></td>" +
                                "</tr>" ;
                              }
                              else if($scope.quotation.qm_discount == 0 && $scope.quotation.qm_transport != 0 && $scope.quotation.qm_other_charges != 0)
                              {
                                page = page + "<tr>" +
                                  "<td colspan='26' rowspan='5'><strong>"
                                  +"<b>Terms & Conditions</b> <br>"+
                                  "1. Delivery: as per specific requirement. <br>"+
                                  "2. Taxes extra as applicable. <br>"+
                                  "3. Payment terms: 30 DAYS After Delivery. <br>"+
                                  "4. Packing Charges: NIL. <br>"+
                                  "5. <strong>TRANSPORT CHARGES TO BE BORN BY YOU.</strong>"+
                                  "</strong></td>" + 
                                  "<td colspan='4' align='right'><strong>Net Amount</strong></td>" +
                                  "<td colspan='3'><strong>"+$scope.quotation.qm_net_cost+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='4' align='right'><strong>CGST "+$scope.quotation.qm_cgst_per+"%</strong></td>" +
                                  "<td colspan='3'><strong>"+$scope.quotation.qm_cgst_amount+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='4' align='right'><strong>SGST "+$scope.quotation.qm_sgst_per+"%</strong></td>" +
                                  "<td colspan='3'><strong>"+$scope.quotation.qm_sgst_amount+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='4' align='right'><strong>IGST "+$scope.quotation.qm_igst_per+"%</strong></td>" +
                                  "<td colspan='3'><strong>"+$scope.quotation.qm_igst_amount+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='4' align='right'><strong>Transport</strong></td>" +
                                  "<td colspan='3'><strong>"+$scope.quotation.qm_transport+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='4' align='right'><strong>Other Charges</strong></td>" +
                                  "<td colspan='3'><strong>"+$scope.quotation.qm_other_charges+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='4' align='right'><strong>Total Amount</strong></td>" +
                                  "<td colspan='3'><strong>"+$scope.quotation.qm_total_cost+"</strong></td>" +
                                "</tr>" ;
                              }
                              else if($scope.quotation.qm_discount != 0 && $scope.quotation.qm_transport != 0 && $scope.quotation.qm_other_charges != 0)
                              {
                                page = page + "<tr>" +
                                  "<td colspan='26' rowspan='5'><strong>"
                                  +"<b>Terms & Conditions</b> <br>"+
                                  "1. Delivery: as per specific requirement. <br>"+
                                  "2. Taxes extra as applicable. <br>"+
                                  "3. Payment terms: 30 DAYS After Delivery. <br>"+
                                  "4. Packing Charges: NIL. <br>"+
                                  "5. <strong>TRANSPORT CHARGES TO BE BORN BY YOU.</strong>"+
                                  "</strong></td>" + 
                                  "<td colspan='4' align='right'><strong>Net Amount</strong></td>" +
                                  "<td colspan='3'><strong>"+$scope.quotation.qm_net_cost+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='4' align='right'><strong>CGST "+$scope.quotation.qm_cgst_per+"%</strong></td>" +
                                  "<td colspan='3'><strong>"+$scope.quotation.qm_cgst_amount+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='4' align='right'><strong>SGST "+$scope.quotation.qm_sgst_per+"%</strong></td>" +
                                  "<td colspan='3'><strong>"+$scope.quotation.qm_sgst_amount+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='4' align='right'><strong>IGST "+$scope.quotation.qm_igst_per+"%</strong></td>" +
                                  "<td colspan='3'><strong>"+$scope.quotation.qm_igst_amount+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='4' align='right'><strong>Transport (+)</strong></td>" +
                                  "<td colspan='3'><strong>"+$scope.quotation.qm_transport+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='4' align='right'><strong>Other Charges (+)</strong></td>" +
                                  "<td colspan='3'><strong>"+$scope.quotation.qm_other_charges+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='4' align='right'><strong>Discount (-)</strong></td>" +
                                  "<td colspan='3'><strong>"+$scope.quotation.qm_discount+"</strong></td>" +
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='4' align='right'><strong>Total Amount</strong></td>" +
                                  "<td colspan='3'><strong>"+$scope.quotation.qm_total_cost+"</strong></td>" +
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