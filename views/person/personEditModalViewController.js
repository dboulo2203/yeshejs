import { getPerson, updatePerson, getCurrentPerson } from '../../services/personService.js'
import { displayPersonContent } from './personViewController.js'
const editModaleString = `
<div class="container">
    <div class="modal" id="myModalDom" role="dialog">
        <div class="modal-dialog">

            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <!-- <button type="button" class="close" data-dismiss="modal">&times;</button> -->
                    <h4 class="modal-title">Person edition</h4>
                </div>
                <div class="row modal-body" id="modalbodyPerson">
                    <p>Some text in the modal.</p>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" id="myBtnCancel">Cancel</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" id="myBtnSave">Save</button>
                </div>
            </div>

        </div>
    </div>
</div>`;

/**
 * 
 * @param {*} htlmPartId 
 */
export async function personEditModalDisplay(htlmPartId, person) {

    // *** Display main part of the page
    // document.getElementById(htlmPartId).innerHTML = ;
    console.log("Display person edit : ");
    jQuery("#" + htlmPartId).append(editModaleString);

    //  getPerson(personID, function (person) {

    // console.log(JSON.stringify(noticeExtractSTr));
    console.log(JSON.stringify(person));
    let outpuStr = '';
    outpuStr = `
        <div id="modalmessage"></div>
        <div class="row">
            <label for="exampleFormControlInput1" class="form-label col-2">Nom </label>
            <div class="col">
                <input type="text" class="form-control  col-sm-10 " name="personname" id="conc_nameInput" placeholder=""
                    value="${person.conc_name}"/> 
            </div>
        </div>
        <div class="row">
            <label for="exampleFormControlInput1" class="form-label col-2">Note </label>
            <div class="col">
                <textarea type="text" class="form-control  col-sm-10 " name="personname" id="conc_noteInput" placeholder="" rows="10"
                    >${person.conc_note}</textarea> 
            </div>
        </div>  
            `;

    $("#modalbodyPerson").html(outpuStr);

    // });

    // *** Actions
    $("#myBtnCancel").on("click", function (event) {
        console.log("annule clicked");
        $("#myModalDom").modal("hide");
        callback(false);
    });

    $("#myBtnSave").on("click", async function (event) {
        console.log("Save clicked");
        if (!$("#conc_nameInput").val() || $("#conc_nameInput").val().length <= 0) {
            $('#modalmessage').html(`<div class="alert alert-danger" style="margin-top:30px" role="alert">name vide</div>`);

            return;
        }

        let person = getCurrentPerson();
        person.conc_name = $("#conc_nameInput").val();
        person.conc_note = $("#conc_noteInput").val();

        try {
            let retour = await updatePerson(person, function (reponse) {
                console.log("Retour du PUT : " + reponse);
                getPerson(person.conc_id);
                displayPersonContent("mainActiveSection", person.conc_id);
                $('#modalmessage').html(`<div class="alert alert-success" style="margin-top:30px" role="alert">Person successfully saved</div>`);

            });
        } catch (except) {
            $('#modalmessage').html(`<div class="alert alert-danger" style="margin-top:30px" role="alert">${except}</div>`);

        }
    });

    console.log("displayModaleAndFunctions");
    // *** Define actions on the page
    // $("#myBtnDom").on("load", function (event) {
    $(document).ready(function () {
        // console.log("#myBtnDom).on(load)");
        $("#myModalDom").modal("show");
    });

}