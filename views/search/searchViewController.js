// *** Component ressources
import { getSearch } from './searchService.js';

import { displayimageViewDisplay } from '../../shared/bootstrapServices/displayimageViewCont.js'
import { headerViewDisplay } from '../../shared/yesheAppservices/headerViewCont.js'
import { launchInitialisation } from '../../shared/yesheAppservices/initialisationService.js'
import { searchViewDisplay } from '../../shared/yesheAppservices/searchViewCont.js'

import { getLinkWithctrl, getAppPath, findTibetanChars, initBootstrapTooltips } from '../../shared/services/commonFunctions.js'
import { getConfigurationValue } from '../../shared/services/configurationService.js'
import {
    bookIcon, personIcon, keyIcon, printerIcon, publisherIcon, questionIcon, mattIcon, subnoticeIcon,
    genreIcon, themIcon, languageIcon, noteIcon
} from '../../shared/assets/constants.js'
import { addMultipleEnventListener } from '../../shared/services/commonFunctions.js'
import { getTranslation } from '../../shared/services/translationService.js'


export const searchPart = `
              <div class="col-md-12 main" style="padding:10px" id="resultDisplay">
     </div >
    `;

/**
 * Starting function
 */
export async function startSearchController() {

    try {
        // *** Initialisations
        await launchInitialisation();
        headerViewDisplay("#menuSection");
        await searchViewDisplay("#searchSection");

        // *** Get URL params
        const searchParams = new URLSearchParams(window.location.search);
        console.log(searchParams);

        // *** launch render
        if (searchParams.has('searchStr'))
            await displaySearchResults("mainActiveSection", searchParams.get('searchStr'), false);
        if (searchParams.has('multiCritSearchStr'))
            await displaySearchResults("mainActiveSection", searchParams.get('multiCritSearchStr'), true);


    } catch (error) {
        document.querySelector("#messageSection").innerHTML = `<div class="alert alert-danger" style = "margin-top:30px" role = "alert" > ${error}</div > `;
    }
}

// /**
//  * Main function of the component 
//  * @param {*} htlmPartId : part of the html to display the result 
//  * @param {*} searchString 
//  * @param {*} multiCriteriaSearch : true if multicriteri search
//  */
// export async function displaySearchContent(htlmPartId, searchString, multiCriteriaSearch) {

//     // *** Build the html string 
//     try {

//         await displaySearchResults(htlmPartId, searchString, multiCriteriaSearch);

//     } catch (exception) {
//         document.querySelector("#messageSection").innerHTML = `<div class="alert alert-danger" style = "margin-top:30px" role = "alert" > ${exception}</div > `;
//     }
// }

/**
 * 
 * @param {*} htlmPartId 
 * @param {*} searchString 
 * @param {*} multiCriteriaSearch 
 * @returns 
 */
