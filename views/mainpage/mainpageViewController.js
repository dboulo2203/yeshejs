
import { launchInitialisation } from '../../shared/appservices/initialisationService.js'
import { headerViewDisplay } from '../../shared/appservices/headerViewCont.js'
import { searchViewDisplay } from '../../shared/appservices/searchViewCont.js'
import { footerViewDisplay } from '../../shared/appservices//footerViewCont.js'

// *** shared services
import { getAppPath } from '../../shared/services/commonFunctions.js'

// *** Menu string
const mainStringPage = ` 
           <img src="${getAppPath()}/shared/assets/main_picture.jpg" width="100%">
`;

export async function startMainPageController() {

  try {
    // *** Init app
    await launchInitialisation();

    // *** Display menu
    headerViewDisplay("#menuSection");
    searchViewDisplay("#searchSection");
    document.querySelector("#mainActiveSection").innerHTML = mainStringPage;
    footerViewDisplay("#footerSection");

  } catch (error) {
    document.querySelector("#messageSection").innerHTML = `<div class="alert alert-danger" style = "margin-top:50px" role = "alert" > ${error}</div > `;
  }
}
