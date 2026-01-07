// *** Component ressources
import { getSearch } from './searchService.js';
import { displayimageViewDisplay } from './displayImage/displayimageViewCont.js'
//***  shared ressources
import { getLinkWithctrl, getAppPath } from '../../shared/services/commonFunctions.js'
import { getimagePath, } from '../../shared/services/configurationService.js'
import {
    bookIcon, personIcon, keyIcon, printerIcon, publisherIcon, questionIcon, mattIcon, subnoticeIcon,
    genreIcon, themIcon, languageIcon, noteIcon
} from '../../shared/assets/constants.js'
import { addMultipleEnventListener } from '../../shared/services/commonFunctions.js'
import { getTranslation } from '../../shared/services/translationService.js'
import { headerViewDisplay } from '../appservices/headerViewCont.js'
import { launchInitialisation } from '../appservices/initialisationService.js'
import { searchViewDisplay } from '../appservices/searchViewCont.js'

export const searchPart = `
              <div class="col-md-12 main" style="padding:10px" id="resultDisplay">
     </div >
    `;

export async function startSearchController() {

    try {
        // *** Initialisations
        await launchInitialisation();

        headerViewDisplay("#menuSection");
        searchViewDisplay("#searchSection");

        // *** Get URL params
        const searchParams = new URLSearchParams(window.location.search);
        console.log(searchParams);

        // *** launch render
        if (searchParams.has('searchStr'))
            displaySearchContent("mainActiveSection", searchParams.get('searchStr'), false);
        if (searchParams.has('multiCritSearchStr'))
            displaySearchContent("mainActiveSection", searchParams.get('multiCritSearchStr'), true);



    } catch (error) {
        document.querySelector("#messageSection").innerHTML = `<div class="alert alert-danger" style = "margin-top:30px" role = "alert" > ${error}</div > `;
    }

}

/**
 * Display a search result
 * @param {*} htlmPartId 
 * @param {*} searchString : the string to searched in the database 
 */
