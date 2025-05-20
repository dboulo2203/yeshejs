export const catalogPart = `  
    <div class="row">
        <div class="col-md-4 menu" style="padding:10px" id="categoryDisplay">
        </div>
        <div class="col-md-8 main" style="padding:10px" id="mainDisplay">
        </div>
    </div>
`;

import { displayCategoriesRender } from './categoriesViewCont.js'

/**
 * Main catalog function 
 * @param {*} htlmPartId Display catalog in dom element with id = htlmPartId
 */
export function launchCatalogController(htlmPartId) {

    // *** Display main part of the catalog screen
    document.getElementById(htlmPartId).innerHTML = catalogPart;

    displayCategoriesRender("categoryDisplay");

}



