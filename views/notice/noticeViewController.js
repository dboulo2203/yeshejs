// *** Component ressources
import { getNotice } from './noticeService.js'
import { displayModaleAndFunctions } from './abstractModalViewController.js'

// ** Shared ressoucres
import { getArrayFromjson, addMultipleEnventListener } from '../../shared/services/commonFunctions.js'
import { questionIcon, questionIcon18 } from '../../shared/assets/constants.js'
import { getimagePath } from '../../shared/services/initialisationService.js'
import { getAppPath } from '../../shared/services/commonFunctions.js'
import { getTranslation } from '../../shared/services/translationService.js'

import { bookfillIcon24 } from '../../shared/assets/constants.js'
import { launchInitialisation } from '../../shared/services/initialisationService.js';
import { headerViewDisplay } from '../../shared/services/headerViewCont.js'

/**
 * Start script 
 */
export function startNoticeController() {

    console.log("Start noticeViewController");
    const searchParams = new URLSearchParams(window.location.search);
    console.log(searchParams);

    headerViewDisplay("#menuSection");

    if (searchParams.has('noticeID'))
        launchNoticeController('mainActiveSection', searchParams.get('noticeID'));
    else
        document.querySelector("#messageSection").innerHTML = `<div class="alert alert-danger" style="margin-top:20px" role="alert">Erreur, pas de noticeID</div>`;
}
/**
 * Main basket view function
 * - Display categories
 * - Display basket content
 *  
 * @param {*} htlmPartId 
 */
