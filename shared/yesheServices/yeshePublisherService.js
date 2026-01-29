import { getConfigurationValue } from '../services/configurationService.js';

/**
 * 
 * @param {*} searchName 
 * @returns 
 */
export async function getPublishersFromName(searchName) {

    var wsUrl = getConfigurationValue("wsUrlformel") + `publisher/${searchName}?searchType=publ_name`;
    let responsefr = await fetch(wsUrl);
    if (responsefr.ok) {
        const data = await responsefr.json();
        return (data.content);

    } else {
        console.log(`getPublishersFromName Error : ${JSON.stringify(responsefr)}`);
        throw new Error("getPublishersFromName Error message : " + responsefr.status + " " + responsefr.statusText);
    }


}

