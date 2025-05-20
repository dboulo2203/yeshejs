
// import { getTranslation } from '../services/translationService.js'
import { currentApplicationPath } from '../../shared/assets/constants.js'
import { personNewModalDisplay } from '../../views/person/personNewModalViewController.js'

//***
// catalog
//  -> categories
//  -> categoriyContent
// 
// basket
// 
//  */
// *** Menu string
const menuString = ` 
    <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasExampleLabel" style="color:#8B2331">Yeshe 5</h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <hr/>
        <div class="offcanvas-body">
                <div>
                    Présentation du menu principal de l'application        
                </div>
            <hr/>
            <div id="newNoticeButton">New Notice</div>
            <div id="newPersonButton">New Person</div>
            
            <div id="newKeywordButton">New Keyword</div>
            <div id="newPublisherButton">New Publisher</div>
            <div id="newPrinterButton">New Printer</div>
            <hr/>
            <div id="newPrinterButton">Utilisateurs</div>
            <div id="newPrinterButton">Prêts</div>
        </div>
    </div>
 `;
// 
// 

// $(function () {
// TODO : Manage callback
export function leftMenuViewDisplay(htlmPartId) {

    //   let test = getTranslation("brandTitle");
    // *** Display menu
    //     let menuString = `<div id="menuPart">
    //         <nav class="navbar fixed-top navbar-light " style="background-color:#F7F7F3;border-bottom:solid 0.15rem #C0C0C0; padding:5px">
    //             <div class="container-fluid">
    //                 <div class="navbar-brand" style="color:#8B2331" id="mainNav">${getTranslation("brandTitle")}</div>
    //                 <div class="d-flex">
    //                     <input class="text" type="search" style="margin-right:2px" placeholder="" id="searchInputString" aria-label="Search">
    //                         <button class="btn btn-secondary" id="searchBtn" >${getTranslation("search")}</button>
    //                 </div>
    //             </div>
    //         </nav>
    // `;
    $("#" + htlmPartId).html(menuString);

    // *** Call the catalog Component at launch
    // launchSearchController(htlmPartId);
    // console.log(" Init app Done");

    $("#newPersonButton").on("click", function (event) {
        console.log("newPersonButton : ");
        // displaySearchContent('mainSection', $("#searchInputString").val());
        //  window.location.href = `${currentApplicationPath}/views/search/search.html?searchStr=` + $("#searchInputString").val();
        // displaySearchContent('mainSection', 'metta');
        personNewModalDisplay(htlmPartId);
    });

    $('#searchInputString').on('keydown', function (event) {
        if (event.keyCode === 13) {
            // Enter key was pressed
            // displaySearchContent('mainSection', $("#searchInputString").val());

            window.location.href = `${currentApplicationPath}/views/search/search.html?searchStr=` + $("#searchInputString").val();
            //  displaySearchContent('mainSection', 'karmapa');
        }
    });

    jQuery("#mainNav").on("click", function (event) {
        window.location.href = `${currentApplicationPath}/index.html`;
        // displaySearchContent('mainSection', 'metta');
    });



}
