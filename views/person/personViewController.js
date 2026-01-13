// *** Component ressources
import { getPerson, getPersonAliases, getlinkedNotices, getPersonFromAliasID } from '../../shared/yesheServices/yeshePersonService.js'
import { personEditModalDisplay } from './editModal/personEditModalViewController.js'
import { personNewModalDisplay } from './editModal/personNewModalViewController.js'
import { displayimageViewDisplay } from './displayImage/displayimageViewCont.js'
// *** Shared ressources
import { getTranslation } from '../../shared/services/translationService.js'
import { getArrayFromjson } from '../../shared/services/commonFunctions.js'
import { pencilsquare, plussquare } from '../../shared/assets/constants.js'
import { getimagePath } from '../../shared/services/configurationService.js'
import { getAppPath } from '../../shared/services/commonFunctions.js'
import { getCurrentUSerRightLevel } from '../../shared/services/loginService.js'
import { addMultipleEnventListener } from '../../shared/services/commonFunctions.js'
import { launchInitialisation } from '../appservices/initialisationService.js';
import { headerViewDisplay } from '../appservices/headerViewCont.js'
import { personIcon24, bookIcon, subnoticeIcon } from '../../shared/assets/constants.js'

/**
 * Start script 
 */
export function componentIdentityPerson() {
    return `Business component: person : version 2.1.0 - 28 /05 / 2025`
}

