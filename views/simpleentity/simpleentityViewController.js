// *** Component ressources
// import { getKeyword, getKeywordAliases, getKeywordlinkedNotices, getKeywordFromAliasID } from './keywordService.js' // , getKeywordFromAliasID 
// import { personEditModalDisplay } from './personEditModalViewController.js'
import { getSimpleEntity, getSimpleEntitylinkedNotices } from './simpleentityService.js'

// *** Shared ressources
import { getAppPath } from '../../shared/services/commonFunctions.js'
import { printerIcon, bookIcon, publisherIcon } from '../../shared/assets/constants.js';
import { getTranslation } from '../../shared/services/translationService.js'
// import { getArrayFromjson } from '../../shared/services/commonFunctions.js'
import { getimagePath } from '../../shared/services/initialisationService.js'
// import { pencilsquare, plussquare } from '../../shared/assets/constants.js'
// import { getCurrentUSerRightLevel } from '../../shared/services/login/loginService.js'
// import { addMultipleEnventListener } from '../../shared/services/commonFunctions.js'
import { addMultipleEnventListener } from '../../shared/services/commonFunctions.js'
import { launchInitialisation } from '../../shared/services/initialisationService.js';
import { headerViewDisplay } from '../../shared/services/headerViewCont.js'

/**
 * Start script 
 */
export function componentIdentityPerson() {
    return `Business component: keyword : version 2.1.0 - 28 /05 / 2025`
}

export async function startsimpleentityController() {

    const searchParams = new URLSearchParams(window.location.search);

    try {
        // *** Initialisations
        await launchInitialisation();
        headerViewDisplay("#menuSection");

        if (searchParams.has('simpleEntityID') && searchParams.has('simpleEntitytype'))
            displaysimpleentityContent('mainActiveSection', searchParams.get('simpleEntityID'), searchParams.get('simpleEntitytype'));
        else
            document.querySelector("#messageSection").innerHTML = `<div class="alert alert-danger" style="margin-top:30px" role="alert">Erreur, pas d'ID</div>`;


    } catch (error) {
        document.querySelector("#messageSection").innerHTML = `<div class="alert alert-danger" style = "margin-top:30px" role = "alert" > ${error}</div > `;
    }

}


/**
 * When the page is called from a notice page, we have the aliasID not the personID
 * @param {*} htlmPartId 
 * @param {*} personAliaID 
 */
export async function displaysimpleentityContent(htlmPartId, simpleentityID, simpleentityType) {

    let output = ``;
    // *** Display main fixed part of the screen 
    // let keyword = await getKeywordFromAliasID(keywordAliaID);

    // output += "Simple entity display" + simpleentityID + " - " + simpleentityType;

    switch (simpleentityType) {
        case '12': // printer
            output += await getSimpleEntityContent(simpleentityID, "printer", "prin_name", "printerIcon");
            break;
        case '13': // publisher
            output += await getSimpleEntityContent(simpleentityID, "publisher", "publ_name", "publisherIcon");
            break;

        default:
            output += `<div class= "col-12" >
          Unknowned entityt type ${simpleentityType} 
            </div > `;
    }
    document.querySelector("#" + htlmPartId).innerHTML = output;

    addMultipleEnventListener(".noticeButtons", function () {
        window.location.href = `${getAppPath()}/views/notice/notice.html?noticeID=` + event.currentTarget.getAttribute('searid');
    });

    // *** Display person component
    //  displaysimpleentity(htlmPartId, keyword.conc_id);

}
/**
 * 
 * @param {*} mainDisplay 
 * @param {*} personID 
 */
export async function getSimpleEntityContent(simpleentityID, entityType, varname, entityIcon) {

    let output = '';
    try {

        // *** Load data from API
        let simpleEntity = await getSimpleEntity(simpleentityID, entityType);

        let linkedNotices = await getSimpleEntitylinkedNotices(simpleentityID, entityType);

        // ** Main template
        output = `
            <div class="d-flex  justify-content-between" style="margin-top:60px">
                <span class="fs-5" style="color:#8B2331">${eval(entityIcon)} ${getTranslation(entityType)} : 
                <span
                    id="concname">${eval("simpleEntity." + varname)}</span></span>
                   <div>
            </div>
   
        </div>
        <hr style="margin-block-start:0.3rem;margin-block-end:0.3rem;margin-top:15px"/>
        <div><span class="fs-6" style="color:#8B2331">Notices linked</span></div>`;
        linkedNotices.map((linkedNotice, index) => {
            output += `<div class="row " > `;

            if (linkedNotice.noti_main_image && linkedNotice.noti_main_image.length > 0) {
                output += ` <div class="col-3" align = "center" > `;
                output += ` <img src = '${getimagePath()}/img/books/${linkedNotice.noti_main_image}' width = "80px" /> `;
                output += `</div > `;
                output += `<div class="col-9" > <span style="cursor: pointer"  class="noticeButtons"
        searid="${linkedNotice.noti_id}" > ${bookIcon} ${linkedNotice.noti_main_title} </span > `;
                output += `</div > `

            } else {
                output += ` <div class="col-3" align = "center" > `;
                // outputln += ` <img src = '${imagePath}/img/books/${linkedNotice.noti_main_image}' width = "80px" /> `;
                output += `</div > `;
                output += `<div class="col-9" > <span style="cursor: pointer" class="noticeButtons"
        searid="${linkedNotice.noti_id}" > ${bookIcon} ${linkedNotice.noti_main_title} </span >`;
                output += `</div > `;

            }
            output += `</div > `
            output += `<hr style = "color:#a5a5a5" /> `;

        }); output += ``
    } catch (error) {
        document.querySelector("#messageSection").innerHTML = `<div class="alert alert-danger" style = "margin-top:30px" role = "alert" > ${error}</div > `;
    }
    return output;
}
// /**
//  * Returns the list of the notices linked with the person
//  * @param {*} linkedNotices
//  * @returns
//  */
// function getSimpleEntitylinkedNotices(linkedNotices) {
//     let outputln = '';
//     linkedNotices.map((linkedNotice, index) => {
//         outputln += `<div class="row " > `;

//         if (linkedNotice.noti_main_image && linkedNotice.noti_main_image.length > 0) {
//             outputln += ` <div class="col-3" align = "center" > `;
//             outputln += ` <img src = '${getimagePath()}/img/books/${linkedNotice.noti_main_image}' width = "80px" /> `;
//             outputln += `</div > `;
//             outputln += `<div class="col-9" > <span style="cursor: pointer"  class="noticeButtons"
//         searid="${linkedNotice.noti_id}" > ${bookIcon} ${linkedNotice.noti_main_title} </span > `;
//             outputln += `</div > `

//         } else {
//             outputln += ` <div class="col-3" align = "center" > `;
//             // outputln += ` <img src = '${imagePath}/img/books/${linkedNotice.noti_main_image}' width = "80px" /> `;
//             outputln += `</div > `;
//             outputln += `<div class="col-9" > <span style="cursor: pointer" class="noticeButtons"
//         searid="${linkedNotice.noti_id}" > ${bookIcon} ${linkedNotice.noti_main_title} </span >`;
//             outputln += `</div > `;

//         }
//         outputln += `</div > `
//         outputln += `<hr style = "color:#a5a5a5" /> `;

//     });
//     return outputln;

// }