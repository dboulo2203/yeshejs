// *** Component ressources
import { getKeyword, getKeywordAliases, getKeywordlinkedNotices, getKeywordFromAliasID } from './keywordService.js' // , getKeywordFromAliasID 
// import { personEditModalDisplay } from './personEditModalViewController.js'
// import { personNewModalDisplay } from './personNewModalViewController.js'

// *** Shared ressources
import { getAppPath } from '../../shared/services/commonFunctions.js'
import { keyIcon, bookIcon } from '../../shared/assets/constants.js';
import { getTranslation } from '../../shared/services/translationService.js'
import { getArrayFromjson } from '../../shared/services/commonFunctions.js'
import { getimagePath } from '../../shared/services/initialisationService.js'
import { pencilsquare, plussquare } from '../../shared/assets/constants.js'
import { getCurrentUSerRightLevel } from '../../shared/services/login/loginService.js'
import { addMultipleEnventListener } from '../../shared/services/commonFunctions.js'
import { launchInitialisation } from '../../shared/services/initialisationService.js';
import { headerViewDisplay } from '../../shared/services/headerViewCont.js'

/**
 * Start script 
 */
export function componentIdentityPerson() {
    return `Business component: keyword : version 2.1.0 - 28 /05 / 2025`
}

export async function startKeywordController() {

    const searchParams = new URLSearchParams(window.location.search);

    // *** Get URL params and launch display
    if (searchParams.has('identity')) {
        document.querySelector("#mainActiveSection").innerHTML = componentIdentity;
        `   `
        return
    }
    try {
        // *** Initialisations
        await launchInitialisation();
        headerViewDisplay("#menuSection");

    } catch (error) {
        document.querySelector("#messageSection").innerHTML = `<div class="alert alert-danger" style = "margin-top:30px" role = "alert" > ${error}</div > `;
    }

    // *** Get params
    // searchParams = new URLSearchParams(window.location.search);

    // *** Get URL params and launch display
    if (searchParams.has('keywordID'))
        displayKeywordContent('mainActiveSection', searchParams.get('keywordID'));
    else if (searchParams.has('keywordAliasID'))
        displayKeywordContentFromAlias('mainActiveSection', searchParams.get('keywordAliasID'));
    else
        document.querySelector("#messageSection").innerHTML = `<div class="alert alert-danger" style="margin-top:30px" role="alert">Erreur, pas d'ID</div>`;
}

/**
 * When the page is called from a notice page, we have the aliasID not the personID
 * @param {*} htlmPartId 
 * @param {*} personAliaID 
 */
export async function displayKeywordContentFromAlias(htlmPartId, keywordAliaID) {

    // *** Display main fixed part of the screen 
    let keyword = await getKeywordFromAliasID(keywordAliaID);

    // *** Display person component
    displayKeywordContent(htlmPartId, keyword.conc_id);

}
/**
 * 
 * @param {*} mainDisplay 
 * @param {*} personID 
 */
