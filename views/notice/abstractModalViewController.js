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
export async function displayModaleAndFunctions(htlmPartId, noticeID) {

    // *** Display main part of the page
    document.querySelector(htlmPartId).innerHTML = modaleString;

    // ** Get data
    let noticeExtractSTr = await getNoticeExtract(noticeID);

    // *** display data
    document.querySelector("#modalbody").innerHTML = noticeExtractSTr;

    // ** Actions
    document.querySelector("#myBtnCancel").onclick = function () {
        editModal.hide();
    };

    // *** inital Load modal  action
    let editModal = new bootstrap.Modal(document.querySelector("#myModalDom"))
    editModal.show({ backdrop: 'static', keyboard: false });

}