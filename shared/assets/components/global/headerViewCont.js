// *** Shared ressources
import { getTranslation } from '../../../services/translationService.js'
import { currentApplicationPath } from '../../constants.js'
import { getAppPath } from '../../../functions/commonFunctions.js'
import { loginViewDisplay } from '../../../components/login/loginViewCont.js'

import { leftMenuViewDisplay } from './leftMenuViewCont.js'
// import { getLoggedUserPseudo, logout } from '../../components/login/loginService.js'

// TODO : Manage callback
export function headerViewDisplay(htlmPartId) {

    let menuString = `
    <div id="menuPart">
        <nav class="navbar  bg-body-tertiary fixed-top"  style="background-color:#F7F7F3;padding:5px">
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
                    <a class="nav-link" href="${currentApplicationPath}/views/documentation/documentation.html#">About</a>
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


//**
//     <div id="menuPart">
{/* <nav class="navbar fixed-top navbar-light " style="background-color:#F7F7F3;border-bottom:solid 0.15rem #C0C0C0; padding:5px">
    <div class="container-fluid">
        <div class="navbar-brand" style="color:#8B2331" id="mainNav">${getTranslation("brandTitle")}</div>
        <div class="d-flex col-6 col-lg-6 col-md-12">
            <!-- <a class="btn btn-secondary" style="margin-right:3px" id="LoginBtn" href="#" >
    Login -->
            </a>

            <!--   <a class="btn btn-secondary" style="margin-right:3px" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
                Admin
            </a> -->
            <div class="d-flex-end col-6 col-lg-6 col-md-12">
                <input class="text" type="search" style="margin-right:2px" placeholder="" id="searchInputString" aria-label="Search">
                    <button class="btn btn-secondary" id="searchBtn" >${getTranslation("search")}</button>
            </div>
        </div>
    </div>
</nav>
      </div >
    <div id="leftMenu">
    </div>`; */
}