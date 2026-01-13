import { getwsUrlformel } from '../../shared/services/configurationService.js';

/**
 * Load a person from the database, 
 * the person is saved in the sessionStorage
 * @param { } personId 
 * @param {*} callback 
 * @returns notice in JSON 
 */
export async function getSimpleEntity(simpleEntitydId, entityType) {

    var wsUrl = getwsUrlformel() + `${entityType}/${simpleEntitydId}`;
    let responsefr = await fetch(wsUrl);
    if (responsefr.ok) {
        // *** Get the data and save in the sessionStorage
        const data = await responsefr.json();
        // sessionStorage.setItem("printerd", JSON.stringify(data.content));

        return (data.content);

    } else {
        console.log(`get_${entityType}  Error : ${JSON.stringify(responsefr)}`);
        throw new Error(`get_${entityType}  Error message : ` + responsefr.status + ` ` + responsefr.statusText);
    }
}

/**
 * 
 * @param {*} personId 
 * @returns 
 */
export async function getSimpleEntitylinkedNotices(simpleEntitydId, entityType) {

    var wsUrl = getwsUrlformel() + `${entityType}/${simpleEntitydId}/linkednotices`;

    let responsefr = await fetch(wsUrl);

    if (responsefr.ok) {
        // *** Get the data and save in the sessionStorage
        const data = await responsefr.json();
        return (data.content);

    } else {
        console.log(`get${entityType}linkedNotices Error message : ` + responsefr.status + ` ` + responsefr.statusText);
        throw new Error(`get${entityType}linkedNotices Error message : ` + responsefr.status + ` ` + responsefr.statusText);
    }
}
