
// *** Shared ressources
import { getTranslation } from '../../shared/services/translationService.js'
import { currentApplicationPath } from '../../shared/assets/constants.js'
import { leftMenuViewDisplay } from './leftMenuViewCont.js'
import { loginViewDisplay } from '../../shared/components/login/loginViewCont.js'
import { getLoggedUserPseudo, logout } from '../../shared/components/login/loginService.js'

// TODO : Manage callback
export function headerViewDisplay(htlmPartId, callbackFunction) {

    let menuString = `
    <div id="menuPart">
            <nav class="navbar fixed-top navbar-light " style="background-color:#F7F7F3;border-bottom:solid 0.15rem #C0C0C0; padding:5px">
                <div class="container-fluid">
                    <div class="navbar-brand" style="color:#8B2331" id="mainNav">${getTranslation("brandTitle")}</div>
                    <div class="d-flex">
                   <a class="btn btn-secondary" style="margin-right:3px" id="LoginBtn" href="#" >
    Login
    </a>
  
                    <a class="btn btn-secondary" style="margin-right:3px" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
    Admin
    </a>
                        <input class="text" type="search" style="margin-right:2px" placeholder="" id="searchInputString" aria-label="Search">
                            <button class="btn btn-secondary" id="searchBtn" >${getTranslation("search")}</button>
                    </div>
                </div>
            </nav>
      </div>
            <div id="leftMenu">
        </div>

`;

    // *** Display the navbar
    $(htlmPartId).html(menuString);

    // *** Add the off canvas menu
    leftMenuViewDisplay("leftMenu");

    $("#LoginBtn").on("click", function (event) {
        console.log("searcBtn : " + $("#searchInputString").val());
        loginViewDisplay("mainActiveSection")

    });

    $('#searchInputString').on('keydown', function (event) {
        if (event.keyCode === 13) {
            window.location.href = `${currentApplicationPath}/views/search/search.html?searchStr=` + $("#searchInputString").val();
        }
    });

    // *** Reload the start page
    jQuery("#mainNav").on("click", function (event) {
        window.location.href = `${currentApplicationPath}/index.html`;
    });



}
