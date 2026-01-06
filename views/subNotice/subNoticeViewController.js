// *** Component ressources
import { getsubNotice } from './subNoticeService.js'
// import { displayModaleAndFunctions } from './abstractModalViewController.js'

// ** Shared ressoucres
import { getArrayFromjson, addMultipleEnventListener, getEntityLinkClass, getLinkWithctrl } from '../../shared/services/commonFunctions.js'
import { questionIcon, questionIcon18, subbookIcon } from '../../shared/assets/constants.js'
import { getimagePath } from '../../shared/services/initialisationService.js'
import { getAppPath } from '../../shared/services/commonFunctions.js'
import { getTranslation } from '../../shared/services/translationService.js'

import { bookfillIcon24 } from '../../shared/assets/constants.js'
import { launchInitialisation } from '../../shared/services/initialisationService.js';
import { headerViewDisplay } from '../../shared/services/headerViewCont.js'

/**
 * Start script 
 */
export function startsubNoticeController() {

    console.log("Start noticeViewController");
    const searchParams = new URLSearchParams(window.location.search);
    console.log(searchParams);

    headerViewDisplay("#menuSection");

    if (searchParams.has('subNoticeID'))
        launchsubNoticeController('mainActiveSection', searchParams.get('subNoticeID'));
    else
        document.querySelector("#messageSection").innerHTML = `<div class="alert alert-danger" style="margin-top:20px" role="alert">Erreur, pas de subNoticeID</div>`;
}
/**
 * Main basket view function
 * - Display categories
 * - Display basket content
 *  
 * @param {*} htlmPartId 
 */
export async function launchsubNoticeController(htlmPartId, noticeID) {

    try {
        // *** Initialisations
        await launchInitialisation();
        headerViewDisplay("#menuSection");

    } catch (error) {
        document.querySelector("#messageSection").innerHTML = `<div class="alert alert-danger" style = "margin-top:30px" role = "alert" > ${error}</div > `;
    }
    // *** Display basket component
    displayNoticeContent(htlmPartId, noticeID);

}

/**
 * 
 * @param {*} mainDisplay 
 * @param {*} noticeID 
 */
