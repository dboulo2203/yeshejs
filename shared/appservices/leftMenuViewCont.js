
import { getAppPath } from '../../shared/services/commonFunctions.js'
import { loginIcon, logoutIcon, themeIcon, bookIcon, personIcon, printerIcon, publisherIcon, keyIcon, customersIcon, pencilsquareIcon, lendIcon } from '../../shared/assets/constants.js'
import { toogleTheme } from '../../shared/services/bootstrapTheme.js'
import { loginViewDisplay } from './loginViewCont.js'
import { isCurrentUSerLogged, getCurrentUSerName } from '../../shared/yesheServices/yesheLoginService.js'
import { logout } from '../../shared/yesheServices/yesheLoginService.js'
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
            <h5 class="offcanvas-title" id="offcanvasExampleLabel" style="color:#8B2331">Yeshe version 5</h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <hr/>
        <div class="offcanvas-body">
            ${!isCurrentUSerLogged() ? `<div  style="margin-bottom:2px;cursor:pointer"  ><span class="fs-6" id="loginButton" >${loginIcon} Login</span></div>` : ``}
            ${isCurrentUSerLogged() ? `<div  style="margin-bottom:2px;cursor:pointer"  ><span class="fs-6" id="logoutButton">${logoutIcon} Logout : ${getCurrentUSerName()}</span ></div > ` : ``}
 
            <div style="margin-bottom:2px;cursor:pointer"  ><span " id="btnSwitch" >${themeIcon} Theme</span></div>        
            <hr/>
            <!--  ${isCurrentUSerLogged() ? `<div id="newNoticeButton" style="margin-bottom:2px"> ${bookIcon} Notice</div>` : ``}
             ${isCurrentUSerLogged() ? `<div id="newPersonButton" style="margin-bottom:2px"> ${personIcon} Person</div>  ` : ``}          
             ${isCurrentUSerLogged() ? `<div id="newKeywordButton" style="margin-bottom:2px"> ${keyIcon} Keyword</div>` : ``}
             ${isCurrentUSerLogged() ? `<div id="newPublisherButton" style="margin-bottom:2px"> ${publisherIcon} Publisher</div>` : ``}
             ${isCurrentUSerLogged() ? `<div id="newPrinterButton" style="margin-bottom:2px"> ${printerIcon} Printer</div>` : ``}
            ${isCurrentUSerLogged() ? `<hr/>` : ``}
             ${isCurrentUSerLogged() ? `<div id="newPrinterButton"> ${customersIcon} Utilisateurs</div>` : ``}
             ${isCurrentUSerLogged() ? `<div id="newPrinterButton"> ${lendIcon} Prêts</div>` : ``}
            ${isCurrentUSerLogged() ? `<hr/>` : ``}
            -->
            <div id="documentation" style="cursor:pointer"><span style="cursor:pointer">${pencilsquareIcon}Documentation</span></div>

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

    // if (isCurrentUSerLogged())
    //     document.querySelector("#newPersonButton").onclick = function () {
    //         window.location.href = `${getAppPath()}/views/person/person.html`;
    //     };

    document.querySelector("#documentation").onclick = function () {
        window.location.href = `${getAppPath()}/views/docu/docu.html`;
    };

    document.querySelector("#btnSwitch").onclick = function () {
        toogleTheme();
    }

    if (!isCurrentUSerLogged())
        document.querySelector("#loginButton").onclick = async function () {
            loginViewDisplay("mainActiveSection")
        };

    if (isCurrentUSerLogged())
        document.querySelector("#logoutButton").onclick = async function () {
            logout();
            window.location.href = `${getAppPath()}/views/mainpage/mainpage.html`

        };


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
