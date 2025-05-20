import { addProductTobasket, getBasketLines, removeBasketLineService, addq10tyBasketLineService, addqtyBasketLineService, substractqtyBasketLineService, substract10qtyBasketLineService } from '../services/basketService.js'
// import { getCategoriesLevel1 } from '../services/productService.js';
import { displayCategoriesRender } from './categoriesViewCont.js';
// import { SUB10PICTO, ADD10PICTO, SUB1PICTO, ADD1PICTO, TRASHPICTO } from '../services/constants.js'
import { launchOrderController } from './orderViewCont.js';

export const basketPart = `

    <div class="row" >
        <div class="col-md-4 menu" style="padding:10px" id="categoryDisplay">

        </div>
        <div class="col-md-8 main" style="padding:10px" id="mainDisplay">
        </div>
    </div >
`;

/**
 * Main basket view function
 * - Display categories
 * - Display basket content
 * 
 * @param {*} htlmPartId 
 */
export function launchBasketController(htlmPartId) {

    // *** Display main part of the catalog screen
    document.getElementById(htlmPartId).innerHTML = basketPart;

    displayCategoriesRender("categoryDisplay");

    // *** Display basket component
    displayBasketContent('mainDisplay');



}

/**
 * 
 * @param {*} basketDisplay 
 */
function displayBasketContent(basketDisplay) {

    // *** Get the basket content from the Model
    let basketLines = getBasketLines();

    // *** Build the html string 
    let output = '';
    output += `<div ><p class="fs-5" style="color:#8B2331">Votre panier</p></div><hr/>
    <!-- <div class="row row-cols-1 row-cols-md-3 g-4"> -->`;

    basketLines.map((basketLine, index) => {
        output += `
            <div class="row align-items-center" id="basket-row">
                <div class="col-5" > 
                    ${basketLine.libelle} - (${basketLine.ref})
                </div>
                <div class="col-1">
                    <p class="text-end ">
                        ${0}€ 
                    </p>
                </div>
                <div class="col-1">
                    <p class="text-end ">
                        ${basketLine.qty}
                    </p>
                </div>
                <div class="col-5 float-start ">
                    <button class="btn btn-outline-secondary btn-md float-end removeBasketLine" basketId="`+ index + `" style="margin:2px" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        < path d = "M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                        </svg >
                    </button>
                    <button class="btn btn-outline-secondary btn-md float-end addq10tyBasketLine" basketId=${index}  style="margin:2px;" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708"/>
                        <path fill-rule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708"/>
                        </svg>
                    </button>
                    <button class="btn btn-outline-secondary btn-md float-end addqtyBasketLine" basketId=${index}  style="margin:2px;" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
                        </svg>
                    </button>
                    <button class="btn btn-outline-secondary btn-md float-end substractqtyBasketLine" basketId=${index}  style="margin:2px;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
                        </svg>
                    </button>
                    <button class="btn btn-outline-secondary btn-md float-end substract10qtyBasketLine" basketId=${index} style="margin:2px;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-left" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
                        <path fill-rule="evenodd" d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
                        </svg>                    </button>
                </div>
            </div>
        `;
    });
    output += `</br><hr/><button class="btn btn-secondary float-end" id="sendOrderButton" type="button">Finaliser la commande</button>`;

    // *** Display the HTML string
    document.getElementById(basketDisplay).innerHTML = output;

    // *** Add listener for the user events
    jQuery(".removeBasketLine").on("click", function (event) {
        console.log("removeBasketLine");
        removeBasketLineEvent($(this).attr('basketId'));
    });

    jQuery(".addq10tyBasketLine").on("click", function (event) {
        addq10tyBasketLineEvent($(this).attr('basketId'));
    });

    jQuery(".addqtyBasketLine").on("click", function (event) {
        addqtyBasketLineEvent($(this).attr('basketId'));
    });

    jQuery(".substractqtyBasketLine").on("click", function (event) {
        substractqtyBasketLineEvent($(this).attr('basketId'));
    });

    jQuery(".substract10qtyBasketLine").on("click", function (event) {
        substract10qtyBasketLineEvent($(this).attr('basketId'));
    });

    jQuery("#sendOrderButton").on("click", function (event) {
        launchOrderController(basketDisplay);
    });


}

/**
 ********   USER EVENTS MANAGEMENT  
 */

/**
 * Add a product line to the basket
 * @export
 * @param {*} productID 
 * @param {*} prodlabel 
 * @param {*} prodref 
 */
export function addProductToBasketEvent(productID, prodlabel, prodref) {
    addProductTobasket(productID, prodlabel, prodref);
}

/**
 * Remove a line from the basket
 * @param {*} lineId 
 */
function removeBasketLineEvent(lineId) {
    removeBasketLineService(lineId);
    displayBasketContent('mainDisplay');
    console.log("removeBasketLineEvent" + lineId);
}

/**
 * Add 10 to the qty of a basket line 
 * @param {*} lineId 
 */
function addq10tyBasketLineEvent(lineId) {
    console.log("addq10tyBasketLineEvent" + lineId);
    addq10tyBasketLineService(lineId);
    displayBasketContent('mainDisplay');
}

/**
 * Add 1 to the qty of a basket line
 * @param {*} lineId 
 */
function addqtyBasketLineEvent(lineId) {
    addqtyBasketLineService(lineId);
    displayBasketContent('mainDisplay');

    console.log("addqtyBasketLineEvent" + lineId);
}

/**
 * Substract  1 to the qty of a basket line
 * @param {*} lineId 
 */
function substractqtyBasketLineEvent(lineId) {
    substractqtyBasketLineService(lineId);
    displayBasketContent('mainDisplay');
    console.log("substractqtyBasketLineEvent" + lineId);
}

/**
 * Substract  10 to the qty of a basket line
 * @param {} lineId 
 */
function substract10qtyBasketLineEvent(lineId) {
    substract10qtyBasketLineService(lineId);
    displayBasketContent('mainDisplay');
    console.log("substract10qtyBasketLineEvent" + lineId);

}