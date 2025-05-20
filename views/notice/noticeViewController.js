import { getNotice } from '../../services/noticeService.js'
import { getArrayFromjson } from '../../services/commonFunctions.js'
import { currentApplicationPath, imagePath, questionIcon, questionIcon18 } from '../../shared/assets/constants.js'
import { displayModaleAndFunctions } from './abstractModalViewController.js'
import { getTranslation } from '../../services/translationService.js'
import { headerViewDisplay } from '../headerViewCont.js'


/**
 * Start script 
 */
// const searchParams = new URLSearchParams(window.location.search);
// launchNoticeController('mainPart', searchParams.get('noticeId'));
export function startNoticeController() {

    console.log("Start noticeViewController");
    const searchParams = new URLSearchParams(window.location.search);
    console.log(searchParams);

    headerViewDisplay("#menuSection");

    if (searchParams.has('noticeID'))
        launchNoticeController('mainActiveSection', searchParams.get('noticeID'));
    else
        $('#messageSection').html(`<div class="alert alert-danger" style="margin-top:20px" role="alert">Erreur, pas de noticeID</div>`);;

}
/**
 * Main basket view function
 * - Display categories
 * - Display basket content
 *  
 * @param {*} htlmPartId 
 */
export function launchNoticeController(htlmPartId, noticeID) {

    // *** Display main part of the catalog screen
    //  document.getElementById(htlmPartId).innerHTML = searchPart;mainPart

    // displayCategoriesRender("categoryDisplay");

    // *** Add listener for the user events

    // *** Display basket component
    displayNoticeContent(htlmPartId, noticeID);

}



// window.launchNoticeController = launchNoticeController;
/**
 * 
 * @param {*} mainDisplay 
 * @param {*} noticeID 
 */
