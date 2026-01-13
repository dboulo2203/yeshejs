// import { getwsUrlformel } from '../../shared/services/initialisationService.js';

/**
 * 
 * @param {*} searchString 
 * @param {*} mode 
 * @param {*} callback 
 * @returns search list 
 */
export async function getSearch(searchString, mode) {

    var wsUrl = "https://catalogue.bibliotheque-dhagpo-kagyu.org/yeshe/api/" + `searchAdvanced/${mode}/${searchString}`;
    let responseWS = await fetch(wsUrl);

    if (responseWS.ok) {
        // *** Get the data and save in the sessionStorage
        if (responseWS.status === 500)
            throw new Error("Trop de résultats, raffinez votre recherche");
        const data = await responseWS.json();
        console.log(("getSearch Service  ok"))
        return data.content;
    } else {
        console.log(`getSearch nothing to return`);
        throw new Error("Trop de résultats, raffinez votre recherche");
    }

}
