// *** shared services
import { currentApplicationPath } from '../../shared/assets/constants.js'

// **** ???
import { headerViewDisplay } from '../components/headerViewCont.js'

// *** Menu string
const mainStringPage = ` 
            <div class="container-fluid"> 
            <img src="${currentApplicationPath}/shared/assets/main_picture.jpg" width="100%">
    </div>

`;

// TODO : Manage callback
export function launchApp(htlmPartId, callbackFunction) {

    // console.log(htlmPartId);
    // *** Display main page
    $(htlmPartId).html(mainStringPage);

    // *** Load header
    headerViewDisplay("#menuSection", null);



}
