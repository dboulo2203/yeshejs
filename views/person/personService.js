import { wsUrlformel } from '../../shared/assets/constants.js';

/**
 * Load a person from the database, 
 * the person is saved in the localStorage
 * @param { } personId 
 * @param {*} callback 
 * @returns notice in JSON 
 */
export async function getPerson(personId) {

    console.log("getPerson Service start");

    var wsUrl = wsUrlformel + `person/${personId}`;
    let responsefr = await fetch(wsUrl);
    if (responsefr.ok) {
        // *** Get the data and save in the localstorage
        const data = await responsefr.json();
        localStorage.setItem("person", JSON.stringify(data.content));

        console.log("getPerson  await ok ");
        return (data.content);

    } else {
        console.log(`getPerson Error : ${JSON.stringify(responsefr)}`);
        throw new Error("getPerson Error message : " + responsefr.status + " " + responsefr.statusText);
    }
}

/**
 * Load a person from the database, 
 * the person is saved in the localStorage
 * @param { } personId 
 * @param {*} callback 
 * @returns notice in JSON 
 */
export async function getPersonFromAliasID(personAliasId, callback) {

    console.log("getPersonFromAliasID Service start");
    var wsUrl = wsUrlformel + `person/${personAliasId}/getByAlias`;
    let responsefr = await fetch(wsUrl);
    if (responsefr.ok) {
        // *** Get the data and save in the localstorage
        const data = await responsefr.json();
        // localStorage.setItem("person", JSON.stringify(data.content));

        console.log("getPersonFromAliasID  await ok ");
        return (data.content);

    } else {
        console.log(`getPersonFromAliasID Error : ${JSON.stringify(responsefr)}`);
        throw new Error("getPersonFromAliasID Error message : " + responsefr.status + " " + responsefr.statusText);
    }


}
/**
 * Returns the person in the localStorage
 * @returns person
 */
export function getCurrentPerson() {
    let personJson = localStorage.getItem("person");

    // *** Teste if person is null
    if (personJson)
        return JSON.parse(personJson);
    else
        return null;
}

/**
 * 
 * @param {*} personId 
 * @returns 
 */
export async function getPersonAliases(personId) {

    console.log("getPersonAliases Service start");

    var wsUrl = wsUrlformel + `person/${personId}/getAliases`;

    let responsefr = await fetch(wsUrl);

    if (responsefr.ok) {
        // *** Get the data and save in the localstorage
        const data = await responsefr.json();
        // localStorage.setItem("person", JSON.stringify(data.content));

        console.log("getPersonAliases  await ok ");
        return (data.content);

    } else {
        console.log(`getPersonAliases Error : ${JSON.stringify(responsefr)}`);
        throw new Error("getPersonAliases Error message : " + responsefr.status + " " + responsefr.statusText);
    }

}

/**
 * 
 * @param {*} personId 
 * @returns 
 */
export async function getlinkedNotices(personId) {

    console.log("getlinkedNotices Service start");

    var wsUrl = wsUrlformel + `person/${personId}/linkednotices`;

    let responsefr = await fetch(wsUrl);

    if (responsefr.ok) {
        // *** Get the data and save in the localstorage
        const data = await responsefr.json();
        // localStorage.setItem("person", JSON.stringify(data.content));

        console.log("getlinkedNotices  await ok ");
        return (data.content);

    } else {
        console.log(`getlinkedNotices Error : ${JSON.stringify(responsefr)}`);
        throw new Error("getlinkedNotices Error message : " + responsefr.status + " " + responsefr.statusText);
    }
}

/**
 * Update the person
 * @param {*} person 
 * @param {*} callback 
 */
export async function updatePerson(person) {

    let wsUrl = wsUrlformel + `person/${person.conc_id}`;

    console.log("updatePersonService start :2 " + wsUrl + " " + JSON.stringify(person));

    let response = await fetch(wsUrl, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(person),
        redirect: "follow"
    });
    if (response.ok) {
        console.log("updatePersonService ok:");
    } else {
        console.log(`updatePersonService Error : ${JSON.stringify(response)}`);
        throw new Error("updatePersonService Error message : " + response.status + " " + response.statusText);
    }

}

/**
 * 
 * @param {*} person 
 * @param {*} callback 
 */
export async function createPerson(person) {

    let wsUrl = wsUrlformel + `person/0`;

    console.log("createPerson Service start : " + wsUrl + JSON.stringify(person));
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Access-Control-Allow-Origin", "*");

    let response = await fetch(wsUrl, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(person),
        redirect: "follow"
    });
    if (response.ok) {
        console.log("createPerson ok:");
    } else {
        console.log(`createPerson Service Error : ${JSON.stringify(response)}`);
        throw new Error("createPerson Service Error message : " + response.status + " " + response.statusText);
    }

}