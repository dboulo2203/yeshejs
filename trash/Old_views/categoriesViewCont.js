
import { getCategoriesLevel1 } from '../services/productService.js';
import { displayCategoryContentEvent } from './categoryContentViewCont.js'

/**
 * Main categories view  function
 * Display the categories list in the DOm element
 * @param {*} htlmPartId : id of the dom element 
 */
export function displayCategoriesRender(htlmPartId) {

    // *** Display main part of the catalog screen
    // document.getElementById(htlmPartId).innerHTML = catalogPart;

    // *** Display category list
    getCategoriesLevel1(function (data) {
        var categoryListHtml = displayCategoriesHTML(data);
        // TODO: decide if the display is in the function
        jQuery("#" + htlmPartId).html(categoryListHtml);

        // *** Add listener for the Event :  display the category content
        jQuery(".catButtons").on("click", function (event) {
            displayCategoryContentEvent($(this).attr('catId'), "mainDisplay");

        });
    });
}

/**
 * Build HTML view of the categories list
 * @param {*} categorieList 
 * @returns string output 
  */
export function displayCategoriesHTML(categorieList) {

    var output = '<div ><p class="fs-5" style="color:#8B2331">Catégories</p></div><hr/>';

    categorieList.map((categorie) => {
        output += '<ul class="list-group">';
        output += `<button class="btn btn-light catButtons" catId="${categorie.id}" 
                style="style="background: #FFFFFF;color:black;text-decoration: none;"> ${categorie.label} </button>`;
        output += `</ul>`;
    });

    return output;
}


