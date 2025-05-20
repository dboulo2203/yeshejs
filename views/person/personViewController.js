import { getPerson, getPersonAliases, getlinkedNotices, getPersonFromAliasID } from '../../services/personService.js'
import { personEditModalDisplay } from './personEditModalViewController.js'
import { personNewModalDisplay } from './personNewModalViewController.js'

import { getArrayFromjson } from '../../services/commonFunctions.js'
import { currentApplicationPath, imagePath, pencilsquare, plussquare } from '../../shared/assets/constants.js'
import { headerViewDisplay } from '../headerViewCont.js'

const personScreenMAsk = `<div class="d-flex  justify-content-between" style="padding-top:20px" >          
    <span class="fs-5" style = "color:#8B2331" > Person : <span id="concname"></span></span>
    <div>    
    <span id="extractButton" style="cursor: pointer">  ${pencilsquare}</span>
        <span id="addnewButton" style="cursor: pointer; margin-left:5px">  ${plussquare}</span>
    </div>
        
    </div > <hr />
    
    <div id ="concimage"></div>
    <hr/>

    <div style = "" > <spanclass="fs-6" style = "color:#8B2331" > Person Aliases</span ></div >
    <div id ="concaliases"></div>
    <hr/>

    <div ><span class="fs-6" style="color:#8B2331">Note</span></div>
    <div id="concnote"></div>
    <hr/>

    <div ><span class="fs-6" style="color:#8B2331">Notices linked</span></div>
    <div id="conclinkednotices" style="margin-top:20px"></div

    `;


/**
 * Start script 
 */
// const searchParams = new URLSearchParams(window.location.search);
// launchNoticeController('mainPart', searchParams.get('noticeId'));
export function startPersonController() {


    console.log("personViewController Start ");
    const searchParams = new URLSearchParams(window.location.search);
    console.log(searchParams);

    headerViewDisplay("#menuSection");

    if (searchParams.has('personID'))
        launchPersonController('mainActiveSection', searchParams.get('personID'));
    else if (searchParams.has('personAliasID'))
        launchPersonControllerFromAlias('mainActiveSection', searchParams.get('personAliasID'));
    else
        // console.log("noticeViewCOntrolleur : Erreur pas de noticeID");
        $('#messageSection').html(`<div class="alert alert-danger" style="margin-top:30px" role="alert">Erreur, pas d'ID</div>`);


}
/**
 * Main basket view function
 * - Display categories
 * - Display basket content
 *  
 * @param {*} htlmPartId 
 */
export function launchPersonController(htlmPartId, personID) {

    // *** Display main fixed part of the screen 
    document.getElementById(htlmPartId).innerHTML = personScreenMAsk;

    // *** Display person component
    displayPersonContent(htlmPartId, personID);

}

/**
 * Main basket view function
 * - Display categories
 * - Display basket content
 *  
 * @param {*} htlmPartId 
 */
export async function launchPersonControllerFromAlias(htlmPartId, personAliaID) {

    // *** Display main fixed part of the screen 
    document.getElementById(htlmPartId).innerHTML = personScreenMAsk;

    let person = await getPersonFromAliasID(personAliaID,);

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
    let person = null;
    try {
        // *** Display person
        person = await getPerson(personID);


        /** Display name */
        document.getElementById("concname").innerHTML = person.conc_name;

        // *** person image and person description
        let outputimg = `<div class="row row-cols-1 row-cols-xs-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 row-cols-xl-2 " > `;
        if (person.conc_image && person.conc_image.length > 0) {
            outputimg += ` <div class="col-md-2 col-lg-2 col-xl-2" align="center" > `;
            outputimg += ` <img src = '${imagePath}/img/persons/${person.conc_image}' width = "100px" /> `;
            outputimg += `</div > `;

            outputimg += `<div class="col-md-10 col-lg-10 col-xl-10" style = "" > ${person.conc_name} `;
            outputimg += `</div > `
        } else {

            outputimg += `<div class="col-md-12 main" style = "" > ${person.conc_name} `;
            outputimg += `</div > `
        }
        output += `</div > `; // End row
        document.getElementById("concimage").innerHTML = outputimg;

        //*** Display Note */
        document.getElementById("concnote").innerHTML = person.conc_note;

        console.log(JSON.stringify(person));

        //***  Actions
        jQuery("#extractButton").on("click", function (event) {
            console.log("extractButton : ");
            personEditModalDisplay(mainDisplay, person, function (status) {
            });

        });
        jQuery("#addnewButton").on("click", function (event) {
            console.log("addnewButton : ");
            personNewModalDisplay(mainDisplay, person, function (status) {
            });


            // displaySearchContent('mainSection', 'metta');
        });

        // *** Display Aliases
        let personAliasesJson = await getPersonAliases(personID);

        let outputAliases = ``;
        let personAliases = getArrayFromjson(personAliasesJson);
        personAliases.map((personAliase, index) => {
            outputAliases += `<span class="fw-light" style ="color:grey"> ${personAliase.lang_name}</span> : ${personAliase.coal_name}, `;
        });

        document.getElementById("concaliases").innerHTML = outputAliases;

        console.log(JSON.stringify(personAliases));

        // *** Display Aliases
        let linkedNotices = await getlinkedNotices(personID);

        let outputln = ``;
        // let personAliases = getArrayFromjson(personAliasesJson);
        linkedNotices.map((linkedNotice, index) => {
            // outputln += `<span class="fw-light" > ${linkedNotice.noti_main_title}</span>  </br>`;
            outputln += `<div class="row row-cols-1 row-cols-xs-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 row-cols-xl-2 " > `;

            if (linkedNotice.noti_main_image && linkedNotice.noti_main_image.length > 0) {
                outputln += `<div class="col-md-10 col-lg-10 col-xl-10" > <span style = "cursor: pointer" class="noticeButtons"
                searid = "${linkedNotice.noti_id}" > ${linkedNotice.noti_main_title} </span > `;
                outputln += `</div > `
                outputln += ` <div class="col-md-2 col-lg-2 col-xl-2" align="center" > `;
                outputln += ` <img src = '${currentApplicationPath}/img/books/${linkedNotice.noti_main_image}' width = "80px" /> `;
                outputln += `</div > `;

            } else {
                outputln += `<div class="col-md-10 col-lg-10 col-xl-10" > <span style = "cursor: pointer" class="noticeButtons"
                searid = "${linkedNotice.noti_id}" > ${linkedNotice.noti_main_title} </span >`;
                outputln += `</div > `
                outputln += ` <div class="col-md-2 col-lg-2 col-xl-2" align="center" > `;
                outputln += `</div > `;

            }
            outputln += `</div > `
            outputln += `<hr style="color:#a5a5a5"/ > `


        });

        // *** Display content
        document.getElementById("conclinkednotices").innerHTML = outputln;

        /*** Actions */
        $(".noticeButtons").on("click", function (event) {
            console.log("click notice");
            window.location.href = `${currentApplicationPath}/views/notice/notice.html?noticeID=` + $(this).attr('searid');
        });


    } catch (error) {
        $('#messageSection').html(`<div class="alert alert-danger" style="margin-top:30px" role="alert">${error}</div>`);

    }


    //     // console.log(JSON.stringify(linkedNotices));
    // });

    // });

} 