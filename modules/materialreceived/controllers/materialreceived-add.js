// import admin
angular.module('materialreceived').controller('materialreceivedAddCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {

  $scope.materialreceived = {};

	$scope.apiURL = $rootScope.baseURL+'/materialreceived/add';
  $scope.materialreceived.mrm_quantity=0;
  $scope.materialreceived.mrm_amount=0;

  var d = new Date();
    var yyyy = d.getFullYear().toString();
    var mm = (d.getMonth()).toString(); // getMonth() is zero-based
    var dd  = d.getDate().toString();
    $scope.materialreceived.mrm_mat_date = yyyy +"-"+ (parseInt(mm)+parseInt(1)) +"-"+ dd;

  $scope.finalList = [];  

  // Role Permission
   // var permission=JSON.parse(localStorage.getItem('permission'));
   //    var value = '#/materialreceived/add';
   //    var access = permission.includes(value);
   //      $scope.getrolepermission=function(){
          
   //        // for(var i=0;i<permission.length;i++)
   //        // {
   //          if(access)
   //          {
   //            return true
   //          }
   //          else
   //          {
   //             var dialog = bootbox.dialog({
   //            message: '<p class="text-center">You Are Not Authorized</p>',
   //                closeButton: false
   //            });
   //            dialog.find('.modal-body').addClass("btn-danger");
   //            setTimeout(function(){
   //                dialog.modal('hide'); 
   //            }, 1500);
   //            $location.path('/')

   //          }
   //      /*
   //      break;
   //    }*/

   //  };
   //  $scope.getrolepermission();

  // Auto Generate Serial Number for materialreceived
      $scope.getSerial = function(){
        
        $http({
                method: 'POST',
                url:  $rootScope.baseURL+'/materialreceived/serial/no',
                headers: {'Content-Type':'application/json',
                        'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
              })
              .success(function(login)
              {   
                if (login.length > 0) {
                  $scope.materialreceived.mrm_no = parseInt(login[0].mrm_no)+1;
                }  
                else{
                  $scope.materialreceived.mrm_no = 1;
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


    $scope.addMaterialReceived = function () {
      	var nameRegex = /^\d+$/;
        var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    
        if($('#mrm_pom_id').val() == undefined || $('#mrm_pom_id').val() == "" || $scope.materialreceived.mrm_pom_id.pom_id == undefined ){
            var dialog = bootbox.dialog({
              message: "<p class='text-center'>Please Enter Purchase Order Number!</p>",
                  closeButton: false
              }); 
              dialog.find('.modal-body').addClass("btn-danger");
              setTimeout(function(){
                  dialog.modal('hide'); 
              $('#mrm_pom_id').focus();
              }, 1500);
        }
        else if($('#mrm_mat_date').val() == undefined || $('#mrm_mat_date').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter Material Received Date!</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide');
                $('#mrm_mat_date').focus(); 
            }, 1500);
        }
        else if($scope.materialreceived.mrm_amount == 'NaN'){
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
              materialreceived : $scope.materialreceived,
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
                  message: '<p class="text-center">Material Received Added Successfully!</p>',
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
    $scope.getSearchPurchaseOrder = function(vals) {
        var searchTerms = {search: vals};
        const httpOptions = {
            headers: {
              'Content-Type':  'application/json',
              'Authorization': 'Bearer '+localStorage.getItem("unitech_admin_access_token")
            }
        };
        return $http.post($rootScope.baseURL +'/purchaseorder/typeahead/search', searchTerms, httpOptions).then((result) => {
            return result.data;
        });
    };
    $scope.getPurchaseOrderDetails = function() {
      $scope.materialDetails = [];
          $http({
            method: 'GET',
            url: $rootScope.baseURL+'/purchaseorder/details/' +$scope.materialreceived.mrm_pom_id.pom_id,
            //data: $scope.data,
            headers: {'Content-Type': 'application/json',
                    'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
          })
          .success(function(obj)
          {   
              obj.forEach(function(value, key){
                value.mrpm_cost = value.popm_cost;
                value.mrpm_quantity = value.popm_quantity;
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
  

    $scope.calculate = function(){
        $scope.materialreceived.mrm_quantity=0;
        $scope.materialreceived.mrm_amount=0;
        // var i = 1;

        angular.forEach($scope.finalList, function(value,key){
          $scope.materialreceived.mrm_quantity=parseFloat(parseFloat($scope.materialreceived.mrm_quantity) + parseFloat(value.mrpm_quantity));
          $scope.materialreceived.mrm_amount=parseFloat(parseFloat($scope.materialreceived.mrm_amount) + parseFloat(parseFloat(value.mrpm_quantity)* parseFloat(value.mrpm_cost))).toFixed(2);
         // value.srno = i++;
        });  
    };
    // checkBox
    $scope.checkBox = function(index){ 
        if($scope.materialDetails[index].mrpm_check){
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
    $("#mrm_cust").keydown(function(objEvent) {
        if (objEvent.keyCode == 9) {  //tab pressed
            objEvent.preventDefault(); // stops its action
        }
    })


    //date P.O Date
    $('#mrm_mat_date').datepicker({
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
              $scope.materialreceived.mrm_mat_date = $('#mrm_mat_date').val();
          }
    });
    

});