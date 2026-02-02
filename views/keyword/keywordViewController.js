// *** Component ressources


import { headerViewDisplay } from '../../shared/yesheAppservices/headerViewCont.js'
import { launchInitialisation } from '../../shared/yesheAppservices/initialisationService.js';
import { displayimageViewDisplay } from '../../shared/bootstrapServices/displayimageViewCont.js'

// *** Shared ressources
import { getAppPath, getArrayFromjson, addMultipleEnventListener, getLinkWithctrl, getEntityLinkClass, findTibetanChars } from '../../shared/services/commonFunctions.js'
import { keyIcon, bookIcon, pencilsquare, plussquare, subnoticeIcon } from '../../shared/assets/constants.js';
import { getTranslation } from '../../shared/services/translationService.js'
import { getConfigurationValue } from '../../shared/services/configurationService.js'
import { getCurrentUSerRightLevel } from '../../shared/yesheServices/yesheLoginService.js'
import {
    getKeyword, getKeywordAliases, getKeywordlinkedNotices,
    getKeywordFromAliasID
} from '../../shared/yesheServices/yesheKeywordService.js'

/**
 * Start script 
 */
export function componentIdentityPerson() {
    return `Business component: keyword : version 2.1.0 - 28 /05 / 2025`
}

export async function startKeywordController() {

    try {
        const searchParams = new URLSearchParams(window.location.search);

        // *** Get URL params and launch display
        if (searchParams.has('identity')) {
            document.querySelector("#mainActiveSection").innerHTML = componentIdentity;
            return
        }
        // *** Initialisations
        await launchInitialisation();
        headerViewDisplay("#menuSection");


        // *** Get params
        if (searchParams.has('keywordID') && searchParams.get('keywordID').length > 0)
            await displayKeywordContent('mainActiveSection', searchParams.get('keywordID'));
        else if (searchParams.has('keywordAliasID') && searchParams.get('keywordAliasID').length > 0) {
            let person = await getKeywordFromAliasID(searchParams.get('keywordAliasID'));
            await displayKeywordContent('mainActiveSection', person.conc_id);
        } else
            throw new Error("Erreur, pas de keyword ID");

    } catch (error) {
        document.querySelector("#messageSection").innerHTML = `<div class="alert alert-danger" style = "margin-top:30px" role = "alert" > ${error}</div > `;
    }
}

/**
 * 
 * @param {*} mainDisplay 
 * @param {*} personID 
 */
async function displayKeywordContent(mainDisplay, keywordID) {

    let output = '';
    let testBoolean = false;
    // try {

    // *** Load data from API
    let keyword = await getKeyword(keywordID);

    let keywordAliases = getArrayFromjson(await getKeywordAliases(keywordID));
    let keywordlinkedNotices = await getKeywordlinkedNotices(keywordID);

    await displayKeyword(mainDisplay, keyword, keywordAliases, keywordlinkedNotices);
}


async function displayKeyword(mainDisplay, keyword, keywordAliases, keywordlinkedNotices) {

    // ** Main template
    let keywordScreen = `
        <div class="d-flex  justify-content-between" style="margin-top:60px">
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
                <dob-bloctitle userIcon = "" userName = "${getTranslation("PERS_NOTE")}" ></dob-bloctitle >
                <div id="concnote">${keyword.conc_note} </div>
            </div >
            
        </div >
        `;

    // *** Display Aliases
    // keywordScreen += `< hr style = "margin-block-start:0.3rem;margin-block-end:0.3rem;margin-top:15px" /> `;

    // keywordScreen += `
    //     <div class="row justify-content-start" >
    //         <div style=""> <span class="fs-5" style="color:#8B2331"> ${getTranslation("KEY_ALIASES")}</span></div >`;
    keywordScreen += `<dob-bloctitle userIcon="" userName="${getTranslation("KEY_ALIASES")}" ></dob-bloctitle>`;

    // <div class="col-6 " >
    keywordAliases.map((keywordAliase, index) => {
        keywordScreen += `<div class="col-12" >`;
        keywordScreen += `
                    <span class="fw-light" style = "color:grey" > ` + keywordAliase.lang_name + `</span > : ` + keywordAliase.coal_name + `</br > `
    });

    keywordScreen += `</div >
        </div > `;
    keywordScreen += ` ${await getLinkedNoticesHtml(keywordlinkedNotices)} `;


    keywordScreen += `<div id="modalPlace"></div>`;
    // *** Display template with variables
    document.querySelector("#" + mainDisplay).innerHTML = keywordScreen;


    // *** Add action to each notice linked - Action = open notice component and load the notice. 
    // addMultipleEnventListener(".noticeButtons", function () {
    //     window.location.href = `${getAppPath()}/views/notice/notice.html?noticeID=` + event.currentTarget.getAttribute('searid');
    // });
    addMultipleEnventListener(".noticeButtons", function (event) {
        getLinkWithctrl(`${getAppPath()}/views/notice/notice.html?noticeID=` + event.currentTarget.getAttribute('searid'), event.ctrlKey);
    });

    addMultipleEnventListener(".subnoticeButtons", function (event) {
        getLinkWithctrl(`${getAppPath()}/views/subnotice/subnotice.html?subnoticeid=` + event.currentTarget.getAttribute('searid'), event.ctrlKey);
    });



    addMultipleEnventListener(".imgsearch", function (event) {
        displayimageViewDisplay("modalSection", event.currentTarget.getAttribute('src'), event.ctrlKey)
    });

}

