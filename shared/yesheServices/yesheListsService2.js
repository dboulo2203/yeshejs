import { getConfigurationValue } from '../services/configurationService.js';

/**
 * Load a  list from the database and save it in the sessionStorage 
 */
export async function loadList(listName) {

    var wsUrl = getConfigurationValue("wsUrlformel") + `list/${listName}`;

    let responseWS = await fetch(wsUrl);

    if (responseWS.ok) {
        // *** Get the data and save in the sessionStorage
        const data = await responseWS.json();
        sessionStorage.setItem(listName, JSON.stringify(data.content));
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
    let frBase = sessionStorage.getItem(listName);
    if (frBase)
        return JSON.parse(frBase);
    else
        return null;

}

/**
 * Return the options part of the HTML select, Filled with the list data
 * @param {*} listName 
 * @param {*} entityID 
 * @param {*} entityName 
 * @param {*} addZeroOption 
 * @returns 
 */
export function getSelectFromDatabaseList(listName, entityID, entityName, addZeroOption) {
    let outpuStr = ``;
    if (addZeroOption)
        outpuStr += `<option value="0"></option>`;

    getList(listName).map((listentity, index) => {
        outpuStr += `<option value="${listentity[entityID]}">${listentity[entityName]}</option>`;
    });
    return outpuStr;
}

export function getSelectFromDatabaseListDropdown(listName, entityID, entityName, addZeroOption) {
    let outpuStr = ``;
    if (addZeroOption)
        outpuStr += `<li><a class="dropdown-item ${listName}_item" selectedId="0" selectedName=""> --- </a> </li>`;

    getList(listName).map((listentity, index) => {
        outpuStr += `<li><a class="dropdown-item ${listName}_item" selectedId="${listentity[entityID]}" selectedName="${listentity[entityName]}">${listentity[entityName]}</a></li>`;
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
