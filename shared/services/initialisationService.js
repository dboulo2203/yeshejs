

import { loadTranslations, getCurrentLanguage } from '../services/translationService.js'
import { getLanguages } from '../yesheServices/yesheLanguageService.js'
import { getAppPath } from '../services/commonFunctions.js'

// *** API URL 
let wsUrlformel = "";

// *** Image URL
let imagePath = "";

export function getwsUrlformel() {
    return wsUrlformel;
}

export function getimagePath() {
    return imagePath;
}

/**
 * 
 */
export async function launchInitialisation() {

    await getConfigurationFromJson();
    await loadTranslations();
    await getLanguages();
}


//*** Application initialisation**************************** */
export async function getConfigurationFromJson() {
    // let configurationFile = "";

    // if (store.getState().globalListsReducer.configuration !== "")
    //     return;
    var wsUrl = `${getAppPath()}/shared/services/configuration.json`;
    let responsefr = await fetch(wsUrl);
    if (responsefr.ok) {
        // *** Get the data and save in the localstorage
        const data = await responsefr.json();
        imagePath = data.imagePath;
        wsUrlformel = data.wsUrlformel;

        console.log("getNotice   ok ");
        return (data);

    } else {
        console.log(`getNotice Error : ${JSON.stringify(responsefr)}`);
        throw new Error("getNotice Error message : " + responsefr.status + " " + responsefr.statusText);
    }
}


/**
 *
 */
// export async function launchMainComponent() {
//     window.location.href = `${getAppPath()}/views/mainpage/mainpage.html`;
// }
