// *** shared services
import { getAppPath } from '../../shared/services/commonFunctions.js'
import { launchInitialisation } from '../../shared/services/initialisationService.js'
import { headerViewDisplay } from '../../shared/services/headerViewCont.js'
import { searchViewDisplay } from '../../shared/services/searchViewCont.js'
import { footerViewDisplay } from '../../shared/services/footerViewCont.js'
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
    let output = "";

    // var isChrome = window.chrome;
    // if (isChrome)
    //   output += 'Chrome';
    // else
    //   output += 'pas Chrome - ';
    // if (window.visualViewport.width <= 576) {
    //   output += 'phone';
    // } else if (window.visualViewport.width <= 768) {
    //   output += 'tablet';
    // } else if (window.visualViewport.width <= 992) {
    //   output += 'laptop';
    // } else { // 1200
    //   output += 'desktop';
    // }
    // if (isChrome && window.visualViewport.width <= 576)
    //   throw new Error("Warning navigation on mobiles with Chome in portait mode is not optimised. Prefer either chrome in landscape mode or anoter browser");

    // document.querySelector("#footerSection").innerHTML = output + " : " + window.visualViewport.width;
  } catch (error) {
    document.querySelector("#messageSection").innerHTML = `<div class="alert alert-danger" style = "margin-top:50px" role = "alert" > ${error}</div > `;
  }
}
