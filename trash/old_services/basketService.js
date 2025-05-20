import { BasketProduct } from '../app.js'


/**
 * 
 * @param {*} productId 
 */
export function addProductTobasket(productId, prodlabel, prodref) {

    let basketCopie = JSON.parse(window.localStorage.getItem('basketLines'));

    let newProduct = new BasketProduct(productId, prodlabel, prodref, 1);
    basketCopie.push(newProduct);

    window.localStorage.setItem('basketLines', JSON.stringify(basketCopie));
}

/**
 * 
 * @returns 
 */
export function getBasketLines() {

    let basketCopie = JSON.parse(window.localStorage.getItem('basketLines'));

    return basketCopie;

}

/**
 * 
 * @param {*} lineId 
 */
export function removeBasketLineService(lineId) {
    let basketCopie = JSON.parse(window.localStorage.getItem('basketLines'));

    basketCopie.splice(lineId, 1);

    window.localStorage.setItem('basketLines', JSON.stringify(basketCopie));
}

/**
 * 
 * @param {*} lineId 
 */
export function addq10tyBasketLineService(lineId) {
    let basketCopie = JSON.parse(window.localStorage.getItem('basketLines'));

    basketCopie[lineId].qty += 10;;

    window.localStorage.setItem('basketLines', JSON.stringify(basketCopie));
}

/**
 * 
 * @param {*} lineId 
 */
export function addqtyBasketLineService(lineId) {
    let basketCopie = JSON.parse(window.localStorage.getItem('basketLines'));

    basketCopie[lineId].qty += 1;;

    window.localStorage.setItem('basketLines', JSON.stringify(basketCopie));
}

/**
 * 
 * @param {*} lineId 
 */
export function substractqtyBasketLineService(lineId) {
    let basketCopie = JSON.parse(window.localStorage.getItem('basketLines'));

    if (basketCopie[lineId].qty > 1)
        basketCopie[lineId].qty -= 1;
    else
        basketCopie[lineId].qty = 0;;
    window.localStorage.setItem('basketLines', JSON.stringify(basketCopie));
}

/**
 * 
 * @param {*} lineId 
 */
export function substract10qtyBasketLineService(lineId) {
    let basketCopie = JSON.parse(window.localStorage.getItem('basketLines'));

    if (basketCopie[lineId].qty > 10)
        basketCopie[lineId].qty -= 10;
    else
        basketCopie[lineId].qty = 0;;

    window.localStorage.setItem('basketLines', JSON.stringify(basketCopie));
}
