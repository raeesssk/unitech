// import admin
angular.module('quotation').controller('quotationAddCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route, $filter) {

    $scope.quotation = {};

    $scope.quotation.qm_ref = "N/A";

    $scope.quotation.qm_comment = "<b>Terms & Conditions</b> <br>"+
                                  "1. delivery: as per specific requirement. <br>"+
                                  "2. Taxes extra as applicable. <br>"+
                                  "3. Payment terms: 30 DAYS After Delivery. <br>"+
                                  "4. Packing Charges: NIL. <br>"+
                                  "5. <strong>TRANSPORT CHARGES TO BE BORN BY YOU.</strong>";
    

    $scope.quotation.qm_total_cost=0;

    $scope.personalDetails = {};

    var d = new Date();
    var yyyy = d.getFullYear().toString();
    var mm = (d.getMonth()).toString(); // getMonth() is zero-based
    var dd  = d.getDate().toString();
    $scope.quotation.qm_date = yyyy +"-"+ (parseInt(mm)+parseInt(1)) +"-"+ dd;

    // VALIDATION & Main
  $scope.apiURL = $rootScope.baseURL+'/quotation/add';
    $('#qm_dm_id').focus();
        $scope.addQuotation = function () {
            var nameRegex = /^\d+$/;
            var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
            if($('#qm_dm_id').val() == undefined || $('#qm_dm_id').val() == "" || $scope.quotation.qm_dm_id.dm_id == undefined ){
              var dialog = bootbox.dialog({
                message: "<p class='text-center'>Please Enter Design Number!</p>",
                    closeButton: false
                }); 
                dialog.find('.modal-body').addClass("btn-danger");
                setTimeout(function(){
                    dialog.modal('hide'); 
                $('#qm_dm_id').focus();
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
            else if($('#qm_comment').val() == undefined || $('#qm_comment').val() == ""){
              var dialog = bootbox.dialog({
                  message: '<p class="text-center">Please Enter The Comment!</p>',
                      closeButton: false
                  });
                  dialog.find('.modal-body').addClass("btn-danger");
                  setTimeout(function(){
                      dialog.modal('hide'); 
                      
                      $('#qm_comment').focus(); 
                  }, 1500);
            }
            else{
                $('#btnsave').attr('disabled','true');
                $('#btnsave').text("please wait...");

                      $scope.quotation.qm_date = $('#qm_date').val();

                        $scope.pruchaseForm = {
                            quotation : $scope.quotation,
                            purchaseMultipleData : $scope.personalDetails
                        };
                    
                        $http({
                          method: 'POST',
                          url: $scope.apiURL,
                          data: $scope.pruchaseForm,
                          headers: {'Content-Type': 'application/json',
                                  'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
                        })
                        .success(function(login)
                        {   
                           var dialog = bootbox.dialog({
                              message: '<p class="text-center">Quotation Added Successfully!</p>',
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
      // End VALIDATION & Main


      // Auto Generate Serial Number for Quotation
      $scope.getSerial = function(){
        
        $http({
                method: 'POST',
                url:  $rootScope.baseURL+'/quotation/serial/no',
                headers: {'Content-Type':'application/json',
                        'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
              })
              .success(function(login)
              {   
                if (login.length > 0) {
                  $scope.quotation.qm_quotation_no = parseInt(login[0].qm_quotation_no)+1;
                }  
                else{
                  $scope.quotation.qm_quotation_no = 1;
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



    $scope.addToCart = function(index){

        var nameRegex = /^\d+$/;
        var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var numRegex = /^\d+(\.\d{1,2})?$/;

        if($scope.personalDetails[index].qpmm_mm_id == "" || $scope.personalDetails[index].qpmm_mm_id == undefined || $scope.personalDetails[index].qpmm_mm_id.mm_id == undefined){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please select machine.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else if($scope.personalDetails[index].qpmm_mm_hr == "" || $scope.personalDetails[index].qpmm_mm_hr == undefined){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter quantity.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else{
            $scope.machineList = {
              'qpmm_mm_id':$scope.personalDetails[index].qpmm_mm_id,
              'qpmm_mm_hr':$scope.personalDetails[index].qpmm_mm_hr
            }
            $scope.personalDetails[index].machineDetails.push($scope.machineList);
            $scope.personalDetails[index].qpmm_mm_id = null;
            $scope.personalDetails[index].qpmm_mm_hr = 0;
            $scope.calculate($scope.personalDetails[index]);
                // $('#qpmm_mm_id').focus();
        }
    };

    $scope.removeItem = function(pindex,index){
        $scope.personalDetails[pindex].machineDetails.splice(index,1);
        $scope.calculate($scope.personalDetails[pindex]);
        // $('#qpmm_mm_id').focus();
    };

    $scope.calculate=function(obj){
      obj.dtm_total_cost=0;
      $scope.quotation.qm_total_cost = 0;
      angular.forEach(obj.machineDetails, function(value,key){

      value.qpmm_total= parseFloat(parseFloat(value.qpmm_mm_id.mm_price) * parseFloat(value.qpmm_mm_hr));
        obj.dtm_total_cost=obj.dtm_total_cost + value.qpmm_total;
      });
      angular.forEach($scope.personalDetails, function(value,key){
        $scope.quotation.qm_total_cost=parseFloat($scope.quotation.qm_total_cost + value.dtm_total_cost);
      });
    };


    //design details on typeahead select
    $scope.getDesignDetails=function(){
        $scope.personalDetails=[];
        $http({
              method: 'GET',
              url: $rootScope.baseURL+'/design/details/'+$scope.quotation.qm_dm_id.dm_id,
              headers: {'Content-Type': 'application/json',
                      'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
            })
            .success(function(design)
            {     

                 design.forEach(function(value,key){
                  value.machineDetails = [];
                  value.qpmm_mm_hr = 0;
                  value.dtm_total_cost = 0;
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
                  $('#btnsave').text("Save");
                  $('#btnsave').removeAttr('disabled');
                      dialog.modal('hide'); 
                  }, 1500);            
            });
    };


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

    $scope.getSearchMachine = function(vals) {
      var searchTerms = {search: vals};
        const httpOptions = {
            headers: {
              'Content-Type':  'application/json',
              'Authorization': 'Bearer '+localStorage.getItem("unitech_admin_access_token")
            }
        };
        return $http.post($rootScope.baseURL+'/machine/typeahead/search', searchTerms, httpOptions).then((result) => {
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
              $scope.quotation.qm_date = $('#qm_date').val();
          }
    });


    $scope.printDetails = function(){

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
                                "<td colspan='2'>To: <strong>"+$scope.quotation.qm_dm_id.cm_name+" ("+$scope.quotation.qm_dm_id.cm_address+")</strong></td>"+
                              "</tr>" +
                              "<tr>" +
                                "<td>Date : <strong>"+$filter('date')($scope.quotation.qm_date,'mediumDate')+"</strong></td>" +
                                "<td>Reference : <strong>"+$scope.quotation.qm_ref+"</strong></td>" +
                              "</tr>" +
                              "<tr>" +
                                "<td>Design No : <strong>"+$scope.quotation.qm_dm_id.dm_design_no+"</strong></td>" +
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


    };

});