export function displayNoticeContent(mainDisplay, noticeID) {

    let output = '';
    getNotice(noticeID, function (notice) {
        output += `
        <div class="d-flex  justify-content-between" style="padding-top:20px" >          
                <span class="fs-5" style="color:#8B2331">${getTranslation("notice")} : ${notice.noti_main_title}</span>
                <span id="extractButton" style="cursor: pointer">   ${questionIcon18}</span> 
       
        </div > 
        
        <hr />`;

        // <div class="d-flex main justify-content-between" >
        //     <div class="d-flex align-items-start" >
        //         <span class="fs-5" style="color:#8B2331">Notice : ${notice.noti_main_title}</span>
        //     </div>
        //     <div class="d-flex align-items-end" >
        //         ${questionIcon}
        //     </div>
        // </div > 

        // *** Notice image and noticeCatalogDescription
        output += `<div class="row row-cols-1 row-cols-xs-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 row-cols-xl-2 " > `;
        if (notice.noti_main_image && notice.noti_main_image.length > 0) {
            output += ` <div class="col-md-2 col-lg-2 col-xl-2" align="center" > `;
            output += ` <img src = '${imagePath}/img/books/${notice.noti_main_image}' width = "100px" /> `;
            output += `</div > `;

            output += `<div class="col-md-10 col-lg-10 col-xl-10" style = "" > ${notice.noticeCatalogDescription} `;
            output += `</div > `

        } else {

            output += `<div class="col-md-12 main" style = "" > ${notice.noticeCatalogDescription} `;
            output += `</div > `

        }
        output += `</div > <hr />`; // end row

        // *** Notice titles
        output += `<div class="col-md-12 main" " > <span class="fw - light" style ="color:grey">${getTranslation("Maintitle")}</span> : ${notice.noti_main_title}`;
        output += `</div>`
        if (notice.noti_sub_title)
            output += `<div class="col-md-12 main"  > <span class="fw-light" style ="color:grey">${getTranslation("Subtitle")}</span> : ${notice.noti_sub_title}</div>`;
        if (notice.noti_parallel_title)
            output += `<div class="col-md-12 main"> <span class="fw-light" style ="color:grey">Parallel title</span> :  ${notice.noti_parallel_title}</div>`;

        output += `<hr/>`;

        // *** Notice description
        output += `<div class="row row-cols-1 row-cols-xs-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 row-cols-xl-2 ">`;
        output += `<div class="col">`;
        output += `<div class="col-md-12 main" " > <span class="fw-light" style ="color:grey">${getTranslation("Genre")}</span> : ${notice.genrt_name}</div>`;
        output += `<div class="col-md-12 main" " > <span class="fw-light" style ="color:grey">${getTranslation("Theme")}</span> : ${notice.them_name}</div>`;
        output += `<div class="col-md-12 main" " > <span class="fw-light" style ="color:grey">${getTranslation("Bibliographiclevel")}</span> : ${notice.blil_name}</div>`;
        output += `<div class="col-md-12 main" " > <span class="fw-light" style ="color:grey">${getTranslation("Documenttype")}</span> : ${notice.doct_name}</div>`;
        output += `<div class="col-md-12 main" " > <span class="fw-light" style ="color:grey">${getTranslation("Materialtype")}</span> : ${notice.matt_name}</div>`;
        output += `<div class="col-md-12 main" " > <span class="fw-light" style ="color:grey"></div>`;

        output += `<div class="col-md-12 main" " > <span class="fw-light" style ="color:grey">${getTranslation("Materialdescription")}</span> : ${notice.noti_col_mat_description}</div>`;
        output += `<div class="col-md-12 main" " > <span class="fw-light" style ="color:grey">${getTranslation("Materialcharacteristic")}</span> : ${notice.noti_col_car_description}</div>`;
        output += `<div class="col-md-12 main" " > <span class="fw-light" style ="color:grey">${getTranslation("Format")}</span> : ${notice.noti_col_format}</div>`;

        output += `</div>`


        // *** Edition
        output += `<div class="col">`;
        output += `<div class="col-md-12 main" " > <span class="fw-light" style ="color:grey">Editeur </span> : ${notice.publ_name}</div>`;
        output += `<div class="col-md-12 main" " > <span class="fw-light" style ="color:grey">Année de publication</span> : ${notice.noti_year_of_publication}</div>`;
        output += `<div class="col-md-12 main" " > <span class="fw-light" style ="color:grey">Lieu de publication</span> : ${notice.noti_place_of_publication}</div>`;
        output += `<div class="col-md-12 main" " > <span class="fw-light" style ="color:grey">Type de publication</span> : ${notice.noti_type_of_publication}</div>`;
        output += `<div class="col-md-12 main" " > <span class="fw-light" style ="color:grey">ISBN/ISNN</span> : ${notice.noti_basenumber}</div>`;
        output += `<div class="col-md-12 main" " > <span class="fw-light" style ="color:grey">EAN </span> : ${notice.noti_codedouchette}</div>`;

        output += `</div>`
        output += `</div>`
        output += `<hr/>`;

        // *** Persons
        output += `<div style=""><spanclass="fs-6" style="color:#8B2331">Personnes</span></div>`;

        let personsList = getArrayFromjson(notice.personsFunctionFor);

        personsList.map((person, index) => {
            output += `<span class="fw-light" style ="color:grey"> ${person.tffd_name}</span> : <span style="cursor: pointer" class="personButtons" 
            searid="${person.chaa_id}">${person.coal_name} </span>, `;

        });

        // personsList.map((person, index) => {
        //     output += `<span class="fw-light" style ="color:grey"> ${person.tffd_name}</span> : <span class="personButtons" 
        //     searid="${person.chaa_id}">${person.coal_name} </span>, `;

        // });

        output += `<hr/>`;

        // *** Keywords
        //  console.log("</br>*** keywords: </br >");
        output += `<div style=""><spanclass="fs-6" style="color:#8B2331">Keywords</span></div>`;

        let keywordList = getArrayFromjson(notice.keywordsFunctionFor);

        keywordList.map((keyword, index) => {
            output += `<span class="fw-light" style ="color:grey"> ${keyword.tffc_name}</span> : ${keyword.coal_name}, `;

        });
        output += `<hr/>`;

        // *** Languages
        // console.log("</br>*** keywords: </br >");
        output += `<div style=""><spanclass="fs-6" style="color:#8B2331">Languages</span></div>`;

        let languagesList = getArrayFromjson(notice.languagesFunctionFor);

        languagesList.map((language, index) => {
            output += `<span class="fw-light" style ="color:grey"> ${language.ffnlt_name}</span> : ${language.lang_name}, `;

        });
        output += `<hr/>`;

        // *** Notes
        let notesList = getArrayFromjson(notice.notesFunctionFor);
        output += `<div ><span class="fs-6" style="color:#8B2331">Notes</span></div>`;

        notesList.map((note, index) => {
            output += `<span class="fw-light" style ="color:grey">${note.ffnnt_name} </span> : ${note.ffnn_text} </br> `;

        });
        output += `<hr/>`;

        // *** Sub Notices


        // *** Multimedia
        let multimediasList = getArrayFromjson(notice.multimediasFunctionFor);
        output += `<div ><span class="fs-6" style="color:#8B2331">Multimedia</span></div>`;

        multimediasList.map((multimedia, index) => {
            output += `${multimedia.mult_name}  : ${multimedia.multt_name} : ${multimedia.mult_file} </br> `;

        });
        output += `<hr/>`;

        // Copies
        let exemplairesList = getArrayFromjson(notice.exemplairesFunctionFor);
        output += `<div ><span class="fs-6" style="color:#8B2331">Copies</span></div>`;

        exemplairesList.map((exemplaire, index) => {
            output += `${exemplaire.exem_cote}  :  ${exemplaire.exow_name} </br> `;

        });
        output += `<hr/>`;



        output += `</br></br></br></br></br></br></br></br></br></br></br></br><hr/><div ><span class="fs-6" style="color:#8B2331">For developpers only</span></div>`;
        output += "" + JSON.stringify(notice);

        console.log(mainDisplay);
        // *** Display 
        $("#" + mainDisplay).html(output);

        // *** Actions
        jQuery("#extractButton").on("click", function (event) {
            console.log("extractButton : ");
            displayModaleAndFunctions(mainDisplay, notice.noti_id, function (status) {
            });
        });

        $(".personButtons").on("click", function (event) {
            console.log("click person");
            window.location.href = `${currentApplicationPath}/views/person/person.html?personAliasID=` + $(this).attr('searid');
        });



    });

    // *** Display the HTML string

}

