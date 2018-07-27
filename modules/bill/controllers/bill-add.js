// import admin
angular.module('bill').controller('billAddCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {

  $scope.bill = {};

	$scope.apiURL = $rootScope.baseURL+'/bill/add';
    $('#bm_qm_id').focus();

    $scope.addBill = function () {
		  var nameRegex = /^\d+$/;
  		var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    
        if($('#bm_qm_id').val() == undefined || $('#bm_qm_id').val() == "" || $scope.bill.bm_qm_id == undefined){
	    	var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter The Quatation Number!</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            $('#bm_qm_id').focus();
            }, 1500);
	      }
  	    else if($('#bm_invoice_no').val() == undefined || $('#bm_invoice_no').val() == ""){
          var dialog = bootbox.dialog({
              message: '<p class="text-center">Please Enter The Invoice Number!</p>',
                  closeButton: false
              });
              dialog.find('.modal-body').addClass("btn-danger");
              setTimeout(function(){
                  dialog.modal('hide'); 
              $('#bm_invoice_no').focus();
              }, 1500);
        }
        else if($('#bm_cm_id').val() == undefined || $('#bm_cm_id').val() == "" || $scope.bill.bm_cm_id == undefined){
          var dialog = bootbox.dialog({
              message: '<p class="text-center">Please Enter The Customer Name!</p>',
                  closeButton: false
              });
              dialog.find('.modal-body').addClass("btn-danger");
              setTimeout(function(){
                  dialog.modal('hide'); 
                  $('#bm_cm_id').focus();
              }, 1500);
        }
        else if($('#bm_date').val() == undefined || $('#bm_date').val() == ""){
          var dialog = bootbox.dialog({
              message: '<p class="text-center">Please Enter The Date!</p>',
                  closeButton: false
              });
              dialog.find('.modal-body').addClass("btn-danger");
              setTimeout(function(){
                  dialog.modal('hide');
                  $('#bm_date').focus(); 
              }, 1500);
        }
        else{
            $('#btnsave').attr('disabled','true');
            $('#btnsave').text("please wait...");

                    $scope.pruchaseForm = {
                    bill : $scope.bill
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
                          message: '<p class="text-center">Bill Added Successfully!</p>',
                              closeButton: false
                          });
                          dialog.find('.modal-body').addClass("btn-success");
                          setTimeout(function(){
                              dialog.modal('hide'); 
                          }, 1500);

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

  // Bill Of Material ADD/Remove
    $scope.personalDetails = [];    
        $scope.addNew = function(personalDetail){
            $scope.personalDetails.push({ 
                'bm_part_no': "", 
                'bm_part_name': "",
                'bm_qty': "",
                'bm_cost': "",
                'bm_total_cost': "",
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

    //Quotation list record for Quotation Name input
    $scope.getSearchQuotation = function(vals) {
      var searchTerms = {search: vals};
        const httpOptions = {
            headers: {
              'Content-Type':  'application/json',
              'Authorization': 'Bearer '+localStorage.getItem("unitech_admin_access_token")
            }
        };
        return $http.post($rootScope.baseURL+'/quotation/typeahead/search', searchTerms, httpOptions).then((result) => {
            return result.data;
        });
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

    //date for Date
    $('#bm_date').datepicker({
          validateOnBlur: false,
          todayButton: false,
          timepicker: false,
          scrollInput: false,
          format: 'yyyy-mm-dd',
          autoclose: true,
          /*minDate: (parseInt(new Date().getFullYear()) - 100) + '/01/01',// minimum date(for today use 0 or -1970/01/01)
          maxDate: (parseInt(new Date().getFullYear()) - 18) + '/01/01',//maximum date calendar*/
          onChangeDateTime: function (dp, $input) {
              $scope.design.bm_date = $('#bm_date').val();
          }
    });
});