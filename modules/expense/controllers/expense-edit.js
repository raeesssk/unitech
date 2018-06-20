// import admin
angular.module('expense').controller('expenseEditCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route, $filter) {

  $('#dashboardindex').removeClass("active");
  $('#customerindex').removeClass("active");
  $('#customeraddindex').removeClass("active");
  $('#customerlsitindex').removeClass("active");
  $('#productindex').removeClass("active");
  $('#productaddindex').removeClass("active");
  $('#productlsitindex').removeClass("active");
  $('#invoiceindex').removeClass("active");
  $('#invoiceaddindex').removeClass("active");
  $('#invoicelistindex').removeClass("active");
  $('#cashbookaddindex').removeClass("active");
  $('#reportindex').removeClass("active");
  $('#reportinvoiceindex').removeClass("active");
  $('#cashbookindex').addClass("active");
  $('#cashbooklistindex').addClass("active");
  
    $('#cheq').hide();

    $scope.emId = $routeParams.emId;

    $('#dateExpense').datepicker({
        validateOnBlur: false,
        todayButton: false,
        timepicker: false,
        scrollInput: false,
        format: 'yyyy-mm-dd',
        autoclose: true,
        /*minDate: (parseInt(new Date().getFullYear()) - 100) + '/01/01',// minimum date(for today use 0 or -1970/01/01)
        maxDate: (parseInt(new Date().getFullYear()) - 18) + '/01/01',//maximum date calendar*/
        onChangeDateTime: function (dp, $input) {
            $scope.expense.em_date = $('#dateExpense').val();
            // $('#end-date-picker').val(endDate); 
        }
    });

    $('#em_cheque_date').datepicker({
        validateOnBlur: false,
        todayButton: false,
        timepicker: false,
        scrollInput: false,
        format: 'yyyy-mm-dd',
        autoclose: true,
        /*minDate: (parseInt(new Date().getFullYear()) - 100) + '/01/01',// minimum date(for today use 0 or -1970/01/01)
        maxDate: (parseInt(new Date().getFullYear()) - 18) + '/01/01',//maximum date calendar*/
        onChangeDateTime: function (dp, $input) {
            $scope.expense.em_cheque_date = $('#em_cheque_date').val();
            // $('#end-date-picker').val(endDate); 
        }
    });

    $scope.getExpenseList = function() {
        $scope.apiURL = $rootScope.baseURL+'/expense/'+$scope.emId;
        $http({
          method: 'GET',
          url: $scope.apiURL,
          headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
        })
        .success(function(expense)
        {
            expense.forEach(function (value, key) {
                value.em_date = $filter('date')(value.em_date, "mediumDate");
                if(value.em_payment_mode == "Cheque"){
                    $('#cheq').show();
                    value.em_cheque_date = $filter('date')(value.em_cheque_date, "mediumDate");
                }
                value.old_em_amount = value.em_credit;
                value.em_amount= value.em_credit;
                $scope.expense = value;
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
    $scope.getExpenseList();

    $scope.chequeShow = function(){
        if ($scope.expense.em_payment_mode == "Cheque") {
            $('#cheq').show();
        }
        else{
            $('#cheq').hide();
        }
    }

    $scope.addExpense = function () {

        var nameRegex = /^\d+$/;
        var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var numRegex = /^\d+(\.\d{1,2})?$/;
        
        if($('#dateExpense').val() == undefined || $('#dateExpense').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please select date.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else if($('#em_received_by').val() == undefined || $('#em_received_by').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter received by or N/A.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else if($('#em_comment').val() == undefined || $('#em_comment').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter comment or N/A.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else if($scope.expense.em_payment_mode == undefined || $scope.expense.em_payment_mode == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please select payment mode.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else if($('#em_amount').val() == undefined || $('#em_amount').val() == "" || !numRegex.test($('#em_amount').val())){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter amount.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else if($scope.expense.em_payment_mode === "Cheque" && ($('#em_cheque_no').val() == undefined || $('#em_cheque_no').val() == "" || $('#em_cheque_no').val().length < 6 || !nameRegex.test($('#em_cheque_no').val()))){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter a valid cheque no.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else if($scope.expense.em_payment_mode === "Cheque" && ($('#em_cheque_date').val() == undefined || $('#em_cheque_date').val() == "")){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please select cheque date.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else{
            // $scope.expenseForm = {
            //     expenseSingleData : $scope.expense,
            //     expenseMultipleData : $scope.selectedPurchaseList,
            //     expenseMultipleDataSale : $scope.selectedSalesList
            // };
    	    
            $scope.apiURL = $rootScope.baseURL+'/expense/edit/'+$scope.emId;
    	    $http({
    	      method: 'POST',
    	      url: $scope.apiURL,
    	      data: $scope.expense,
    	      headers: {'Content-Type': 'application/json',
                      'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
    	    })
    	    .success(function(login)
    	    {
    	       window.location.href = '#/expense';  
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
        }
	};

});