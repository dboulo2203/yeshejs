// *** Shared ressources
import { getAppPath } from '../services/commonFunctions.js'


/**
 * Display the menu bar of the appplication 
 * @param {*} htlmPartId 
 */
export function searchViewDisplay(htlmPartId) {

    let menuString = `
    <div id="menuPart" style="margin-top:60px">
        <div class="flex justify-content-center " style="padding:0px">
            <div class="input-group mb-3">
                <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"></button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">Standard</a></li>
                    <li><a class="dropdown-item" href="#">Database</a></li>
                    <li><a class="dropdown-item" href="#">Predictive</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="#">Multi-criteria</a></li>
                </ul>

                <input type="text" class="form-control" placeholder="" id="searchInputString" aria-label="" aria-describedby="button-addon2">
                <button class="btn btn-outline-secondary" type="button" id="searchBtn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                    </svg>
                </button>
            </div>
        </div>
    </div>
 `;

    // *** Display the navbar
    document.querySelector(htlmPartId).innerHTML = menuString;

    // *** Add the off canvas menu
    //  leftMenuViewDisplay("leftMenu");

    document.querySelector("#searchInputString").addEventListener("keypress", function (event) {
        let searchString = document.querySelector("#searchInputString").value;
        if (event.keyCode === 13) {
            window.location.href = `${getAppPath()}/views/search/search.html?searchStr=` + searchString;
        }
    });

    // *** Actions
    document.querySelector("#searchBtn").onclick = function () {
        let searchString = document.querySelector("#searchInputString").value;
        window.location.href = `${getAppPath()}/views/search/search.html?searchStr=` + searchString;
    };

    document.querySelector("#mainNav").onclick = function () {
        window.location.href = `${getAppPath()}/index.html`;
    };

    // document.querySelector("#LoginBtn").onclick = function () {
    //     loginViewDisplay("mainActiveSection")
    // };

}