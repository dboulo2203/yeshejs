// TODO : Manage callback
export function footerViewDisplay(htlmPartId) {

    let footerString = `
    <div id="footerPart" style="margin-top:40px">
        <hr style="color:grey"></hr>
        <div class="d-flex justify-content-center" style="">
            <small>Karma Kagyu Librairies - Yeshe App - v 0.1 - 28/11/2025</small>
        </div>
        <hr style="color:grey"></hr>
    </div>
 `;

    //     < !-- < div class="input-group justify-content-center input-group-sm mb-3" >
    // <input class="text  border-secondary border-bottom" type="search" style="margin-right:4px;border-width:1px;border-top-style:none;border-left-style:none;border-right-style:none;padding-left:5px" placeholder="" id="searchInputString1" aria-label="Search">
    //     <button class="btn btn-outline-secondary border-secondary" id="searchBtn1" style="margin-right:30px">${getTranslation("search")}</button>
    //     -->
    // *** Display the navbar
    document.querySelector(htlmPartId).innerHTML = footerString;

    // *** Add the off canvas menu
    //  leftMenuViewDisplay("leftMenu");

    // document.querySelector("#searchInputString").addEventListener("keypress", function (event) {
    //     if (event.keyCode === 13) {
    //         window.location.href = `${getAppPath()}/views/search/search.html?searchStr=` + $("#searchInputString").val();
    //     }
    // });

    // *** Actions
    // document.querySelector("#searchBtn").onclick = function () {
    //     window.location.href = `${getAppPath()}/views/search/search.html?searchStr=` + $("#searchInputString").val();
    // };

    // document.querySelector("#mainNav").onclick = function () {
    //     window.location.href = `${getAppPath()}/index.html`;
    // };

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