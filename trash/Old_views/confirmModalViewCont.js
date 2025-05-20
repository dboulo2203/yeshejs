const modaleString = `
<div class="modal" id="myModalDom" role="dialog">
    <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Modal Header</h4>
            </div>
            <div class="modal-body">
                <p>Some text in the modal.</p>

            </div>
            <div class="modal-footer">
               <button type="button" class="btn btn-default" data-dismiss="modal" id="myBtnConfirm">Ok</button>
                <button type="button" class="btn btn-default" data-dismiss="modal" id="myBtnCancel">Annule</button>
            </div>
        </div>

    </div>
</div>`;

/**
 * 
 * @param {*} htlmPartId 
 */
export function displayModaleAndFunctions(htlmPartId, callback) {

    // *** Display main part of the page
    // document.getElementById(htlmPartId).innerHTML = ;
    jQuery("#" + htlmPartId).append(modaleString);


    console.log("displayModaleAndFunctions");
    // *** Define actions on the page
    // $("#myBtnDom").on("load", function (event) {
    $(document).ready(function () {
        // console.log("#myBtnDom).on(load)");
        $("#myModalDom").modal("show");
    });

    $("#myBtnCancel").on("click", function (event) {
        console.log("annule clicked");
        $("#myModalDom").modal("hide");
        callback(false);
    });
    $("#myBtnConfirm").on("click", function (event) {
        console.log("Confirm clicked");
        $("#myModalDom").modal("hide");
        callback(true);

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