// *** Shared ressources
import { getTranslation } from '../services/translationService.js'
import { getAppPath } from '../services/commonFunctions.js'

import { leftMenuViewDisplay } from './leftMenuViewCont.js'

/**
 * Display the menu bar 
 * @param  htlmPartId : the div id where the menu is to be displayed  
 */
export function headerViewDisplay(htlmPartId) {

    let menuString = `
    <div id="menuPart">
        <nav class="navbar  bg-body-tertiary fixed-top"  style="background-color:#F7F7F3;padding:5px;border-bottom: 1px solid #E4E4E7;">
            <div class="container-fluid">
                <a class="navbar-brand" style="color:#8B2331" id="mainNav" href="#">${getTranslation("brandTitle")}</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">Home</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" href="#">FAQ</a>
                    </li>
                     <li class="nav-item">
                    <a class="nav-link" href="#">Login</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" href="${getAppPath()}/views/documentation/documentation.html#">About</a>
                    </li>
                    <li class="nav-item">
                   <span style="color:grey"> __________________________</span>
                    </li>

                    <li class="nav-item">
                    <a class="nav-link" href="https://dhagpo-library.org/index.php/fr/" target="_blank">Dhagpo Kagyu Library site</a>
                    </li>
                   <li class="nav-item">
                    <a class="nav-link" href="https://www.kibi-edu.org/kibi-library" target="_blank">KIBI site</a>
                    </li>


                </ul>
                </div>
            </div>
        </nav>
    </div>
    <div id="leftMenu">
    </div>
    `;

    // *** Display the navbar
    document.querySelector(htlmPartId).innerHTML = menuString;

    // *** Add the off canvas menu
    leftMenuViewDisplay("leftMenu");

    // document.querySelector("#searchInputString").addEventListener("keypress", function (event) {
    //     if (event.keyCode === 13) {
    //         window.location.href = `${getAppPath()}/views/search/search.html?searchStr=` + $("#searchInputString").val();
    //     }
    // });

    // *** Actions
    // document.querySelector("#searchBtn").onclick = function () {
    //     window.location.href = `${getAppPath()}/views/search/search.html?searchStr=` + $("#searchInputString").val();
    // };

    document.querySelector("#mainNav").onclick = function () {
        window.location.href = `${getAppPath()}/index.html`;
    };

    // document.querySelector("#LoginBtn").onclick = function () {
    //     loginViewDisplay("mainActiveSection")
    // };

}