export async function displayKeywordContent(mainDisplay, keywordID) {

    let output = '';
    let testBoolean = false;
    try {

        // *** Load data from API
        let keyword = await getKeyword(keywordID);

        let keywordAliases = getArrayFromjson(await getKeywordAliases(keywordID));
        let keywordlinkedNotices = await getKeywordlinkedNotices(keywordID);

        // ** Main template
        let keywordScreen = `<div class="d-flex  justify-content-between" style="margin-top:60px">
                    <span class="fs-5" style="color:#8B2331">${keyIcon} ${getTranslation("KEY_TITLE")} : <span
                    id="concname">${keyword.conc_name}</span></span>
                   <div>
                <span ${getCurrentUSerRightLevel(20)} id="editButton" style="cursor: pointer"> ${pencilsquare}</span>
                <span ${getCurrentUSerRightLevel(20)} id="addnewButton" style="cursor: pointer; margin-left:5px"> ${plussquare}</span>
            </div>
   
        </div>
        <hr style="margin-block-start:0.3rem;margin-block-end:0.3rem;margin-top:15px"/>
        
       <!-- Display image and note -->
        <div class="row ">
                 <div class="col-12" >
                    <div><span class="fs-6" style="color:#8B2331">${getTranslation("PERS_NOTE")}</span></div>
                   <div id="concnote">${keyword.conc_note} </div>
                </div >
            
        </div>
         `;

        // *** Display Aliases
        keywordScreen += `<hr style="margin-block-start:0.3rem;margin-block-end:0.3rem;margin-top:15px"/> `;

        keywordScreen += `
        <div class="row justify-content-start" >
            <div style=""> <spanclass="fs-6" style="color:#8B2331"> ${getTranslation("KEY_ALIASES")}</span></div >`;

        // <div class="col-6 " >
        keywordAliases.map((keywordAliase, index) => {
            // if (index == 0 || index == halfAlias) {
            //     keywordScreen += `<div class="col-6" >` person
            // }
            keywordScreen += `<div class="col-12" >`;
            keywordScreen += `
                    <span class="fw-light" style = "color:grey" > ` + keywordAliase.lang_name + `</span > : ` + keywordAliase.coal_name + `</br > `
        });

        keywordScreen += `</div >
        </div > `;
        keywordScreen += `<hr style = "margin-block-start:0.3rem;margin-block-end:0.3rem;margin-top:15px" />
                    ${getLinkedNoticesHtml(keywordlinkedNotices)} `;


        keywordScreen += `<div id="modalPlace"></div>`;
        // *** Display template with variables
        document.querySelector("#" + mainDisplay).innerHTML = keywordScreen;

        //***  Actions
        // document.querySelector("#editButton").onclick = function () {
        //     console.log("extractButton : ");
        //     personEditModalDisplay(mainDisplay, person, function (status) {
        //     });
        // };
        // document.querySelector("#addnewButton").onclick = function (event) {
        //     console.log("addnewButton : ");
        //     personNewModalDisplay(mainDisplay, person, function (status) {
        //     });

        // };

        // *** Add action to each notice linked - Action = open notice component and load the notice. 
        addMultipleEnventListener(".noticeButtons", function () {
            window.location.href = `${getAppPath()}/views/notice/notice.html?noticeID=` + event.currentTarget.getAttribute('searid');
        });


        // const cbox = document.querySelectorAll(".noticeButtons");
        // for (let i = 0; i < cbox.length; i++) {
        //     cbox[i].addEventListener("click", function () {
        //         console.log(cbox[i]);
        //         // console.log("click span" + cbox[i].attributes.getNamedItem('sera_id').value);
        //         window.location.href = `${currentApplicationPath}/views/notice/notice.html?noticeID=` + cbox[i].attributes.getNamedItem('searid').value;
        //     });
        // }

    } catch (error) {
        document.querySelector("#messageSection").innerHTML = `<div class="alert alert-danger" style = "margin-top:30px" role = "alert" > ${error}</div > `;
    }
}
/**
 * Returns the list of the notices linked with the person
 * @param {*} linkedNotices 
 * @returns 
 */
function getLinkedNoticesHtml(linkedNotices) {
    let outputln = `<div style="margin-bottom:20px"><span class="fs-6" style="color:#8B2331">${getTranslation("KEY_LINKED")} (${linkedNotices.length} notices)</span>  </div>`;
    linkedNotices.map((linkedNotice, index) => {
        outputln += `
        <div class="row " > `;

        if (linkedNotice.noti_main_image && linkedNotice.noti_main_image.length > 0) {
            outputln += ` <div class="col-3" align = "center" > `;
            outputln += ` <img src = '${getimagePath()}/img/books/${linkedNotice.noti_main_image}' width = "80px" /> `;
            outputln += `</div > `;
            outputln += `<div class="col-9" > <span style="cursor: pointer"  class="noticeButtons"
        searid="${linkedNotice.noti_id}" > ${bookIcon} ${linkedNotice.noti_main_title} </span > `;
            outputln += `</div > `

        } else {
            outputln += ` <div class="col-3" align = "center" > `;
            outputln += `</div > `;
            outputln += `<div class="col-9" > <span style="cursor: pointer" class="noticeButtons"
        searid="${linkedNotice.noti_id}" > ${bookIcon} ${linkedNotice.noti_main_title} </span >`;
            outputln += `</div > `;

        }
        outputln += `</div > `
        outputln += `<hr style = "color:#a5a5a5" /> `;

    });
    return outputln;

}