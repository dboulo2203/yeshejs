import { getConfigurationValue } from '../../shared/services/configurationService.js';

/**
 * Load a person from the database, 
 * the person is saved in the sessionStorage
 * @param { } personId 
 * @param {*} callback 
 * @returns notice in JSON 
 */
export async function getKeyword(keywordId) {

    //console.log("getKeyword Service start");

    var wsUrl = getConfigurationValue("wsUrlformel") + `keyword/${keywordId}`;
    let responsefr = await fetch(wsUrl);
    if (responsefr.ok) {
        // *** Get the data and save in the sessionStorage
        const data = await responsefr.json();
        sessionStorage.setItem("keyword", JSON.stringify(data.content));

        //console.log("getKeyword  await ok ");
        return (data.content);

    } else {
        console.log(`getKeyword Error : ${JSON.stringify(responsefr)}`);
        throw new Error("getKeyword Error message : " + responsefr.status + " " + responsefr.statusText);
    }
}

/**
 * Load a keyword from its alias from the database, 
 * @param { } keywordId 

 * @returns notice in JSON 
 */
export async function getKeywordFromAliasID(keywordAliasId) {

    // console.log("getKeywordFromAliasID Service start");
    var wsUrl = getConfigurationValue("wsUrlformel") + `keyword/${keywordAliasId}/getByAlias`;
    let responsefr = await fetch(wsUrl);
    if (responsefr.ok) {
        // *** Get the data and save in the sessionStorage
        const data = await responsefr.json();
        // sessionStorage.setItem("keyword", JSON.stringify(data.content));

        //   console.log("getKeywordFromAliasID  await ok ");
        return (data.content);

    } else {
        console.log(`getKeywordFromAliasID Error : ${JSON.stringify(responsefr)}`);
        throw new Error("getKeywordFromAliasID Error message : " + responsefr.status + " " + responsefr.statusText);
    }


}
/**
 * Returns the person in the sessionStorage
 * @returns person
 */
export function getCurrentKeyword() {
    let keywordJson = sessionStorage.getItem("keyword");

    // *** Teste if person is null
    if (keywordJson)
        return JSON.parse(keywordJson);
    else
        return null;
}

/**
 * 
 * @param {*} keywordID 
 * @returns 
 */
export async function getKeywordAliases(keywordID) {

    console.log("getKeywordAliases Service start");

    var wsUrl = getConfigurationValue("wsUrlformel") + `keyword/${keywordID}/getAliases`;

    let responsefr = await fetch(wsUrl);

    if (responsefr.ok) {
        // *** Get the data and save in the sessionStorage
        const data = await responsefr.json();

        console.log("getKeywordAliases  await ok ");
        return (data.content);

    } else {
        console.log(`getKeywordAliases Error : ${JSON.stringify(responsefr)}`);
        throw new Error("getKeywordAliases Error message : " + responsefr.status + " " + responsefr.statusText);
    }

}

/**
 * 
 * @param {*} personId 
 * @returns 
 */
export async function getKeywordlinkedNotices(personId) {

    console.log("getKeywordlinkedNotices Service start");

    var wsUrl = getConfigurationValue("wsUrlformel") + `keyword/${personId}/linkednotices`;

    let responsefr = await fetch(wsUrl);

    if (responsefr.ok) {
        // *** Get the data and save in the sessionStorage
        const data = await responsefr.json();

        console.log("getKeywordlinkedNotices  await ok ");
        return (data.content);

    } else {
        console.log(`getKeywordlinkedNotices Error : ${JSON.stringify(responsefr)}`);
        throw new Error("getKeywordlinkedNotices Error message : " + responsefr.status + " " + responsefr.statusText);
    }
}

/**
 * Update the person
 * @param {*} person
 * @param {*} callback
 */
// export async function updatePerson(person) {

//     let wsUrl = wsUrlformel + `person/${person.conc_id}`;

//     console.log("updatePersonService start :2 " + wsUrl + " " + JSON.stringify(person));

//     let response = await fetch(wsUrl, {
//         method: "PUT",
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(person),
//         redirect: "follow"
//     });
//     if (response.ok) {
//         console.log("updatePersonService ok:");
//     } else {
//         console.log(`updatePersonService Error : ${JSON.stringify(response)}`);
//         throw new Error("updatePersonService Error message : " + response.status + " " + response.statusText);
//     }

// }

/**
 *
 * @param {*} person
 * @param {*} callback
 */
// export async function createPerson(person) {

//     let wsUrl = wsUrlformel + `person/0`;

//     console.log("createPerson Service start : " + wsUrl + JSON.stringify(person));
//     const myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/json");
//     myHeaders.append("Access-Control-Allow-Origin", "*");

//     let response = await fetch(wsUrl, {
//         method: "POST",
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(person),
//         redirect: "follow"
//     });
//     if (response.ok) {
//         console.log("createPerson ok:");
//     } else {
//         console.log(`createPerson Service Error : ${JSON.stringify(response)}`);
//         throw new Error("createPerson Service Error message : " + response.status + " " + response.statusText);
//     }

// }



export async function getKeywordsFromAliasName(searchName) {

    var wsUrl = getConfigurationValue("wsUrlformel") + `keywordAliases/${searchName}?searchType=coal_name`;
    let responsefr = await fetch(wsUrl);
    if (responsefr.ok) {
        const data = await responsefr.json();
        return (data.content);

    } else {
        console.log(`getKeywordsFromAliasName Error : ${JSON.stringify(responsefr)}`);
        throw new Error("getKeywordsFromAliasName Error message : " + responsefr.status + " " + responsefr.statusText);
    }
}
