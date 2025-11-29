// *** shared services
import { currentApplicationPath } from '../../shared/assets/constants.js'
import { launchInitialisation } from '../../shared/services/initialisationService.js'
import { headerViewDisplay } from '../../shared/assets/components/global/headerViewCont.js'
import { searchViewDisplay } from '../../shared/assets/components/global/searchViewCont.js'
import { footerViewDisplay } from '../../shared/assets/components/global/footerViewCont.js'
// *** Menu string
const mainStringPage = ` 
            <div class="container-fluid" style="--bs-gutter-x:0rem">
           <img src="${currentApplicationPath}/shared/assets/main_picture.jpg" width="100%">
        
          </div>
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
    document.querySelector("#messageSection").innerHTML = `<div class="alert alert-danger" style = "margin-top:30px" role = "alert" > ${error}</div > `;
  }
}
