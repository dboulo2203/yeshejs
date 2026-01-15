// *** Shared ressources
import { getTranslation } from '../../shared/services/translationService.js'
import { getAppPath } from '../../shared/services/commonFunctions.js'

import { leftMenuViewDisplay } from './leftMenuViewCont.js'
import { threedotsvertical } from '../../shared/assets/constants.js'

/**
 * Display the menu bar 
 * @param  htlmPartId : the div id where the menu is to be displayed  
 */
export function headerViewDisplay(htlmPartId) {

    let menuString = `
    <div id="menuPart">
        <nav class="navbar fixed-top  bg-body-tertiary" style="border-bottom:solid 0.15rem #C0C0C0; padding:5px">
            <div class="container-fluid">
                <div class="navbar-brand" style="color:#8B2331;cursor:pointer" id="mainNav">${getTranslation("GLO_BRANDTITLE")}</div>
                <div class="d-flex">

                <a class="btn " style="margin-left:3px;cursor:pointer"  data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">${threedotsvertical}</a >

                </div>
            </div>
        </nav>
      </div>
    <div id="leftMenu">
    </div>`;

    // *** Display the navbar
    document.querySelector(htlmPartId).innerHTML = menuString;

    // *** Add the off canvas menu
    leftMenuViewDisplay("leftMenu");


    document.querySelector("#mainNav").onclick = function () {
        window.location.href = `${getAppPath()}/index.html`;
    };

}
