// Component ressources
import { getPerson, createPerson, getCurrentPerson } from '../personService.js'
import { getList } from '../../../shared/yesheServices/yesheListsService.js'
// import { displayPersonContent } from './personViewController.js'

const newModaleString = `
<div class="container">
    <div class="modal fade" id="myModalDom" role="dialog" data-bs-backdrop="static"
            data-bs-keyboard="false" >
        <div class="modal-dialog">

            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <!-- <button type="button" class="close" data-dismiss="modal">&times;</button> -->
                    <h4 class="modal-title" style="color:#8B2331">New Person</h4>
                </div>
                <div id="modalmessage"></div>
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
export async function personNewModalDisplay(htlmPartId, person) {

    window.onload = (event) => {
        console.log("page is fully loaded");
    };

    // *** Variable that keeps the modal object
    let editModal = null;

    // *** Display main part of the page
    document.querySelector("#modalPlace").innerHTML = newModaleString;

    console.log(JSON.stringify(person));
    let outpuStr = '';
    outpuStr = `
          <div id="modalmessage"></div>
          <div class="row">
              <label for="exampleFormControlInput1" class="form-label col-2">Nom </label>
              <div class="col" style="margin:2px">
                  <input type="text" class="form-control  col-sm-10 " name="personname" id="conc_nameInput" placeholder=""
                      value=""/> 
              </div>
          </div>
          <div class="row">
              <label for="exampleFormControlInput1" class="form-label col-2">Note </label>
              <div class="col" style="margin:2px" >
                  <textarea type="text" class="form-control  col-sm-10 " name="personname" id="conc_noteInput" placeholder="" rows="10"
                      ></textarea> 
              </div>
          </div>  
              `;

    outpuStr += `
          <div class="row">
              <label for="exampleFormControlInput1" class="form-label col-2" >Langue défaut </label>
              <div class="col" style="margin:2px">
              <select class="form-select" aria-label="Default select example" id="conc_lanInput">`;
    getList("bdd_language").map((language, index) => {
        outpuStr += `<option value="${language.lang_id}">${language.lang_name}</option>`;
    });
    outpuStr += `
          </div> </div>`;
    // *** Display string
    document.querySelector("#modalbodyPerson").innerHTML = outpuStr;

    // *** Actions
    document.querySelector("#myBtnCancel").onclick = function () {
        console.log("annule clicked");
        editModal.hide();
    };

    document.querySelector("#myBtnSave").onclick = async function (event) {
        console.log("Save clicked");

        // *** Check inputs
        let conc_nameInput = document.querySelector("#conc_nameInput").value
        if (!conc_nameInput || conc_nameInput.length <= 0) {
            document.querySelector("#modalmessage").innerHTML = `<div class="alert alert-danger" style = "margin-top:30px" role = "alert" > name vide</div> `;
            return;
        }

        // *** Get Data
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

        // *** Save data
        try {
            let retour = await createPerson(person);
            editModal.hide();

        } catch (except) {
            document.querySelector("#modalmessage").innerHTML = `<div class="alert alert-danger" style="margin-top:30px" role="alert">${except}</div>`;
        }
    };

    // *** inital Load modal  action
    //  $(document).ready(function () {
    editModal = new bootstrap.Modal(document.querySelector("#myModalDom")) // document.getElementById('myModalDom'));
    editModal.show({ backdrop: 'static', keyboard: false });
    // });
}