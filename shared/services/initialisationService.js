

import { loadTranslations, getCurrentLanguage } from '../services/translationService.js'
import { getLanguages } from '../services/languageService.js'
// import { currentApplicationPath } from '../assets/constants.js'
import { getAppPath } from '../functions/commonFunctions.js'
/**
 * 
 */
export async function launchInitialisation() {

    await loadTranslations();
    await getLanguages();
}

/**
 * 
 */
export async function launchMainComponent() {

    window.location.href = `${getAppPath()}/views/mainpage/mainpage.html`;

}
