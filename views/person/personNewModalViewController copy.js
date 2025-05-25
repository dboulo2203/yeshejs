import { getPerson, createPerson, getCurrentPerson } from './personService.js'
import { getLanguagesList } from '../../shared/services/languageService.js'

const newModaleString = `
<div class="container">
    <div class="modal" id="myModalDom" role="dialog" data-bs-backdrop="static"
            data-bs-keyboard="false">
        <div class="modal-dialog">

            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <!-- <button type="button" class="close" data-dismiss="modal">&times;</button> -->
                    <h4 class="modal-title">New person </h4>
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
export function personNewModalDisplay(htlmPartId) {

    // *** Variable that keeps the modal object
    let editModal = null;

    // *** Display main part of the page
    console.log("Display person new : ");
    document.querySelector("#" + htlmPartId).innerHTML = newModaleString;


    let outpuStr = '';
    outpuStr = `
        <div id="modalmessage"></div>
        <div class="row">
            <label for="exampleFormControlInput1" class="form-label col-2">Nom </label>
            <div class="col">
                <input type="text" class="form-control  col-sm-10 " name="personname" id="conc_nameInput" placeholder=""
                    value=""/> 
            </div>
        </div>
        <div class="row">
            <label for="exampleFormControlInput1" class="form-label col-2">Note </label>
            <div class="col">
                <textarea type="text" class="form-control  col-sm-10 " name="personname" id="conc_noteInput" placeholder="" rows="10"
                    ></textarea> 
            </div>
        </div>  
            `;


    outpuStr += `
        <div class="row">
            <label for="exampleFormControlInput1" class="form-label col-2" >Langue défaut </label>
            <div class="col">
            <select class="form-select" aria-label="Default select example" id="conc_lanInput">`;
    getLanguagesList().map((language, index) => {
        outpuStr += `<option value="${language.lang_id}">${language.lang_name}</option>`;
    });
    outpuStr += `
        </div> </div>`;

    document.querySelector("#modalbodyPerson").innerHTML = outpuStr;

    // *** Actions
    document.querySelector("#myBtnCancel").onclick = function () {
        console.log("annule clicked");
        editModal.hide();
    };

    document.querySelector("#myBtnSave").onclick = async function (event) {
        console.log("Save clicked");
        let conc_nameInput = document.querySelector("#conc_nameInput").value
        if (!conc_nameInput || conc_nameInput.length <= 0) {
            document.querySelector("#modalmessage").innerHTML = `<div class="alert alert-danger" style = "margin-top:30px" role = "alert" > name vide</div> `;

            return;
        }

        let person = {
            conc_name: '',
            conc_note: '',
            conc_def_lang: 'test'
        };
        person.conc_name = document.querySelector("#conc_nameInput").value;  // $("#conc_nameInput").val();
        person.conc_note = document.querySelector("#conc_noteInput").value;  // $("#conc_noteInput").val();
        person.cont_id = "3";

        let select = document.getElementById('conc_lanInput');
        person.conc_def_lang = select.options[select.selectedIndex].value;


        // console.log("Create new person : " + JSON.stringify(person));

        // try {
        let retour = await createPerson(person, function (reponse) {
            console.log("Retour du POST : " + reponse);
            document.querySelector("#modalmessage").innerHTML = `<div class="alert alert-success" style="margin-top:30px" role="alert">Person successfully saved</div> `;

        });
    };


    $(document).ready(function () {
        // console.log("#myBtnDom).on(load)");
        // *** Open the modal and keep reference of the modal
        editModal = new bootstrap.Modal(document.querySelector("#myModalDom")) // document.getElementById('myModalDom'));
        editModal.show({ backdrop: 'static', keyboard: false });
        let toto = 2;
        /// myModalDom.show();
        // $("#myModalDom").modal("show");
    });
    // document.addEventListener("DOMContentLoaded", () => {
    //     console.log("Document loaded");
    //     editModal = new bootstrap.Modal(document.querySelector("#myModalDom")) // document.getElementById('myModalDom'));
    //     editModal.show();

    // });

}