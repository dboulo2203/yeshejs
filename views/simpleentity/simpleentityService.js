import { getwsUrlformel } from '../../shared/services/initialisationService.js';

/**
 * Load a person from the database, 
 * the person is saved in the localStorage
 * @param { } personId 
 * @param {*} callback 
 * @returns notice in JSON 
 */
export async function getSimpleEntity(simpleEntitydId, entityType) {

    //  console.log("getKeyword Service start");

    var wsUrl = getwsUrlformel() + `${entityType}/${simpleEntitydId}`;
    let responsefr = await fetch(wsUrl);
    if (responsefr.ok) {
        // *** Get the data and save in the localstorage
        const data = await responsefr.json();
        // localStorage.setItem("printerd", JSON.stringify(data.content));

        // console.log("getPrinter  await ok ");
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

    // console.log("getKeywordlinkedNotices Service start");

    var wsUrl = getwsUrlformel() + `${entityType}/${simpleEntitydId}/linkednotices`;

    let responsefr = await fetch(wsUrl);

    if (responsefr.ok) {
        // *** Get the data and save in the localstorage
        const data = await responsefr.json();

        //console.log("getPrinterlinkedNotices  await ok ");
        return (data.content);

    } else {
        //console.log(`getPrinterlinkedNotices Error : ${JSON.stringify(responsefr)}`);
        throw new Error(`get${entityType}linkedNotices Error message : ` + responsefr.status + ` ` + responsefr.statusText);
    }
}
