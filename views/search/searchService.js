import { getConfigurationValue } from '../../shared/services/configurationService.js';

/**
 * 
 * @param {*} searchString 
 * @param {*} mode 
 * @param {*} callback 
 * @returns search list 
 */
export async function getSearch(searchString, mode) {

    var wsUrl = getConfigurationValue("wsUrlformel") + `searchAdvanced/${mode}/${searchString}`;
    let responseWS = await fetch(wsUrl);

    if (responseWS.ok) {
        // *** Get the data and save in the sessionStorage
        if (responseWS.status === 500)
            throw new Error("Erreur lors de la recherche, sans doute trop de réponses" + responseWS.statusText);
        const data = await responseWS.json();
        return data.content;
    } else {
        console.log(`getSearch Erreur lors de la recherche` + responseWS.statusText);
        throw new Error("Erreur lors de la recherche, sans doute trop de réponses" + responseWS.statusText);
    }

}
