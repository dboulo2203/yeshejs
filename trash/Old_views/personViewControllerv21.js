import { getPerson } from '../services/personService.js'
import { getArrayFromjson } from '../services/constants.js'
import { currentApplicationPath, questionIcon, questionIcon18 } from '../services/constants.js'
// import { launchApp } from '/yeshejs/views/mainViewCont.js';
import { displayModaleAndFunctions } from './abstractModalViewController.js'


/**
 * Start script 
 */
// const searchParams = new URLSearchParams(window.location.search);
// launchNoticeController('mainPart', searchParams.get('noticeId'));
export function startController() {
    console.log("Start personViewController");
    const searchParams = new URLSearchParams(window.location.search);
    console.log(searchParams);
    launchApp(function (response, status, xhr) {
        if (status == "error") {
            var msg = "Sorry but there was an error: ";
            $("#error").html(msg + xhr.status + " " + xhr.statusText);
            console.log(msg);
        }
    });

    if (searchParams.has('personID'))
        launchPersonController('mainSection', searchParams.get('personID'));
    else
        // console.log("noticeViewCOntrolleur : Erreur pas de noticeID");
        document.getElementById('messageSection').innerHTML = `<div class="alert alert-danger" style="margin-top:20px" role="alert">Erreur, pas de personID</div>`;

}
/**
 * Main basket view function
 * - Display categories
 * - Display basket content
 *  
 * @param {*} htlmPartId 
 */
export function launchPersonController(htlmPartId, personID) {

    // *** Display main part of the catalog screen
    //  document.getElementById(htlmPartId).innerHTML = searchPart;mainPart

    // displayCategoriesRender("categoryDisplay");

    // *** Add listener for the user events

    // *** Display basket component
    displayPersonContent(htlmPartId, personID);




}



// window.launchNoticeController = launchNoticeController;
/**
 * 
 * @param {*} mainDisplay 
 * @param {*} personID 
 */
export async function displayPersonContent(mainDisplay, personID) {

    let output = '';

    getPerson(personID, function (person) {
        output += `
        <div class="d-flex  justify-content-between" style="padding-top:20px" >          
                <span class="fs-5" style="color:#8B2331">Person : ${person.conc_name}</span>
                <span id="extractButton" style="cursor: pointer">  </span> 
       
        </div > 
        
        <hr />`;
        // *** person image and person description
        output += `<div class="row row-cols-1 row-cols-xs-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 row-cols-xl-2 " > `;
        if (person.conc_image && person.conc_image.length > 0) {
            output += ` <div class="col-md-2 col-lg-2 col-xl-2" align="center" > `;
            output += ` <img src = '${currentApplicationPath}/img/persons/${person.conc_image}' width = "100px" /> `;
            output += `</div > `;

            output += `<div class="col-md-10 col-lg-10 col-xl-10" style = "" > ${person.conc_name} `;
            output += `</div > `

        } else {

            output += `<div class="col-md-12 main" style = "" > ${person.conc_name} `;
            output += `</div > `

        }
        output += `</div > <hr />`; // end row



        // *** Aliases
        // console.log("</br>*** keywords: </br >");
        // output += `<div style=""><spanclass="fs-6" style="color:#8B2331">Person aliases</span></div>`;

        // let languagesList = getArrayFromjson(notice.languagesFunctionFor);

        // languagesList.map((language, index) => {
        //     output += `<span class="fw-light" style ="color:grey"> ${language.ffnlt_name}</span> : ${language.lang_name}, `;

        // });
        // output += `<hr/>`;



        // *** Notes
        // let notesList = getArrayFromjson(notice.notesFunctionFor);
        output += `<div ><span class="fs-6" style="color:#8B2331">Note</span></div>`;

        // notesList.map((note, index) => {
        output += ` ${person.conc_note} </br> `;

        // });
        output += `<hr/>`;

        document.getElementById(mainDisplay).innerHTML = output;
        output += "</br></br></br></br></br></br></br></br></br></br></br></br>" + JSON.stringify(person);

    });


    // *** Display the HTML string

    // *** Display 


}

