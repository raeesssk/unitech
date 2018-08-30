// import admin
angular.module('quotation').controller('quotationListCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route, $filter) {

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

  $scope.apiURL = $rootScope.baseURL+'/quotation/quotation/total';
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
                url: $rootScope.baseURL+'/quotation/quotation/limit',
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
            if(quotationObj.length == 0)
            {
              $('#app').text("Approve");
              $('#app').removeAttr('disabled');
              $scope.quotationList = [];
              $scope.getAll();
              $('#approve').modal('hide');
            }
            else
            {
              var dialog = bootbox.dialog({
                  message: '<p class="text-center">Already quotation approved for the design.</p>',
                      closeButton: false
              });
              setTimeout(function(){
                  $('#app').text("Approve");
                  $('#app').removeAttr('disabled');
                  dialog.modal('hide'); 
              }, 1500); 
              $('#approve').modal('hide');
            }
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
            url: $rootScope.baseURL+'/quotation/isapprove/pending/'+$scope.disapp_qm_id,
            headers: {'Content-Type': 'application/json',
                      'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
        })
        .success(function(quotationObj)
        { 
            $('#disapp').text("Disapprove");
            $('#disapp').removeAttr('disabled');
            $scope.quotationList = [];
            $scope.getAll();
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
                  value.machineDetails=[];
                    $http({
                        method: 'GET',
                        url: $rootScope.baseURL+'/quotation/details/machine/'+value.qpm_id,
                        //data: $scope.data,
                        headers: {'Content-Type': 'application/json',
                                'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
                      })
                  .success(function(obj1)
                  {   

                      obj1.forEach(function(value1, key1){
                        // value.qpmm_mm_search=value.mm_name+" "+value.mm_price;
                        
                        value.machineDetails.push(value1);
                        
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
        // $scope.viewMachineProductDetails(index);
    };
    
    // $scope.viewMachineProductDetails = function(index){
        
       
    // };
   
    $scope.printDetails = function(){

      if($scope.quotation.qm_status == 0){
        var printContents = $('#content').html();
        var popupWin = window.open('', 'winname','directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,scrollbars=no,resizable=no, width=400,height=auto');
            // popupWin.document.open();
            popupWin.document.write("<html>" +
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
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='3'><strong>"+$scope.quotation.qm_comment+"</strong></td>" +
                                  "<td align='right'><strong>TOTAL</strong></td>" +
                                  "<td><strong>"+$scope.quotation.qm_total_cost+"</strong></td>" +
                                "</tr>" +
                            "</table>" +
                        "</div>" +
                    "</body>" +
                    "</html>");
            popupWin.document.close();
            // popupWin.close();
        }
        else{
            var printContents = $('#content').html();
            var popupWin = window.open('', 'winname','directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,scrollbars=no,resizable=no, width=400,height=auto');
            // popupWin.document.open();
            popupWin.document.write("<html>" +
                    "<head>" +
                        "<link rel='stylesheet' href='./././bower_components/bootstrap/dist/css/bootstrap.min.css' />" +
                        "<style>.action{display:none;} .print-hide{display:none;} .printshow{display:block;}</style>"+
                        "<style>@media print {.watermark {display: inline;position: fixed !important;opacity: 0.50;font-size: 100px;width: 100%;text-align: center;z-index: 1000;top:270px;right:5px;}}</style>" +
                    "</head>" +
                    "<body onload='window.print()' style='font-size:11pt'>" +
                      "<div class='watermark'>cancelled</p></div>" +
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
                                "</tr>" +
                                "<tr>" +
                                  "<td colspan='3'><strong>"+$scope.quotation.qm_comment+"</strong></td>" +
                                  "<td align='right'><strong>TOTAL</strong></td>" +
                                  "<td><strong>"+$scope.quotation.qm_total_cost+"</strong></td>" +
                                "</tr>" +
                            "</table>" +
                        "</div>" +
                    "</body>" +
                    "</html>");
            popupWin.document.close();
            // popupWin.close();
        }
    };  

});