// import admin
angular.module('bill').controller('billAddCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {

    $scope.bill = {};

    // $scope.bill.cm_mobile = "N/A";

    
  $scope.apiURL = $rootScope.baseURL+'/bill/add';
    $scope.addBill = function () {
    var nameRegex = /^\d+$/;
      var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      
        if($('#cm_name').val() == undefined || $('#cm_name').val() == ""){
        var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter name.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
      }
      else if($('#cm_mobile').val() == undefined || $('#cm_mobile').val() == ""){
        var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter Mobile no.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
      }
      // else if(!nameRegex.test($('#cm_mobile').val())){
      //  var dialog = bootbox.dialog({
     //        message: '<p class="text-center">please enter Mobile no. in digits</p>',
     //            closeButton: false
     //        });
     //        dialog.find('.modal-body').addClass("btn-danger");
     //        setTimeout(function(){
     //            dialog.modal('hide'); 
     //        }, 1500);
      // }
      // else if($('#cm_mobile').val().length < 10){
      //  var dialog = bootbox.dialog({
     //        message: '<p class="text-center">please enter a valid Mobile no.</p>',
     //            closeButton: false
     //        });
     //        dialog.find('.modal-body').addClass("btn-danger");
     //        setTimeout(function(){
     //            dialog.modal('hide'); 
     //        }, 1500);
      // }
      else if($('#cm_email').val() == undefined || $('#cm_email').val() == ""){
        var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter email id.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
      }
        else if($('#cm_address').val() == undefined || $('#cm_address').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter address.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else if($('#cm_gst').val() == undefined || $('#cm_gst').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter GSTIN.</p>',
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

                $http({
                  method: 'GET',
                  url: $rootScope.baseURL+'/customer/code/no',
                  //data: $scope.data,
                  headers: {'Content-Type': 'application/json',
                          'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
                })
                .success(function(orderno)
                {
                    if(orderno.length >0)
                        $scope.customer.cm_code = parseInt(orderno[0].cm_code) + 1;
                    else
                        $scope.customer.cm_code = 1;

                    $scope.customer.cm_debit = 0;
                    $scope.customer.cm_balance = 0;
                    $http({
                      method: 'POST',
                      url: $scope.apiURL,
                      data: $scope.customer,
                      headers: {'Content-Type': 'application/json',
                              'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
                    })
                    .success(function(login)
                    {
                        $('#btnsave').text("SAVE");
                        $('#btnsave').removeAttr('disabled');
                       window.location.href = '#/customer';  
                    })
                    .error(function(data) 
                    {   
                      var dialog = bootbox.dialog({
                        message: '<p class="text-center">Oops, Something Went Wrong! Please Refresh the Page.</p>',
                            closeButton: false
                        });
                        setTimeout(function(){
                        $('#btnsave').text("SAVE");
                        $('#btnsave').removeAttr('disabled');
                            dialog.modal('hide'); 
                        }, 1500);            
                    });
                })
                .error(function(data) 
                {   
                    var dialog = bootbox.dialog({
                    message: '<p class="text-center">Oops, Something Went Wrong!</p>',
                        closeButton: false
                    });
                    setTimeout(function(){
                        $('#btnsave').text("SAVE");
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
                'dm_part_no': "", 
                'dm_part_name': "",
                'dm_qty': "",
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
});