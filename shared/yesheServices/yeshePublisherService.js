import { getwsUrlformel } from '../services/configurationService.js';
// /**
//  * Load a person from the database, 
//  * the person is saved in the sessionStorage
//  * @param { } personId 
//  * @param {*} callback 
//  * @returns notice in JSON 
//  */
// export async function getPerson(personId) {

//     // console.log("getPerson Service start");

//     var wsUrl = getwsUrlformel() + `person/${personId}`;
//     let responsefr = await fetch(wsUrl);
//     if (responsefr.ok) {
//         // *** Get the data and save in the sessionStorage
//         const data = await responsefr.json();
//         sessionStorage.setItem("person", JSON.stringify(data.content));

//         // console.log("getPerson  await ok ");
//         return (data.content);

//     } else {
//         console.log(`getPerson Error : ${JSON.stringify(responsefr)}`);
//         throw new Error("getPerson Error message : " + responsefr.status + " " + responsefr.statusText);
//     }
// }



/**
 * 
 * @param {*} searchName 
 * @returns 
 */
export async function getPublishersFromName(searchName) {

    var wsUrl = getwsUrlformel() + `publisher/${searchName}?searchType=publ_name`;
    let responsefr = await fetch(wsUrl);
    if (responsefr.ok) {
        const data = await responsefr.json();
        return (data.content);

    } else {
        console.log(`getPublishersFromName Error : ${JSON.stringify(responsefr)}`);
        throw new Error("getPublishersFromName Error message : " + responsefr.status + " " + responsefr.statusText);
    }


}

