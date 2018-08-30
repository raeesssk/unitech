// import admin
angular.module('design').controller('designListCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route, $filter) {

    $scope.filteredTodos = [];
    $scope.currentPage = 1;
    $scope.maxSize = 5;
    $scope.entryLimit = 5;
    $scope.filterUser = 0;
    $scope.filterUserend = 1;
    $scope.numPerPage = 10;
    $scope.obj_Main = [];
    $scope.designList = [];
    $scope.loading1 = 0;
    $scope.limit={};
    $scope.design = {};

  $scope.apiURL = $rootScope.baseURL+'/design/design/total';
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
                    $scope.designListcount=value.total;
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
        if ($scope.filterUser >= $scope.designListcount)
            $scope.filterUser = $scope.designListcount;
            $scope.filteredTodos = [];
            $scope.limit.number = $scope.numPerPage;
            $scope.limit.begin = begin;
            $scope.limit.end = end;
            $http({
              method: 'POST',
              url: $rootScope.baseURL+'/design/design/limit',
              data: $scope.limit,
              headers: {'Content-Type': 'application/json',
                        'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
            })
            .success(function(design)
            {
                $scope.filteredTodos = [];
                if (design.length > 0) {
                  design.forEach(function (value, key) {
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

    $scope.deleteDesign = function (dm_id) {
      $('#confirm-cancel').modal('show');
        $scope.dm_id=dm_id;
    }  

    $scope.deleteConfirm = function () {
      $('#del').attr('disabled','true');
      $('#del').text("please wait...");
          $http({
              method: 'POST',
              url: $rootScope.baseURL+'/design/delete/'+$scope.dm_id,
              headers: {'Content-Type': 'application/json',
                        'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
          })
          .success(function(designObj)
          {
              $('#del').text("Cancel");
              $('#del').removeAttr('disabled');
              $scope.designList = [];
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

    $scope.viewDetails = function(index){
        $scope.personalDetails=[];
        $scope.imageDetails=[];
      $scope.design = $scope.filteredTodos[index];
      $('#view_icon').modal('show'); 
        $http({
          method: 'GET',
          url: $rootScope.baseURL+'/design/details/'+$scope.filteredTodos[index].dm_id,
          //data: $scope.data,
          headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
        })
        .success(function(obj)
        {   
          $scope.totalqty = 0;
            obj.forEach(function(value, key){
              $scope.totalqty = parseInt($scope.totalqty + value.dtm_qty);
              $scope.personalDetails.push(value);
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
        $http({
          method: 'GET',
          url: $rootScope.baseURL+'/design/details/images/'+$scope.filteredTodos[index].dm_id,
          //data: $scope.data,
          headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
        })
        .success(function(obj)
        {   
          $scope.design.totalqty = 0;
            obj.forEach(function(value, key){
              $scope.imageDetails.push(value);
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

    
    $scope.printDetails = function(){
      if($scope.design.dm_status == 0){

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
                                "<td>Name : <strong>"+$scope.design.cm_name+"</strong></td>"+
                                "<td>Address : <strong>"+$scope.design.cm_address+"</strong></td>"+
                              "</tr>" +
                              "<tr>" +
                                "<td>Manufacturing Date : <strong>"+$filter('date')($scope.design.dm_mft_date,'mediumDate')+"</strong></td>"+
                                "<td>P.O. Date : <strong>"+$filter('date')($scope.design.dm_po_date,'mediumDate')+"</strong></td>"+
                              "</tr>" +
                              "<tr>" +
                                "<td>Delivery Date : <strong>"+$filter('date')($scope.design.dm_dely_date,'mediumDate')+"</strong></td>" +
                                "<td>P.O. No : <strong>"+$scope.design.dm_po_no+"</strong></td>" +
                              "</tr>" +
                              "<tr>" +
                                "<td>Design No : <strong>"+$scope.design.dm_design_no+"</strong></td>" +
                                "<td>&nbsp;</td>" +
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
                        "<script type='text/javascript' src='./././resources/lib/angular.min.js'></script>" +
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
                                    "<td align='center'><img alt='your image' height='50%' width='50%' src='"+value.dim_image+"'/></td>" +
                                "</tr>" +
                            "</table>" +
                        "</div>" +
                    "</body>" +
                    "</html>");
            });
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
                                "<td>Name : <strong>"+$scope.design.cm_name+"</strong></td>"+
                                "<td>Address : <strong>"+$scope.design.cm_address+"</strong></td>"+
                              "</tr>" +
                              "<tr>" +
                                "<td>Manufacturing Date : <strong>"+$filter('date')($scope.design.dm_mft_date,'mediumDate')+"</strong></td>"+
                                "<td>P.O. Date : <strong>"+$filter('date')($scope.design.dm_po_date,'mediumDate')+"</strong></td>"+
                              "</tr>" +
                              "<tr>" +
                                "<td>Delivery Date : <strong>"+$filter('date')($scope.design.dm_dely_date,'mediumDate')+"</strong></td>" +
                                "<td>P.O. No : <strong>"+$scope.design.dm_po_no+"</strong></td>" +
                              "</tr>" +
                              "<tr>" +
                                "<td>Design No : <strong>"+$scope.design.dm_design_no+"</strong></td>" +
                                "<td>&nbsp;</td>" +
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
                        "<script type='text/javascript' src='./././resources/lib/angular.min.js'></script>" +
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
                                    "<td align='center'><img alt='your image' height='50%' width='50%' src='"+value.dim_image+"'/></td>" +
                                "</tr>" +
                            "</table>" +
                        "</div>" +
                    "</body>" +
                    "</html>");
            });
            popupWin.document.close();
            // popupWin.close();

      }
    };
      

});