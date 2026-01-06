import { loadTranslations, getCurrentLanguage } from '../../shared/services/translationService.js'
// import { getLanguages } from '../yesheServices/yesheLanguageService.js'
import { loadList } from '../../shared/yesheServices/yesheListsService.js'
import { getConfigurationFromJson } from '../../shared/services/configurationService.js'

/**
 * 
 */
export async function launchInitialisation() {

    await getConfigurationFromJson();
    await loadTranslations();
    await loadList('bdd_language');
    await loadList('bdd_doc_type');
    await loadList('bdd_genre_type');
    await loadList('bdd_theme_type');
    // await loadList('mattype');
}

