// import admin
angular.module('bill').controller('billAddCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {

  $scope.bill = {};

	$scope.apiURL = $rootScope.baseURL+'/bill/add';
    $('#bm_qm_id').focus();


     var permission=JSON.parse(localStorage.getItem('permission'));
      var value = '#/bill/add';
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

    var d = new Date();
    var yyyy = d.getFullYear().toString();
    var mm = (d.getMonth()).toString(); // getMonth() is zero-based
    var dd  = d.getDate().toString();
    $scope.bill.bm_date = yyyy +"-"+ (parseInt(mm)+parseInt(1)) +"-"+ dd;

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


      // Auto Generate Serial Number for Bill
      $scope.getSerial = function(){
        
        $http({
                method: 'POST',
                url:  $rootScope.baseURL+'/bill/serial/no',
                headers: {'Content-Type':'application/json',
                        'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
              })
              .success(function(login)
              {   
                if (login.length > 0) {
                  $scope.bill.bm_invoice_no = parseInt(login[0].bm_invoice_no)+1;
                }  
                else{
                  $scope.bill.bm_invoice_no = 1;
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

    $scope.getQuotationDetails = function(){
        $scope.viewDetails=[];
        $http({
          method: 'GET',
          url: $rootScope.baseURL+'/quotation/details/'+ $scope.bill.bm_qm_id.qm_id,
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
              $scope.bill.bm_date = $('#bm_date').val();
          }
    });
});