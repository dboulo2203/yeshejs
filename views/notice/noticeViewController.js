// *** Component ressources
import { getNotice } from './noticeService.js'
import { displayModaleAndFunctions } from './abstractModalViewController.js'

// ** Shared ressoucres
import { getArrayFromjson, addMultipleEnventListener, getEntityLinkClass, getLinkWithctrl } from '../../shared/services/commonFunctions.js'
import { getEntityLink } from '../../shared/services/commonFunctions.js'
import { languageIcon, questionIcon, questionIcon18, noteIcon, abstractIcon } from '../../shared/assets/constants.js'
import { bookIcon, personIcon, keyIcon, copiesIcon, multimediaIcon, descriptionIcon, publicationIcon, titleIcon } from '../../shared/assets/constants.js'

import { getimagePath } from '../../shared/services/initialisationService.js'
import { getAppPath } from '../../shared/services/commonFunctions.js'
import { getTranslation } from '../../shared/services/translationService.js'

import { launchInitialisation } from '../../shared/services/initialisationService.js';
import { headerViewDisplay } from '../../shared/services/headerViewCont.js'

/**
 * Start script 
 */
export function startNoticeController() {

    // console.log("Start noticeViewController");
    const searchParams = new URLSearchParams(window.location.search);
    //console.log(searchParams);

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
                <span class="fs-5" style="color:#8B2331">${bookIcon} ${getTranslation("NOT_TITLE")} : ${notice.noti_main_title}</span>
                <span id="extractButton" style="cursor: pointer">   ${abstractIcon}</span> 
       
        </div > 
        
        <hr />`;

    // console.log(JSON.stringify(notice));
    // *** Notice image and noticeCatalogDescription
    output += `<div class="row " > `;
    if (notice.noti_main_image && notice.noti_main_image.length > 0) {
        output += ` <div class="col-3" align="center" > `;
        output += ` <img src = '${getimagePath()}/img/books/${notice.noti_main_image}' style = "width:100%"  /> `;
        output += `</div > `;

        output += `<div class="col-9 " style = "" > ${notice.noticeCatalogDescription} `;
        output += `</div > `

    } else {

        output += `<div class="col-md-12 main" style = "" > ${notice.noticeCatalogDescription} `;
        output += `</div > `

    }
    output += `</div > <hr style="margin-block-start:0.3rem;margin-block-end:0.3rem"/>`; // end row

    // *** Notice titles
    output += `<div style=""><spanclass="fs-6" style="color:#8B2331">${titleIcon} ${getTranslation("NOT_TITLES")}</span></div>`;
    output += `<div class="col-md-12 main" " > <span class="fw - light" style ="color:grey">${getTranslation("NOT_MAINTITLE")}</span> : ${notice.noti_main_title}`;
    output += `</div>`
    //if (notice.noti_sub_title)
    output += `<div class="col-md-12 main"  > <span class="fw-light" style ="color:grey">${getTranslation("NOT_SUBTITLE")}</span> : ${notice.noti_sub_title}</div>`;
    //if (notice.noti_parallel_title)
    output += `<div class="col-md-12 main"> <span class="fw-light" style ="color:grey">${getTranslation("NOT_PARALLELTITLE")}</span> :  ${notice.noti_parallel_title}</div>`;
    //if (notice.noti_abreviated_title)
    output += `<div class="col-md-12 main"> <span class="fw-light" style ="color:grey">${getTranslation("NOT_ABREVIATEDTITLE")}</span> :  ${notice.noti_abreviated_title}</div>`;
    //if (notice.noti_original_title)
    output += `<div class="col-md-12 main"> <span class="fw-light" style ="color:grey">${getTranslation("NOT_ORIGINALTITLE")}</span> :  ${notice.noti_original_title}</div>`;
    //if (notice.noti_main_title_translated)
    output += `<div class="col-md-12 main"> <span class="fw-light" style ="color:grey">${getTranslation("NOT_MAINTRANSTITLE")}</span> :  ${notice.noti_main_title_translated}</div>`;
    //if (notice.noti_other_title)
    output += `<div class="col-md-12 main"> <span class="fw-light" style ="color:grey">${getTranslation("NOT_OTHERTITLE")}</span> :  ${notice.noti_other_title}</div>`;


    //  output += `<hr style="margin-block-start:0.3rem;margin-block-end:0.3rem;margin-top:15px"/>`;

    // *** Notice description
    output += `<div class="row row-cols-1 row-cols-xs-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 row-cols-xl-2 ">`;
    output += `<div class="col">`;
    output += `<hr style="margin-block-start:0.1rem;margin-block-end:0.3rem;margin-top:15px"/>`;
    output += `<div style=""><spanclass="fs-6" style="color:#8B2331">${descriptionIcon} ${getTranslation("NOT_DESCRIPTION")}</span></div>`;

    output += `<div class="col-md-12 main" > 
        <span class="fw-light" style ="color:grey">${getTranslation("NOT_GENRE")}</span> : 
        ${getEntityLink("genreButton", notice.genrt_name)}
    </div>`;

    output += `<div class="col-md-12 main" > <span class="fw-light" style ="color:grey">${getTranslation("NOT_THEME")}</span> : 
        ${getEntityLink("themeButton", notice.them_name)}
        </div>`;
    output += `<div class="col-md-12 main" " > <span class="fw-light" style ="color:grey">${getTranslation("NOT_BIBLIOGRAPHICLEVEL")}</span> : ${notice.blil_name === null ? '' : notice.blil_name}</div>`;
    output += `<div class="col-md-12 main" " > <span class="fw-light" style ="color:grey">${getTranslation("NOT_DOCUMENTTYPE")}</span> :
        ${getEntityLink("doctButton", notice.doct_name)}
        </div>`;
    output += `<div class="col-md-12 main" " > <span class="fw-light" style ="color:grey">${getTranslation("NOT_MATERIALTYPE")}</span> : 
    ${getEntityLink("mattButton", notice.matt_name)} 
    </div>`;
    output += `<div class="col-md-12 main" " > <span class="fw-light" style ="color:grey"></div>`;
    output += `<div class="col-md-12 main" " > <span class="fw-light" style ="color:grey">${getTranslation("NOT_MATERIALDESCRIPTION")}</span> ${notice.noti_col_mat_description === null ? '' : notice.noti_col_mat_description}</div>`;
    output += `<div class="col-md-12 main" " > <span class="fw-light" style ="color:grey">${getTranslation("NOT_MATERIALCHARACTERISTIC")}</span> : ${notice.noti_col_car_description === null ? '' : notice.noti_col_car_description}</div>`;
    output += `<div class="col-md-12 main" " > <span class="fw-light" style ="color:grey">${getTranslation("NOT_MATERIALFORMAT")}</span> : ${notice.noti_col_format === null ? '' : notice.noti_col_format}</div>`;
    output += `<div class="col-md-12 main" " > <span class="fw-light" style ="color:grey">${getTranslation("NOT_OTHEMATERIAL")}</span> : ${notice.noti_col_other_material === null ? '' : notice.noti_col_other_material}</div>`;
    output += `<div class="col-md-12 main" " > <span class="fw-light" style ="color:grey">${getTranslation("NOT_TRANSLITERATION")}</span> : ${notice.noti_transliteration === null || notice.noti_transliteration <= 0 ? '' : notice.noti_transliteration}</div>`;
    // ** output += NOT_CHECKINSTATE, chek_name
    // ** output += NOT_INFO, Created on { { notice.noti_creation_date | date : 'dd/MM/yyyy HH:mm' } } by { { notice.noti_creation_user } } - Last modified on { { notice.noti_last_modification_date | date : 'dd/MM/yyyy HH:mm' } } by { { notice.noti_last_modification_user } } - Id : { { notice.noti_id } }
    // ** output +={wsLanguage.NOT_IMAGE}}</b> : {{notice.noti_main_image}}
    output += `</div>`

    // *** Edition
    output += `<div class="col">`;
    output += `<hr style="margin-block-start:0.1rem;margin-block-end:0.3rem;margin-top:15px"/>`;
    output += `<div style=""><spanclass="fs-6" style="color:#8B2331">${publicationIcon} ${getTranslation("NOT_PUBLICATION")} </span></div>`;

    output += `<div class="col-md-12 main" " > 
     <span class="fw-light" style ="color:grey"  >
        ${getTranslation("PUB_TITLE")}  
    </span> : 
       ${getEntityLink("publisherButton", notice.publ_name)}
      </div>`;


    output += `<div class="col-md-12 main" " > <span class="fw-light" style ="color:grey">${getTranslation("COLL_TITLE")}</span> : <span style="cursor: pointer; border-bottom: 0.1em solid #dddbdbff" id="collectionButton">${notice.coll_name === null || notice.coll_name === 'nd' ? '' : notice.coll_name}</span></div>`;
    output += `<div class="col-md-12 main" " > <span class="fw-light" style ="color:grey">${getTranslation("NOT_NUMBERINCOLLECTION")} </span> : 
    <span style="cursor: pointer;color:#dddbdbff" id="noti_num_in_col">${notice.noti_num_in_col}</span></div>`;

    output += `<div class="col-md-12 main" > 
    <span class="fw-light" style ="color:grey">${getTranslation("PRI_TITLE")} </span> :
     ${getEntityLink("printerButton", notice.prin_name)}
     </div>`;

    output += `<div class="col-md-12 main" " > <span class="fw-light" style ="color:grey">${getTranslation("NOT_YEAROFPUBLICATION")}</span> : ${notice.noti_year_of_publication === null ? '' : notice.noti_year_of_publication}</div>`;
    output += `<div class="col-md-12 main" " > <span class="fw-light" style ="color:grey">${getTranslation("NOT_PLACEOFPUBLICATION")}</span> : ${notice.noti_place_of_publication === null ? '' : notice.noti_place_of_publication}</div>`;
    output += `<div class="col-md-12 main" " > <span class="fw-light" style ="color:grey">${getTranslation("NOT_TYPEOFPUBLICATION")}</span> : ${notice.noti_type_of_publication === null ? '' : notice.noti_type_of_publication}</div>`;
    output += `<div class="col-md-12 main" " > <span class="fw-light" style ="color:grey">${getTranslation("NOT_ISBN")}</span> : ${notice.noti_basenumber === null ? '' : notice.noti_basenumber}</div>`;
    output += `<div class="col-md-12 main" " > <span class="fw-light" style ="color:grey">${getTranslation("NOT_EAN")} </span> : ${notice.noti_codedouchette === null ? '' : notice.noti_codedouchette}</div>`;
    output += `</div>`
    output += `</div>`


    // *** Persons
    // Note : the , and . have been deleted but we have kept the code  
    output += `<div class="row row-cols-1 row-cols-xs-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 row-cols-xl-2 ">`;
    output += `<div class="col">`;
    output += `<hr style="margin-block-start:0.1rem;margin-block-end:0.3rem;margin-top:15px"/>`;
    output += `<div style=""><spanclass="fs-6 " style="color:#8B2331">${personIcon} ${getTranslation("PERS_TITLE")}</span></div>`;
    let personsList = getArrayFromjson(notice.personsFunctionFor);
    personsList.map((person, index, personsList) => {
        output += `<span class="fw-light" style ="color:grey"> ${person.tffd_name}</span> : 
             ${getEntityLinkClass("personButtons", person.coal_name, person.chaa_id)}</br>`;

    });
    output += `</div>`; // End persons col

    // *** Keywords
    // Note : the , and . have been deleted but we have kept the code
    output += `<div class="col">`;
    output += `<hr class="visible-md-block" style="margin-block-start:0.3rem;margin-block-end:0.3rem;margin-top:15px"/>`;
    output += `<div style=""><spanclass="fs-6" style="color:#8B2331">${keyIcon} ${getTranslation("KEY_TITLE")}</span></div>`;
    let keywordList = getArrayFromjson(notice.keywordsFunctionFor);
    keywordList.map((keyword, index) => {
        output += `
            <span class="fw-light" style ="color:grey"> ${keyword.tffc_name}</span> : 
                ${getEntityLinkClass("keywordButtons", keyword.coal_name, keyword.conc_id)}</br>
           `;
    });
    output += `</div>`; // End keyword col
    output += `</div>`;
    output += `</div>`; // End person & keyword row
    output += `<hr style="margin-block-start:0.3rem;margin-block-end:0.3rem;margin-top:15px"/>`;

    // *** Languages
    output += `<div style=""><spanclass="fs-6" style="color:#8B2331">${languageIcon} ${getTranslation("NOT_LANGAUGESTITLE")}</span></div>`;
    let languagesList = getArrayFromjson(notice.languagesFunctionFor);
    languagesList.map((language, index) => {
        output += `<span class="fw-light" style ="color:grey"> ${language.ffnlt_name}</span> : 
                ${getEntityLinkClass("languageButtons", language.lang_name, language.lang_id)}</br>
           `;
    });
    output += `</div>`; // End persons col
    output += `<hr style="margin-block-start:0.3rem;margin-block-end:0.3rem;margin-top:15px"/>`;

    // *** Notes
    let notesList = getArrayFromjson(notice.notesFunctionFor);
    output += `<div ><span class="fs-6" style="color:#8B2331">${noteIcon} ${getTranslation("NOT_NOTESTITLE")}</span></div>`;
    notesList.map((note, index) => {
        output += `<div style ="margin-bottom:10px"><span class="fw-light" style ="color:grey;margin-top:40px">${note.ffnnt_name} </span> :</br> ${note.ffnn_text} </br> </div>`;
    });
    output += `<hr style="margin-block-start:0.3rem;margin-block-end:0.3rem;margin-top:15px"/>`;

    // *** Sub Notices


    // *** Multimedia
    let multimediasList = getArrayFromjson(notice.multimediasFunctionFor);
    output += `<div><span class="fs-6" style="color:#8B2331">${multimediaIcon} ${getTranslation("NOT_MULTIMEDIASTITLE")}</span></div>`;
    multimediasList.map((multimedia, index) => {
        output += `${multimedia.mult_name}  : ${multimedia.multt_name} : ${multimedia.mult_file} </br> `;
    });
    output += `<hr style="margin-block-start:0.3rem;margin-block-end:0.3rem;margin-top:15px"/>`;

    // *** Copies
    let exemplairesList = getArrayFromjson(notice.exemplairesFunctionFor);
    output += `<div ><span class="fs-6" style="color:#8B2331">${copiesIcon} ${getTranslation("NOT_COPIESTITLE")}</span></div>`;

    // sort copies array
    exemplairesList.sort(function (a, b) {
        return a.exow_name.localeCompare(b.exow_name);
    });

    let currentLIbrary = "";
    exemplairesList.map((exemplaire, index) => {
        if (currentLIbrary !== exemplaire.exow_name) {
            output += `<span style="border-bottom: 0.1em solid #dddbdbff;color:grey"> ${exemplaire.exow_name} </span> </br>`;
            currentLIbrary = exemplaire.exow_name;
        }
        output += ` -  ${exemplaire.exem_cote}  </br> `;
        output += ``;
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
        getLinkWithctrl(`${getAppPath()}/views/person/person.html?personAliasID=` + event.currentTarget.getAttribute('searid'), event.ctrlKey);
    });

    addMultipleEnventListener(".keywordButtons", function (event) {
        getLinkWithctrl(`${getAppPath()}/views/keyword/keyword.html?keywordAliasID=` + event.currentTarget.getAttribute('searid'), event.ctrlKey);;
    });

    addMultipleEnventListener(".languageButtons", function (event) {
        getLinkWithctrl(`${getAppPath()}/views/simpleEntity/simpleEntity.html?simpleEntityID=${event.currentTarget.getAttribute('searid')}&simpleEntitytype=24`, event.ctrlKey);
    });

    document.querySelector("#publisherButton").onclick = function (event) {
        getLinkWithctrl(`${getAppPath()}/views/simpleEntity/simpleEntity.html?simpleEntityID=${notice.publ_id}&simpleEntitytype=13`, event.ctrlKey);
    };

    document.querySelector("#printerButton").onclick = function (event) {
        getLinkWithctrl(`${getAppPath()}/views/simpleEntity/simpleEntity.html?simpleEntityID=${notice.prin_id}&simpleEntitytype=12`, event.ctrlKey);;
    };

    document.querySelector("#genreButton").onclick = function (event) {
        getLinkWithctrl(`${getAppPath()}/views/simpleEntity/simpleEntity.html?simpleEntityID=${notice.genrt_id}&simpleEntitytype=34`, event.ctrlKey);;
    };

    document.querySelector("#themeButton").onclick = function (event) {
        getLinkWithctrl(`${getAppPath()}/views/simpleEntity/simpleEntity.html?simpleEntityID=${notice.them_id}&simpleEntitytype=33`, event.ctrlKey);;
    };
    document.querySelector("#doctButton").onclick = function (event) {
        getLinkWithctrl(`${getAppPath()}/views/simpleEntity/simpleEntity.html?simpleEntityID=${notice.doct_id}&simpleEntitytype=35`, event.ctrlKey);;
    };

    document.querySelector("#mattButton").onclick = function (event) {
        getLinkWithctrl(`${getAppPath()}/views/simpleEntity/simpleEntity.html?simpleEntityID=${notice.matt_id}&simpleEntitytype=36`, event.ctrlKey);;
    };

    document.querySelector("#collectionButton").onclick = function (event) {
        getLinkWithctrl(`${getAppPath()}/views/simpleEntity/simpleEntity.html?simpleEntityID=${notice.coll_id}&simpleEntitytype=37`, event.ctrlKey);;
    };


}

// function getEntityLink(buttonType, entityName) {
//     return `<span style="cursor: pointer; border-bottom: 0.1em solid #dddbdbff"
//     id="${buttonType}" onpointerenter="this.setAttribute('style', 'color: #8B2331;border-bottom: 0.1em solid #8B2331;cursor:pointer')" onpointerleave="this.setAttribute('style', 'color: bs-body-color;border-bottom: 0.1em solid #dddbdbff')">
//         ${entityName === null ? '' : entityName}
//     </span>`;

// }