export async function launchNoticeController(htlmPartId, noticeID) {

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
export async function displayNoticeContent(mainDisplay, noticeID) {

    let output = '';
    let notice = await getNotice(noticeID);
    output += `
        <div class="d-flex  justify-content-between" style="padding-top:60px" >          
                <span class="fs-5" style="color:#8B2331">${bookfillIcon24} ${getTranslation("notice")} : ${notice.noti_main_title}</span>
                <span id="extractButton" style="cursor: pointer">   ${questionIcon18}</span> 
       
        </div > 
        
        <hr />`;

    // *** Notice image and noticeCatalogDescription
    output += `<div class="row " > `;
    if (notice.noti_main_image && notice.noti_main_image.length > 0) {
        output += ` <div class="col-3" align="center" > `;
        output += ` <img src = '${getimagePath()}/img/books/${notice.noti_main_image}' style = "max-width:100px;width:100%"  /> `;
        output += `</div > `;

        output += `<div class="col-9 " style = "" > ${notice.noticeCatalogDescription} `;
        output += `</div > `

    } else {

        output += `<div class="col-md-12 main" style = "" > ${notice.noticeCatalogDescription} `;
        output += `</div > `

    }
    output += `</div > <hr style="margin-block-start:0.3rem;margin-block-end:0.3rem"/>`; // end row

    // *** Notice titles
    output += `<div style=""><spanclass="fs-6" style="color:#8B2331">Titles</span></div>`;
    output += `<div class="col-md-12 main" " > <span class="fw - light" style ="color:grey">${getTranslation("Maintitle")}</span> : ${notice.noti_main_title}`;
    output += `</div>`
    if (notice.noti_sub_title)
        output += `<div class="col-md-12 main"  > <span class="fw-light" style ="color:grey">${getTranslation("Subtitle")}</span> : ${notice.noti_sub_title}</div>`;
    if (notice.noti_parallel_title)
        output += `<div class="col-md-12 main"> <span class="fw-light" style ="color:grey">Parallel title</span> :  ${notice.noti_parallel_title}</div>`;

    output += `<hr style="margin-block-start:0.3rem;margin-block-end:0.3rem;margin-top:15px"/>`;

    // *** Notice description
    output += `<div class="row row-cols-1 row-cols-xs-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 row-cols-xl-2 ">`;
    output += `<div class="col">`;
    output += `<div style=""><spanclass="fs-6" style="color:#8B2331">General description</span></div>`;
    output += `<div class="col-md-12 main" " > <span class="fw-light" style ="color:grey">${getTranslation("Genre")}</span> : ${notice.genrt_name === null ? '' : notice.genrt_name}</div>`;
    output += `<div class="col-md-12 main" " > <span class="fw-light" style ="color:grey">${getTranslation("Theme")}</span> : ${notice.them_name === null ? '' : notice.them_name}</div>`;
    output += `<div class="col-md-12 main" " > <span class="fw-light" style ="color:grey">${getTranslation("Bibliographiclevel")}</span> : ${notice.blil_name === null ? '' : notice.blil_name}</div>`;
    output += `<div class="col-md-12 main" " > <span class="fw-light" style ="color:grey">${getTranslation("Documenttype")}</span> :${notice.doct_name === null ? '' : notice.doct_name}</div>`;
    output += `<div class="col-md-12 main" " > <span class="fw-light" style ="color:grey">${getTranslation("Materialtype")}</span> : ${notice.matt_name === null ? '' : notice.matt_name}</div>`;
    output += `<div class="col-md-12 main" " > <span class="fw-light" style ="color:grey"></div>`;
    output += `<div class="col-md-12 main" " > <span class="fw-light" style ="color:grey">${getTranslation("Materialdescription")}</span> : ${notice.noti_col_mat_description === null ? '' : notice.noti_col_mat_description}</div>`;
    output += `<div class="col-md-12 main" " > <span class="fw-light" style ="color:grey">${getTranslation("Materialcharacteristic")}</span> : ${notice.noti_col_car_description === null ? '' : notice.noti_col_car_description}</div>`;
    output += `<div class="col-md-12 main" " > <span class="fw-light" style ="color:grey">${getTranslation("Format")}</span> : ${notice.noti_col_format === null ? '' : notice.noti_col_format}</div>`;
    output += `</div>`

    // *** Edition
    output += `<div class="col">`;
    output += `<div style=""><spanclass="fs-6" style="color:#8B2331">Publication</span></div>`;
    output += `<div class="col-md-12 main" " > <span class="fw-light" style ="color:grey">${getTranslation("publisher")}  </span> : ${notice.publ_name === null ? '' : notice.publ_name}</div>`;
    output += `<div class="col-md-12 main" " > <span class="fw-light" style ="color:grey">${getTranslation("printer")} </span> : ${notice.prin_name === null ? '' : notice.prin_name}</div>`;
    output += `<div class="col-md-12 main" " > <span class="fw-light" style ="color:grey">${getTranslation("yearofpublication")}</span> :${notice.noti_year_of_publication === null ? '' : notice.noti_year_of_publication}</div>`;
    output += `<div class="col-md-12 main" " > <span class="fw-light" style ="color:grey">Lieu de publication</span> :${notice.noti_place_of_publication === null ? '' : notice.noti_place_of_publication}</div>`;
    output += `<div class="col-md-12 main" " > <span class="fw-light" style ="color:grey">Type de publication</span> : ${notice.noti_type_of_publication === null ? '' : notice.noti_type_of_publication}</div>`;
    output += `<div class="col-md-12 main" " > <span class="fw-light" style ="color:grey">ISBN/ISNN</span> : ${notice.noti_basenumber === null ? '' : notice.noti_basenumber}</div>`;
    output += `<div class="col-md-12 main" " > <span class="fw-light" style ="color:grey">EAN </span> : ${notice.noti_codedouchette === null ? '' : notice.noti_codedouchette}</div>`;
    output += `</div>`
    output += `</div>`
    output += `<hr style="margin-block-start:0.1rem;margin-block-end:0.3rem;margin-top:15px"/>`;

    // *** Persons
    // Note : the , and . have been deleted but we have kept the code  
    output += `<div class="row ">`;
    output += `<div class="col">`;
    output += `<div style=""><spanclass="fs-6 " style="color:#8B2331">Personnes</span></div>`;
    let personsList = getArrayFromjson(notice.personsFunctionFor);
    personsList.map((person, index, personsList) => {
        output += `<span class="fw-light" style ="color:grey"> ${person.tffd_name}</span> : <span style="cursor: pointer" class="personButtons" 
            searid="${person.chaa_id}">${person.coal_name}${index + 1 === personsList.length ? '' : ''}</span></br>`;

    });
    output += `</div>`; // End persons col

    // *** Keywords
    // Note : the , and . have been deleted but we have kept the code
    output += `<div class="col">`;
    output += `<div style=""><spanclass="fs-6" style="color:#8B2331">Keywords</span></div>`;
    let keywordList = getArrayFromjson(notice.keywordsFunctionFor);
    keywordList.map((keyword, index) => {
        output += `<span class="fw-light" style ="color:grey"> ${keyword.tffc_name}</span> : <span style="cursor: pointer;color:#8B2331" class="keywordButtons"  
        searid="${keyword.conc_id}">${keyword.coal_name}${index + 1 === keywordList.length ? '' : ''}</span></br>`;
    });
    output += `</div>`;
    output += `</div>`; // End person & keyword row
    output += `<hr style="margin-block-start:0.3rem;margin-block-end:0.3rem;margin-top:15px"/>`;

    // *** Languages
    output += `<div style=""><spanclass="fs-6" style="color:#8B2331">Languages</span></div>`;
    let languagesList = getArrayFromjson(notice.languagesFunctionFor);
    languagesList.map((language, index) => {
        output += `<span class="fw-light" style ="color:grey"> ${language.ffnlt_name}</span> : ${language.lang_name}${index + 1 === languagesList.length ? '.' : ', '}</span> `;
    });
    output += `<hr style="margin-block-start:0.3rem;margin-block-end:0.3rem;margin-top:15px"/>`;

    // *** Notes
    let notesList = getArrayFromjson(notice.notesFunctionFor);
    output += `<div ><span class="fs-6" style="color:#8B2331">Notes</span></div>`;
    notesList.map((note, index) => {
        output += `<div style ="margin-bottom:10px"><span class="fw-light" style ="color:grey;margin-top:40px">${note.ffnnt_name} </span> : ${note.ffnn_text} </br> </div>`;
    });
    output += `<hr style="margin-block-start:0.3rem;margin-block-end:0.3rem;margin-top:15px"/>`;

    // *** Sub Notices


    // *** Multimedia
    let multimediasList = getArrayFromjson(notice.multimediasFunctionFor);
    output += `<div><span class="fs-6" style="color:#8B2331">Multimedia</span></div>`;
    multimediasList.map((multimedia, index) => {
        output += `${multimedia.mult_name}  : ${multimedia.multt_name} : ${multimedia.mult_file} </br> `;
    });
    output += `<hr style="margin-block-start:0.3rem;margin-block-end:0.3rem;margin-top:15px"/>`;

    // *** Copies
    let exemplairesList = getArrayFromjson(notice.exemplairesFunctionFor);
    output += `<div ><span class="fs-6" style="color:#8B2331">Copies</span></div>`;

    // sort copies array
    exemplairesList.sort(function (a, b) {
        return a.exow_name.localeCompare(b.exow_name);
    });

    exemplairesList.map((exemplaire, index) => {
        output += ` ${exemplaire.exow_name} : ${exemplaire.exem_cote}  </br> `;
    });
    output += `<hr style="margin-block-start:0.3rem;margin-block-end:0.3rem;margin-top:15px"/>`;
    output += `</br></br>`;

    // *** Display string
    document.querySelector("#" + mainDisplay).innerHTML = output;

    // ************** Actions
    document.querySelector("#extractButton").onclick = function () {
        displayModaleAndFunctions("#modaldisplay", notice.noti_id, function (status) {
        });
    };
    addMultipleEnventListener(".personButtons", function (event) {
        window.location.href = `${getAppPath()}/views/person/person.html?personAliasID=` + event.currentTarget.getAttribute('searid');
    });

    addMultipleEnventListener(".keywordButtons", function (event) {
        window.location.href = `${getAppPath()}/views/keyword/keyword.html?keywordAliasID=` + event.currentTarget.getAttribute('searid');
    });



}

