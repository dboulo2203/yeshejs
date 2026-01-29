// *** Component ressources
import { getPerson, getPersonAliases, getlinkedNotices, getPersonFromAliasID } from '../../shared/yesheServices/yeshePersonService.js'
import { personEditModalDisplay } from './editModal/personEditModalViewController.js'
import { personNewModalDisplay } from './editModal/personNewModalViewController.js'

import { headerViewDisplay } from '../../shared/appservices/headerViewCont.js'
import { displayimageViewDisplay } from '../../shared/bootstrapServices/displayimageViewCont.js'
import { launchInitialisation } from '../../shared/appservices/initialisationService.js'

// *** Shared ressources
import { getTranslation } from '../../shared/services/translationService.js'
import { getArrayFromjson, findTibetanChars, getAppPath, addMultipleEnventListener, getLinkWithctrl, getEntityLinkClass } from '../../shared/services/commonFunctions.js'
import { pencilsquare, plussquare, personIcon24, bookIcon, subnoticeIcon } from '../../shared/assets/constants.js'
import { getConfigurationValue } from '../../shared/services/configurationService.js'
import { getCurrentUSerRightLevel } from '../../shared/yesheServices/yesheLoginService.js'

/**
 * Start script 
 */
export function componentIdentityPerson() {
    return `Business component: person : version 2.1.0 - 28 /05 / 2025`
}

export async function startPersonController() {

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

        // *** Get params and launch component
        if (searchParams.has('personID') && searchParams.get('personID').length > 0)
            await displayPersonContent('mainActiveSection', searchParams.get('personID'));
        else if (searchParams.has('personAliasID') && searchParams.get('personAliasID').length > 0) {
            let person = await getPersonFromAliasID(searchParams.get('personAliasID'));
            await displayPersonContent('mainActiveSection', person.conc_id);
        } else
            throw new Error("Erreur, pas de person ID");
    } catch (error) {
        document.querySelector("#messageSection").innerHTML = `<div class="alert alert-danger" style = "margin-top:60px" role = "alert" > ${error}</div > `;
    }
}

/**
 * 
 * @param {*} mainDisplay 
 * @param {*} personID 
 */
export async function displayPersonContent(mainDisplay, personID) {

    let output = '';
    let testBoolean = false;

    // *** Load data from API
    let person = await getPerson(personID);

    let personAliases = getArrayFromjson(await getPersonAliases(personID));
    let linkedNotices = await getlinkedNotices(personID);

    await displayPerson(mainDisplay, person, personAliases, linkedNotices);

}

async function displayPerson(mainDisplay, person, personAliases, linkedNotices) {
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
                    <img src="${getConfigurationValue("imagePath")}/img/persons/${person.conc_image}" width="100%"   style="width:100%;max-width:150px;cursor:pointer" class="imgsearch" />
                </div >
            
                <div class="col-9" >
                    <!--<div><span class="fs-5" style="color:#8B2331">${getTranslation("PERS_NOTE")}</span></div>-->
                    <dob-bloctitle userIcon = "" userName = "${getTranslation("PERS_NOTE")}" ></dob-bloctitle >

                    <div id="concnote">${person.conc_note} </div>
                    </div > `
    else personScreen += `
        <div class="col-12" >
                    <dob-bloctitle userIcon = "" userName = "${getTranslation("PERS_NOTE")}" ></dob-bloctitle >
                    <div id="concnote">${person.conc_note} </div>
                </div >            
        </div >
        `;

    // *** Display Aliases
    // personScreen += `< hr style = "margin-block-start:0.3rem;margin-block-end:0.3rem;margin-top:15px" /> `;
    // personScreen += `
    //     <div class="row justify-content-start" >
    //         <div style=""> <span class="fs-5" style="color:#8B2331"> ${getTranslation("PERS_ALIASES")}</span></div >`;
    personScreen += `<dob-bloctitle userIcon="" userName="${getTranslation("PERS_ALIASES")}" ></dob-bloctitle >`;
    personAliases.map((personAliase, index) => {
        personScreen += `<div class="col-12" >`;
        personScreen += `
                    <span class="fw-light" style = "color:grey" > ` + personAliase.lang_name + `</span > : ` + findTibetanChars(personAliase.coal_name) + `</br > `
    });

    personScreen += ` </div > `;

    // *** Linked notices
    personScreen += ` ${await getLinkedNoticesHtml(linkedNotices)} `;

    // *** Display template with variables
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
            outputln += ` <img src = '${getConfigurationValue("imagePath")}/img/books/${linkedNotice.noti_main_image}' class="imgsearch" style="cursor:pointer" width = "80px" /> `;
            outputln += `</div > `;
            if (linkedNotice.noti_hierarchical_level && linkedNotice.noti_hierarchical_level === 2) {
                outputln += `<div class="col-9" >`
                outputln += getEntityLinkClass("subnoticeButtons", subnoticeIcon + " " + findTibetanChars(linkedNotice.noti_main_title), linkedNotice.noti_id, false);
                outputln += `</div > `;
                // outputln += `<div class="col-9" > <span style="cursor: pointer" class="subnoticeButtons" searid="${linkedNotice.noti_id}" > ${subnoticeIcon} ${linkedNotice.noti_main_title} </span >`;
            } else {
                outputln += `<div class="col-9" >`
                outputln += getEntityLinkClass("noticeButtons", bookIcon + " " + findTibetanChars(linkedNotice.noti_main_title), linkedNotice.noti_id, false);
                // outputln += `<div class="col-9" > <span style="cursor: pointer" class="noticeButtons" searid="${linkedNotice.noti_id}" >${bookIcon} ${linkedNotice.noti_main_title} </span > `;
                outputln += `</div > `
            }
        } else {
            if (linkedNotice.noti_hierarchical_level && linkedNotice.noti_hierarchical_level === 2)
                outputln += getEntityLinkClass("subnoticeButtons", subnoticeIcon + " " + findTibetanChars(linkedNotice.noti_main_title), linkedNotice.noti_id, false);
            //outputln += `<div class="col-12" > <span style="cursor: pointer" class="subnoticeButtons" searid="${linkedNotice.noti_id}" > ${subnoticeIcon} ${linkedNotice.noti_main_title} </span >`;
            else
                outputln += getEntityLinkClass("noticeButtons", bookIcon + " " + findTibetanChars(linkedNotice.noti_main_title), linkedNotice.noti_id, false);
            //outputln += `<div class="col-12" > <span style="cursor: pointer" class="noticeButtons" searid="${linkedNotice.noti_id}" >${bookIcon} ${linkedNotice.noti_main_title} </span >`;
            outputln += `</div > `;
        }
        outputln += `</div >
                    `
        outputln += `<hr style = "margin-block-start:0.3rem;margin-block-end:0.3rem;margin-top:15px;color: #dddbdbff" />`;

    });
    return outputln;
}