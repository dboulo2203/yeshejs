// *** Component ressources
import { getNotice } from './noticeService.js'

import { displayModaleAndFunctions } from './abstractModalViewController.js'
import { displayimageViewDisplay } from '../../shared/bootstrapServices/displayimageViewCont.js'
import { displayMultimediaModalViewDisplay } from '../../shared/bootstrapServices/multimediaModalViewCont.js'
import { launchInitialisation } from '../../shared/yesheAppservices/initialisationService.js'
import { headerViewDisplay } from '../../shared/yesheAppservices/headerViewCont.js'
import { displayField, addslashes } from '../../shared/bootstrapServices/components.js'
import { getCurrentUSerRightLevel } from '../../shared/yesheServices/yesheLoginService.js'

// ** Shared ressoucres
import {
    getArrayFromjson, addMultipleEnventListener, getEntityLinkClass, getLinkWithctrl,
    findTibetanChars, getEntityLink, getAppPath, initBootstrapTooltips
} from '../../shared/services/commonFunctions.js'
import { languageIcon, noteIcon, abstractIcon, toDKLLibraryIcon, subnoticeIcon, bookIcon, personIcon, keyIcon, copiesIcon, multimediaIcon, descriptionIcon, publicationIcon, titleIcon } from '../../shared/assets/constants.js'
import { getConfigurationValue } from '../../shared/services/configurationService.js'
import { getTranslation } from '../../shared/services/translationService.js'

/**
 * Start script 
 */
export async function startNoticeController() {

    try {

        const searchParams = new URLSearchParams(window.location.search);

        await launchInitialisation();
        headerViewDisplay("#menuSection");

        if (searchParams.has('noticeID') && searchParams.get('noticeID').length > 0)
            await displayNoticeContent('mainActiveSection', searchParams.get('noticeID'));
        else
            throw new Error("Erreur, pas de notice ID");

    } catch (error) {
        document.querySelector("#messageSection").innerHTML = `<div class="alert alert-danger" style = "margin-top:60px" role = "alert" > ${error}</div > `;
    }
}

/**
 * 
 * @param {*} mainDisplay 
 * @param {*} noticeID 
 */
export async function displayNoticeContent(mainDisplay, noticeID) {

    // let output = '';
    let notice = await getNotice(noticeID, mainDisplay);
    // console.log(JSON.stringify(notice));

    displayNotice(notice, mainDisplay);

    initBootstrapTooltips();
}

/**
 * Display the notice (html, events)
 * @param {*} notice 
 * @param {*} mainDisplay 
 */