async function displaySearchResults(htlmPartId, searchString, multiCriteriaSearch) {
    let output = '';
    let searchLines = null;


    // *** Search results
    if (!searchString.length > 0)
        throw ("Veuillez saisir un critère de recherche");

    if (multiCriteriaSearch === true) {
        searchLines = await getSearch(searchString, "5");
    } else {
        // *** Get data from API
        if (searchString.indexOf(":") > 0 && (searchString.indexOf(":") === 3 || searchString.indexOf(":") === 4)) {
            searchLines = await getSearch(searchString, "1");
        } else {
            searchLines = await getSearch(searchString, "3");
        }
    }

    if (searchLines.length === 0)
        throw ("Pas de résultat pour cette recherche");

    // *** Prepare and fill display area
    output += `<div style="margin-bottom:20px">
        <span class="fs-5" style="color:#8B2331" style="margin-bottom:0px; margin-top:0px">
          ${getTranslation("SEA_TITLE")} - ${searchString} : 
        </span>
        <span ><small>
             ${searchLines.length} lines
        </small>
        </span ><hr style="margin-top:0px"/>
        </div>`;

    if (searchLines && searchLines.length > 0) {
        searchLines.map((searchLine, index) => {
            output += `
                <div class="row " id = "search-row" style="padding-bottom:5px"> `;

            let sear_typeIcon = '';

            // *** Display image if exists
            switch (searchLine.sear_type) {
                case 10: // person images are in the persons directory
                    if (searchLine.sear_image && searchLine.sear_image.length > 0) {
                        output += ` <div class="col-3 " align = "center" > `;
                        output += ` <img src = '${getConfigurationValue("imagePath")}/img/persons/${searchLine.sear_image}' style = "width:100%;max-width:150px;cursor:pointer" class="imgsearch"/> `;
                        output += `</div > `;
                        output += `<div class="col-9" > `;
                    } else {
                        output += ` <div class="" align = "center" > `;
                        output += `</div > `;
                        output += `<div class="col-12" > `;
                    }
                    break;
                default: // other images are in the book directory
                    if (searchLine.sear_image && searchLine.sear_image.length > 0) {
                        output += ` <div class="col-3 " align = "center" > `;
                        output += ` <img src = '${getConfigurationValue("imagePath")}img/books/${searchLine.sear_image}' style = "width:100%;max-width:150px;cursor:pointer" class="imgsearch"/> `;
                        output += `</div > `;
                        output += `<div class="col-9" > `;
                    } else {
                        output += ` <div class="" align = "center" > `;
                        output += `</div > `;
                        output += `<div class="col-12" > `;
                    }
                    break;
            }

            // Select icon text and dependding on the search type 
            switch (searchLine.sear_type) {
                case 1: // bibliographic record found by bibliographic record id
                    output += `<span data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="bibliographic record found by bibliographic record id" >
                            ${bookIcon}
                            </span> -  
                            <span class="bookButtons" searid="${searchLine.sear_id}" style="color:#8B2331;cursor: pointer"><b>${findTibetanChars(searchLine.sear_label)}</b></span>
                       </br >
                            ${searchLine.sear_moreinfo && searchLine.sear_moreinfo.length > 0 ? findTibetanChars(searchLine.sear_moreinfo) : ''}
                            </div > `;
                    break
                case 2: // bibliographic record found by bibliographic record cote
                    output += `<span data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="bibliographic record found by bibliographic record cote" >
                            ${bookIcon}
                            </span> -  
                            <span class="bookButtons" searid="${searchLine.sear_id}" style="color:#8B2331;cursor: pointer"><b>${findTibetanChars(searchLine.sear_label)}</b></span>
                        </br >
                            ${searchLine.sear_moreinfo && searchLine.sear_moreinfo.length > 0 ? findTibetanChars(searchLine.sear_moreinfo) : ''}
                            </div > `;
                    break
                case 3: // bibliographic record found by bibliographic record ISBN/EAN
                    output += `<span data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="bibliographic record found by bibliographic record ISBN/EAN" >
                            ${bookIcon} searchLine.sear_type
                            </span> -  
                            <span class="bookButtons" searid="${searchLine.sear_id}" style="color:#8B2331;cursor: pointer"><b>${findTibetanChars(searchLine.sear_label)}</b></span>
                         </br >
                            ${searchLine.sear_moreinfo && searchLine.sear_moreinfo.length > 0 ? findTibetanChars(searchLine.sear_moreinfo) : ''}
                            </div > `;
                    break
                case 4: // bibliographic record found by bibliographic record note
                    output += `<span data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="bibliographic record found by bibliographic record note" >
                            ${noteIcon} 
                            </span> -  
                            <span class="bookButtons" searid="${searchLine.sear_id}" style="color:#8B2331;cursor: pointer"><b>${findTibetanChars(searchLine.sear_label)}</b></span>
                         </br >
                            ${searchLine.sear_text && searchLine.sear_text.length > 0 ? findTibetanChars(searchLine.sear_text) : ''}
                            </div > `;
                    break
                case 5: // bibliographic record found by bibliographic record title
                    output += `<span data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="bibliographic record found by bibliographic record title" >
                            ${bookIcon} 
                            </span> -  
                            <span class="bookButtons" searid="${searchLine.sear_id}" style="color:#8B2331;cursor: pointer"><b>${findTibetanChars(searchLine.sear_label)}</b></span>
                         </br >
                            ${searchLine.sear_moreinfo && searchLine.sear_moreinfo.length > 0 ? findTibetanChars(searchLine.sear_moreinfo) : ''}
                            </div > `;
                    break
                case 6: // subnotice //  
                    output += `<span data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="bibliographic sub-record found by title" >
                            ${subnoticeIcon} 
                            </span> -  
                            <span class="subbookButtons" searid="${searchLine.sear_id}" style="color:#8B2331;cursor: pointer"><b>${findTibetanChars(searchLine.sear_label)}</b></span>
                        </br >
                            ${searchLine.sear_moreinfo && searchLine.sear_moreinfo.length > 0 ? findTibetanChars(searchLine.sear_moreinfo) : ''}
                            </div > `;
                    break
                case 7: // Book // bibliographic sub-record found by id
                    output += `<span data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="bibliographic sub-record found by id" >
                            ${subnoticeIcon} 
                            </span> -  
                            <span class="subbookButtons" searid="${searchLine.sear_id}" style="color:#8B2331;cursor: pointer"><b>${findTibetanChars(searchLine.sear_label)}</b></span>
                        <span style="color:#eff2f2"> (${searchLine.sear_type})</span> </br >
                            ${searchLine.sear_moreinfo && searchLine.sear_moreinfo.length > 0 ? findTibetanChars(searchLine.sear_moreinfo) : ''}
                            </div > `;
                    break
                case 10: // Person // 
                    output += `
                            <span data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Person found by person name" >${personIcon}</span>
                             - <span class="personButtons" searid="${searchLine.sear_id}" style="color:#8B2331;cursor: pointer"><b>${findTibetanChars(searchLine.sear_label)}</b></span> 
                               </br >
                                ${searchLine.sear_moreinfo && searchLine.sear_moreinfo.length > 0 ? searchLine.sear_moreinfo : ''}
                                </div > `;
                    break
                case 11: // Keyword // Keyword found by keyword name
                    output += `
                        <span data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Keyword found by keyword name" >${keyIcon} </span>
                        - <span class="keywordButtons" searid="${searchLine.sear_id}" style="color:#8B2331;cursor: pointer"><b>${findTibetanChars(searchLine.sear_label)}</b></span> 
                          </br >
                        ${searchLine.sear_moreinfo && searchLine.sear_moreinfo.length > 0 ? searchLine.sear_moreinfo : ''}
                        </div > `;
                    break
                case 12: // printer // Printer
                    output += `
                        <span data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Printer" >${printerIcon}</span>
                         - <span class="printerButtons" searid="${searchLine.sear_id}" style="color:#8B2331;cursor: pointer"><b>${searchLine.sear_label}</b></span> - <span style="color:#eff2f2"> (${searchLine.sear_type})</span>  </br >
                        ${searchLine.sear_moreinfo && searchLine.sear_moreinfo.length > 0 ? searchLine.sear_moreinfo : ''}
                        </div > `;
                    break
                case 13: // Publisher // Publisher
                    output += `
                        <span data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Publisher" >${publisherIcon} </span>
                        - <span class="publisherButtons" searid="${searchLine.sear_id}" style="color:#8B2331;cursor: pointer"><b>${searchLine.sear_label}</b></span>  <span style="color:#eff2f2"> (${searchLine.sear_type})</span>  </br >
                        ${searchLine.sear_moreinfo && searchLine.sear_moreinfo.length > 0 ? searchLine.sear_moreinfo : ''}
                        </div > `;
                    break
                case 24: // language
                    output += `
                        <span data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Language" >${languageIcon}</span> 
                        - <span class="languageButtons" searid="${searchLine.sear_id}" style="color:#8B2331;cursor: pointer"><b>${searchLine.sear_label}</b></span>  <span style="color:#eff2f2"> (${searchLine.sear_type})</span>  </br >
                       ${searchLine.sear_moreinfo && searchLine.sear_moreinfo.length > 0 ? searchLine.sear_moreinfo : ''}
                        </div > `;
                    break
                case 33: // theme
                    output += `
                        <span data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Theme" >${themIcon}</span>
                        - <span class="themeButtons" searid="${searchLine.sear_id}" style="color:#8B2331;cursor: pointer"><b>${searchLine.sear_label}</b></span>  <span style="color:#eff2f2"> (${searchLine.sear_type})</span>  </br >
                        ${searchLine.sear_moreinfo && searchLine.sear_moreinfo.length > 0 ? searchLine.sear_moreinfo : ''}
                        </div > `;
                    break
                case 34: // genre
                    output += `
                        <span data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Genre" >${genreIcon}</span>
                         - <span class="genreButtons" searid="${searchLine.sear_id}" style="color:#8B2331;cursor: pointer"><b>${searchLine.sear_label}</b></span>  <span style="color:#eff2f2"> (${searchLine.sear_type})</span>  </br >
                       ${searchLine.sear_moreinfo && searchLine.sear_moreinfo.length > 0 ? searchLine.sear_moreinfo : ''}
                        </div > `;
                    break
                case 35: // doctype
                    output += `
                        <span data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Document type" >${questionIcon} </span>- <span class="doctypeButtons" searid="${searchLine.sear_id}" style="color:#8B2331;cursor: pointer"><b>${searchLine.sear_label}</b></span>  <span style="color:#eff2f2"> (${searchLine.sear_type})</span>  </br >
                        ${searchLine.sear_moreinfo && searchLine.sear_moreinfo.length > 0 ? searchLine.sear_moreinfo : ''}
                        </div > `;
                    break
                case 36: // matt type
                    output += `
                        <span data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Material type" >${mattIcon} </span>- <span class="mattypeButtons" searid="${searchLine.sear_id}" style="color:#8B2331;cursor: pointer"><b>${searchLine.sear_label}</b></span>  <span style="color:#eff2f2"> (${searchLine.sear_type})</span>  </br >
                        ${searchLine.sear_moreinfo && searchLine.sear_moreinfo.length > 0 ? searchLine.sear_moreinfo : ''}
                        </div > `;
                    break
                case 37: // collection
                    output += `
                        <span data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Collection" >${questionIcon}</span>
                         - <span class="collectionButtons" searid="${searchLine.sear_id}" style="color:#8B2331;cursor: pointer"><b>${searchLine.sear_label}</b></span>  <span style="color:#eff2f2"> (${searchLine.sear_type})</span>  </br >
                        ${searchLine.sear_moreinfo && searchLine.sear_moreinfo.length > 0 ? searchLine.sear_moreinfo : ''}
                        </div > `;
                    break
                default:
                    output += `
                        ${questionIcon} - <span>${searchLine.sear_label}</span> - (${searchLine.sear_type}) </br >
                        ${searchLine.sear_moreinfo && searchLine.sear_moreinfo.length > 0 ? searchLine.sear_moreinfo : ''}
                        </div > `;
            }
            output += `</div > <hr />`; // end row
        });
        output += '</div>';

    }

    // *** Display search content
    document.querySelector("#" + htlmPartId).innerHTML = output;

    // *** Add actions 
    addMultipleEnventListener(".bookButtons", function (event) {
        getLinkWithctrl(`${getAppPath()}/views/notice/notice.html?noticeID=` + event.currentTarget.getAttribute('searid'), event.ctrlKey)
    });

    addMultipleEnventListener(".subbookButtons", function (event) {
        getLinkWithctrl(`${getAppPath()}/views/subnotice/subnotice.html?subnoticeid=` + event.currentTarget.getAttribute('searid'), event.ctrlKey)
    });

    addMultipleEnventListener(".personButtons", function (event) {
        getLinkWithctrl(`${getAppPath()}/views/person/person.html?personID=` + event.currentTarget.getAttribute('searid'), event.ctrlKey)
    });

    addMultipleEnventListener(".keywordButtons", function (event) {
        getLinkWithctrl(`${getAppPath()}/views/keyword/keyword.html?keywordID=` + event.currentTarget.getAttribute('searid'), event.ctrlKey)
    });

    addMultipleEnventListener(".printerButtons", function (event) {
        getLinkWithctrl(`${getAppPath()}/views/simpleEntity/simpleEntity.html?simpleEntityID=` + event.currentTarget.getAttribute('searid') + `&simpleEntitytype=12`, event.ctrlKey)
    });

    addMultipleEnventListener(".publisherButtons", function (event) {
        getLinkWithctrl(`${getAppPath()}/views/simpleEntity/simpleEntity.html?simpleEntityID=` + event.currentTarget.getAttribute('searid') + `&simpleEntitytype=13`, event.ctrlKey)
    });

    addMultipleEnventListener(".languageButtons", function (event) {
        getLinkWithctrl(`${getAppPath()}/views/simpleEntity/simpleEntity.html?simpleEntityID=` + event.currentTarget.getAttribute('searid') + `&simpleEntitytype=24`, event.ctrlKey)
    });

    addMultipleEnventListener(".themeButtons", function (event) {
        getLinkWithctrl(`${getAppPath()}/views/simpleEntity/simpleEntity.html?simpleEntityID=` + event.currentTarget.getAttribute('searid') + `&simpleEntitytype=33`, event.ctrlKey)
    });

    addMultipleEnventListener(".genreButtons", function (event) {
        getLinkWithctrl(`${getAppPath()}/views/simpleEntity/simpleEntity.html?simpleEntityID=` + event.currentTarget.getAttribute('searid') + `&simpleEntitytype=34`, event.ctrlKey)
    });

    addMultipleEnventListener(".doctypeButtons", function (event) {
        getLinkWithctrl(`${getAppPath()}/views/simpleEntity/simpleEntity.html?simpleEntityID=` + event.currentTarget.getAttribute('searid') + `&simpleEntitytype=35`, event.ctrlKey)
    });

    addMultipleEnventListener(".mattypeButtons", function (event) {
        getLinkWithctrl(`${getAppPath()}/views/simpleEntity/simpleEntity.html?simpleEntityID=` + event.currentTarget.getAttribute('searid') + `&simpleEntitytype=36`, event.ctrlKey)
    });

    addMultipleEnventListener(".collectionButtons", function (event) {
        getLinkWithctrl(`${getAppPath()}/views/simpleEntity/simpleEntity.html?simpleEntityID=` + event.currentTarget.getAttribute('searid') + `&simpleEntitytype=37`, event.ctrlKey)
    });
    addMultipleEnventListener(".imgsearch", function (event) {
        displayimageViewDisplay("modalSection", event.currentTarget.getAttribute('src'), event.ctrlKey)
    });

    // *** Enable Tooltips
    initBootstrapTooltips();

    return output;
}


