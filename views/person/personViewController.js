// *** Component ressources
import { getPerson, getPersonAliases, getlinkedNotices, getPersonFromAliasID } from './personService.js'
import { personEditModalDisplay } from './personEditModalViewController.js'
import { personNewModalDisplay } from './personNewModalViewController.js'
import { getTranslation } from '../../shared/services/translationService.js'
// *** Shared ressources
import { getArrayFromjson } from '../../shared/functions/commonFunctions.js'
import { currentApplicationPath, imagePath, pencilsquare, plussquare } from '../../shared/assets/constants.js'

import { headerViewDisplay } from '../components/headerViewCont.js'

// const personScreenMAsk = `<div class="d-flex  justify-content-between" style="padding-top:20px">
//                     <span class="fs-5" style="color:#8B2331"> ${getTranslation("person")} Person : <span
//                     id="concname"></span></span>
//             <div>
//                 <span id="extractButton" style="cursor: pointer"> ${pencilsquare}</span>
//                 <span id="addnewButton" style="cursor: pointer; margin-left:5px"> ${plussquare}</span>
//             </div>

//         </div >
//         <hr />

//         <div id="concimage"></div>
//         <hr />

//         <div style=""> <spanclass="fs-6" style="color:#8B2331"> Person Aliases</span></div >
//         <div id="concaliases"></div>
//         <hr />

//         <div><span class="fs-6" style="color:#8B2331">Note</span></div>
//         <div id="concnote"></div>
//         <hr />

//         <div><span class="fs-6" style="color:#8B2331">Notices linked</span></div>
//         <div id="conclinkednotices" style="margin-top:20px"></div>
// `;


/**
 * Start script 
 */
// const searchParams = new URLSearchParams(window.location.search);
// launchNoticeController('mainPart', searchParams.get('noticeId'));
export function startPersonController() {

    console.log("personViewController Start ");
    const searchParams = new URLSearchParams(window.location.search);
    // console.log(searchParams);

    headerViewDisplay("#menuSection");

    if (searchParams.has('personID'))
        displayPersonContent('mainActiveSection', searchParams.get('personID'));
    else if (searchParams.has('personAliasID'))
        launchPersonControllerFromAlias('mainActiveSection', searchParams.get('personAliasID'));
    else
        // console.log("noticeViewCOntrolleur : Erreur pas de noticeID");
        $('#messageSection').html(`<div class="alert alert-danger" style="margin-top:30px" role="alert">Erreur, pas d'ID</div>`);

}

/**
 * When the page is called from a notice page, we have the aliasID not the personID
 * @param {*} htlmPartId 
 * @param {*} personAliaID 
 */
export async function displayPersonContentFromAlias(htlmPartId, personAliaID) {

    // *** Display main fixed part of the screen 


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
    // let person = null;
    try {


        // *** Display person
        let person = await getPerson(personID);

        // let personAliasesJson = await getPersonAliases(personID);
        let personAliases = getArrayFromjson(await getPersonAliases(personID));
        let linkedNotices = await getlinkedNotices(personID);

        let personScreen = `<div class="d-flex  justify-content-between" style="padding-top:20px">
                    <span class="fs-5" style="color:#8B2331"> ${getTranslation("person")} Person : <span
                    id="concname">${person.conc_name}</span></span>
            <div>
                <span id="extractButton" style="cursor: pointer"> ${pencilsquare}</span>
                <span id="addnewButton" style="cursor: pointer; margin-left:5px"> ${plussquare}</span>
            </div>
   
        </div >
        <hr />
        
        <!-- Display name and image -->
        <div class="row row-cols-1 row-cols-xs-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 row-cols-xl-2 "> 
        ${person.conc_image && person.conc_image.length > 0 ?
                `<div class="col-md-2 col-lg-2 col-xl-2" align="center" >
                <img src="${imagePath}/img/persons/${person.conc_image}" width="100px" />
            </div > 
            <div class="col-md-10 col-lg-10 col-xl-10" style = "" > 
                ${person.conc_name} 
            </div > `
                :
                `<div class="col-md-10 col-lg-10 col-xl-12" style = "" > 
                ${person.conc_name} 
            </div > `
            }
        </div>    

         <hr /> 

            <! Display aliases -->
        <div style=""> <spanclass="fs-6" style="color:#8B2331"> Person Aliases</span></div >
        <div id="concaliases">
            ${personAliases.map((personAliase, index) => (
                `<span class="fw-light" style = "color:grey" >` + personAliase.lang_name + `</span > : ` + personAliase.coal_name + `, `
            )).join("")}
        </div >
        <hr />

        <div><span class="fs-6" style="color:#8B2331">Note</span></div>
        <div id="concnote">${person.conc_note} </div>
        <hr />

        <div><span class="fs-6" style="color:#8B2331">Notices linked</span></div>
        <div id="conclinkednotices" style="margin-top:20px">
               ${getLinkedNoticesHtml(linkedNotices)}
        </div>
        `;
        $("#" + mainDisplay).html(personScreen);


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

        });


        /*** Actions */
        $(".noticeButtons").on("click", function (event) {
            console.log("click notice");
            window.location.href = `${currentApplicationPath} /views/notice / notice.html ? noticeID = ` + $(this).attr('searid');
        });


    } catch (error) {
        $('#messageSection').html(`< div class="alert alert-danger" style = "margin-top:30px" role = "alert" > ${error}</div > `);

    }


}

function getLinkedNoticesHtml(linkedNotices) {
    let outputln = '';
    linkedNotices.map((linkedNotice, index) => {
        // outputln += `< span class="fw-light" > ${ linkedNotice.noti_main_title }</span >  </br > `;
        outputln += `<div class="row row-cols-1 row-cols-xs-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 row-cols-xl-2 " > `;

        if (linkedNotice.noti_main_image && linkedNotice.noti_main_image.length > 0) {
            outputln += `<div class="col-md-10 col-lg-10 col-xl-10" > <span style="cursor: pointer" class="noticeButtons"
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