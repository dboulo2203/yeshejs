// *** Component ressources
import { getSearch } from './searchService.js';

//***  shared ressources
import { getAppPath } from '../../shared/services/commonFunctions.js'
// import { imagePath } from '../../shared/assets/constants.js'
import { getimagePath } from '../../shared/services/initialisationService.js'
import { bookIcon, personIcon, keyIcon, printerIcon, publisherIcon, questionIcon } from '../../shared/assets/constants.js'
import { addMultipleEnventListener } from '../../shared/services/commonFunctions.js'
import { getTranslation } from '../../shared/services/translationService.js'
import { headerViewDisplay } from '../../shared/services/headerViewCont.js'
import { launchInitialisation } from '../../shared/services/initialisationService.js'
import { searchViewDisplay } from '../../shared/services/searchViewCont.js'

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
            displaySearchContent("mainActiveSection", searchParams.get('searchStr'));


    } catch (error) {
        document.querySelector("#messageSection").innerHTML = `<div class="alert alert-danger" style = "margin-top:30px" role = "alert" > ${error}</div > `;
    }

}

/**
 * Display a search result
 * @param {*} htlmPartId 
 * @param {*} searchString : the string to searched in the database 
 */
export async function displaySearchContent(htlmPartId, searchString) {

    // *** Build the html string 
    let output = '';
    let searchLines = null;
    try {

        let test = searchString.indexOf(":");
        // *** Get data from API
        if (searchString.indexOf(":") > 0 && (searchString.indexOf(":") === 3 || searchString.indexOf(":") === 4)) {
            searchLines = await getSearch(searchString, "1");
        } else {
            searchLines = await getSearch(searchString, "3");
        }
        // ** Display data   
        output += `<div style="margin-bottom:20px">
        <span class="fs-5" style="color:#8B2331" style="margin-bottom:0px; margin-top:0px">
          ${getTranslation("searchname")} - ${searchString} : 
        </span>
        <span ><small>
             ${searchLines.length} lines
        </small>
        </span ><hr style="margin-top:0px"/>
        </div>`;

        //     <div class="row row-cols-1 row-cols-xs-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 row-cols-xl-2 " id = "search-row" > `;
        // <div class="alert alert-secondary " style="margin-top:10px" role="alert" >


        if (searchLines && searchLines.length > 0) {
            searchLines.map((searchLine, index) => {
                output += `
                <div class="row " id = "search-row" > `;

                let sear_typeIcon = '';

                // *** Select icon and image dependding on the search type 
                // TODO : fill the other sear_type
                switch (searchLine.sear_type) {
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6: // subnotice
                    case 7: // Book

                        if (searchLine.sear_image && searchLine.sear_image.length > 0) {
                            output += ` <div class="col-3 " align = "center" > `;
                            output += ` <img src = '${getimagePath()}/img/books/${searchLine.sear_image}' style = "max-width:100px;width:100%" /> `;
                            output += `</div > `;
                            output += `<div class="col-9" > `;
                        } else {
                            output += ` <div class="" align = "center" > `;
                            output += `</div > `;
                            output += `<div class="col-12" > `;

                        }
                        output += `${bookIcon} -  <span class="bookButtons" searid="${searchLine.sear_id}" style="color:#8B2331;cursor: pointer"><b>${searchLine.sear_label}</b></span>
                        <span style="color:#eff2f2"> (${searchLine.sear_type})</span> </br >
                            ${searchLine.sear_moreinfo}...
                            </div > `;
                        break
                    case 10: // Person

                        if (searchLine.sear_image && searchLine.sear_image.length > 0) {
                            output += ` <div class= "col-3" align = "center" > `;
                            output += ` <img src = '${getimagePath()}/img/persons/${searchLine.sear_image}' width = "100px" /> `;
                            output += `</div > `;
                            output += `<div class= "col-9" > `;
                        } else {
                            output += ` <div class= "" align = "center" > `;
                            output += `</div > `;
                            output += `<div class= "col-12" > `;
                        }
                        output += `
                            ${personIcon} - <span class="personButtons" searid="${searchLine.sear_id}" style="color:#8B2331;cursor: pointer"><b>${searchLine.sear_label}</b></span> <span style="color:#eff2f2"> (${searchLine.sear_type})</span>  </br >
                                ${searchLine.sear_moreinfo}...
                                </div > `;
                        break
                    case 11: // Keyword
                        output += ` <div class= "" align = "center" > `;
                        output += `</div > `;

                        output += `<div class= "col-12" >
                        ${keyIcon} - <span class="keywordButtons" searid="${searchLine.sear_id}" style="color:#8B2331;cursor: pointer"><b>${searchLine.sear_label}</b></span> <span style="color:#eff2f2"> (${searchLine.sear_type})</span>  </br >
                        ${searchLine.sear_moreinfo}...
                        </div > `;
                        break
                    case 12: // printer
                        output += ` <div class= "" align = "center" > `;
                        output += `</div > `;

                        output += `<div class= "col-12" >
                        ${printerIcon} - <span class="printerButtons" searid="${searchLine.sear_id}" style="color:#8B2331;cursor: pointer"><b>${searchLine.sear_label}</b></span> - <span style="color:#eff2f2"> (${searchLine.sear_type})</span>  </br >
                        ${searchLine.sear_moreinfo && searchLine.sear_moreinfo.length > 0 ? searchLine.sear_moreinfo : ''}

                        </div > `;
                        break
                    case 13: // Publisher
                        output += ` <div class= <div class="" align="center" >`;
                        output += `</div>`;
                        output += `<div class= "col-12" >
                        ${publisherIcon} - <span class="publisherButtons" searid="${searchLine.sear_id}" style="color:#8B2331;cursor: pointer"><b>${searchLine.sear_label}</b></span>  <span style="color:#eff2f2"> (${searchLine.sear_type})</span>  </br >
                        ${searchLine.sear_moreinfo && searchLine.sear_moreinfo.length > 0 ? searchLine.sear_moreinfo : ''}
                        </div > `;
                        break
                    case 24: // language
                        output += `<div class= "col-12" >
                        ${publisherIcon} - <span class="languageButtons" searid="${searchLine.sear_id}" style="color:#8B2331;cursor: pointer"><b>${searchLine.sear_label}</b></span>  <span style="color:#eff2f2"> (${searchLine.sear_type})</span>  </br >
                        ${searchLine.sear_moreinfo}...
                        </div > `;
                        break

                    case 33: // theme
                        output += `<div class= "col-12" >
                        ${publisherIcon} - <span class="themeButtons" searid="${searchLine.sear_id}" style="color:#8B2331;cursor: pointer"><b>${searchLine.sear_label}</b></span>  <span style="color:#eff2f2"> (${searchLine.sear_type})</span>  </br >
                        ${searchLine.sear_moreinfo}...
                        </div > `;
                        break

                    case 34: // genre
                        output += `<div class= "col-12" >
                        ${publisherIcon} - <span class="genreButtons" searid="${searchLine.sear_id}" style="color:#8B2331;cursor: pointer"><b>${searchLine.sear_label}</b></span>  <span style="color:#eff2f2"> (${searchLine.sear_type})</span>  </br >
                        ${searchLine.sear_moreinfo}...
                        </div > `;
                        break

                    case 35: // doctype
                        output += `<div class= "col-12" >
                        ${publisherIcon} - <span class="doctypeButtons" searid="${searchLine.sear_id}" style="color:#8B2331;cursor: pointer"><b>${searchLine.sear_label}</b></span>  <span style="color:#eff2f2"> (${searchLine.sear_type})</span>  </br >
                        ${searchLine.sear_moreinfo}...
                        </div > `;
                        break

                    case 36: // matt type
                        output += `<div class= "col-12" >
                        ${publisherIcon} - <span class="mattypeButtons" searid="${searchLine.sear_id}" style="color:#8B2331;cursor: pointer"><b>${searchLine.sear_label}</b></span>  <span style="color:#eff2f2"> (${searchLine.sear_type})</span>  </br >
                        ${searchLine.sear_moreinfo}...
                        </div > `;
                        break

                    case 37: // collection
                        output += `<div class= "col-12" >
                        ${publisherIcon} - <span class="collectionButtons" searid="${searchLine.sear_id}" style="color:#8B2331;cursor: pointer"><b>${searchLine.sear_label}</b></span>  <span style="color:#eff2f2"> (${searchLine.sear_type})</span>  </br >
                        ${searchLine.sear_moreinfo}...
                        </div > `;
                        break
                    default:
                        output += `<div class= "col-12" >
                        ${questionIcon} - <span>${searchLine.sear_label}</span> - (${searchLine.sear_type}) </br >
                        ${searchLine.sear_moreinfo ? searchLine.sear_moreinfo : ''} 
                        </div > `;

                }
                output += `</div > <hr />`;
            });
            output += '</div>';
        }
        // *** Display search content
        document.querySelector("#" + htlmPartId).innerHTML = output;


        // *** Add actions 
        addMultipleEnventListener(".bookButtons", function (event) {
            window.location.href = `${getAppPath()}/views/notice/notice.html?noticeID=` + event.currentTarget.getAttribute('searid');
        });

        addMultipleEnventListener(".personButtons", function (event) {
            window.location.href = `${getAppPath()}/views/person/person.html?personID=` + event.currentTarget.getAttribute('searid');
        });

        addMultipleEnventListener(".keywordButtons", function (event) {
            window.location.href = `${getAppPath()}/views/keyword/keyword.html?keywordID=` + event.currentTarget.getAttribute('searid');
        });

        addMultipleEnventListener(".printerButtons", function (event) {
            window.location.href = `${getAppPath()}/views/simpleentity/simpleentity.html?simpleEntityID=` + event.currentTarget.getAttribute('searid') + `&simpleEntitytype=12`;
        });

        addMultipleEnventListener(".publisherButtons", function (event) {
            window.location.href = `${getAppPath()}/views/simpleentity/simpleentity.html?simpleEntityID=` + event.currentTarget.getAttribute('searid') + `&simpleEntitytype=13`;
        });

    } catch (error) {
        document.querySelector("#messageSection").innerHTML = `<div class="alert alert-danger" style = "margin-top:30px" role = "alert" > ${error}</div > `;
    }
}