export async function startPersonController() {

    const searchParams = new URLSearchParams(window.location.search);

    // *** Get URL params and launch display
    if (searchParams.has('identity')) {
        document.querySelector("#mainActiveSection").innerHTML = componentIdentity;
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

    // *** Get URL params and launch display
    if (searchParams.has('personID'))
        displayPersonContent('mainActiveSection', searchParams.get('personID'));
    else if (searchParams.has('personAliasID'))
        displayPersonContentFromAlias('mainActiveSection', searchParams.get('personAliasID'));
    else
        document.querySelector("#messageSection").innerHTML = `<div class="alert alert-danger" style="margin-top:30px" role="alert">Erreur, pas d'ID</div>`;
}

/**
 * When the page is called from a notice page, we have the aliasID not the personID
 * @param {*} htlmPartId 
 * @param {*} personAliaID 
 */
export async function displayPersonContentFromAlias(htlmPartId, personAliaID) {

    // *** Display main fixed part of the screen 
    let person = await getPersonFromAliasID(personAliaID);

    // *** Display person component
    displayPersonContent(htlmPartId, person.conc_id);

}
/**
 * 
 * @param {*} mainDisplay 
 * @param {*} personID 
 */
export async function displayPersonContent(mainDisplay, personID) {

    let output = '';
    // let person = null;
    let testBoolean = false;
    try {

        // *** Load data from API
        let person = await getPerson(personID);

        let personAliases = getArrayFromjson(await getPersonAliases(personID));
        let linkedNotices = await getlinkedNotices(personID);


        // ** Main template
        let personScreen = `
        <div class="row ">
            <div class="d-flex  justify-content-between" style="margin-top:60px">
                <span class="fs-5" style="color:#8B2331">${personIcon24} ${getTranslation("PERS_TITLE")} :
                ${person.conc_name}</span>
                <div>
                    <span ${getCurrentUSerRightLevel(20)} id="editButton" style="cursor: pointer"> ${pencilsquare}</span>
                    <span ${getCurrentUSerRightLevel(20)} id="addnewButton" style="cursor: pointer; margin-left:5px"> ${plussquare}</span>
                </div>
            </div>
        </div>
         <hr style="margin-block-start:0.3rem;margin-block-end:0.3rem;margin-top:15px"/>    

        
        <!-- Display image and note -->
        <div class="row ">`;
        if (person.conc_image && person.conc_image.length > 0)
            personScreen += ` 
                <div class="col-3" align="center">
                    <img src="${getimagePath()}/img/persons/${person.conc_image}" width="100%"   style="width:100%;max-width:150px;cursor:pointer" class="imgsearch" />
                </div >
            
                <div class="col-9" >
                    <div><span class="fs-6" style="color:#8B2331">${getTranslation("PERS_NOTE")}</span></div>
                    <div id="concnote">${person.conc_note} </div>
                </div >`
        else personScreen += `   
                <div class="col-12" >
                    <div><span class="fs-6" style="color:#8B2331">${getTranslation("PERS_NOTE")}</span></div>
                    <div id="concnote">${person.conc_note} </div>
                </div >
            
        </div>
         `;

        // *** Display Aliases
        personScreen += `<hr style="margin-block-start:0.3rem;margin-block-end:0.3rem;margin-top:15px"/> `;

        personScreen += `
        <div class="row justify-content-start" >
            <div style=""> <spanclass="fs-6" style="color:#8B2331"> ${getTranslation("PERS_ALIASES")}</span></div >`;

        // <div class="col-6 " >
        personAliases.map((personAliase, index) => {
            // if (index == 0 || index == halfAlias) {
            //     personScreen += `<div class="col-6" >`
            // }
            personScreen += `<div class="col-12" >`;
            personScreen += `
                    <span class="fw-light" style = "color:grey" > ` + personAliase.lang_name + `</span > : ` + personAliase.coal_name + `</br > `
        });

        personScreen += `</div >
        </div > `;
        personScreen += `<hr style = "margin-block-start:0.3rem;margin-block-end:0.3rem;margin-top:15px" />
                    ${getLinkedNoticesHtml(linkedNotices)} `;

        // *** Display template with variables
        personScreen += `<div id = "modalPlace" ></div > `;
        document.querySelector("#" + mainDisplay).innerHTML = personScreen;

        //***  Actions
        document.querySelector("#editButton").onclick = function () {
            console.log("extractButton : ");
            personEditModalDisplay(mainDisplay, person, function (status) {
            });
        };
        document.querySelector("#addnewButton").onclick = function (event) {
            console.log("addnewButton : ");
            personNewModalDisplay(mainDisplay, person, function (status) {
            });

        };

        // *** Add action to each notice linked - Action = open notice component and load the notice. 
        addMultipleEnventListener(".noticeButtons", function () {
            window.location.href = `${getAppPath()}/views/notice/notice.html?noticeID=` + event.currentTarget.getAttribute('searid');
        });
        addMultipleEnventListener(".subnoticeButtons", function () {
            window.location.href = `${getAppPath()}/views/subNotice/subNotice.html?subNoticeID=` + event.currentTarget.getAttribute('searid');
        });


        addMultipleEnventListener(".imgsearch", function (event) {
            displayimageViewDisplay("modalSection", event.currentTarget.getAttribute('src'), event.ctrlKey)
        });


        // const cbox = document.querySelectorAll(".noticeButtons");
        // for (let i = 0; i < cbox.length; i++) {
        //     cbox[i].addEventListener("click", function () {
        //         console.log(cbox[i]);
        //         // console.log("click span" + cbox[i].attributes.getNamedItem('sera_id').value);
        //         window.location.href = `${ currentApplicationPath } /views/notice / notice.html ? noticeID = ` + cbox[i].attributes.getNamedItem('searid').value;
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
    let outputln = '';
    outputln += `    <div style = "margin-bottom:20px" > <span class="fs-6" style="color:#8B2331">${getTranslation("PERS_LINKED")} (${linkedNotices.length} notices)</span>  </div > `;

    linkedNotices.map((linkedNotice, index) => {
        outputln += `
        <div class="row" > `;

        if (linkedNotice.noti_main_image && linkedNotice.noti_main_image.length > 0) {
            outputln += ` <div class="col-3" align = "center" > `;
            outputln += ` <img src = '${getimagePath()}/img/books/${linkedNotice.noti_main_image}' width = "80px" /> `;
            outputln += `</div > `;
            if (linkedNotice.noti_hierarchical_level && linkedNotice.noti_hierarchical_level === 2)
                outputln += `<div class="col-9" > <span style="cursor: pointer" class="subnoticeButtons" searid="${linkedNotice.noti_id}" > ${subnoticeIcon} ${linkedNotice.noti_main_title} </span >`;
            else
                outputln += `<div class="col-9" > <span style="cursor: pointer" class="noticeButtons" searid="${linkedNotice.noti_id}" >${bookIcon} ${linkedNotice.noti_main_title} </span > `;
            outputln += `</div > `

        } else {
            if (linkedNotice.noti_hierarchical_level && linkedNotice.noti_hierarchical_level === 2)
                outputln += `<div class="col-12" > <span style="cursor: pointer" class="subnoticeButtons" searid="${linkedNotice.noti_id}" > ${subnoticeIcon} ${linkedNotice.noti_main_title} </span >`;
            else
                outputln += `<div class="col-12" > <span style="cursor: pointer" class="noticeButtons" searid="${linkedNotice.noti_id}" >${bookIcon} ${linkedNotice.noti_main_title} </span >`;
            outputln += `</div > `;
        }
        outputln += `</div >
                    `
        outputln += `<hr style = "margin-block-start:0.3rem;margin-block-end:0.3rem;margin-top:15px" />`;

    });
    return outputln;

}


// /**
//  * Returns the list of the notices linked with the person
//  * @param {*} linkedNotices
//  * @returns
//  */
// function getLinkedNoticesHtml(linkedNotices) {
//     let outputln = '';
//     linkedNotices.map((linkedNotice, index) => {
//         outputln += `< div class="row row-cols-1 row-cols-xs-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 row-cols-xl-2 " > `;

//         if (linkedNotice.noti_main_image && linkedNotice.noti_main_image.length > 0) {
//             outputln += `< div class="col-md-10 col-lg-10 col-xl-10" > <span style="cursor: pointer" class="noticeButtons"
//         searid="${linkedNotice.noti_id}" > ${linkedNotice.noti_main_title} </span > `;
//             outputln += `</div > `
//             outputln += ` <div class="col-md-2 col-lg-2 col-xl-2" align = "center" > `;
//             outputln += ` <img src = '${imagePath}/img/books/${linkedNotice.noti_main_image}' width = "80px" /> `;
//             outputln += `</div > `;

//         } else {
//             outputln += `<div class="col-md-10 col-lg-10 col-xl-10" > <span style="cursor: pointer" class="noticeButtons"
//         searid="${linkedNotice.noti_id}" > ${linkedNotice.noti_main_title} </span >`;
//             outputln += `</div > `
//             outputln += ` <div class="col-md-2 col-lg-2 col-xl-2" align = "center" > `;
//             outputln += `</div > `;

//         }
//         outputln += `</div >
//         `
//         outputln += `<hr style = "color:#a5a5a5" / > `;

//     });
//     return outputln;

// }