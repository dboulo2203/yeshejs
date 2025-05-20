import { dolibarrUrl } from './constants.js';

export function createReportList() {
    console.log("Execute createReportList");
}

/**
 * 
 */
export function getOrderList(htmlPartId) {
    // Load orders from the dolibarr server

    var jqxhr = $.ajax(dolibarrUrl + "orders?sortfield=t.rowid&sortorder=ASC&limit=100&DOLAPIKEY=")
        .done(function (data) {
            console.log("order call ok");
            document.getElementById(htmlPartId).innerHTML = displayOrderList(data);

        })
        .fail(function (xhr, err) {
            alert(JSON.stringify(xhr));
            // var responseTitle = $(xhr.responseText).filter('title').get(0);
            // alert($(responseTitle).text() + "\n" + formatErrorMessage(xhr, err));
        })
        .always(function () {
            console.log("API order call complete");
        });

}
/**
 * Built the string to display the orders list
 * @param string jsonData of the order list
 * @returns  the html string
 */
function displayOrderList(jsonData) {
    var output = "";
    output += "Test de fonction javascript";
    // output += JSON.stringify(jsonData);
    // jsonData.map(order) => {};

    jsonData.forEach((order, key, map) => {
        /** First line of an order  <div class="container fluid ">*/
        output += `<div class="row style= "border-top: solid 0.01rem grey; margin-top:10px" > `;
        output += '<div class="col-12" >';
        output += JSON.stringify(order) + "</br>";
        // output += '<a class="btn btn-light" data-bs-toggle="collapse" style="margin:2px;color:#D3D3D3" href="#collapseexpedition'.$i.'"  role="button" aria-expanded="false" aria-controls="collapseexpedition">'.__DOWNARROWPICTO__.'</a>';
        output += "</div>";
        output += "</div>";
        output += "<hr/>";

        // *** Display order lines
        output += "<div>Lignes de la commande</div>";
        var orderslines = order.lines;
        orderslines.forEach((orderline, keyline, mapline) => {
            output += orderline.qty + " " + orderline.ref + " - " + orderline.libelle;

            output += "</br>";
        });
        output += "<hr/>";
    });

    return output;
}