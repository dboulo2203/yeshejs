// *** Component ressources
import { getNoticeExtract, getAbstractFile, sendAbstractMail } from './noticeService.js'

const modaleString = `
<style>
#myModalDom h3 {
    color:black;
    font-size:20px
    }
#myModalDom a {
    color:black;
    font-size:bs-body-font-size
    }

</style>
<div class="container" >
<div class="modal" id="myModalDom" role="dialog">
    <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content abstract" >
            <div class="modal-header">
            
                <!-- <button type="button" class="close" data-dismiss="modal">&times;</button> -->
                <h4 class="modal-title"></h4>
                 
            </div>
            <div class="row modal-body" id="modalbody">
                <p>Some text in the modal.</p>
                
                
            </div>
            <div class="modal-footer">
            <div class="input-group mb-3">
                <div id="abstmessageSection"></div>
            </div>    
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="" id="sendingMail" aria-label="" aria-describedby="button-addon2">
                    <button class="btn btn-outline-secondary" type="button" id="myBtnSendMail">
                        Send mail
                    </button>
                
               <!-- <button type="button" class="btn btn-secondary" data-dismiss="modal" id="myBtnLoad">Télécharger</button> -->
                <button type="button" style="margin-left:10px" class="btn btn-secondary" data-dismiss="modal" id="myBtnCancel">Cancel</button>
                </div>
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

    // document.querySelector("#myBtnLoad").onclick = function () {
    //     let noticeAbstract = getAbstractFile(noticeID);
    // };
    document.querySelector("#myBtnSendMail").onclick = async function () {
        let sendingMail = document.querySelector("#sendingMail").value;
        let sendingStatus = await sendAbstractMail(noticeID, sendingMail);

        if (sendingStatus === true)
            document.querySelector("#abstmessageSection").innerHTML =
                `<span class="text-body-secondary fw-bold">Le message a été envoyé</span> `;
        else
            document.querySelector("#abstmessageSection").innerHTML =
                `<span>Le message n'a pas été envoyé</span> `;
    };



};
