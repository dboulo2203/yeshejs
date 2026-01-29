// Component ressources
import { getPerson, updatePerson, getCurrentPerson } from '../personService.js'
import { displayPersonContent } from '../personViewController.js'
const imgModaleString = `
<div class="container">
    <div class="modal fade" id="myModalDom" role="dialog" data-bs-backdrop="static"
            data-bs-keyboard="false" >
        <div class="modal-dialog">

            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <!-- <button type="button" class="close" data-dismiss="modal">&times;</button> -->
                    <h4 class="modal-title" style="color:#8B2331">Person edition</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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
//const myModal = new bootstrap.Modal('myModalDom');

/**
 * 
 * @param {*} htlmPartId 
 */
export async function personEditModalDisplaytest(htlmPartId, person) {

    // *** Variable that keeps the modal object
    let editModal = null;

    // *** Display main part of the modal
    document.querySelector("#modalPlace").innerHTML = editModaleString;

    let outpuStr = '';
    outpuStr = `
        <div id="modalmessage"></div>
        <div class="row">
            <label for="exampleFormControlInput1" class="form-label col-2">Nom </label>
            <div class="col" style="margin:2px">
                <input type="text" class="form-control  col-sm-10 " name="personname" id="conc_nameInput" placeholder=""
                    value="${person.conc_name}"/> 
            </div>
        </div>
        <div class="row">
            <label for="exampleFormControlInput1" class="form-label col-2">Note </label>
            <div class="col" style="margin:2px">
                <textarea type="text" class="form-control  col-sm-10 " name="personname" id="conc_noteInput" placeholder="" rows="10"
                    >${person.conc_note}</textarea> 
            </div>
        </div>  
            `;
    // *** Display string
    document.querySelector("#modalbodyPerson").innerHTML = outpuStr;

    // *** Actions
    document.querySelector("#myBtnCancel").onclick = function () {
        console.log("annule clicked");
        editModal.hide();
    };

    // *** Save action
    document.querySelector("#myBtnSave").onclick = async function (event) {
        console.log("Save clicked");
        let conc_nameInput = document.querySelector("#conc_nameInput").value
        if (!conc_nameInput || conc_nameInput.length <= 0) {
            document.querySelector("#modalmessage").innerHTML = `<div class="alert alert-danger" style = "margin-top:30px" role = "alert" > name vide</div> `;
            return;
        }

        let person = getCurrentPerson();
        person.conc_name = document.querySelector("#conc_nameInput").value;  // $("#conc_nameInput").val();
        person.conc_note = document.querySelector("#conc_noteInput").value;  // $("#conc_noteInput").val();

        try {
            let retour = await updatePerson(person);

            // *** Display person modification
            await getPerson(person.conc_id);
            displayPersonContent("mainActiveSection", person.conc_id);
            editModal.hide();

        } catch (except) {
            document.querySelector("#modalmessage").innerHTML = `<div class="alert alert-danger" style="margin-top:30px" role="alert">${except}</div>`;
            // $('#modalmessage').html(`<div class="alert alert-danger" style="margin-top:30px" role="alert">${except}</div>`);
        }
    };

    // *** inital Load modal  action
    //  $(document).ready(function () {
    editModal = new bootstrap.Modal(document.querySelector("#myModalDom")) // document.getElementById('myModalDom'));
    editModal.show({ backdrop: 'static', keyboard: false });
    // });

}