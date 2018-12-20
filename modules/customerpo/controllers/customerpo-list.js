// import admin
angular.module('customerpo').controller('customerpoListCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route, $filter) {

    $scope.filteredTodos = [];
    $scope.currentPage = 1;
    $scope.maxSize = 5;
    $scope.entryLimit = 5;
    $scope.filterUser = 0;
    $scope.filterUserend = 1;
    $scope.numPerPage = 10;
    $scope.obj_Main = [];
    $scope.customerpoList = [];
    $scope.loading1 = 0;
    $scope.limit={}; 

  $scope.apiURL = $rootScope.baseURL+'/finalquotation/finalquotation/total';

  // Role Permission
   var permission=JSON.parse(localStorage.getItem('permission'));
      var value = '#/customerpo';
      var access = permission.includes(value);
        $scope.getrolepermission=function(){
          
          // for(var i=0;i<permission.length;i++)
          // {
            if(access)
            {
              return true
            }
            else
            {
               var dialog = bootbox.dialog({
              message: '<p class="text-center">You Are Not Authorized</p>',
                  closeButton: false
              });
              dialog.find('.modal-body').addClass("btn-danger");
              setTimeout(function(){
                  dialog.modal('hide'); 
              }, 1500);
              $location.path('/')

            }
        /*
        break;
      }*/

    };
    $scope.getrolepermission();

    var supermission=JSON.parse(localStorage.getItem('supermission'));
    var editValue = 31;
    var deleteValue = 32;
    var checkedit = supermission.includes(editValue);
    var checkdelete = supermission.includes(deleteValue);
    $scope.getsupermission=function(){
          if(checkedit == false)
          {
            $scope.edithide=0;
          }
          if(checkdelete == false)
          {
            $scope.deletehide=0;
          }
          if($scope.deletehide == 0 && $scope.edithide == 0)
          {
            $scope.theadhide = 0;
          }

      };
      $scope.getsupermission();


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
                    $scope.customerpoListcount = value.total;
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
        if ($scope.filterUser >= $scope.customerpoListcount)
            $scope.filterUser = $scope.customerpoListcount;
            $scope.filteredTodos = [];
            $scope.limit.number = $scope.numPerPage;
            $scope.limit.begin = begin;
            $scope.limit.end = end;
            $http({
              method: 'POST',
              url: $rootScope.baseURL+'/finalquotation/finalquotation/limit',
              data: $scope.limit,
              headers: {'Content-Type': 'application/json',
                        'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
            })
            .success(function(customerpo)
            {
                $scope.filteredTodos = [];
                if (customerpo.length > 0) {
                  customerpo.forEach(function (value, key) {
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

    $scope.deleteCustomerpo = function (fqm_id) {
      $('#confirm-delete').modal('show'); 
        $scope.fqm_id=fqm_id;
    }  

    $rootScope.deleteConfirm = function () {
      $('#del').attr('disabled','true');
      $('#del').text("please wait...");
          $http({
              method: 'POST',
              url: $rootScope.baseURL+'/finalquotation/delete/'+$scope.fqm_id,
              headers: {'Content-Type': 'application/json',
                        'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
          })
          .success(function(customerpoObj)
          {   
             var dialog = bootbox.dialog({
                message: '<p class="text-center">Record Deleted.</p>',
                    closeButton: false
                });
              dialog.find('.modal-body').addClass("btn-danger");
                setTimeout(function(){
                    $('#del').text("Delete");
                    $('#del').removeAttr('disabled');
                    dialog.modal('hide'); 
                      $('#del').text("Delete");
                      $('#del').removeAttr('disabled');
                      $scope.customerpoList = [];
                      $scope.getAll();
                      $('#confirm-delete').modal('hide');
                }, 1500);
              
            
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

    $scope.viewCustomerpoDetails = function(index){
        $scope.viewDetails=[];
        $scope.finalquo = $scope.filteredTodos[index];
        $('#view-details').modal('show'); 
        $http({
          method: 'GET',
          url: $rootScope.baseURL+'/finalquotation/details/'+$scope.filteredTodos[index].fqm_id,
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
                $('#del').text("Delete");
                $('#del').removeAttr('disabled');
                dialog.modal('hide'); 
            }, 1500); 
        });
    };



          $scope.printQ = function(){
            // quantity = $scope.viewDetails.fqpm_quantity;
            // cost = $scope.viewDetails.fqpm_cost;

            console.log()
          if($scope.finalquo.fqm_status == 0){
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
                            "<center><h5 style='font-size:11pt'>Final Quotation</h5></center>"+
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
                                "<td>Quotation No : <strong>"+$scope.finalquo.qm_id+"</strong></td>" +
                                "<td>Quotation No : <strong>"+$scope.finalquo.fqm_no+"</strong></td>" +
                                "<td>P.O Date : <strong>"+$filter('date')($scope.finalquo.fqm_date,'mediumDate')+"</strong></td>" +
                                "<td>Dispatch Date : <strong>"+$filter('date')($scope.finalquo.fqm_dispatch_date,'mediumDate')+"</strong></td>" +
                              "</tr>" +
                              "<tr>" +                                
                              "<td colspan='2'>Customer's Name: <strong>"+$scope.finalquo.cm_name+" ("+$scope.finalquo.cm_address+")</strong></td>"+
                                "<td>Customer's P.O No. : <strong>"+$scope.finalquo.fqm_po_no+"</strong></td>" +
                                "<td>Customer's P.O Date : <strong>"+$filter('date')($scope.finalquo.fqm_po_date,'mediumDate')+"</strong></td>" +
                                "</tr>" +
                            "</table>" +



                            "<table class='table table-stripped table-bordered' style='font-size:10pt; page-break-after: always;'>" +
                                "<tr>" +
                                    " "+$('#content').html()+" " +
                                "</tr>" ;

                                page = page + "<tr>" +
                                  "<td colspan='4' rowspan='7'><strong>"
                                  +"<b>Terms & Conditions</b> <br>"+
                                  "1. Delivery: as per specific requirement. <br>"+
                                  "2. Taxes extra as applicable. <br>"+
                                  "3. Payment terms: 30 DAYS After Delivery. <br>"+
                                  "4. Packing Charges: NIL. <br>"+
                                  "5. <strong>TRANSPORT CHARGES TO BE BORN BY YOU.</strong>"+
                                  "</strong></td>" + 
                                  "<td rowspan='7' align='right'><strong>TOTAL</strong></td>" +
                                  "<td rowspan='7'><strong>"+$scope.finalquo.fqm_quantity+"</strong></td>" +
                                  "<td rowspan='7'><strong>"+$filter('number')($scope.finalquo.fqm_amount,'2')+"</strong></td>" +
                                
                                "</tr>" ;

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
                            "<center><h5 style='font-size:11pt'>Final Quotation</h5></center>"+
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
                                "<td>Quotation No : <strong>"+$scope.finalquo.qm_id+"</strong></td>" +
                                "<td>Quotation No : <strong>"+$scope.finalquo.fqm_no+"</strong></td>" +
                                "<td>P.O Date : <strong>"+$filter('date')($scope.finalquo.fqm_date,'mediumDate')+"</strong></td>" +
                                "<td>Dispatch Date : <strong>"+$filter('date')($scope.finalquo.fqm_dispatch_date,'mediumDate')+"</strong></td>" +
                              "</tr>" +
                              "<tr>" +                                
                              "<td colspan='2'>Customer's Name: <strong>"+$scope.finalquo.cm_name+" ("+$scope.finalquo.cm_address+")</strong></td>"+
                                "<td>Customer's P.O No. : <strong>"+$scope.finalquo.fqm_po_no+"</strong></td>" +
                                "<td>Customer's P.O Date : <strong>"+$filter('date')($scope.finalquo.fqm_po_date,'mediumDate')+"</strong></td>" +
                                "</tr>" +
                            "</table>" +
                            "<table class='table table-stripped table-bordered' style='font-size:10pt; page-break-after: always;'>" +
                                "<tr>" +
                                    " "+$('#content').html()+" " +
                                "</tr>" ;

                                page = page + "<tr>" +
                                  "<td colspan='4' rowspan='7'><strong>"
                                  +"<b>Terms & Conditions</b> <br>"+
                                  "1. Delivery: as per specific requirement. <br>"+
                                  "2. Taxes extra as applicable. <br>"+
                                  "3. Payment terms: 30 DAYS After Delivery. <br>"+
                                  "4. Packing Charges: NIL. <br>"+
                                  "5. <strong>TRANSPORT CHARGES TO BE BORN BY YOU.</strong>"+
                                  "</strong></td>" + 
                                  "<td rowspan='7' align='right'><strong>TOTAL</strong></td>" +
                                  "<td rowspan='7'><strong>"+$scope.finalquo.fqm_quantity+"</strong></td>" +
                                  "<td rowspan='7'><strong>"+$filter('number')($scope.finalquo.fqm_amount,'2')+"</strong></td>" +
                                
                                "</tr>" ;

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

          if($scope.finalquo.fqm_status == 0){
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
                                  "zoom:73%;"+
                                "}" +
                            "</style>" +
                    "</head>" +
                    "<body onload='window.print()' style='font-size:11pt;'>" +
                        "<div>" +
                            "<center><h5 style='font-size:11pt'>Final Quotation</h5></center>"+
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
                                "<td>Quotation No : <strong>"+$scope.finalquo.qm_id+"</strong></td>" +
                                "<td>Quotation No : <strong>"+$scope.finalquo.fqm_no+"</strong></td>" +
                                "<td>P.O Date : <strong>"+$filter('date')($scope.finalquo.fqm_date,'mediumDate')+"</strong></td>" +
                                "<td>Dispatch Date : <strong>"+$filter('date')($scope.finalquo.fqm_dispatch_date,'mediumDate')+"</strong></td>" +
                              "</tr>" +
                              "<tr>" +                                
                              "<td colspan='2'>Customer's Name: <strong>"+$scope.finalquo.cm_name+" ("+$scope.finalquo.cm_address+")</strong></td>"+
                                "<td>Customer's P.O No. : <strong>"+$scope.finalquo.fqm_po_no+"</strong></td>" +
                                "<td>Customer's P.O Date : <strong>"+$filter('date')($scope.finalquo.fqm_po_date,'mediumDate')+"</strong></td>" +
                                "</tr>" +
                            "</table>" +

                            "<table class='table table-stripped table-bordered' style='font-size:10pt; page-break-after: always;'>" +
                                "<tr>" +
                                    " "+$('#content').html()+" " +
                                "</tr>" ;

                            page = page + "<tr>" +
                                  "<td colspan='30' rowspan='7'><strong>"
                                  +"<b>Terms & Conditions</b> <br>"+
                                  "1. Delivery: as per specific requirement. <br>"+
                                  "2. Taxes extra as applicable. <br>"+
                                  "3. Payment terms: 30 DAYS After Delivery. <br>"+
                                  "4. Packing Charges: NIL. <br>"+
                                  "5. <strong>TRANSPORT CHARGES TO BE BORN BY YOU.</strong>"+
                                  "</strong></td>" + 
                                  "<td rowspan='7' align='right'><strong>TOTAL</strong></td>" +
                                  "<td rowspan='7'><strong>"+$scope.finalquo.fqm_quantity+"</strong></td>" +
                                  "<td rowspan='7'><strong>"+$filter('number')($scope.finalquo.fqm_amount,'2')+"</strong></td>" +
                                
                                "</tr>" ;

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
                                  "  size:  A4 landscape;" +
                                  "  margin: 5mm 5mm 5mm 5mm;" +
                                "}" +

                                "body" +
                                "{" +
                                  "zoom:73%;"+
                                "}" +
                            "</style>" +
                    "</head>" +
                    "<body onload='window.print()' style='font-size:11pt;'>" +
                      "<div class='watermark'>CANCELLED</p></div>" +
                        "<div>" +
                            "<center><h5 style='font-size:11pt'>Final Quotation</h5></center>"+
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
                                "<td>Quotation No : <strong>"+$scope.finalquo.qm_id+"</strong></td>" +
                                "<td>Quotation No : <strong>"+$scope.finalquo.fqm_no+"</strong></td>" +
                                "<td>P.O Date : <strong>"+$filter('date')($scope.finalquo.fqm_date,'mediumDate')+"</strong></td>" +
                                "<td>Dispatch Date : <strong>"+$filter('date')($scope.finalquo.fqm_dispatch_date,'mediumDate')+"</strong></td>" +
                              "</tr>" +
                              "<tr>" +                                
                              "<td colspan='2'>Customer's Name: <strong>"+$scope.finalquo.cm_name+" ("+$scope.finalquo.cm_address+")</strong></td>"+
                                "<td>Customer's P.O No. : <strong>"+$scope.finalquo.fqm_po_no+"</strong></td>" +
                                "<td>Customer's P.O Date : <strong>"+$filter('date')($scope.finalquo.fqm_po_date,'mediumDate')+"</strong></td>" +
                                "</tr>" +
                            "</table>" +

                            "<table class='table table-stripped table-bordered' style='font-size:10pt; page-break-after: always;'>" +
                                "<tr>" +
                                    " "+$('#content').html()+" " +
                                "</tr>" ;

                            page = page + "<tr>" +
                                  "<td colspan='30' rowspan='7'><strong>"
                                  +"<b>Terms & Conditions</b> <br>"+
                                  "1. Delivery: as per specific requirement. <br>"+
                                  "2. Taxes extra as applicable. <br>"+
                                  "3. Payment terms: 30 DAYS After Delivery. <br>"+
                                  "4. Packing Charges: NIL. <br>"+
                                  "5. <strong>TRANSPORT CHARGES TO BE BORN BY YOU.</strong>"+
                                  "</strong></td>" + 
                                  "<td rowspan='7' align='right'><strong>TOTAL</strong></td>" +
                                  "<td rowspan='7'><strong>"+$scope.finalquo.fqm_quantity+"</strong></td>" +
                                  "<td rowspan='7'><strong>"+$filter('number')($scope.finalquo.fqm_amount,'2')+"</strong></td>" +
                                
                                "</tr>" ;

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