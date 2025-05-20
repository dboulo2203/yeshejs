// *** Component ressources
import { getNoticeExtract } from './noticeService.js'
const modaleString = `
<div class="container" >
<div class="modal" id="myModalDom" role="dialog">
    <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <!-- <button type="button" class="close" data-dismiss="modal">&times;</button> -->
                <h4 class="modal-title"></h4>
            </div>
            <div class="row modal-body" id="modalbody">
                <p>Some text in the modal.</p>

            </div>
            <div class="modal-footer">
                 <button type="button" class="btn btn-secondary" data-dismiss="modal" id="myBtnCancel">Cancel</button>
            </div>
        </div>

    </div>
</div>
</div>`;

/**
 * 
 * @param {*} htlmPartId 
 */
export function displayModaleAndFunctions(htlmPartId, noticeID, callback) {

    // *** Display main part of the page
    // document.getElementById(htlmPartId).innerHTML = ;
    console.log("Display extract : ");
    jQuery("#" + htlmPartId).append(modaleString);


    getNoticeExtract(noticeID, function (noticeExtractSTr) {

        console.log(JSON.stringify(noticeExtractSTr));
        document.getElementById("modalbody").innerHTML = noticeExtractSTr;

    });

    $("#myBtnCancel").on("click", function (event) {
        console.log("annule clicked");
        $("#myModalDom").modal("hide");
        callback(false);
    });

    console.log("displayModaleAndFunctions");
    // *** Define actions on the page
    // $("#myBtnDom").on("load", function (event) {
    $(document).ready(function () {
        // console.log("#myBtnDom).on(load)");
        $("#myModalDom").modal("show");
    });

}


// (function ($) {

//     $(document).ready(function () {
//         console.log("ready modale!");

//         // Load orders from the dolibarr server
//         // var jqxhr = $.ajax("http://localhost/dolibarr_prodchoco/api/index.php/orders?sortfield=t.rowid&sortorder=ASC&limit=100&DOLAPIKEY=2OgKx8pIcDrF58S00d4ldW451JfeTTwX")
//         //     .done(function (data) {
//         console.log("order call ok");
//         //  document.getElementById('apiResponseMoale').innerHTML = displayOrderList(data);

//         // })
//         //     .fail(function () {
//         //         alert("error");
//         //     })
//         //     .always(function () {
//         //         console.log("API call complete");
//         //     });

//     });

//     $("#myBtnDom").on("click", function (event) {
//         console.log("open modale");
//         const myModalEl = document.getElementById('myModalDom');
//         myModalEl.modal("show");
//         //  $("#myModalDom").modal("show");
//     });
//     $("#myBtnCLose").on("click", function (event) {
//         console.log("open modale");
//         $("#myModalDom").modal("hide");
//     });



// })(jQuery);