export async function displaySearchContent(htlmPartId, searchString, multiCriteriaSearch) {

    // *** Build the html string 
    let output = '';
    let searchLines = null;
    try {

        // let test = searchString.indexOf(":");

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
        // ** Display data   
        output += `<div style="margin-bottom:20px">
        <span class="fs-5" style="color:#8B2331" style="margin-bottom:0px; margin-top:0px">
          ${getTranslation("SEA_TITLE")} - ${searchString} : 
        </span>
        <span ><small>
             ${searchLines.length} lines
        </small>
        </span ><hr style="margin-top:0px"/>
        </div>`;

        //     <div class="row row-cols-1 row-cols-xs-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 row-cols-xl-2 " id = "search-row" > `;
        // <div class="alert alert-secondary " style="margin-top:10px" role="alert" >
        // const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

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
                            output += ` <img src = '${getimagePath()}/img/persons/${searchLine.sear_image}' style = "width:100%;max-width:100px;cursor:pointer" class="imgsearch"/> `;
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
                            output += ` <img src = '${getimagePath()}/img/books/${searchLine.sear_image}' style = "width:100%;max-width:100px;cursor:pointer" class="imgsearch"/> `;
                            output += `</div > `;
                            output += `<div class="col-9" > `;
                        } else {
                            output += ` <div class="" align = "center" > `;
                            output += `</div > `;
                            output += `<div class="col-12" > `;
                        }
                        break;
                }

                // *** Select icon text and dependding on the search type 
                switch (searchLine.sear_type) {
                    case 1: // bibliographic record found by bibliographic record id
                        output += `<span data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="bibliographic record found by bibliographic record id" >
                            ${bookIcon}
                            </span> -  
                            <span class="bookButtons" searid="${searchLine.sear_id}" style="color:#8B2331;cursor: pointer"><b>${searchLine.sear_label}</b></span>
                       </br >
                            ${searchLine.sear_moreinfo && searchLine.sear_moreinfo.length > 0 ? searchLine.sear_moreinfo : ''}
                            </div > `;
                        break

                    case 2: // bibliographic record found by bibliographic record cote
                        output += `<span data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="bibliographic record found by bibliographic record cote" >
                            ${bookIcon}
                            </span> -  
                            <span class="bookButtons" searid="${searchLine.sear_id}" style="color:#8B2331;cursor: pointer"><b>${searchLine.sear_label}</b></span>
                        </br >
                            ${searchLine.sear_moreinfo && searchLine.sear_moreinfo.length > 0 ? searchLine.sear_moreinfo : ''}
                            </div > `;
                        break

                    case 3: // bibliographic record found by bibliographic record ISBN/EAN
                        output += `<span data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="bibliographic record found by bibliographic record ISBN/EAN" >
                            ${bookIcon} searchLine.sear_type
                            </span> -  
                            <span class="bookButtons" searid="${searchLine.sear_id}" style="color:#8B2331;cursor: pointer"><b>${searchLine.sear_label}</b></span>
                         </br >
                            ${searchLine.sear_moreinfo && searchLine.sear_moreinfo.length > 0 ? searchLine.sear_moreinfo : ''}
                            </div > `;
                        break

                    case 4: // bibliographic record found by bibliographic record note
                        output += `<span data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="bibliographic record found by bibliographic record note" >
                            ${noteIcon} 
                            </span> -  
                            <span class="bookButtons" searid="${searchLine.sear_id}" style="color:#8B2331;cursor: pointer"><b>${searchLine.sear_label}</b></span>
                         </br >
                            ${searchLine.sear_moreinfo && searchLine.sear_moreinfo.length > 0 ? searchLine.sear_moreinfo : ''}
                            </div > `;
                        break

                    case 5: // bibliographic record found by bibliographic record title
                        output += `<span data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="bibliographic record found by bibliographic record title" >
                            ${bookIcon} 
                            </span> -  
                            <span class="bookButtons" searid="${searchLine.sear_id}" style="color:#8B2331;cursor: pointer"><b>${searchLine.sear_label}</b></span>
                         </br >
                            ${searchLine.sear_moreinfo && searchLine.sear_moreinfo.length > 0 ? searchLine.sear_moreinfo : ''}
                            </div > `;
                        break

                    case 6: // subnotice //  
                        output += `<span data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="bibliographic sub-record found by title" >
                            ${subnoticeIcon} 
                            </span> -  
                            <span class="subbookButtons" searid="${searchLine.sear_id}" style="color:#8B2331;cursor: pointer"><b>${searchLine.sear_label}</b></span>
                        </br >
                            ${searchLine.sear_moreinfo && searchLine.sear_moreinfo.length > 0 ? searchLine.sear_moreinfo : ''}
                            </div > `;
                        break

                    case 7: // Book // bibliographic sub-record found by id
                        output += `<span data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="bibliographic sub-record found by id" >
                            ${subnoticeIcon} 
                            </span> -  
                            <span class="subbookButtons" searid="${searchLine.sear_id}" style="color:#8B2331;cursor: pointer"><b>${searchLine.sear_label}</b></span>
                        <span style="color:#eff2f2"> (${searchLine.sear_type})</span> </br >
                            ${searchLine.sear_moreinfo && searchLine.sear_moreinfo.length > 0 ? searchLine.sear_moreinfo : ''}
                            </div > `;
                        break

                        break
                    case 10: // Person // 
                        output += `
                            <span data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Person found by person name" >${personIcon}</span>
                             - <span class="personButtons" searid="${searchLine.sear_id}" style="color:#8B2331;cursor: pointer"><b>${searchLine.sear_label}</b></span> 
                               </br >
                                ${searchLine.sear_moreinfo && searchLine.sear_moreinfo.length > 0 ? searchLine.sear_moreinfo : ''}
                                </div > `;
                        break
                    case 11: // Keyword // Keyword found by keyword name
                        output += ` <div class= "" align = "center" > `;
                        output += `</div > `;

                        output += `<div class= "col-12" >
                        <span data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Keyword found by keyword name" >${keyIcon} </span>
                        - <span class="keywordButtons" searid="${searchLine.sear_id}" style="color:#8B2331;cursor: pointer"><b>${searchLine.sear_label}</b></span> 
                          </br >
                        ${searchLine.sear_moreinfo && searchLine.sear_moreinfo.length > 0 ? searchLine.sear_moreinfo : ''}
                        </div > `;
                        break
                    case 12: // printer // Printer
                        output += ` <div class= "" align = "center" > `;
                        output += `</div > `;

                        output += `<div class= "col-12" >
                        <span data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Printer" >${printerIcon}</span>
                         - <span class="printerButtons" searid="${searchLine.sear_id}" style="color:#8B2331;cursor: pointer"><b>${searchLine.sear_label}</b></span> - <span style="color:#eff2f2"> (${searchLine.sear_type})</span>  </br >
                        ${searchLine.sear_moreinfo && searchLine.sear_moreinfo.length > 0 ? searchLine.sear_moreinfo : ''}

                        </div > `;
                        break
                    case 13: // Publisher // Publisher
                        output += ` <div class= <div class="" align="center" >`;
                        output += `</div>`;
                        output += `<div class= "col-12" >
                        <span data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Publisher" >${publisherIcon} </span>
                        - <span class="publisherButtons" searid="${searchLine.sear_id}" style="color:#8B2331;cursor: pointer"><b>${searchLine.sear_label}</b></span>  <span style="color:#eff2f2"> (${searchLine.sear_type})</span>  </br >
                        ${searchLine.sear_moreinfo && searchLine.sear_moreinfo.length > 0 ? searchLine.sear_moreinfo : ''}
                        </div > `;
                        break
                    case 24: // language
                        output += `<div class= "col-12" >
                        <span data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Language" >${languageIcon}</span> 
                        - <span class="languageButtons" searid="${searchLine.sear_id}" style="color:#8B2331;cursor: pointer"><b>${searchLine.sear_label}</b></span>  <span style="color:#eff2f2"> (${searchLine.sear_type})</span>  </br >
                       ${searchLine.sear_moreinfo && searchLine.sear_moreinfo.length > 0 ? searchLine.sear_moreinfo : ''}
                        </div > `;
                        break

                    case 33: // theme
                        output += `<div class= "col-12" >
                        <span data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Theme" >${themIcon}</span>
                        - <span class="themeButtons" searid="${searchLine.sear_id}" style="color:#8B2331;cursor: pointer"><b>${searchLine.sear_label}</b></span>  <span style="color:#eff2f2"> (${searchLine.sear_type})</span>  </br >
                        ${searchLine.sear_moreinfo && searchLine.sear_moreinfo.length > 0 ? searchLine.sear_moreinfo : ''}
                        </div > `;
                        break

                    case 34: // genre
                        output += `<div class= "col-12" >
                        <span data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Genre" >${genreIcon}</span>
                         - <span class="genreButtons" searid="${searchLine.sear_id}" style="color:#8B2331;cursor: pointer"><b>${searchLine.sear_label}</b></span>  <span style="color:#eff2f2"> (${searchLine.sear_type})</span>  </br >
                       ${searchLine.sear_moreinfo && searchLine.sear_moreinfo.length > 0 ? searchLine.sear_moreinfo : ''}
                        </div > `;
                        break

                    case 35: // doctype
                        output += `<div class= "col-12" >
                        <span data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Document type" >${questionIcon} </span>- <span class="doctypeButtons" searid="${searchLine.sear_id}" style="color:#8B2331;cursor: pointer"><b>${searchLine.sear_label}</b></span>  <span style="color:#eff2f2"> (${searchLine.sear_type})</span>  </br >
                        ${searchLine.sear_moreinfo && searchLine.sear_moreinfo.length > 0 ? searchLine.sear_moreinfo : ''}
                        </div > `;
                        break

                    case 36: // matt type
                        output += `<div class= "col-12" >
                        <span data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Material type" >${mattIcon} </span>- <span class="mattypeButtons" searid="${searchLine.sear_id}" style="color:#8B2331;cursor: pointer"><b>${searchLine.sear_label}</b></span>  <span style="color:#eff2f2"> (${searchLine.sear_type})</span>  </br >
                        ${searchLine.sear_moreinfo && searchLine.sear_moreinfo.length > 0 ? searchLine.sear_moreinfo : ''}
                        </div > `;
                        break

                    case 37: // collection
                        output += `<div class= "col-12" >
                        <span data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Collection" >${questionIcon}</span>
                         - <span class="collectionButtons" searid="${searchLine.sear_id}" style="color:#8B2331;cursor: pointer"><b>${searchLine.sear_label}</b></span>  <span style="color:#eff2f2"> (${searchLine.sear_type})</span>  </br >
                        ${searchLine.sear_moreinfo && searchLine.sear_moreinfo.length > 0 ? searchLine.sear_moreinfo : ''}
                        </div > `;
                        break
                    default:
                        output += `<div class= "col-12" >
                        ${questionIcon} - <span>${searchLine.sear_label}</span> - (${searchLine.sear_type}) </br >
                        ${searchLine.sear_moreinfo && searchLine.sear_moreinfo.length > 0 ? searchLine.sear_moreinfo : ''}
                        </div > `;



                }
                output += `</div > <hr />`;
            });
            output += '</div>';
        }
        // *** Display search content
        document.querySelector("#" + htlmPartId).innerHTML = output;

        $('[data-bs-toggle="tooltip"]').tooltip();
        // document.querySelectorAll('[data-bs-toggle="tooltip"]').tootip();

        // *** Add actions 
        addMultipleEnventListener(".bookButtons", function (event) {
            getLinkWithctrl(`${getAppPath()}/views/notice/notice.html?noticeID=` + event.currentTarget.getAttribute('searid'), event.ctrlKey)
        });

        addMultipleEnventListener(".imgsearch", function (event) {
            // getLinkWithctrl(`${getAppPath()}/views/notice/notice.html?noticeID=` + event.currentTarget.getAttribute('searid'), event.ctrlKey)
            console.log("imgSrach click");
        });



        addMultipleEnventListener(".subbookButtons", function (event) {
            getLinkWithctrl(`${getAppPath()}/views/subNotice/subNotice.html?subNoticeID=` + event.currentTarget.getAttribute('searid'), event.ctrlKey)
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



        // *** try to manage image sizing by css
        // document.querySelector("#imgbook").onclick = function (event) {
        //     event.target.style.maxWidth = "300px";
        //     event.target.style.width = "300px";
        //     // window.location.href = `${getAppPath()}/views/simpleEntity/simpleEntity.html?simpleEntityID=${notice.prin_id}&simpleEntitytype=12`
        // };



    } catch (error) {
        document.querySelector("#messageSection").innerHTML = `<div class="alert alert-danger" style = "margin-top:30px" role = "alert" > ${error}</div > `;
    }
}


