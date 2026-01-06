import { getwsUrlformel } from '../services/configurationService.js';

/**
 * Load a  list from the database and save it in the localStorage 
 */
export async function loadList(listName) {

    var wsUrl = getwsUrlformel() + `list/${listName}`;

    let responseWS = await fetch(wsUrl);

    if (responseWS.ok) {
        // *** Get the data and save in the localstorage
        const data = await responseWS.json();
        localStorage.setItem(listName, JSON.stringify(data.content));
        return true;
    } else {
        console.log(`loading ${listName} Error : }`);
        throw new Error("loading ${listName} Error : " + JSON.stringify(responseWS));
    }
}

/**
 * Return the List content (json string)
 * @returns 
 */
export function getList(listName) {
    let frBase = localStorage.getItem(listName);
    if (frBase)
        return JSON.parse(frBase);
    else
        return null;

}


export function getSelectFromDatabaseList(listName, entityID, entityName) {
    let outpuStr = ``;
    getList(listName).map((listentity, index) => {
        outpuStr += `<option value="${listentity[entityID]}">${listentity[entityName]}</option>`;
    });
    return outpuStr;
}
// export function getSelectFromDatabaseList(listName, selectID, entityID, entityName) {
//     let outpuStr = `
//       <div class="col" style="margin:2px">
//       <select class="form-select form-select-sm"  aria-label="Default select example" id="${selectID}">`;
//     getList(listName).map((listentity, index) => {
//         outpuStr += `<option value="${listentity[entityID]}">${listentity[entityName]}</option>`;
//     });
//     outpuStr += `
//         </select> </div>`;
//     return outpuStr;
// }
