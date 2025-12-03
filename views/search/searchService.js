import { getwsUrlformel } from '../../shared/services/initialisationService.js';

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
        const data = await responseWS.json();
        console.log(("getSearch Service  ok"))
        return data.content;
    } else {
        console.log(`getSearch nothing to return`);
        return (null);
    }

}