function displayNotice(notice, mainDisplay) {

    let output = `
        <div class="d-flex" style="margin-top:60px">
             <div class="p-2 flex-grow-1"><span class="fs-5" style="color:#8B2331">${bookIcon} ${getTranslation("NOT_TITLE")} : ${findTibetanChars(notice.noti_main_title)}</span></div>
            <div class="p-2"><span id="extractButton" style="cursor: pointer" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="notice summary">   ${abstractIcon} </span></div>
            <div class="p-2"  ${getCurrentUSerRightLevel(20)} ><span id="toDKLLibraryButton" style="cursor: pointer" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="To old Yeshe">   ${toDKLLibraryIcon}</span></div>
        </div>        
        <hr />`;

    // *** Notice image and noticeCatalogDescription
    output += `<div class="row " > `;
    if (notice.noti_main_image && notice.noti_main_image.length > 0) {
        output += ` <div class="col-3" align="center" > `;
        output += ` <img src = '${getConfigurationValue("imagePath")}/img/books/${notice.noti_main_image}' style = "width:100%;max-width:150px;cursor:pointer" class="imgsearch" /> `;
        output += `</div > `;

        output += `<div class="col-9 " style = "" > ${findTibetanChars(notice.noticeCatalogDescription)} `;
        output += `</div > `
    } else {
        output += `<div class="col-md-12 main" style = "" > ${findTibetanChars(notice.noticeCatalogDescription)} `;
        output += `</div > `
    }
    //  output += `</div > <hr style="margin-block-start:0.3rem;margin-block-end:0.3rem"/>`; // end row

    // *** Notice titles
    // output += `<div style=""><span class="fs-5" style="color:#8B2331">${titleIcon} ${getTranslation("NOT_TITLES")}</span></div>`;

    // output += displayField(getTranslation("NOT_MAINTITLE"), findTibetanChars(notice.noti_main_title));
    // output += `<div class="col-md-12 main" " > <span class="fw-light" >${getTranslation("NOT_MAINTITLE")}</span> : ${findTibetanChars(notice.noti_main_title)}`;
    // output += `</div>`

    // if (notice.noti_sub_title)
    //     output += displayField(getTranslation("NOT_SUBTITLE"), findTibetanChars(notice.noti_sub_title));
    //output += `<div class="col-md-12 main"  > <span class="fw-light" >${getTranslation("NOT_SUBTITLE")}</span> : ${notice.noti_sub_title}</div>`

    output += `
        <dob-bloctitle userIcon="titleIcon" userName="${getTranslation("NOT_TITLES")}"></dob-bloctitle>
            <dob-stdfield fieldName="${getTranslation("NOT_MAINTITLE")}" fieldValue="${findTibetanChars(notice.noti_main_title)}"></dob-stdfield>
            <dob-stdnotnullfield fieldName="${getTranslation("NOT_SUBTITLE")}" fieldValue="${notice.noti_sub_title}"></dob-stdnotnullfield>
            <dob-stdnotnullfield fieldName="${getTranslation("NOT_PARALLELTITLE")}" fieldValue = "${notice.noti_parallel_title}" ></dob-stdnotnullfield>
            <dob-stdnotnullfield fieldName="${getTranslation("NOT_ABREVIATEDTITLE")}" fieldValue = "${notice.noti_abreviated_title}" ></dob-stdnotnullfield>
            <dob-stdnotnullfield fieldName="${getTranslation("NOT_ORIGINALTITLE")}" fieldValue = "${notice.noti_original_title}" ></dob-stdnotnullfield>
            <dob-stdnotnullfield fieldName="${getTranslation("NOT_MAINTRANSTITLE")}" fieldValue = "${notice.noti_main_title_translated}" ></dob-stdnotnullfield>
            <dob-stdnotnullfield fieldName="${getTranslation("NOT_OTHERTITLE")}" fieldValue = "${notice.noti_other_title}" ></dob-stdnotnullfield>
            `;

    //if (notice.noti_parallel_title)
    // output += `<div class="col-md-12 main"> <span class="fw-light" >${getTranslation("NOT_PARALLELTITLE")}</span> :  ${notice.noti_parallel_title}</div>`;
    //if (notice.noti_abreviated_title)
    //  output += `<div class="col-md-12 main"> <span class="fw-light" >${getTranslation("NOT_ABREVIATEDTITLE")}</span> :  ${notice.noti_abreviated_title}</div>`;
    //if (notice.noti_original_title)
    // output += `<div class="col-md-12 main"> <span class="fw-light" >${getTranslation("NOT_ORIGINALTITLE")}</span> :  ${notice.noti_original_title}</div>`;
    // //if (notice.noti_main_title_translated)
    // output += `<div class="col-md-12 main"> <span class="fw-light" >${getTranslation("NOT_MAINTRANSTITLE")}</span> :  ${notice.noti_main_title_translated}</div>`;
    // //if (notice.noti_other_title)
    // output += `<div class="col-md-12 main"> <span class="fw-light" >${getTranslation("NOT_OTHERTITLE")}</span> :  ${notice.noti_other_title}</div>`;

    // output += `<hr style="margin-block-start:0.3rem;margin-block-end:0.3rem;margin-top:15px"/>`;


    // *** Notice description
    output += `<div class="row row-cols-1 row-cols-xs-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 row-cols-xl-2 ">`;
    output += `<div class="col">`;
    //output += `<hr style="margin-block-start:0.1rem;margin-block-end:0.3rem;margin-top:15px"/>`;
    output += `<dob-bloctitle userIcon="descriptionIcon" userName="${getTranslation("NOT_DESCRIPTION")}" ></dob-bloctitle >`;
    // output += `<div style=""><span class="fs-5" style="color:#8B2331">${descriptionIcon} ${getTranslation("NOT_DESCRIPTION")}</span></div>`;

    output += `<div class="col-md-12 main" > 
        <span class="fw-light">${getTranslation("NOT_GENRE")}</span> : 
        ${getEntityLink("genreButton", notice.genrt_name)}
    </div>`;
    // output += `<dob-stdfield fieldName="${getTranslation("NOT_GENRE")}" fieldValue = "${getEntityLink("genreButton", notice.genrt_name)}" ></dob-stdfield >`;
    output += `<div class="col-md-12 main" > <span class="fw-light" >${getTranslation("NOT_THEME")}</span> : 
        ${getEntityLink("themeButton", notice.them_name)}
        </div>`;
    output += `<div class="col-md-12 main" " > <span class="fw-light" >${getTranslation("NOT_BIBLIOGRAPHICLEVEL")}</span> : ${notice.blil_name === null ? '' : notice.blil_name}</div>`;
    output += `<div class="col-md-12 main" " > <span class="fw-light" >${getTranslation("NOT_DOCUMENTTYPE")}</span> :
        ${getEntityLink("doctButton", notice.doct_name)}
        </div>`;
    output += `<div class="col-md-12 main" " > <span class="fw-light" >${getTranslation("NOT_MATERIALTYPE")}</span> : 
    ${getEntityLink("mattButton", notice.matt_name)} 
    </div>`;
    output += `<div class="col-md-12 main" " > <span class="fw-light" ></div>`;
    output += displayField(getTranslation("NOT_MATERIALDESCRIPTION"), notice.noti_col_mat_description === null ? '' : notice.noti_col_mat_description);
    // output += `<div class="col-md-12 main" " > <span class="fw-light">${getTranslation("NOT_MATERIALDESCRIPTION")}</span> ${notice.noti_col_mat_description === null ? '' : notice.noti_col_mat_description}</div>`;
    output += `<div class="col-md-12 main" " > <span class="fw-light" >${getTranslation("NOT_MATERIALCHARACTERISTIC")}</span> : ${notice.noti_col_car_description === null ? '' : notice.noti_col_car_description}</div>`;
    output += `<div class="col-md-12 main" " > <span class="fw-light">${getTranslation("NOT_MATERIALFORMAT")}</span> : ${notice.noti_col_format === null ? '' : notice.noti_col_format}</div>`;
    output += `<div class="col-md-12 main" " > <span class="fw-light" >${getTranslation("NOT_OTHEMATERIAL")}</span> : ${notice.noti_col_other_material === null ? '' : notice.noti_col_other_material}</div>`;
    output += `<div class="col-md-12 main" " > <span class="fw-light" >${getTranslation("NOT_TRANSLITERATION")}</span> : ${notice.noti_transliteration === null || notice.noti_transliteration <= 0 ? '' : notice.noti_transliteration}</div>`;
    // ** output += NOT_CHECKINSTATE, chek_name
    // ** output += NOT_INFO, Created on { { notice.noti_creation_date | date : 'dd/MM/yyyy HH:mm' } } by { { notice.noti_creation_user } } - Last modified on { { notice.noti_last_modification_date | date : 'dd/MM/yyyy HH:mm' } } by { { notice.noti_last_modification_user } } - Id : { { notice.noti_id } }
    // ** output +={wsLanguage.NOT_IMAGE}}</b> : {{notice.noti_main_image}}
    output += `</div>`


    // *** Edition
    output += `<div class="col">`;
    // output += `<hr style="margin-block-start:0.1rem;margin-block-end:0.3rem;margin-top:15px"/>`;
    // output += `<div style=""><span class="fs-5" style="color:#8B2331">${publicationIcon} ${getTranslation("NOT_PUBLICATION")} </span></div>`;
    output += `<dob-bloctitle userIcon="publicationIcon" userName="${getTranslation("NOT_PUBLICATION")}" ></dob-bloctitle >`;

    output += `<div class="col-md-12 main" " > 
     <span class="fw-light"  >
        ${getTranslation("PUB_TITLE")}  
    </span> : 
       ${getEntityLink("publisherButton", notice.publ_name)}
      </div>`;

    output += `<div class="col-md-12 main" " > <span class="fw-light" >${getTranslation("COLL_TITLE")}</span> : <span style="" id="collectionButton">${notice.coll_name === null || notice.coll_name === 'nd' ? '' : notice.coll_name}</span></div>`;
    output += `<div class="col-md-12 main" " > <span class="fw-light" >${getTranslation("NOT_NUMBERINCOLLECTION")} </span> : 
    <span id="noti_num_in_col">${notice.noti_num_in_col}</span></div>`;

    output += `<div class="col-md-12 main" > 
    <span class="fw-light" >${getTranslation("PRI_TITLE")} </span> :
     ${getEntityLink("printerButton", notice.prin_name)}
     </div>`;

    output += `<div class="col-md-12 main" " > <span class="fw-light" >${getTranslation("NOT_YEAROFPUBLICATION")}</span> : ${notice.noti_year_of_publication === null ? '' : notice.noti_year_of_publication}</div>`;
    output += `<div class="col-md-12 main" " > <span class="fw-light" >${getTranslation("NOT_PLACEOFPUBLICATION")}</span> : ${notice.noti_place_of_publication === null ? '' : notice.noti_place_of_publication}</div>`;
    output += `<div class="col-md-12 main" " > <span class="fw-light" >${getTranslation("NOT_TYPEOFPUBLICATION")}</span> : ${notice.noti_type_of_publication === null ? '' : notice.noti_type_of_publication}</div>`;
    output += `<div class="col-md-12 main" " > <span class="fw-light" >${getTranslation("NOT_ISBN")}</span> : ${notice.noti_basenumber === null ? '' : notice.noti_basenumber}</div>`;
    output += `<div class="col-md-12 main" " > <span class="fw-light" >${getTranslation("NOT_EAN")} </span> : ${notice.noti_codedouchette === null ? '' : notice.noti_codedouchette}</div>`;
    output += `</div>`
    output += `</div>`


    // *** Persons
    // Note : the , and . have been deleted but we have kept the code  
    output += `<div class="row row-cols-1 row-cols-xs-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 row-cols-xl-2 ">`;
    output += `<div class="col">`;
    // output += `<hr style="margin-block-start:0.1rem;margin-block-end:0.3rem;margin-top:15px"/>`;
    // output += `<div style=""><span class="fs-5 " style="color:#8B2331">${personIcon} ${getTranslation("PERS_TITLE")}</span></div>`;
    output += `<dob-bloctitle userIcon="personIcon" userName="${getTranslation("PERS_TITLE")}" ></dob-bloctitle >`;

    let personsList = getArrayFromjson(notice.personsFunctionFor);
    personsList.map((person, index, personsList) => {
        output += `<span class="fw-light" > ${person.tffd_name}</span> : 
             ${getEntityLinkClass("personButtons", findTibetanChars(person.coal_name), person.chaa_id, true)}</br>`;

    });
    output += `</div>`; // End persons col

    // *** Keywords
    // Note : the , and . have been deleted but we have kept the code
    output += `<div class="col">`;
    // output += `<hr class="visible-md-block" style="margin-block-start:0.3rem;margin-block-end:0.3rem;margin-top:15px"/>`;
    // output += `<div style=""><span class="fs-5" style="color:#8B2331">${keyIcon} ${getTranslation("KEY_TITLE")}</span></div>`;
    output += `<dob-bloctitle userIcon="keyIcon" userName="${getTranslation("KEY_TITLE")}" ></dob-bloctitle >`;

    let keywordList = getArrayFromjson(notice.keywordsFunctionFor);
    keywordList.map((keyword, index) => {
        output += `
            <span class="fw-light" > ${keyword.tffc_name}</span> : 
                ${getEntityLinkClass("keywordButtons", keyword.coal_name, keyword.conc_id, true)}</br>
           `;
    });
    output += `</div>`; // End keyword col
    output += `</div>`;
    output += `</div>`; // End person & keyword row
    // output += `<hr style="margin-block-start:0.3rem;margin-block-end:0.3rem;margin-top:15px"/>`;

    // *** Languages
    // output += `<div style=""><span class="fs-5" style="color:#8B2331">${languageIcon} ${getTranslation("NOT_LANGAUGESTITLE")}</span></div>`;
    output += `<dob-bloctitle userIcon="languageIcon" userName="${getTranslation("NOT_LANGAUGESTITLE")}" ></dob-bloctitle >`;

    let languagesList = getArrayFromjson(notice.languagesFunctionFor);
    languagesList.map((language, index) => {
        output += `<span class="fw-light" > ${language.ffnlt_name}</span> : 
                ${getEntityLinkClass("languageButtons", language.lang_name, language.lang_id)}</br>
           `;
    });
    output += `</div>`; // End persons col
    //  output += `<hr style="margin-block-start:0.3rem;margin-block-end:0.3rem;margin-top:15px"/>`;


    // *** Notes
    let notesList = getArrayFromjson(notice.notesFunctionFor);
    // output += `<div ><span class="fs-5" style="color:#8B2331">${noteIcon} ${getTranslation("NOT_NOTESTITLE")}</span></div>`;
    output += `<dob-bloctitle userIcon="noteIcon" userName="${getTranslation("NOT_NOTESTITLE")}" ></dob-bloctitle >`;

    notesList.map((note, index) => {
        output += `<div style ="margin-bottom:10px"><span class="fw-light" style ="margin-top:40px">${note.ffnnt_name} </span> :</br> ${findTibetanChars(note.ffnn_text)} </br> </div>`;
    });
    // output += `<hr style="margin-block-start:0.3rem;margin-block-end:0.3rem;margin-top:15px"/>`;


    // *** Sub Notices
    let subNoticesFunctionFor = getArrayFromjson(notice.subNoticesFunctionFor);
    //  output += `<div><span class="fs-5" style="color:#8B2331">${subnoticeIcon} ${getTranslation("NOT_SUBRECORDSTITLE")}</span></div>`;
    output += `<dob-bloctitle userIcon="subnoticeIcon" userName="${getTranslation("NOT_SUBRECORDSTITLE")}" ></dob-bloctitle >`;

    subNoticesFunctionFor.map((subNoticeFunctionFor, index) => {
        output += ` - <span class="subNoticeElem" style="cursor:pointer; border-bottom: 0.1em solid #dddbdb" subNoticeID="${subNoticeFunctionFor.noti_id}"
                       onpointerenter="this.setAttribute('style', 'cursor:pointer;color: #8B2331;border-bottom: 0.1em solid #8B2331')" 
                onpointerleave="this.setAttribute('style', 'color: bs-body-color; border-bottom: 0.1em solid #dddbdbff')"
        >   ${findTibetanChars(subNoticeFunctionFor.noti_main_title)}  (${subNoticeFunctionFor.sdoc_order})
         </span></br> `;
    });

    // *** Multimedia
    let multimediasList = getArrayFromjson(notice.multimediasFunctionFor);
    // output += `<div><span class="fs-5" style="color:#8B2331">${multimediaIcon} ${getTranslation("NOT_MULTIMEDIASTITLE")}</span></div>`;
    output += `<dob-bloctitle userIcon="multimediaIcon" userName="${getTranslation("NOT_MULTIMEDIASTITLE")}" ></dob-bloctitle >`;

    multimediasList.map((multimedia, index) => {
        output += `
        <div class="row">
            <div class="col-3">
                 - <span class="multimediaElem" style="cursor:pointer; border-bottom: 0.1em solid #dddbdbff"  multt_id="${multimedia.multt_id}" mult_file="${multimedia.mult_file}"
                onpointerenter="this.setAttribute('style', 'cursor:pointer;color: #8B2331;border-bottom: 0.1em solid #8B2331')" 
                onpointerleave="this.setAttribute('style', 'color: bs-body-color; border-bottom: 0.1em solid #dddbdbff')"> ${multimedia.mult_name} </span>
            </div>
            <div class="col-3">
                <span >${multimedia.multt_name} </span>
            </div>
            <div class="col-6">
                <span > ${findTibetanChars(multimedia.mult_desc)} </span>
            </div>
         </div>`;
    });
    // output += `<hr style="margin-block-start:0.3rem;margin-block-end:0.3rem;margin-top:15px"/>`;

    // *** Copies
    let exemplairesList = getArrayFromjson(notice.exemplairesFunctionFor);
    output += `<dob-bloctitle userIcon="copiesIcon" userName="${getTranslation("NOT_COPIESTITLE")}" ></dob-bloctitle >`;
    // sort copies array
    exemplairesList.sort(function (a, b) {
        return a.exow_name.localeCompare(b.exow_name);
    });

    let currentLIbrary = "";
    exemplairesList.map((exemplaire, index) => {
        if (currentLIbrary !== exemplaire.exow_name) {
            output += `<span class="fw-light" style="border-bottom: 0.1em solid #dddbdbff;color:grey"> ${exemplaire.exow_name} </span> </br>`;
            currentLIbrary = exemplaire.exow_name;
        }
        output += ` -  ${exemplaire.exem_cote}  </br> `;
        output += ``;
    });
    //output += `<hr style="margin-block-start:0.3rem;margin-block-end:0.3rem;margin-top:15px"/>`;
    output += `</br></br>`;

    // *** Display string
    document.querySelector("#" + mainDisplay).innerHTML = output;

    // ************** Actions
    document.querySelector("#extractButton").onclick = function () {
        displayModaleAndFunctions("#modaldisplay", notice.noti_id, function (status) {
        });
    };
    document.querySelector("#toDKLLibraryButton").onclick = function () {
        getLinkWithctrl(`${getConfigurationValue('dklLibraryPath')}notice/${notice.noti_id}`, true)
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

    addMultipleEnventListener(".imgsearch", function (event) {
        displayimageViewDisplay("modalSection", event.currentTarget.getAttribute('src'), event.ctrlKey)
    });

    addMultipleEnventListener(".multimediaElem", function (event) {
        displayMultimediaModalViewDisplay("modalSection", event.currentTarget.getAttribute("multt_id"), event.currentTarget.getAttribute("mult_file"))
    });

    addMultipleEnventListener(".subNoticeElem", function (event) {
        getLinkWithctrl(`${getAppPath()}/views/subnotice/subnotice.html?subnoticeid=` + event.currentTarget.getAttribute('subNoticeID'), event.ctrlKey);;
    });



}


