import { getwsUrlformel } from '../../shared/services/configurationService.js';

/**
 * 
 * @param {*} searchString 
 * @param {*} mode 
 * @param {*} callback 
 * @returns search list 
 */
export async function getSearch(searchString, mode) {

    var wsUrl = getwsUrlformel() + `searchAdvanced/${mode}/${searchString}`;
    let responseWS = await fetch(wsUrl);

    if (responseWS.ok) {
        // *** Get the data and save in the localstorage
        if (responseWS.status === 500)
            throw new Error("Trop de résultats, raffinez votre recherche");
        const data = await responseWS.json();
        // console.log(("getSearch Service  ok"))
        return data.content;
    } else {
        console.log(`getSearch nothing to return`);
        throw new Error("Trop de résultats, raffinez votre recherche");
    }

}
