// import admin
angular.module('purchaseorder').controller('purchaseorderAddCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {

  $scope.purchaseorder = {};

	$scope.apiURL = $rootScope.baseURL+'/purchaseorder/add';
  $scope.purchaseorder.pom_quantity=0;
  $scope.purchaseorder.pom_amount=0;

  var d = new Date();
    var yyyy = d.getFullYear().toString();
    var mm = (d.getMonth()).toString(); // getMonth() is zero-based
    var dd  = d.getDate().toString();
    $scope.purchaseorder.pom_date = yyyy +"-"+ (parseInt(mm)+parseInt(1)) +"-"+ dd;

  $scope.finalList = [];  
  $('#pom_fqm_id').focus();

  // Role Permission
   var permission=JSON.parse(localStorage.getItem('permission'));
      var value = '#/purchaseorder/add';
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

  // Auto Generate Serial Number for purchaseorder
      $scope.getSerial = function(){
        
        $http({
                method: 'POST',
                url:  $rootScope.baseURL+'/purchaseorder/serial/no',
                headers: {'Content-Type':'application/json',
                        'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
              })
              .success(function(login)
              {   
                if (login.length > 0) {
                  $scope.purchaseorder.pom_no = parseInt(login[0].pom_no)+1;
                }  
                else{
                  $scope.purchaseorder.pom_no = 1;
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


    $scope.addPurchaseorder = function () {
      	var nameRegex = /^\d+$/;
        var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    
        if($('#pom_fqm_id').val() == undefined || $('#pom_fqm_id').val() == "" || $scope.purchaseorder.pom_fqm_id.fqm_id == undefined ){
            var dialog = bootbox.dialog({
              message: "<p class='text-center'>Please Enter Final Quotation Number!</p>",
                  closeButton: false
              }); 
              dialog.find('.modal-body').addClass("btn-danger");
              setTimeout(function(){
                  dialog.modal('hide'); 
              $('#pom_fqm_id').focus();
              }, 1500);
        }
        else if($('#pom_date').val() == undefined || $('#pom_date').val() == ""){
            var dialog = bootbox.dialog({
            message: "<p class='text-center'>Please Enter PurchaseOrder Date!</p>",
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide');
                $('#pom_date').focus(); 
            }, 1500);
        }
        else if($('#pom_sm_id').val() == undefined || $('#pom_sm_id').val() == "" || $scope.purchaseorder.pom_sm_id.sm_id == undefined ){
            var dialog = bootbox.dialog({
              message: "<p class='text-center'>Please Enter Supplier Name!</p>",
                  closeButton: false
              }); 
              dialog.find('.modal-body').addClass("btn-danger");
              setTimeout(function(){
                  dialog.modal('hide'); 
              $('#pom_sm_id').focus();
              }, 1500);
        }
        else if($('#pom_expected_date').val() == undefined || $('#pom_expected_date').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter Expected Date!</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide');
                $('#pom_expected_date').focus(); 
            }, 1500);
        }
        else if($scope.purchaseorder.pom_amount == 'NaN'){
            var dialog = bootbox.dialog({
            message: "<p class='text-center'>Please Update The Quantity Or the Material Cost!</p>",
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide');
            }, 1500);
        }
        else if( $scope.finalList.length == 0 ){
            var dialog = bootbox.dialog({
            message: "<p class='text-center'>Atleast 1 list to be present!</p>",
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

            $scope.obj={
              purchaseorder : $scope.purchaseorder,
              purchaseMultipleData : $scope.finalList
            }
            $http({
              method: 'POST',
              url: $scope.apiURL,
              data: $scope.obj,
              headers: {'Content-Type': 'application/json',
                      'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
            })
            .success(function(login)
            {   
                var dialog = bootbox.dialog({
                  message: '<p class="text-center">Purchase Order Added Successfully!</p>',
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

   
  //typeahead Quotation list record for Customer Name input
    $scope.getSearchFinalQuotation = function(vals) {
        var searchTerms = {search: vals};
        const httpOptions = {
            headers: {
              'Content-Type':  'application/json',
              'Authorization': 'Bearer '+localStorage.getItem("unitech_admin_access_token")
            }
        };
        return $http.post($rootScope.baseURL +'/finalquotation/typeahead/search', searchTerms, httpOptions).then((result) => {
            return result.data;
        });
    };
    $scope.getFinalQuotationDetails = function() {
      $scope.materialDetails = [];
          $http({
            method: 'GET',
            url: $rootScope.baseURL+'/finalquotation/details/' +$scope.purchaseorder.pom_fqm_id.fqm_id,
            //data: $scope.data,
            headers: {'Content-Type': 'application/json',
                    'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
          })
          .success(function(obj)
          {   
              obj.forEach(function(value, key){
                value.popm_cost = value.qpm_material_cost;
                value.popm_quantity = value.fqpm_quantity;
                $scope.materialDetails.push(value);
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
  
  //typeahead customer list record for Customer Name input
    $scope.getSearchSupplier = function(vals) {
        var searchTerms = {search: vals};
        const httpOptions = {
            headers: {
              'Content-Type':  'application/json',
              'Authorization': 'Bearer '+localStorage.getItem("unitech_admin_access_token")
            }
        };
        return $http.post($rootScope.baseURL+'/supplier/typeahead/search', searchTerms, httpOptions).then((result) => {
            return result.data;
        });
    };

    $scope.calculate = function(){
        $scope.purchaseorder.pom_quantity=0;
        $scope.purchaseorder.pom_amount=0;
        // var i = 1;

        angular.forEach($scope.finalList, function(value,key){
          $scope.purchaseorder.pom_quantity=parseFloat(parseFloat($scope.purchaseorder.pom_quantity) + parseFloat(value.popm_quantity));
          $scope.purchaseorder.pom_amount=parseFloat(parseFloat($scope.purchaseorder.pom_amount) + parseFloat(parseFloat(value.popm_quantity)* parseFloat(value.popm_cost))).toFixed(2);
         // value.srno = i++;
        });  

        console.log($scope.purchaseorder.pom_quantity);
        console.log($scope.purchaseorder.pom_amount);
    };
    // checkBox
    $scope.checkBox = function(index){ 

        if($scope.materialDetails[index].popm_check){
            $scope.finalList.push($scope.materialDetails[index]);
            $scope.calculate();
        }
        else{
           $scope.finalList.forEach(function(value, key){
            if(value.qpm_id == $scope.materialDetails[index].qpm_id)
                $scope.finalList.splice(key,1);
          });

            $scope.calculate();
        } 

    };

  // tab key
    $("#pom_no").keydown(function(objEvent) {
        if (objEvent.keyCode == 9) {  //tab pressed
            objEvent.preventDefault(); // stops its action
        }
    })

    //date P.O Date
    $('#pom_date').datepicker({
          validateOnBlur: false,
          todayButton: false,
          timepicker: false,
          scrollInput: false,
          format: 'yyyy-mm-dd',
          autoclose: true,
          orientation: 'bottom',
          // minDate: (parseInt(new Date().getFullYear()) - 100) + '/01/01',// minimum date(for today use 0 or -1970/01/01)
          // maxDate: (parseInt(new Date().getFullYear()) - 18) + '/01/01',//maximum date calendar
          onChangeDateTime: function (dp, $input) {
              $scope.purchaseorder.pom_date = $('#pom_date').val();
          }
    });
    
      //date P.O Date
    $('#pom_expected_date').datepicker({
          validateOnBlur: false,
          todayButton: false,
          timepicker: false,
          scrollInput: false,
          format: 'yyyy-mm-dd',
          autoclose: true,
          orientation: 'bottom',
          // minDate: (parseInt(new Date().getFullYear()) - 100) + '/01/01',// minimum date(for today use 0 or -1970/01/01)
          // maxDate: (parseInt(new Date().getFullYear()) - 18) + '/01/01',//maximum date calendar
          onChangeDateTime: function (dp, $input) {
              $scope.purchaseorder.pom_expected_date = $('#pom_expected_date').val();
          }
    });
});