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


// export function getDropdownList(listName, entityID, entityName, addZeroOption, selectedId) {
//     let outpuStr = ``;
//     // if (addZeroOption)
//     //     outpuStr += `<li><a class="dropdown-item ${listName}_item" selectedId="0" selectedName=""> --- </a> </li>`;

//     outpuStr = `
//         <div class="form-group row" style="margin-bottom:5px">
//             <label for="exampleInputPassword1" class="col-sm-3 col-form-label" >
//                 <span id="delete_${listName}" style="cursor: pointer" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Remove"><i class="bi bi-x"></i></span>
//                 ${listName}
//             </label>
//             <div class="col-sm-9 ">
//                 <span class="dropdown-toggle" type="button" style="width:100%;border-bottom:solid 0.05rem #e9e8e8" type="button" data-bs-toggle="dropdown" id="${listName}_inputspan" selectedId=""> </span>
//                 <ul class="dropdown-menu" id="">
//                     ${getSelectFromDatabaseListDropdown(listName, entityID, entityName, addZeroOption, selectedId)}
//                 </ul >
//             </div >
//         </div >`;
//     return outpuStr;
// }

export function getSelectFromDatabaseListDropdown(listName, entityID, entityName, addZeroOption, selectedId) {
    let outpuStr = ``;
    if (addZeroOption)
        outpuStr += `<li><a class="dropdown-item ${listName}_item" selectedId="0" selectedName=""> --- </a> </li>`;

    getList(listName).map((listentity, index) => {
        if (listentity[entityID] == selectedId)
            outpuStr += `<li><a class="dropdown-item ${listName}_item active" selectedId="${listentity[entityID]}" selectedName="${listentity[entityName]}">${listentity[entityName]}</a></li>`;
        else
            outpuStr += `<li><a class="dropdown-item ${listName}_item" selectedId="${listentity[entityID]}" selectedName="${listentity[entityName]}">${listentity[entityName]}</a></li>`;
    });
    return outpuStr;
}


export function getDropdownList(listName, entityID, entityName, addZeroOption, selectedId) {
    let outpuStr = ``;
    // if (addZeroOption)
    //     outpuStr += `<li><a class="dropdown-item ${listName}_item" selectedId="0" selectedName=""> --- </a> </li>`;

    outpuStr = `
        <div class="form-group row" style="margin-bottom:5px">
            <label for="exampleInputPassword1" class="col-sm-3 col-form-label" >
                <span id="delete_${listName}" style="cursor: pointer" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Remove">
                <i class="bi bi-x"></i></span>
                ${listName}
            </label>
            <div class="col-sm-9 ">
                 
                    ${getSelectFromDatabaseListDropdownV2(listName, entityID, entityName, addZeroOption, selectedId)}
                
            </div >
        </div >`;
    return outpuStr;
}

export function getSelectFromDatabaseListDropdownV2(listName, entityID, entityName, addZeroOption, selectedId) {
    let outpuStr = `<ul class="dropdown-menu" id="">`;
    let selectedItem = null
    if (addZeroOption)
        outpuStr += `<li><a class="dropdown-item ${listName}_item" selectedId="0" selectedName=""> --- </a> </li>`;

    getList(listName).map((listentity, index) => {
        if (listentity[entityID] == selectedId)
            selectedItem = listentity;
        outpuStr += `<li><a class="dropdown-item ${listName}_item " selectedId="${listentity[entityID]}" selectedName="${listentity[entityName]}">${listentity[entityName]}</a></li>`;
    });
    outpuStr += '</ul >'
    if (selectedId) {
        if (selectedItem !== null)
            outpuStr += `<span class="dropdown-toggle" type="button" style="width:100%;border-bottom:solid 0.05rem #e9e8e8" type="button" 
    data-bs-toggle="dropdown" id="${listName}_inputspan" selectedId="${selectedItem[entityID]}">${selectedItem[entityName]} </span>`
        else
            outpuStr += `<span class="dropdown-toggle" type="button" style="width:100%;border-bottom:solid 0.05rem #e9e8e8" type="button" 
    data-bs-toggle="dropdown" id="${listName}_inputspan" selectedId=""> </span>`
    }
    return outpuStr;
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


// <!--  ${getDropdown("Genre", "bdd_genre_type", "genrt_id", "genrt_name", "inputGenre_span", deleteIcon, 3)}-->
// export function getDropdown(dropName, listName, itemID, itemName, spanId, icon, selectedId) {

//     return `<div class="form-group row" style="margin-bottom:5px">
//     <label for="exampleInputEmail1" class="col-sm-3 col-form-label">
//         <span id="" style="cursor: pointer" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Remove Genre selection"> ${icon}</span>
//         ${dropName}
//     </label>

//     <div class="col-sm-9 ">
//         <span class="dropdown-toggle" type="button" style="width:100%;border-bottom:solid 0.05rem #e9e8e8" type="button" data-bs-toggle="dropdown"
//          id="${spanId}" selectedId=""> </span>
//         <ul class="dropdown-menu" id="">
//             ${getSelectFromDatabaseListDropdown(listName, itemID, itemName, false, selectedId)}
//         </ul>
//     </div>
// </div>`;
// }

// export function selectDropdownitem(dropName, selectedId) {

// }

// export function addDropdownEvents(dropName) {

//     addMultipleEnventListener(".bdd_genre_type_item", function (event) {
//         document.querySelector("#inputGenre_span").innerHTML = event.target.attributes['selectedName'].nodeValue;
//         document.querySelector("#inputGenre_span").setAttribute("selectedId", event.target.attributes['selectedId'].nodeValue);
//     })

//     document.querySelector("#deleteGenreSelection").onclick = function () {
//         document.querySelector("#inputGenre_span").innerHTML = "";
//         document.querySelector("#inputGenre_span").setAttribute("selectedId", "")
//     }

//     if (document.querySelector("#inputGenre_span").attributes['selectedId'].nodeValue > 0)
//         multictri += '|genr:' + document.querySelector("#inputGenre_span").attributes['selectedId'].nodeValue;
// }