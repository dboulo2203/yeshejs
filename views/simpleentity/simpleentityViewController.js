// *** Component ressources
import { getSimpleEntity, getSimpleEntitylinkedNotices } from './simpleEntityService.js'

// *** Shared ressources
import { getAppPath } from '../../shared/services/commonFunctions.js'
import { bookIcon, personIcon, keyIcon, printerIcon, publisherIcon, questionIcon, mattIcon, subnoticeIcon, genreIcon, themIcon } from '../../shared/assets/constants.js'
import { getTranslation } from '../../shared/services/translationService.js'
import { getimagePath } from '../../shared/services/initialisationService.js'
import { addMultipleEnventListener } from '../../shared/services/commonFunctions.js'
import { launchInitialisation } from '../../shared/services/initialisationService.js';
import { headerViewDisplay } from '../../shared/services/headerViewCont.js'


export async function startsimpleEntityController() {

    const searchParams = new URLSearchParams(window.location.search);

    try {
        // *** Initialisations
        await launchInitialisation();
        headerViewDisplay("#menuSection");

        if (searchParams.has('simpleEntityID') && searchParams.has('simpleEntitytype'))
            displaysimpleEntityContent('mainActiveSection', searchParams.get('simpleEntityID'), searchParams.get('simpleEntitytype'));
        else
            document.querySelector("#messageSection").innerHTML = `<div class="alert alert-danger" style="margin-top:30px" role="alert">Erreur, pas d'ID</div>`;


    } catch (error) {
        document.querySelector("#messageSection").innerHTML = `<div class="alert alert-danger" style = "margin-top:30px" role = "alert" > ${error}</div > `;
    }

}


/**
 * 
 * @param {*} htlmPartId : div to display the simpleENtity
 * @param {*} simpleEntityID 
 * @param {*} simpleEntityType : 12,13, (serachType of the WS)
 */
export async function displaysimpleEntityContent(htlmPartId, simpleEntityID, simpleEntityType) {

    let output = ``;
    switch (simpleEntityType) {
        case '12': // printer
            output += await getSimpleEntityContent(simpleEntityID, "printer", "prin_name", "printerIcon");
            break;
        case '13': // publisher
            output += await getSimpleEntityContent(simpleEntityID, "publisher", "publ_name", "publisherIcon");
            break;
        case 24:
            // $location.path("language/" + newValue.sear_id);
            break;
        case '24':
            output += await getSimpleEntityContent(simpleEntityID, "language", "lang_name", "themIcon");
            break;

        case '33':
            output += await getSimpleEntityContent(simpleEntityID, "theme", "them_name", "themIcon");
            break;
            // $location.path("theme/" + newValue.sear_id);
            break;
        case '34':
            output += await getSimpleEntityContent(simpleEntityID, "genre", "genr_name", "genreIcon");
            break;
        case '35':
            output += await getSimpleEntityContent(simpleEntityID, "doctype", "doct_name", "questionIcon");
            break;
        case '36':
            // $location.path("doctype/" + newValue.sear_id);
            output += await getSimpleEntityContent(simpleEntityID, "mattype", "matt_name", "mattIcon");
            break;
        case '37':
            // $location.path("doctype/" + newValue.sear_id);
            output += await getSimpleEntityContent(simpleEntityID, "collection", "coll_name", "questionIcon");
            break;

        default:
            output += `<div class= "col-12" >
          Unknowned entityt type ${simpleEntityType} 
            </div > `;
    }
    document.querySelector("#" + htlmPartId).innerHTML = output;

    addMultipleEnventListener(".noticeButtons", function () {
        window.location.href = `${getAppPath()}/views/notice/notice.html?noticeID=` + event.currentTarget.getAttribute('searid');
    });

}
/**
 * 
 * @param {*} simpleEntityID 
 * @param {*} entityType 
 * @param {*} varname 
 * @param {*} entityIcon 
 * @returns 
 */
export async function getSimpleEntityContent(simpleEntityID, entityType, varname, entityIcon) {

    let output = '';
    try {

        // *** Load data from API
        let simpleEntity = await getSimpleEntity(simpleEntityID, entityType);

        let linkedNotices = await getSimpleEntitylinkedNotices(simpleEntityID, entityType);

        // ** Main template
        output = `
            <div class="d-flex  justify-content-between" style="margin-top:60px">
                <span class="fs-5" style="color:#8B2331">${eval(entityIcon)} ${getTranslation(entityType)} : 
                <span
                    id="concname">${eval("simpleEntity." + varname)}</span></span>
                   <div>
            </div>
   
        </div>
        <hr style = "margin-block-start:0.1rem;margin-block-end:0.3rem;margin-top:15px" />
           <div style="margin-bottom:20px"><span class="fs-6" style="color:#8B2331">Notices linked (${linkedNotices.length} notices)</span>  </div>
   `;
        linkedNotices.map((linkedNotice, index) => {
            output += `<div class="row " > `;

            if (linkedNotice.noti_main_image && linkedNotice.noti_main_image.length > 0) {
                output += ` <div class="col-3" align = "center" > `;
                output += ` <img src = '${getimagePath()}/img/books/${linkedNotice.noti_main_image}' width = "80px" /> `;
                output += `</div > `;

                output += `<div class="col-9" > <span style="cursor: pointer"  class="noticeButtons"
                searid="${linkedNotice.noti_id}" > ${bookIcon} ${linkedNotice.noti_main_title} </span > `;
                output += `</div > `

            } else {
                output += ` <div class="col-3" align = "center" > `;
                output += `</div > `;

                output += `<div class="col-9" > <span style="cursor: pointer" class="noticeButtons" searid="${linkedNotice.noti_id}" > ${bookIcon} ${linkedNotice.noti_main_title} </span >`;
                output += `</div > `;
            }
            output += `</div > `
            output += `<hr style="margin-block-start:0.1rem;margin-block-end:0.3rem;margin-top:15px"/>`;;

        }); output += ``
    } catch (error) {
        document.querySelector("#messageSection").innerHTML = `<div class="alert alert-danger" style = "margin-top:30px" role = "alert" > ${error}</div > `;
    }
    return output;
}