// import admin
angular.module('invoice').controller('invoiceCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route, $filter) {

  $('#dashboardindex').removeClass("active");
  $('#customerindex').removeClass("active");
  $('#customeraddindex').removeClass("active");
  $('#customerlsitindex').removeClass("active");
  $('#productindex').removeClass("active");
  $('#productaddindex').removeClass("active");
  $('#productlsitindex').removeClass("active");
  $('#invoiceaddindex').removeClass("active");
  $('#cashbookindex').removeClass("active");
  $('#cashbookaddindex').removeClass("active");
  $('#cashbooklistindex').removeClass("active");
  $('#reportindex').removeClass("active");
  $('#reportinvoiceindex').removeClass("active");
  $('#invoiceindex').addClass("active");
  $('#invoicelistindex').addClass("active");
  $scope.filteredTodos = [];
    $scope.currentPage = 1;
    $scope.maxSize = 5;
    $scope.entryLimit = 5;
    $scope.filterUser = 0;
    $scope.filterUserend = 1;
    $scope.numPerPage = 10;
    $scope.obj_Main = [];
    $scope.invoiceList = [];
    $scope.loading1 = 0;
    $scope.parseFloat = parseFloat;

$scope.apiURL = $rootScope.baseURL+'/invoice';

   $scope.getAll = function () {
        
      $http({
	      method: 'GET',
	      url: $scope.apiURL,
	      headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")
        }
	    })
	    .success(function(sale)
	    {
	      sale.forEach(function (value, key) {
                  $scope.invoiceList.push(value);
              });

              $scope.$watch("currentPage + numPerPage",
                  function () {
                      var begin = (($scope.currentPage - 1) * $scope.numPerPage);
                      var end = begin + $scope.numPerPage;
                      $scope.filterUserend = begin + 1;
                      $scope.filterUser = end;
                      if ($scope.filterUser >= $scope.invoiceList.length)
                          $scope.filterUser = $scope.invoiceList.length;
                      $scope.filteredTodos = $scope.invoiceList.slice(begin, end);
                  });

              $scope.obj_Main = $scope.invoiceList;
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
            }, 1500);           
	    });
    };

   //Pagination Function
    $scope.resetpagination = function () {
        var begin = (($scope.currentPage - 1) * $scope.numPerPage);
        var end = begin + $scope.numPerPage;
        $scope.filterUserend = begin + 1;
        $scope.filterUser = end;
        if ($scope.filterUser >= $scope.invoiceList.length)
            $scope.filterUser = $scope.invoiceList.length;
        $scope.filteredTodos = $scope.invoiceList.slice(begin, end);
    };
    //search Data
    $scope.getSearch = function () {
        $scope.searchtext = $("#searchtext").val();
        $scope.invoiceList = [];
        if ($scope.searchtext !== "") {
            for (var i = 0; i < $scope.obj_Main.length; i++) {
                if (String($scope.obj_Main[i].im_invoice_no).toLowerCase().includes($scope.searchtext.toLowerCase())
                    || String($scope.obj_Main[i].cm_name).toLowerCase().includes($scope.searchtext.toLowerCase())
                    || String($scope.obj_Main[i].cm_address).toLowerCase().includes($scope.searchtext.toLowerCase())
                    || String($scope.obj_Main[i].im_total_amount).toLowerCase().includes($scope.searchtext.toLowerCase())
                    || String($scope.obj_Main[i].im_vehical_no).toLowerCase().includes($scope.searchtext.toLowerCase())
                    || String($filter('date')($scope.obj_Main[i].im_date, "mediumDate")).toLowerCase().includes($scope.searchtext.toLowerCase())
                ) {
                    $scope.invoiceList.push($scope.obj_Main[i]);
                }
            }
        }
        else {
            $scope.invoiceList = [];
            $scope.invoiceList = $scope.obj_Main;
        }
        $scope.resetpagination();
        $scope.$apply();
    };

    $scope.deleteSale = function (sm_id) {
      $scope.sm_id=sm_id;
    }  

    $scope.deleteConfirm = function () {
                $('#del').attr('disabled','true');
                $('#del').text("please wait...");
	     $http({
	      method: 'POST',
	      url: $rootScope.baseURL+'/invoice/delete/'+$scope.sm_id.im_id,
        data: $scope.sm_id,
	      headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
	    })
	    .success(function(saleObj)
	    {
                $('#del').text("Delete");
                $('#del').removeAttr('disabled');
                $scope.invoiceList = [];
                $scope.getAll();
                $('#confirm-delete').modal('hide');
      		  
	    })
	    .error(function(data) 
	    {   
	      var dialog = bootbox.dialog({
            message: '<p class="text-center">Oops, Something Went Wrong! Please Refresh the Page.</p>',
                closeButton: false
            });
            setTimeout(function(){
                $('#del').text("Delete");
                $('#del').removeAttr('disabled');
                dialog.modal('hide'); 
            }, 1500);            
	    });
	};

  $scope.viewQuatationDetails = function (index) {
    
    $scope.saleProductList = [];
      $scope.invoices = $scope.filteredTodos[index];

      $http({
        method: 'GET',
        url: $rootScope.baseURL+'/invoice/details/'+$scope.filteredTodos[index].im_id,
        headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
      })
      .success(function(saleProductList)
      {
         var i = 1;
          saleProductList.forEach(function (value, key) {
              value.srno = i++;
              $scope.saleProductList.push(value);
            });
          $scope.convertNumberToWords($scope.invoices.im_total_amount);
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

    $scope.convertNumberToWords = function (amount) {
        var words = new Array();
        words[0] = '';
        words[1] = 'One';
        words[2] = 'Two';
        words[3] = 'Three';
        words[4] = 'Four';
        words[5] = 'Five';
        words[6] = 'Six';
        words[7] = 'Seven';
        words[8] = 'Eight';
        words[9] = 'Nine';
        words[10] = 'Ten';
        words[11] = 'Eleven';
        words[12] = 'Twelve';
        words[13] = 'Thirteen';
        words[14] = 'Fourteen';
        words[15] = 'Fifteen';
        words[16] = 'Sixteen';
        words[17] = 'Seventeen';
        words[18] = 'Eighteen';
        words[19] = 'Nineteen';
        words[20] = 'Twenty';
        words[30] = 'Thirty';
        words[40] = 'Forty';
        words[50] = 'Fifty';
        words[60] = 'Sixty';
        words[70] = 'Seventy';
        words[80] = 'Eighty';
        words[90] = 'Ninety';
        amount = amount.toString();
        var atemp = amount.split(".");
        var number = atemp[0].split(",").join("");
        var n_length = number.length;
        var words_string = "";
        if (n_length <= 9) {
            var n_array = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
            var received_n_array = new Array();
            for (var i = 0; i < n_length; i++) {
                received_n_array[i] = number.substr(i, 1);
            }
            for (var i = 9 - n_length, j = 0; i < 9; i++, j++) {
                n_array[i] = received_n_array[j];
            }
            for (var i = 0, j = 1; i < 9; i++, j++) {
                if (i == 0 || i == 2 || i == 4 || i == 7) {
                    if (n_array[i] == 1) {
                        n_array[j] = 10 + parseInt(n_array[j]);
                        n_array[i] = 0;
                    }
                }
            }
            value = "";
            for (var i = 0; i < 9; i++) {
                if (i == 0 || i == 2 || i == 4 || i == 7) {
                    value = n_array[i] * 10;
                } else {
                    value = n_array[i];
                }
                if (value != 0) {
                    words_string += words[value] + " ";
                }
                if ((i == 1 && value != 0) || (i == 0 && value != 0 && n_array[i + 1] == 0)) {
                    words_string += "Crores ";
                }
                if ((i == 3 && value != 0) || (i == 2 && value != 0 && n_array[i + 1] == 0)) {
                    words_string += "Lakhs ";
                }
                if ((i == 5 && value != 0) || (i == 4 && value != 0 && n_array[i + 1] == 0)) {
                    words_string += "Thousand ";
                }
                if (i == 6 && value != 0 && (n_array[i + 1] != 0 && n_array[i + 2] != 0)) {
                    words_string += "Hundred and ";
                } else if (i == 6 && value != 0) {
                    words_string += "Hundred ";
                }
            }
            words_string = words_string.split("  ").join(" ");
        }
        $scope.amountinwords = words_string;
    }

    $scope.printDetails = function(){

      if($scope.invoices.im_status == 1){
        var popupWin = window.open('', 'winname','directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,scrollbars=no,resizable=no');
          
        popupWin.document.write("<html>" +
         " <head>" +
            "<link rel='stylesheet' href='./././resources/vendor/bootstrap/css/bootstrap.min.css' />" +
            "<style>.action{display:none;} .print-hide{display:none;}</style>"+
            "<style>@media print {.watermark {display: inline;position: fixed !important;opacity: 0.50;font-size: 100px;width: 100%;text-align: center;z-index: 1000;top:270px;right:5px;}}</style>" +
            "   <style type='text/css' media='print'>" +
            "  @page " +
             " {" +
              "    size:  A4 portrait;" +  /* auto is the initial value */
               "   margin: 0; " + /* this affects the margin in the printer settings */
              "}" +

              "html" +
              "{" +
               "   background-color: #FFFFFF;" + 
                "  margin: 0px; " + /* this affects the margin on the html before sending to printer */
              "}" +

              "body" +
              "{" +
                "font-size:11pt;"+
                "font-family:'Open Sans', sans-serif;"+
               // "   border: solid 1px black ;" +
                "  margin: 5mm 10mm 0mm 7.5mm;" + /* margin you want for the content */
              "}" +
              "</style>" +
          "</head>" +
          "<body onload='window.print()'>" +
            "<div class='watermark'>cancelled</p></div>" +
           "<table width='100%' height='95%'>" +
            "<thead>"+
              "<tr>"+
                "<td colspan='12' style=' border-style: solid; border-width:0px;'>"+
                  "<table width='100%'>"+
                    "<tr>" +
                      "<td colspan='2' style='text-align:left; padding: 10px; border-style: solid solid none solid; border-width:1px; font-size:10pt;' valign='top'>" +
                          "<img src='./././resources/header.png' width='100%' height='100%'>"+
                      "</td>" +
                    "</tr>" +
                    "<tr>" +
                      "<td colspan='2' style='text-align:center; padding: 4px; border-style: solid solid none solid; border-width:1px; font-size:13pt;' valign='top'>" +
                          "<strong>Tax Invoice</strong>"+
                      "</td>" +
                    "</tr>" +
                    "<tr>" +
                      "<td width='60%' style='text-align:left; padding: 4px; border-style: solid solid none solid; border-width:1px; font-size:10pt;' valign='top'>" +
                          "<table width='100%'>"+
                            "<tr>"+
                              "<td  colspan='2' style='text-align:center; padding: 4px; border-style: none none solid none; border-width:1px; font-size:10pt;'>"+
                                "<strong>Bill To Party</strong>"+
                              "</td>"+
                            "</tr>"+
                            "<tr>"+
                              "<td width='30%' style='text-align:left; padding: 4px; border-style: none solid none none; border-width:1px; font-size:10pt;'>"+
                                "Name: "+
                              "</td>"+
                              "<td width='70%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "<strong>"+$scope.invoices.cm_name+"</strong>"+
                              "</td>"+
                            "</tr>"+
                            "<tr>"+
                              "<td width='30%' style='text-align:left; padding: 4px; border-style: none solid none none; border-width:1px; font-size:10pt;'>"+
                                "Address: "+
                              "</td>"+
                              "<td width='70%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "<strong>"+$scope.invoices.cm_address+"</strong>"+
                              "</td>"+
                            "</tr>"+
                            "<tr>"+
                              "<td width='30%' style='text-align:left; padding: 4px; border-style: none solid none none; border-width:1px; font-size:10pt;'>"+
                                "Contact No.: "+
                              "</td>"+
                              "<td width='70%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "<strong>"+$scope.invoices.cm_mobile+"</strong>"+
                              "</td>"+
                            "</tr>"+
                            "<tr>"+
                              "<td width='30%' style='text-align:left; padding: 4px; border-style: none solid none none; border-width:1px; font-size:10pt;'>"+
                                "GSTIN: "+
                              "</td>"+
                              "<td width='70%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "<strong>"+$scope.invoices.cm_gst+"</strong>"+
                              "</td>"+
                            "</tr>"+
                          "</table>"+
                      "</td>" +
                      "<td width='40%' style='text-align:left; padding: 4px; border-style: solid solid none none; border-width:1px; font-size:10pt;' valign='top'>" +
                          "<table width='100%'>"+
                            "<tr>"+
                              "<td width='50%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "Invoice No.: "+
                              "</td>"+
                              "<td width='50%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "<strong>"+$scope.invoices.im_invoice_no+"</strong>"+
                              "</td>"+
                            "</tr>"+
                            "<tr>"+
                              "<td width='50%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "Invoice Date: "+
                              "</td>"+
                              "<td width='50%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "<strong>"+$filter('date')($scope.invoices.im_date, "mediumDate")+"</strong>"+
                              "</td>"+
                            "</tr>"+
                            "<tr>"+
                              "<td width='50%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "Vehical No.: "+
                              "</td>"+
                              "<td width='50%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "<strong>"+$scope.invoices.im_vehical_no+"</strong>"+
                              "</td>"+
                            "</tr>"+
                          "</table>"+
                      "</td>" +
                    "</tr>" +
                  "</table>"+
                "</td>"+
              "</tr>"+
            "</thead>"+
            "<tbody>"+
              "<tr>"+
                "<td colspan='12' valign='top' style=' border-style: solid; border-width:1px;'>"+
                  "<table width='100%'>" +
                    "<thead>"+
                      "<tr>"+      
                        "<th width='5%' rowspan='2' style='text-align:center; padding: 4px; font-size: 10pt; border-style: none solid solid none; border-width:1px;'>Sr.No.</th>" +
                        "<th width='20%' rowspan='2' style='text-align:center; padding: 4px; font-size: 10pt; border-style: none solid solid none; border-width:1px;'>Product Description</th> " +
                        "<th width='5%' rowspan='2' style='text-align:center; padding: 4px; font-size: 10pt; border-style: none solid solid none; border-width:1px;'>HSN Code</th>" +
                        "<th width='5%' rowspan='2' style='text-align:center; padding: 4px; font-size: 10pt; border-style: none solid solid none; border-width:1px;'>Qty</th>"+
                        "<th width='5%' rowspan='2' style='text-align:center; padding: 4px; font-size: 10pt; border-style: none solid solid none; border-width:1px;'>Unit</th>" +
                        "<th width='10%' rowspan='2' style='text-align:center; padding: 4px; font-size: 10pt; border-style: none solid solid none; border-width:1px;'>Rate</th>" +
                        "<th width='10%' rowspan='2' style='text-align:center; padding: 4px; font-size: 10pt; border-style: none solid solid none; border-width:1px;'>Amount</th>" +
                        "<th width='15%' colspan='2' style='text-align:center; padding: 4px; font-size: 10pt; border-style: none solid solid none; border-width:1px;'>SGST</th>" +
                        "<th width='15%' colspan='2' style='text-align:center; padding: 4px; font-size: 10pt; border-style: none solid solid none; border-width:1px;'>CGST</th>" +
                        "<th width='10%' rowspan='2' style='text-align:center; padding: 4px; font-size: 10pt; border-style: none none solid none; border-width:1px;'>Total</th>" +
                      "</tr>"+
                      "<tr>"+      
                        "<th width='5%' style='padding: 4px; text-align:center; font-size: 9pt; border-style: none solid solid none; border-width:1px;'>Rate</th>" +
                        "<th width='10%' style='padding: 4px; text-align:center; font-size: 9pt; border-style: none solid solid none; border-width:1px;'>Amount</th>" +
                        "<th width='5%' style='padding: 4px; text-align:center; font-size: 9pt; border-style: none solid solid none; border-width:1px;'>Rate</th>" +
                        "<th width='10%' style='padding: 4px; text-align:center; font-size: 9pt; border-style: none solid solid none; border-width:1px;'>Amount</th>" +
                      "</tr>"+
                    "</thead>"+
                    " "+$('#content').html()+" " +
                  "</table>"+
                "</td>"+
              "</tr>"+
            "</tbody>"+
            "<tfoot>"+
            "<tr>"+
              "<td width='50%' colspan='6' style='text-align:center; padding:4px; font-size:10pt; border-style: solid solid solid solid; border-width:1px;'><strong>Total</strong></td>"+
              "<td width='10%' style='text-align:center; padding:4px; font-size:10pt; border-style: solid solid solid none; border-width:1px;'>"+$scope.invoices.im_net_amount+"</td>"+
              "<td width='15%' colspan='2' style='text-align:center; padding:4px; font-size:10pt; border-style: solid solid solid none; border-width:1px;'>"+$scope.invoices.im_cgst_amount+"</td>"+
              "<td width='15%' colspan='2' style='text-align:center; padding:4px; font-size:10pt; border-style: solid solid solid none; border-width:1px;'>"+$scope.invoices.im_sgst_amount+"</td>"+
              "<td width='10%' style='text-align:center; padding:4px; font-size:10pt; border-style: solid solid solid none; border-width:1px;'>"+$scope.invoices.im_total_amount+"</td>"+
            "</tr>"+
            "<tr>" +
                  "<td colspan='7' rowspan='2' width='60%' style='padding:4px; font-size:10pt; border-style: none solid solid solid; border-width:1px;'>Amount in words : "+$scope.amountinwords+"</td>" +
                  "<td colspan='4' width='30%' style='padding:4px; font-size:10pt; border-style: none solid solid solid; border-width:1px;'>Total Amount Before Tax</td>" +
                  "<td width='10%' style='padding:4px; font-size:10pt; border-style: none solid none none; border-width:1px;'><strong>"+$filter('number')($scope.invoices.im_net_amount, "2")+"</strong></td>" +
              "</tr>"+
              "<tr>"+
                  "<td colspan='4' width='30%' style='padding:4px; font-size:10pt; border-style: solid; border-width:1px;'>Add: CGST + SGST</td>" +
                  "<td width='10%' style='padding:4px; font-size:10pt; border-style: solid; border-width:1px;'><strong>"+$filter('number')(parseFloat(parseFloat($scope.invoices.im_cgst_amount) + parseFloat($scope.invoices.im_sgst_amount)), "2")+"</strong></td>" +
              "</tr>"+
              "<tr>"+
                  "<td colspan='7' rowspan='2' width='60%' style='padding:4px; font-size:9pt; border-style: none none solid solid; border-width:1px;'>"+
                  "Bank Details : <br>"+
                  "A/C Name : Master Sofa<br>"+
                  "Bank Name : IDBI Bank<br>"+
                  "A/C No.: 0769102000004312<br>"+
                  "IFSC : IBKL0000769<br>"+
                  "Bank Branch : Nibm Road Kondhwa, Pune<br><br>"+
                  "<strong>Terms & Conditions</strong><br>"+
                  "1. Goods once sold shall not be taken back.<br>"+
                  "2. Our responsibility ceases once the goods leave our premises.<br>"+
                  "3. Subject to Pune jurisdiction Only.<br>"+
                  "4. GST No : <strong>27CSJPK1869E1ZI</strong>"+
                  "</td>"+
                  "<td colspan='4' width='30%' style='padding:4px; font-size:10pt; border-style: solid; border-width:1px;'>Total Amount After Tax</td>" +
                  "<td width='10%' style='padding:4px; font-size:10pt; border-style: solid; border-width:1px;'><strong>"+$filter('number')($scope.invoices.im_total_amount, "2")+"</strong></td>" +
              "</tr>"+
              "<tr>"+
                  "<td colspan='5' width='40%' colspan='2' valign='bottom' style='text-align:center; padding:4px; font-size:10pt; border-style: solid solid solid solid; border-width:1px;'><span style='font-size:7pt;'>Ceritified that the particulars given above are true and correct</span><br><strong>for Master Sofa</strong><br><br><br><br><br><br><br><br><br><strong>Authorized Signatory</strong></td>" +
              "</tr>" +
            "</tfoot>"+
          "</table>"+
          "</body>" +
        "</html>");
        popupWin.document.close();
      }
      else{
        var popupWin = window.open('', 'winname','directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,scrollbars=no,resizable=no');
          
        var page1 = "<html>" +
         " <head>" +
            "<link rel='stylesheet' href='./././resources/vendor/bootstrap/css/bootstrap.min.css' />" +
            "<style>.action{display:none;} .print-hide{display:none;}</style>"+
            "   <style type='text/css' media='print'>" +
            "  @page " +
             " {" +
              "    size:  A4 portrait;" +  /* auto is the initial value */
               "   margin: 0; " + /* this affects the margin in the printer settings */
              "}" +

              "html" +
              "{" +
               "   background-color: #FFFFFF;" + 
                "  margin: 0px; " + /* this affects the margin on the html before sending to printer */
              "}" +

              "body" +
              "{" +
                "font-size:11pt;"+
                "font-family:'Open Sans', sans-serif;"+
               // "   border: solid 1px black ;" +
                "  margin: 5mm 10mm 0mm 7.5mm;" + /* margin you want for the content */
              "}" +
              "</style>" +
          "</head>" +
          "<body onload='window.print()'>" +
           "<table width='100%' height='95%'>" +
            "<thead>"+
              "<tr>"+
                "<td colspan='12' style=' border-style: solid; border-width:0px;'>"+
                  "<table width='100%'>"+
                    "<tr>" +
                      "<td colspan='2' style='text-align:left; padding: 10px; border-style: solid solid none solid; border-width:1px; font-size:10pt;' valign='top'>" +
                          "<img src='./././resources/header.png' width='100%' height='100%'>"+
                      "</td>" +
                    "</tr>" +
                    "<tr>" +
                      "<td colspan='2' style='text-align:center; padding: 4px; border-style: solid solid none solid; border-width:1px; font-size:13pt;' valign='top'>" +
                          "<strong>Tax Invoice</strong>"+
                      "</td>" +
                    "</tr>" +
                    "<tr>" +
                      "<td width='60%' style='text-align:left; padding: 4px; border-style: solid solid none solid; border-width:1px; font-size:10pt;' valign='top'>" +
                          "<table width='100%'>"+
                            "<tr>"+
                              "<td  colspan='2' style='text-align:center; padding: 4px; border-style: none none solid none; border-width:1px; font-size:10pt;'>"+
                                "<strong>Bill To Party</strong>"+
                              "</td>"+
                            "</tr>"+
                            "<tr>"+
                              "<td width='30%' style='text-align:left; padding: 4px; border-style: none solid none none; border-width:1px; font-size:10pt;'>"+
                                "Name: "+
                              "</td>"+
                              "<td width='70%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "<strong>"+$scope.invoices.cm_name+"</strong>"+
                              "</td>"+
                            "</tr>"+
                            "<tr>"+
                              "<td width='30%' style='text-align:left; padding: 4px; border-style: none solid none none; border-width:1px; font-size:10pt;'>"+
                                "Address: "+
                              "</td>"+
                              "<td width='70%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "<strong>"+$scope.invoices.cm_address+"</strong>"+
                              "</td>"+
                            "</tr>"+
                            "<tr>"+
                              "<td width='30%' style='text-align:left; padding: 4px; border-style: none solid none none; border-width:1px; font-size:10pt;'>"+
                                "Contact No.: "+
                              "</td>"+
                              "<td width='70%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "<strong>"+$scope.invoices.cm_mobile+"</strong>"+
                              "</td>"+
                            "</tr>"+
                            "<tr>"+
                              "<td width='30%' style='text-align:left; padding: 4px; border-style: none solid none none; border-width:1px; font-size:10pt;'>"+
                                "GSTIN: "+
                              "</td>"+
                              "<td width='70%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "<strong>"+$scope.invoices.cm_gst+"</strong>"+
                              "</td>"+
                            "</tr>"+
                          "</table>"+
                      "</td>" +
                      "<td width='40%' style='text-align:left; padding: 4px; border-style: solid solid none none; border-width:1px; font-size:10pt;' valign='top'>" +
                          "<table width='100%'>"+
                            "<tr>"+
                              "<td width='50%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "Invoice No.: "+
                              "</td>"+
                              "<td width='50%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "<strong>"+$scope.invoices.im_invoice_no+"</strong>"+
                              "</td>"+
                            "</tr>"+
                            "<tr>"+
                              "<td width='50%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "Invoice Date: "+
                              "</td>"+
                              "<td width='50%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "<strong>"+$filter('date')($scope.invoices.im_date, "mediumDate")+"</strong>"+
                              "</td>"+
                            "</tr>"+
                            "<tr>"+
                              "<td width='50%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "Vehical No.: "+
                              "</td>"+
                              "<td width='50%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "<strong>"+$scope.invoices.im_vehical_no+"</strong>"+
                              "</td>"+
                            "</tr>"+
                          "</table>"+
                      "</td>" +
                    "</tr>" +
                  "</table>"+
                "</td>"+
              "</tr>"+
            "</thead>"+
            "<tbody>"+
              "<tr>"+
                "<td colspan='12' valign='top' style=' border-style: solid; border-width:1px;'>"+
                  "<table width='100%'>" +
                    "<thead>"+
                      "<tr>"+      
                        "<th width='5%' rowspan='2' style='text-align:center; padding: 4px; font-size: 10pt; border-style: none solid solid none; border-width:1px;'>Sr.No.</th>" +
                        "<th width='20%' rowspan='2' style='text-align:center; padding: 4px; font-size: 10pt; border-style: none solid solid none; border-width:1px;'>Product Description</th> " +
                        "<th width='5%' rowspan='2' style='text-align:center; padding: 4px; font-size: 10pt; border-style: none solid solid none; border-width:1px;'>HSN Code</th>" +
                        "<th width='5%' rowspan='2' style='text-align:center; padding: 4px; font-size: 10pt; border-style: none solid solid none; border-width:1px;'>Qty</th>"+
                        "<th width='5%' rowspan='2' style='text-align:center; padding: 4px; font-size: 10pt; border-style: none solid solid none; border-width:1px;'>Unit</th>" +
                        "<th width='10%' rowspan='2' style='text-align:center; padding: 4px; font-size: 10pt; border-style: none solid solid none; border-width:1px;'>Rate</th>" +
                        "<th width='10%' rowspan='2' style='text-align:center; padding: 4px; font-size: 10pt; border-style: none solid solid none; border-width:1px;'>Amount</th>" +
                        "<th width='15%' colspan='2' style='text-align:center; padding: 4px; font-size: 10pt; border-style: none solid solid none; border-width:1px;'>SGST</th>" +
                        "<th width='15%' colspan='2' style='text-align:center; padding: 4px; font-size: 10pt; border-style: none solid solid none; border-width:1px;'>CGST</th>" +
                        "<th width='10%' rowspan='2' style='text-align:center; padding: 4px; font-size: 10pt; border-style: none none solid none; border-width:1px;'>Total</th>" +
                      "</tr>"+
                      "<tr>"+      
                        "<th width='5%' style='padding: 4px; text-align:center; font-size: 9pt; border-style: none solid solid none; border-width:1px;'>Rate</th>" +
                        "<th width='10%' style='padding: 4px; text-align:center; font-size: 9pt; border-style: none solid solid none; border-width:1px;'>Amount</th>" +
                        "<th width='5%' style='padding: 4px; text-align:center; font-size: 9pt; border-style: none solid solid none; border-width:1px;'>Rate</th>" +
                        "<th width='10%' style='padding: 4px; text-align:center; font-size: 9pt; border-style: none solid solid none; border-width:1px;'>Amount</th>" +
                      "</tr>"+
                    "</thead>"+
                    " "+$('#content').html()+" " +
                  "</table>"+
                "</td>"+
              "</tr>"+
            "</tbody>"+
            "<tfoot>"+
            "<tr>"+
              "<td width='50%' colspan='6' style='text-align:center; padding:4px; font-size:10pt; border-style: solid solid solid solid; border-width:1px;'><strong>Total</strong></td>"+
              "<td width='10%' style='text-align:center; padding:4px; font-size:10pt; border-style: solid solid solid none; border-width:1px;'>"+$scope.invoices.im_net_amount+"</td>"+
              "<td width='15%' colspan='2' style='text-align:center; padding:4px; font-size:10pt; border-style: solid solid solid none; border-width:1px;'>"+$scope.invoices.im_cgst_amount+"</td>"+
              "<td width='15%' colspan='2' style='text-align:center; padding:4px; font-size:10pt; border-style: solid solid solid none; border-width:1px;'>"+$scope.invoices.im_sgst_amount+"</td>"+
              "<td width='10%' style='text-align:center; padding:4px; font-size:10pt; border-style: solid solid solid none; border-width:1px;'>"+$scope.invoices.im_total_amount+"</td>"+
            "</tr>"+
            "<tr>" +
                  "<td colspan='7' rowspan='2' width='60%' style='padding:4px; font-size:10pt; border-style: none solid solid solid; border-width:1px;'>Amount in words : "+$scope.amountinwords+"</td>" +
                  "<td colspan='4' width='30%' style='padding:4px; font-size:10pt; border-style: none solid solid solid; border-width:1px;'>Total Amount Before Tax</td>" +
                  "<td width='10%' style='padding:4px; font-size:10pt; border-style: none solid none none; border-width:1px;'><strong>"+$filter('number')($scope.invoices.im_net_amount, "2")+"</strong></td>" +
              "</tr>"+
              "<tr>"+
                  "<td colspan='4' width='30%' style='padding:4px; font-size:10pt; border-style: solid; border-width:1px;'>Add: CGST + SGST</td>" +
                  "<td width='10%' style='padding:4px; font-size:10pt; border-style: solid; border-width:1px;'><strong>"+$filter('number')(parseFloat(parseFloat($scope.invoices.im_cgst_amount) + parseFloat($scope.invoices.im_sgst_amount)), "2")+"</strong></td>" +
              "</tr>"+
              "<tr>"+
                  "<td colspan='7' rowspan='2' width='60%' style='padding:4px; font-size:9pt; border-style: none none solid solid; border-width:1px;'>"+
                  "Bank Details : <br>"+
                  "A/C Name : Master Sofa<br>"+
                  "Bank Name : IDBI Bank<br>"+
                  "A/C No.: 0769102000004312<br>"+
                  "IFSC : IBKL0000769<br>"+
                  "Bank Branch : Nibm Road Kondhwa, Pune<br><br>"+
                  "<strong>Terms & Conditions</strong><br>"+
                  "1. Goods once sold shall not be taken back.<br>"+
                  "2. Our responsibility ceases once the goods leave our premises.<br>"+
                  "3. Subject to Pune jurisdiction Only.<br>"+
                  "4. GST No : <strong>27CSJPK1869E1ZI</strong>"+
                  "</td>"+
                  "<td colspan='4' width='30%' style='padding:4px; font-size:10pt; border-style: solid; border-width:1px;'>Total Amount After Tax</td>" +
                  "<td width='10%' style='padding:4px; font-size:10pt; border-style: solid; border-width:1px;'><strong>"+$filter('number')($scope.invoices.im_total_amount, "2")+"</strong></td>" +
              "</tr>"+
              "<tr>"+
                  "<td colspan='5' width='40%' colspan='2' valign='bottom' style='text-align:center; padding:4px; font-size:10pt; border-style: solid solid solid solid; border-width:1px;'><span style='font-size:7pt;'>Ceritified that the particulars given above are true and correct</span><br><strong>for Master Sofa</strong><br><br><br><br><br><br><br><br><br><strong>Authorized Signatory</strong></td>" +
              "</tr>" +
            "</tfoot>"+
          "</table>"+
          "</body>" +
        "</html>";
        popupWin.document.write(page1);
        popupWin.document.close();
      }
    }
});