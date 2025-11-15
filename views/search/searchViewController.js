// *** Component ressources
import { getSearch } from './searchService.js';

//***  shared ressources
import { currentApplicationPath, imagePath } from '../../shared/assets/constants.js'
import { bookIcon, personIcon, keyIcon, printerIcon, publisherIcon, questionIcon } from '../../shared/assets/constants.js'
import { addMultipleEnventListener } from '../../shared/functions/commonFunctions.js'
import { getTranslation } from '../../shared/services/translationService.js'
import { headerViewDisplay } from '../../shared/assets/components/global/headerViewCont.js'
import { launchInitialisation } from '../../shared/services/initialisationService.js'

export const searchPart = `
              <div class="col-md-12 main" style="padding:10px" id="resultDisplay">
     </div >
    `;

export async function startSearchController() {

    try {
        // *** Initialisations
        await launchInitialisation();
        headerViewDisplay("#menuSection");

    } catch (error) {
        document.querySelector("#messageSection").innerHTML = `<div class="alert alert-danger" style = "margin-top:30px" role = "alert" > ${error}</div > `;
    }

    // *** Get URL params
    const searchParams = new URLSearchParams(window.location.search);
    console.log(searchParams);

    // *** launch render
    if (searchParams.has('searchStr'))
        displaySearchContent("mainActiveSection", searchParams.get('searchStr'));
}

/**
 * Display a search result
 * @param {*} htlmPartId 
 * @param {*} searchString : the string to searched in the database 
 */
export async function displaySearchContent(htlmPartId, searchString) {

    // *** Build the html string 
    let output = '';

    try {
        output += `<div style="padding-top:20px"><p class="fs-5" style="color:#8B2331">${getTranslation("searchname")}</p></div><hr/>`;

        // *** Get data from API
        let searchLines = await getSearch(searchString, "3");

        // ** Display data
        if (searchLines && searchLines.length > 0) {
            searchLines.map((searchLine, index) => {
                output += `
                 <div class="row row-cols-1 row-cols-xs-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 row-cols-xl-2 " id = "search-row" > `;

                let sear_typeIcon = '';

                // *** Select icon and image dependding on the search type 
                // TODO : fill the other sear_type
                switch (searchLine.sear_type) {
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                        output += ` <div class="col-md-2 col-lg-2 col-xl-2" align = "center" > `;
                        if (searchLine.sear_image && searchLine.sear_image.length > 0) {
                            output += ` <img src = '${imagePath}/img/books/${searchLine.sear_image}' width = "100px" /> `;
                        }
                        output += `</div > `;
                        output += `<div class="col col-md-10 col-lg-10 col-xl-10" >
                        ${bookIcon} -  <span class="bookButtons" searid="${searchLine.sear_id}" style="color:#8B2331;cursor: pointer"><b>${searchLine.sear_label}</b></span> - <span style="color:#eff2f2"> (${searchLine.sear_type})</span> </br >
                            ${searchLine.sear_moreinfo}...
                                            </div > `;
                        break
                    case 10:
                        output += ` <div class="col-md-2 col-lg-2 col-xl-2" align = "center" > `;
                        if (searchLine.sear_image && searchLine.sear_image.length > 0) {
                            output += ` <img src = '${imagePath}/img/persons/${searchLine.sear_image}' width = "100px" /> `;
                        }
                        output += `</div > `;
                        output += `<div class="col col-md-10 col-lg-10 col-xl-10" >
                            ${personIcon} - <span class="personButtons" searid="${searchLine.sear_id}" style="color:#8B2331;cursor: pointer"><b>${searchLine.sear_label}</b></span> - <span style="color:#eff2f2"> (${searchLine.sear_type})</span>  </br >
                                ${searchLine.sear_moreinfo}...
                                            </div > `;
                        break
                    case 11:
                        output += ` <div class="col-md-2 col-lg-2 col-xl-2" align = "center" > `;
                        output += `</div > `;

                        output += `<div class="col col-md-10 col-lg-10 col-xl-10" >
                        ${keyIcon} -  <span class="keywordButtons" searid="${searchLine.sear_id}" style="color:#8B2331;cursor: pointer"><b>${searchLine.sear_label}</b></span> - <span style="color:#eff2f2"> (${searchLine.sear_type})</span>  </br >
                        ${searchLine.sear_moreinfo}...
                        </div > `;
                        break
                    case 12: // printer
                        output += ` <div class="col-md-2 col-lg-2 col-xl-2" align = "center" > `;
                        output += `</div > `;

                        output += `<div class="col col-md-10 col-lg-10 col-xl-10" >
                            ${printerIcon} -  <span class="printerButtons" searid="${searchLine.sear_id}" style="color:#8B2331;cursor: pointer"><b>${searchLine.sear_label}</b></span> - <span style="color:#eff2f2"> (${searchLine.sear_type})</span>  </br >
                                ${searchLine.sear_moreinfo}...
                                                </div > `;

                        break
                    case 13: // Publisher
                        output += ` <div class=<div class="col-md-2 col-lg-2 col-xl-2" align="center" >`;
                        output += `</div>`;

                        output += `<div class="col col-md-10 col-lg-10 col-xl-10" >
                            ${publisherIcon} -  <span class="publisherButtons" searid="${searchLine.sear_id}" style="color:#8B2331;cursor: pointer"><b>${searchLine.sear_label}</b></span> - <span style="color:#eff2f2"> (${searchLine.sear_type})</span>  </br >
                                ${searchLine.sear_moreinfo}...
                        </div > `;

                        break

                    default:
                        output += ` <div class="col-md-2 col-lg-2 col-xl-2" align = "center" > `;
                        output += `</div > `;

                        output += `<div class="col col-md-10 col-lg-10 col-xl-10" >
                            ${questionIcon} -  <span>${searchLine.sear_label}</span> - (${searchLine.sear_type}) </br >
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
        addMultipleEnventListener(".bookButtons", function () {
            window.location.href = `${currentApplicationPath}/views/notice/notice.html?noticeID=` + $(this).attr('searid');
        });

        addMultipleEnventListener(".personButtons", function () {
            window.location.href = `${currentApplicationPath}/views/person/person.html?personID=` + $(this).attr('searid') + ``;
        });

        addMultipleEnventListener(".keywordButtons", function () {
            window.location.href = `${currentApplicationPath}/views/keyword/keyword.html?keywordID=` + $(this).attr('searid') + ``;
        });


    } catch (error) {
        document.querySelector("#messageSection").innerHTML = `<div class="alert alert-danger" style = "margin-top:30px" role = "alert" > ${error}</div > `;
    }
}