/**
 * Returns the list of the notices linked with the person
 * @param {*} linkedNotices 
 * @returns 
 */
async function getLinkedNoticesHtml(linkedNotices) {
    let outputln = '';
    // outputln += `<div style = "margin-bottom:20px" > <span class="fs-5" style="color:#8B2331">${getTranslation("PERS_LINKED")} (${linkedNotices.length} notices)</span>  </div > `;
    outputln += `<dob-bloctitle userIcon="" userName="${getTranslation("PERS_LINKED")}  (${linkedNotices.length} notices)" ></dob-bloctitle >`;

    linkedNotices.map((linkedNotice, index) => {
        outputln += `
        <div class="row" > `;

        if (linkedNotice.noti_main_image && linkedNotice.noti_main_image.length > 0) {
            outputln += ` <div class="col-3" align = "center" > `;
            outputln += ` <img src = '${getConfigurationValue("imagePath")}/img/books/${linkedNotice.noti_main_image}' class="imgsearch" style="cursor:pointer" width = "100px" /> `;
            outputln += `</div > `;
            if (linkedNotice.noti_hierarchical_level && linkedNotice.noti_hierarchical_level === 2) {
                outputln += `<div class="col-9" >`
                outputln += getEntityLinkClass("subnoticeButtons", subnoticeIcon + " " + findTibetanChars(linkedNotice.noti_main_title), linkedNotice.noti_id, true);
                outputln += `</div > `;
            } else {
                outputln += `<div class="col-9" >`
                outputln += getEntityLinkClass("noticeButtons", bookIcon + " " + findTibetanChars(linkedNotice.noti_main_title), linkedNotice.noti_id, true);
                outputln += `</div > `
            }
        } else {
            outputln += ` <div class="col-3" align = "center" > `;
            outputln += `</div > `;

            if (linkedNotice.noti_hierarchical_level && linkedNotice.noti_hierarchical_level === 2) {
                outputln += `<div class="col-9" >`
                outputln += getEntityLinkClass("subnoticeButtons", subnoticeIcon + " " + findTibetanChars(linkedNotice.noti_main_title), linkedNotice.noti_id, true);
                outputln += `</div > `
            } else {
                outputln += `<div class="col-9" >`
                outputln += getEntityLinkClass("noticeButtons", bookIcon + " " + findTibetanChars(linkedNotice.noti_main_title), linkedNotice.noti_id, true);
                outputln += `</div > `;
            }
        }
        outputln += `</div >            `
        outputln += `<hr style = "margin-block-start:0.3rem;margin-block-end:0.3rem;margin-top:15px;color: #dddbdbff" />`;

    });
    return outputln;
}
// /**
//  * Returns the list of the notices linked with the person
//  * @param {*} linkedNotices
//  * @returns
//  */
// function getLinkedNoticesHtml(linkedNotices) {
//     //let outputln = `<div style="margin-bottom:20px"><span class="fs-5" style="color:#8B2331">${getTranslation("KEY_LINKED")} (${linkedNotices.length} notices)</span>  </div>`;
//     let outputln = `<dob-bloctitle userIcon="" userName="${getTranslation("KEY_LINKED")}" ></dob-bloctitle >`;

//     linkedNotices.map((linkedNotice, index) => {
//         outputln += `
//         <div class="row " > `;

//         if (linkedNotice.noti_main_image && linkedNotice.noti_main_image.length > 0) {
//             outputln += ` <div class="col-3" align = "center" > `;
//             outputln += ` <img src = '${getConfigurationValue("imagePath")}/img/books/${linkedNotice.noti_main_image}' class="imgsearch" style="cursor:pointer" width = "80px" /> `;
//             outputln += `</div > `;
//             outputln += `<div class="col-9" > <span style="cursor: pointer"  class="noticeButtons"
//         searid="${linkedNotice.noti_id}" > ${bookIcon} ${linkedNotice.noti_main_title} </span > `;
//             outputln += `</div > `

//         } else {
//             outputln += ` <div class="col-3" align = "center" > `;
//             outputln += `</div > `;
//             outputln += `<div class="col-9" > <span style="cursor: pointer" class="noticeButtons"
//         searid="${linkedNotice.noti_id}" > ${bookIcon} ${linkedNotice.noti_main_title} </span >`;
//             outputln += `</div > `;

//         }
//         outputln += `</div > `
//         outputln += `<hr class="text-body-tertiary" /> `;

//     });
//     return outputln;

// }