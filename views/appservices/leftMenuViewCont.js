
import { getAppPath } from '../../shared/services/commonFunctions.js'
import { loginIcon } from '../../shared/assets/constants.js'
import { toogleTheme } from '../../shared/services/bootstrapTheme.js'
//***
// catalog
//  -> categories
//  -> categoriyContent
// 
// basket
// 
//  */
// *** Menu string
const leftmenuString = ` 
    <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasExampleLabel" style="color:#8B2331">Yeshe 5</h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <hr/>
        <div class="offcanvas-body">
            <div id="newNoticeButton">Login</div>
           <div  style="margin-bottom:10px;cursor:pointer"  ><span class="fs-6" id="btnSwitch" >${loginIcon} Theme</span></div>        
            <hr/>
            <div id="newNoticeButton">New Notice</div>
            <div id="newPersonButton">New Person</div>            
            <div id="newKeywordButton">New Keyword</div>
            <div id="newPublisherButton">New Publisher</div>
            <div id="newPrinterButton">New Printer</div>
            <hr/>
            <div id="newPrinterButton">Utilisateurs</div>
            <div id="newPrinterButton">Prêts</div>
            <hr/>
            <div id="documentation" style="cursor:pointer"><span style="cursor:pointer">Documentation</span></div>

        </div>
    </div>
 `;
//           //  <div  style="margin-bottom:10px;cursor:pointer"  ><span class="fs-6" id="btnSwitchDys" >${loginIcon}Dyslex</span></div>
// 

// $(function () {
// TODO : Manage callback
export function leftMenuViewDisplay(htlmPartId) {


    // *** Display left menu
    document.querySelector("#" + htlmPartId).innerHTML = leftmenuString;


    document.querySelector("#newPersonButton").onclick = function () {
        window.location.href = `${getAppPath()}/views/person/person.html`;
    };



    document.querySelector("#documentation").onclick = function () {
        window.location.href = `${getAppPath()}/views/docu/docu.html`;
    };

    document.querySelector("#btnSwitch").onclick = function () {
        toogleTheme();
    }

    // document.querySelector("#btnSwitchDys").onclick = function () {
    //     // document.getElementById('#btnSwitch').addEventListener('click', () => {
    //     // if (document.documentElement.getAttribute('data-bs-theme') == 'dark') {
    //     //     document.documentElement.setAttribute('data-bs-theme', 'light')
    //     // }
    //     // else {
    //     // let test = document.documentElement.getAttribute('data-bs-theme');
    //     // document.documentElement.setAttribute('bs-body-font-family', 'lexend')
    //     // document.documentElement.setAttribute('font-family', 'lexend')

    //     // function changeFont(element, name) {
    //     //  document.documentElement.style.fontFamily = 'Lexend';
    //     document.documentElement.style.setProperty('font-family', 'Lexend')
    //     // }


    //     // }
    // }


}
