// import admin
angular.module('customerpo').controller('customerpoAddCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {

  $scope.customerpo = {};
  $scope.customerpo.fqm_quantity=0;
  $scope.customerpo.fqm_amount=0;

	$scope.apiURL = $rootScope.baseURL+'/finalquotation/add';

    var d = new Date();
    var yyyy = d.getFullYear().toString();
    var mm = (d.getMonth()).toString(); // getMonth() is zero-based
    var dd  = d.getDate().toString();
    $scope.customerpo.fqm_date = yyyy +"-"+ (parseInt(mm)+parseInt(1)) +"-"+ dd;

    $scope.finalList = [];
    $('#fqm_qm_id').focus();

  // // Role Permission
  //  var permission=JSON.parse(localStorage.getItem('permission'));
  //     var value = '#/customerpo/add';
  //     var access = permission.includes(value);
  //       $scope.getrolepermission=function(){
          
  //         // for(var i=0;i<permission.length;i++)
  //         // {
  //           if(access)
  //           {
  //             return true
  //           }
  //           else
  //           {
  //              var dialog = bootbox.dialog({
  //             message: '<p class="text-center">You Are Not Authorized</p>',
  //                 closeButton: false
  //             });
  //             dialog.find('.modal-body').addClass("btn-danger");
  //             setTimeout(function(){
  //                 dialog.modal('hide'); 
  //             }, 1500);
  //             $location.path('/')

  //           }
  //       /*
  //       break;
  //     }*/

  //   };
  //   $scope.getrolepermission();

  // Auto Generate Serial Number for customerpo
    $scope.getSerial = function(){
        $http({
              method: 'POST',
              url:  $rootScope.baseURL+'/finalquotation/serial/no',
              headers: {'Content-Type':'application/json',
                      'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
            })
            .success(function(login)
            {   
              if (login.length > 0) {
                $scope.customerpo.fqm_no = parseInt(login[0].fqm_no)+1;
              }  
              else{
                $scope.customerpo.fqm_no = 1;
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

    $scope.addcustomerpo = function () {
      	var nameRegex = /^\d+$/;
        var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    
        if($('#fqm_qm_id').val() == undefined || $('#fqm_qm_id').val() == "" || $scope.customerpo.fqm_qm_id.qm_id == undefined ){
            var dialog = bootbox.dialog({
              message: "<p class='text-center'>Please Enter Quotation Number!</p>",
                  closeButton: false
              }); 
              dialog.find('.modal-body').addClass("btn-danger");
              setTimeout(function(){
                  dialog.modal('hide'); 
              $('#fqm_qm_id').focus();
              }, 1500);
        }
        else if($('#fqm_date').val() == undefined || $('#fqm_date').val() == ""){
            var dialog = bootbox.dialog({
            message: "<p class='text-center'>Please Select P.O Date!</p>",
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide');
                $('#fqm_date').focus(); 
            }, 1500);
        }
        else if($('#fqm_po_no').val() == undefined || $('#fqm_po_no').val() == ""){
            var dialog = bootbox.dialog({
            message: "<p class='text-center'>Please Select Customer's P.O Number!</p>",
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide');
                $('#fqm_po_no').focus(); 
            }, 1500);
        }
        else if($('#fqm_po_date').val() == undefined || $('#fqm_po_date').val() == ""){
            var dialog = bootbox.dialog({
            message: "<p class='text-center'>Please Select Customer's P.O Date!</p>",
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide');
                $('#fqm_po_date').focus(); 
            }, 1500);
        }
        else if($('#fqm_dispatch_date').val() == undefined || $('#fqm_dispatch_date').val() == ""){
            var dialog = bootbox.dialog({
            message: "<p class='text-center'>Please Select Dispatch Date!</p>",
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide');
                $('#fqm_dispatch_date').focus(); 
            }, 1500);
        }
        else if( $scope.customerpo.fqm_amount == 'NaN' ){
            var dialog = bootbox.dialog({
            message: "<p class='text-center'>Please Update The Quantity!</p>",
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
              finalquotation : $scope.customerpo,
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
                  message: '<p class="text-center">Final Quotation Added Successfully!</p>',
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
    $scope.getSearchQuotation = function(vals) {
        var searchTerms = {search: vals};
        const httpOptions = {
            headers: {
              'Content-Type':  'application/json',
              'Authorization': 'Bearer '+localStorage.getItem("unitech_admin_access_token")
            }
        };
        return $http.post($rootScope.baseURL +'/quotation/typeahead/search', searchTerms, httpOptions).then((result) => {
            return result.data;
        });
    };

    $scope.getQuotationDetails = function() {
      $scope.materialDetails = [];
          $http({
            method: 'GET',
            url: $rootScope.baseURL+'/quotation/details/' +$scope.customerpo.fqm_qm_id.qm_id,
            //data: $scope.data,
            headers: {'Content-Type': 'application/json',
                    'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
          })
          .success(function(obj)
          {   
              obj.forEach(function(value, key){
                value.fqpm_quantity = value.qpm_qty;
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
        $scope.customerpo.fqm_quantity=0;
        $scope.customerpo.fqm_amount=0;
        // var i = 1;

        angular.forEach($scope.finalList, function(value,key){
          $scope.customerpo.fqm_quantity=parseFloat(parseFloat($scope.customerpo.fqm_quantity) + parseFloat(value.fqpm_quantity));
          $scope.customerpo.fqm_amount=parseFloat(parseFloat($scope.customerpo.fqm_amount) + parseFloat(parseFloat(value.fqpm_quantity)* parseFloat(value.qpm_cost_pc))).toFixed(2);
         // value.srno = i++;

        console.log(value);
        });  

    };

    
    // $scope.checkBox = function(test,views,index){
    //     if(test){

    //   console.log(index);
    //         $scope.finalList.push(views);
    //         console.log($scope.finalList);
    //     }
    //     else{

    //   console.log(index);
    //        $scope.finalList.splice(index,1);
            
    //          console.log($scope.finalList);
    //     } 
     
    // };

// checkBox
    $scope.checkBox = function(index){ 

        if($scope.materialDetails[index].qpm_check){
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
    $("#fqm_no").keydown(function(objEvent) {
        if (objEvent.keyCode == 9) {  //tab pressed
            objEvent.preventDefault(); // stops its action
        }
    })

    //date P.O Date
    $('#fqm_date').datepicker({
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
              $scope.customerpo.fqm_date = $('#fqm_date').val();
          }
    });
        //date P.O Date
    $('#fqm_po_date').datepicker({
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
              $scope.customerpo.fqm_po_date = $('#fqm_po_date').val();
          }
    });
         //date cpm_dispatch_date
    $('#fqm_dispatch_date').datepicker({
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
              $scope.customerpo.fqm_dispatch_date = $('#fqm_dispatch_date').val();
          }
    });

        // //Quotation list record for Quotation Name input
    // $scope.getSearchQuotation = function(vals) {
    //   var searchTerms = {search: vals};
    //     const httpOptions = {
    //         headers: {
    //           'Content-Type':  'application/json',
    //           'Authorization': 'Bearer '+localStorage.getItem("unitech_admin_access_token")
    //         }
    //     };
    //     return $http.post($rootScope.baseURL+'/quotation/typeahead/search', searchTerms, httpOptions).then((result) => {
    //         return result.data;
    //     });
    // };



});