export async function displayNoticeContent(mainDisplay, subNoticeID) {

    let output = '';
    let subNotice = await getsubNotice(subNoticeID);
    console.log(JSON.stringify(subNotice));
    output += `
        <div class="d-flex  justify-content-between" style="padding-top:60px" >          
                <span class="fs-5" style="color:#8B2331">${subbookIcon} ${getTranslation("NOT_SUBRECORDSTITLE")} : ${subNotice.noti_main_title}</span>
                <span id="extractButton" style="cursor: pointer">   ${questionIcon18}</span> 
       
        </div > 
        
      </div > <hr style="margin-block-start:0.3rem;margin-block-end:0.3rem" />`;

    // *** Notice image and noticeCatalogDescription
    output += `<div class="row " > `;

    // *** Notice titles
    output += `<div style=""><spanclass="fs-6" style="color:#8B2331">Titles</span></div>`;
    output += `<div class="col-md-12 main" " > <span class="fw - light" >${getTranslation("NOT_MAINTITLE")}</span> : ${subNotice.noti_main_title}`;
    output += `</div>`
    if (subNotice.noti_other_title)
        output += `<div class="col-md-12 main"> <span class="fw-light" >${getTranslation("NOT_OTHERTITLE")}</span> :  ${subNotice.noti_other_title}</div>`;

    // *** Notice description
    output += `<div class="row ">`;
    output += `<div class="col">`;
    output += `<hr style="margin-block-start:0.1rem;margin-block-end:0.3rem;margin-top:15px"/>`;
    output += `<div style=""><spanclass="fs-6" style="color:#8B2331">General description</span></div>`;
    output += `<div class="col-md-12 main" " > <span class="fw-light" >${getTranslation("NOT_MATERIALDESCRIPTION")}</span> : ${subNotice.noti_col_mat_description === null ? '' : subNotice.noti_col_mat_description}</div>`;
    output += `<div class="col-md-12 main" " > <span class="fw-light" >${getTranslation("NOT_ORIENTALDATE")}</span> : ${subNotice.noti_oriental_date === null ? '' : subNotice.noti_oriental_date}</div>`;
    // output += `<div class="col-md-12 main" " > <span class="fw-light" >${getTranslation("Format")}</span> : ${notice.noti_col_format === null ? '' : notice.noti_col_format}</div>`;
    // output += `</div>`

    // // *** Edition
    // output += `<div class="col">`;
    // output += `<hr style="margin-block-start:0.1rem;margin-block-end:0.3rem;margin-top:15px"/>`;
    // output += `<div style=""><spanclass="fs-6" style="color:#8B2331">Publication</span></div>`;
    output += `<div class="col-md-12 main" " > <span class="fw-light" >${getTranslation("NOT_ISBN")}</span> : ${subNotice.noti_basenumber === null ? '' : subNotice.noti_basenumber}</div>`;
    //  output += `<div class="col-md-12 main" " > <span class="fw-light" EAN </span> : ${notice.noti_codedouchette === null ? '' : notice.noti_codedouchette}</div>`; NOT_SUBFATHERNOTICE
    output += `<div class="col-md-12 main" " > <span class="fw-light" >${getTranslation("NOT_SUBFATHERNOTICE")}</span> : 
     ${getEntityLinkClass("noticeButtons", subNotice.father_title, subNotice.father_id)}
    </div>`;
    output += `<div class="col-md-12 main" " > <span class="fw-light" >${getTranslation("NOT_SUBORDER")}</span> : ${subNotice.sdoc_order === null ? '' : subNotice.sdoc_order}</div>`;
    //  output += `<div class="col-md-12 main" " > <span class="fw-light" >EAN </span> : ${notice.noti_codedouchette === null ? '' : notice.noti_codedouchette}</div>`; NOT_SUBFATHERNOTICE
    output += `</div>`
    output += `</div>`


    // *** Persons
    // Note : the , and . have been deleted but we have kept the code  
    output += `<div class="row row-cols-1 row-cols-xs-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 row-cols-xl-2 ">`;
    output += `<div class="col">`;
    output += `<hr style="margin-block-start:0.1rem;margin-block-end:0.3rem;margin-top:15px"/>`;
    output += `<div style=""><spanclass="fs-6 " style="color:#8B2331">Personnes</span></div>`;
    let personsList = getArrayFromjson(subNotice.personsFunctionFor);
    personsList.map((person, index, personsList) => {
        output += `<span class="fw-light" > ${person.tffd_name}</span> :
         ${getEntityLinkClass("personButtons", person.coal_name, person.chaa_id)}</br>`;
    });
    output += `</div>`; // End persons col

    // *** Keywords
    // Note : the , and . have been deleted but we have kept the code
    output += `<div class="col">`;
    output += `<hr class="visible-md-block" style="margin-block-start:0.3rem;margin-block-end:0.3rem;margin-top:15px"/>`;
    output += `<div style=""><spanclass="fs-6" style="color:#8B2331">Keywords</span></div>`;
    let keywordList = getArrayFromjson(subNotice.keywordsFunctionFor);
    keywordList.map((keyword, index) => {
        output += `<span class="fw-light" > ${keyword.tffc_name}</span> : 
        <span style="cursor: pointer;color:#8B2331" class="keywordButtons"  
        searid="${keyword.conc_id}"></span>
         ${getEntityLinkClass("keywordButtons", keyword.coal_name, keyword.conc_id)}
        </br>`;
    });
    output += `</div>`;
    output += `</div>`; // End person & keyword row
    output += `<hr style="margin-block-start:0.3rem;margin-block-end:0.3rem;margin-top:15px"/>`;


    // *** Notes
    let notesList = getArrayFromjson(subNotice.notesFunctionFor);
    output += `<div ><span class="fs-6" style="color:#8B2331">Notes</span></div>`;
    notesList.map((note, index) => {
        output += `<div style ="margin-bottom:10px"><span class="fw-light" style ="color:grey;margin-top:40px">${note.ffnnt_name} </span> :</br> ${note.ffnn_text} </br> </div>`;
    });
    output += `<hr style="margin-block-start:0.3rem;margin-block-end:0.3rem;margin-top:15px"/>`;

    // *** Multimedia
    let multimediasList = getArrayFromjson(subNotice.multimediasFunctionFor);
    output += `<div><span class="fs-6" style="color:#8B2331">Multimedia</span></div>`;
    multimediasList.map((multimedia, index) => {
        output += `${multimedia.mult_name}  : ${multimedia.multt_name} : ${multimedia.mult_file} </br> `;
    });
    output += `<hr style="margin-block-start:0.3rem;margin-block-end:0.3rem;margin-top:15px"/>`;


    // *** Display string
    document.querySelector("#" + mainDisplay).innerHTML = output;

    // ************** Actions
    // document.querySelector("#extractButton").onclick = function () {
    //     displayModaleAndFunctions("#modaldisplay", notice.noti_id, function (status) {
    //     });
    // };
    // *** Add action to each notice linked - Action = open notice component and load the notice. 
    addMultipleEnventListener(".noticeButtons", function (event) {
        getLinkWithctrl(`${getAppPath()}/views/notice/notice.html?noticeID=` + event.currentTarget.getAttribute('searid'), event.ctrlKey);;
    });

    addMultipleEnventListener(".personButtons", function (event) {
        getLinkWithctrl(`${getAppPath()}/views/person/person.html?personAliasID=` + event.currentTarget.getAttribute('searid'), event.ctrlKey);
    });

    addMultipleEnventListener(".keywordButtons", function (event) {
        getLinkWithctrl(`${getAppPath()}/views/keyword/keyword.html?keywordAliasID=` + event.currentTarget.getAttribute('searid'), event.ctrlKey);
    });

    // document.querySelector("#publisherButton").onclick = function () {
    //     window.location.href = `${getAppPath()}/views/simpleEntity/simpleEntity.html?simpleEntityID=${notice.publ_id}&simpleEntitytype=13`
    // };

    // document.querySelector("#printerButton").onclick = function () {
    //     window.location.href = `${getAppPath()}/views/simpleEntity/simpleEntity.html?simpleEntityID=${notice.prin_id}&simpleEntitytype=12`
    // };

}

