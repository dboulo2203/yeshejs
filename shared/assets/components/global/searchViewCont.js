// *** Shared ressources
import { getTranslation } from '../../../services/translationService.js'
import { getAppPath } from '../../../functions/commonFunctions.js'
import { loginViewDisplay } from '../../../components/login/loginViewCont.js'
import { leftMenuViewDisplay } from './leftMenuViewCont.js'

// TODO : Manage callback
export function searchViewDisplay(htlmPartId) {

    let menuString = `
    <div id="menuPart" style="margin-top:40px">
        <hr style="color:grey"></hr>
        <div class="flex justify-content-center " style="padding:5px">

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
        <hr style="color:grey"></hr>
    </div>
 `;

    //     < !-- < div class="input-group justify-content-center input-group-sm mb-3" >
    // <input class="text  border-secondary border-bottom" type="search" style="margin-right:4px;border-width:1px;border-top-style:none;border-left-style:none;border-right-style:none;padding-left:5px" placeholder="" id="searchInputString1" aria-label="Search">
    //     <button class="btn btn-outline-secondary border-secondary" id="searchBtn1" style="margin-right:30px">${getTranslation("search")}</button>
    //     -->
    // *** Display the navbar
    document.querySelector(htlmPartId).innerHTML = menuString;

    // *** Add the off canvas menu
    //  leftMenuViewDisplay("leftMenu");

    document.querySelector("#searchInputString").addEventListener("keypress", function (event) {
        if (event.keyCode === 13) {
            window.location.href = `${getAppPath()}/views/search/search.html?searchStr=` + $("#searchInputString").val();
        }
    });

    // *** Actions
    document.querySelector("#searchBtn").onclick = function () {
        window.location.href = `${getAppPath()}/views/search/search.html?searchStr=` + $("#searchInputString").val();
    };

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