// *** Component ressources
import { getKeyword, getKeywordAliases, getKeywordlinkedNotices, getKeywordFromAliasID } from './keywordService.js' // , getKeywordFromAliasID 
// import { personEditModalDisplay } from './personEditModalViewController.js'
// import { personNewModalDisplay } from './personNewModalViewController.js'

// *** Shared ressources
import { getTranslation } from '../../shared/services/translationService.js'
import { getArrayFromjson } from '../../shared/functions/commonFunctions.js'
import { currentApplicationPath, imagePath, pencilsquare, plussquare } from '../../shared/assets/constants.js'
import { getCurrentUSerRightLevel } from '../../shared/components/login/loginService.js'
import { addMultipleEnventListener } from '../../shared/functions/commonFunctions.js'
import { launchInitialisation } from '../../shared/services/initialisationService.js';
import { headerViewDisplay } from '../../shared/assets/components/global/headerViewCont.js'

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
        let keywordScreen = `<div class="d-flex  justify-content-between" style="padding-top:20px">
                    <span class="fs-5" style="color:#8B2331"> ${getTranslation("keyword")} : <span
                    id="concname">${keyword.conc_name}</span></span>
                   <div>
                <span ${getCurrentUSerRightLevel(20)} id="editButton" style="cursor: pointer"> ${pencilsquare}</span>
                <span ${getCurrentUSerRightLevel(20)} id="addnewButton" style="cursor: pointer; margin-left:5px"> ${plussquare}</span>
            </div>
   
        </div>
        <hr />
        
        <!-- Display name and image -->
        <div class="row row-cols-1 row-cols-xs-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 row-cols-xl-2 "> 
        ${keyword.conc_image && keyword.conc_image.length > 0 ?
                `<div class="col-md-2 col-lg-2 col-xl-2" align="center" >
                <img src="${imagePath}/img/keyword/${keyword.conc_image}" width="100px" />
            </div > 
            <div class="col-md-10 col-lg-10 col-xl-10" style = "" > 
                ${keyword.conc_name} 
            </div > `
                :
                `<div class="col-md-10 col-lg-10 col-xl-12" style = "" > 
                ${keyword.conc_name} 
            </div > `
            }
        </div>    

         <hr /> 
         ${testBoolean ? 'Display bolean' : ''}

            <! Display aliases -->
        <div style=""> <spanclass="fs-6" style="color:#8B2331"> Keyword Aliases</span></div >
        <div id="concaliases">
            ${keywordAliases.map((keywordAliase, index) => (
                `<span class="fw-light" style = "color:grey" >` + keywordAliase.lang_name + `</span > : ` + keywordAliase.coal_name + `, `
            )).join("")}
        </div >
        <hr />

        <div><span class="fs-6" style="color:#8B2331">Note</span></div>
        <div id="concnote">${keyword.conc_note} </div>
        <hr />

        <div><span class="fs-6" style="color:#8B2331">Notices linked</span></div>
        <div id="conclinkednotices" style="margin-top:20px">
               ${getLinkedNoticesHtml(keywordlinkedNotices)}
        </div>
        `;
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
            window.location.href = `${currentApplicationPath}/views/notice/notice.html?noticeID=` + $(this).attr('searid');
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
    let outputln = '';
    linkedNotices.map((linkedNotice, index) => {
        outputln += `<div class="row row-cols-1 row-cols-xs-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 row-cols-xl-2 " > `;

        if (linkedNotice.noti_main_image && linkedNotice.noti_main_image.length > 0) {
            outputln += `<div class="col-md-10 col-lg-10 col-xl-10" > <span style="cursor: pointer"  class="noticeButtons"
        searid="${linkedNotice.noti_id}" > ${linkedNotice.noti_main_title} </span > `;
            outputln += `</div > `
            outputln += ` <div class="col-md-2 col-lg-2 col-xl-2" align = "center" > `;
            outputln += ` <img src = '${imagePath}/img/books/${linkedNotice.noti_main_image}' width = "80px" /> `;
            outputln += `</div > `;

        } else {
            outputln += `<div class="col-md-10 col-lg-10 col-xl-10" > <span style="cursor: pointer" class="noticeButtons"
        searid="${linkedNotice.noti_id}" > ${linkedNotice.noti_main_title} </span >`;
            outputln += `</div > `
            outputln += ` <div class="col-md-2 col-lg-2 col-xl-2" align = "center" > `;
            outputln += `</div > `;

        }
        outputln += `</div > `
        outputln += `<hr style = "color:#a5a5a5" / > `;

    });
    return outputln;

}