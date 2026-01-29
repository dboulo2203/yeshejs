import { loadTranslations } from '../../shared/services/translationService.js'
import { loadList } from '../../shared/yesheServices/yesheListsService.js'
import { getConfigurationFromJson } from '../../shared/services/configurationService.js'
import { setTheme } from '../../shared/services/bootstrapTheme.js'
import { BlocTitleDisplay, StandardFieldDisplay, StandardFieldNotNullDisplay, DropdownChoice } from '../bootstrapServices/components.js'

/**
 * 
 */
export async function launchInitialisation() {

    await getConfigurationFromJson();
    setTheme();
    await loadTranslations();
    await loadList('bdd_language');
    await loadList('bdd_doc_type');
    await loadList('bdd_genre_type');
    await loadList('bdd_theme_type');
    await loadList('bdd_materiel_type');
    await loadList('bdd_exemplaire_owners');


    customElements.define('dob-bloctitle', BlocTitleDisplay);
    customElements.define('dob-stdfield', StandardFieldDisplay);
    customElements.define('dob-stdnotnullfield', StandardFieldNotNullDisplay);
    customElements.define('dob-dropdown', DropdownChoice);







}

