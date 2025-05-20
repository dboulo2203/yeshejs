

import { getCategoryContentList } from '../services/productService.js';
import { addProductToBasketEvent } from './basketViewCont.js';


/**
 * Main catalog function 
 * @param {*} htlmPartId 
 */
export function displayCategoryContentRender(htlmPartId) {

    // *** Display main part of the catalog screen
    // document.getElementById(htlmPartId).innerHTML = catalogPart;

    displayCategoryContentEvent($(this).attr('catId'), htlmPartId);

}

/**
 *  
 * @param {*} categoryId the category to be displayed
 */
export function displayCategoryContentEvent(categoryId, htmlPartId) {

    // console.log("displayCategoryContent");
    var output = `<div ><p class="fs-5" style="color:#8B2331">Produits de la catégorie </p></div><hr/>
    <div class="row row-cols-1 row-cols-md-3 g-4">`;

    // *** Get the product category list from the model and build the html string of the list
    getCategoryContentList(categoryId, function (categoryContentList) {
        categoryContentList.map((productContent) => {
            output += `
            <div class="col">
                <div class="card" >
                    <div class="card-body">
                        <h5 class="card-title"> ${productContent.label} </h5>
                    </div>
                    <div class="card-footer">
                        <button class="btn btn-light prodButtons" prodId="${productContent.id}" prodLibelle="${productContent.label}" prodref="${productContent.ref}" 
                        style="style="background: #FFFFFF;color:black;text-decoration: none;">Ajouter au panier</button>
                    </div>
                </div>
            </div>`;
        });

        output += `</div>`;

        // *** Display the htmll string 
        jQuery("#" + htmlPartId).html(output);

        // *** Add event listener
        jQuery(".prodButtons").on("click", function (event) {
            addProductToBasketEvent($(this).attr('prodId'), $(this).attr('prodLibelle'), $(this).attr('prodref'));
        });
    });

}


