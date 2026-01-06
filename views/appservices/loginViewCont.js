
// import { getLogin } from '../../shared/services/loginService.js'
import { getLogin } from './loginService.js'

import { getAppPath } from '../../services/commonFunctions.js'
const loginContainer = `<div id="modalPlace"></div>`;
const editModaleString = `
<div class="container">
    
    <div class="modal fade" id="myModalLogin" role="dialog" data-bs-backdrop="static" data-bs-keyboard="false" >
        <div class="modal-dialog">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <!-- <button type="button" class="close" data-dismiss="modal">&times;</button> -->
                    <h4 class="modal-title" style="color:#8B2331">Login</h4>
                </div>
                <div class="row modal-body" id="modalbodyLOgin">
                    <div id="modalmessage"></div>
                    <div class="row">
                        <label for="userEmailInput" class="form-label col-2">Nom </label>
                        <div class="col" style="margin:2px">
                            <input type="text" class="form-control  col-sm-10 " name="userEmailInput" id="userEmailInput" placeholder=""
                                value=""/>
                        </div>
                    </div>
                    <div class="row">
                        <label for="userPasswordInput" class="form-label col-2">Password </label>
                        <div class="col" style="margin:2px">
                            <input type="text" class="form-control  col-sm-10 " name="userPasswordInput" id="userPasswordInput" placeholder=""
                                value=""/>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" id="myBtnCancel">Cancel</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" id="myBtnLogin">Login</button>
                </div>
            </div>
        </div>
    </div>
</div>`;

// TODO : Manage callback
export function loginViewDisplay(htlmPartId) {

    // *** Variable that keeps the modal object
    let editModal = null;

    try {
        // *** Display main part of the login page as a child of the maindiv
        let TempDiv = document.createElement('div');
        TempDiv.innerHTML = editModaleString.trim();
        document.querySelector("#" + htlmPartId).appendChild(TempDiv);

        // *** Actions
        document.querySelector("#myBtnCancel").onclick = function () {
            //console.log("annule clicked");
            editModal.hide();
        };

        document.querySelector("#searchInputString").addEventListener("keypress", function (event) {
            if (event.keyCode === 13) {
                window.location.href = `${getAppPath()}/views/search/search.html?searchStr=` + $("#searchInputString").val();
            }
        });

        document.querySelector("#modalbodyLOgin").addEventListener("keypress", async function (event) {
            if (event.keyCode === 13) {
                logUser(event);
            }
        });

        document.querySelector("#myBtnLogin").onclick = async function (event) {
            logUser(event);
        };

    } catch (error) {
        document.querySelector("#messageSection").innerHTML = `<div class="alert alert-danger" style = "margin-top:30px" role = "alert" > ${error}</div > `;
    }

    editModal = new bootstrap.Modal(document.querySelector("#myModalLogin"))
    editModal.show({ backdrop: 'static', keyboard: false });

}

async function logUser(event) {

    console.log("Save clicked");
    let userEmail = document.querySelector("#userEmailInput").value;
    let userPassword = document.querySelector("#userPasswordInput").value;

    // try {
    let retour = await getLogin(userEmail, userPassword)

    if (!retour)
        document.querySelector("#modalmessage").innerHTML = `<div class="alert alert-danger" style = "margin-top:30px" role = "alert" >Nom, password invalides</div> `;
    else
        document.querySelector("#modalmessage").innerHTML = `<div class="alert alert-success" style = "margin-top:30px" role = "alert" >Bienvenue ${retour.user_pseudo}</div> `;
}
