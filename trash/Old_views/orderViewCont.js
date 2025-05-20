
import { getBasketLines } from '../services/basketService.js'
import { displayModaleAndFunctions } from './confirmModalViewCont.js'
/**
 * Main catalog function 
 * @param {*} htlmPartId Display catalog in dom element with id = htlmPartId
 */
export function launchOrderController(htlmPartId) {

    // *** Display main part of the catalog screen
    // document.getElementById(htlmPartId).innerHTML = catalogPart;

    displayOrderForm(htlmPartId);

    //    jQuery("#validOrder").on("click", function (event) {
    // let orderForm = document.forms.orderForm;
    // let username = orderForm.elements.userName.value;
    // let password = orderForm.elements.inputPassword4.value;
    // console.log("Submit Order : " + username + ", " + password);
    // // createOrder(username, password);
    // let message = `<div class='alert class='alert alert-success' role='alert'>
    //    Votre commande a été envoyée.La référence de la commande </div>`;
    // jQuery("#messageSection").html(message);
    //    });

    jQuery("#orderFormid").on("submit", function (event) {
        // alert("Handler for `submit` called.");
        event.preventDefault(); // Prevent the default form submission
        let orderForm = document.forms.orderForm;
        let username = orderForm.elements.userName.value;
        let password = orderForm.elements.inputPassword4.value;
        console.log("Submit Order : " + username + ", " + password);

        // *** Confirm order creation
        displayModaleAndFunctions(htlmPartId, function (status) {
            if (status == true) {
                // *** Display succefull message
                let message = `<div class="alert alert-success" role="alert">
                  Votre commande a été envoyée.</br> ${JSON.stringify(getBasketLines())}</div>`;
                jQuery("#" + htlmPartId).html(message);

            } else {
                console.log("Modale non validée");
            }
        });
        // createOrder(username, password);


    });
}

function displayOrderForm(htlmPartId) {
    let output = `
            <div><p class="fs-5">Saisissez vos coordonnées</p></div><hr/>
                <form name="orderForm" id ="orderFormid" class="row g-3" method="POST" >
                    <!-- <input type = "hidden" name = "action" value = "createorder" > --> 
                    <div class="col-md-6">
                        <label for="userName" class="form-label">user name</label>
                        <input type="text" class="form-control" name="userName" required>
                    </div>

                    <div class="col-md-6">
                        <label for="inputPassword4" class="form-label">Password</label>
                        <input type="password" class="form-control" name="inputPassword4" required>
                    </div>

                    <div class="col-12">
                        <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="gridCheck" required>
                        <label class="form-check-label" for="gridCheck">
                            Cliquez si vous êtes humain (Comme une captcha) ! 
                        </label>
                    </div>
                </div>

                <div class="col-12">
                    <button id="validOrder" class="btn btn-secondary btn-md float-end">Envoyer votre commande</button>
                </div>
            </form > 
            </div>`;

    // *** Display the html string 
    jQuery("#" + htlmPartId).html(output);

}

function createOrder(username, password) {

}