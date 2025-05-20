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

// /**
//  * Returns person aliases
//  * @param {*} personId 
//  * @param {*} callback 
//  * @returns Aliases list(Json)
//  */
// export async function getPersonAliases(personId, callback) {

//     console.log("getPersonAliases Service start");
//     var wsUrl = wsUrlformel + `person/${personId}/getAliases`;
//     var jqxhr = $.ajax(`${wsUrl}`)
//         .done(function (data) {
//             console.log("getPersonAliases Service ok");
//             callback(data.content);
//         })
//         .fail(function (xhr, err) {
//             console.log(("getPersonAliases Service  error" + error))
//             console.log(JSON.stringify(xhr));
//         })
//         .always(function () {
//         });
// }

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
export async function updatePerson(person, callback) {

    let wsUrl = wsUrlformel + `person/${person.conc_id}`;

    console.log("updatePersonService start :2 " + wsUrl + " " + JSON.stringify(person));

    let response = await fetch(wsUrl, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(person),
        redirect: "follow"
    });
    if (response.ok) {
        console.log("updatePersonService ok:" + response);
        callback(response.text());
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
export async function createPerson(person, callback) {

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
        console.log("createPerson ok:" + response);
        callback(response.text());
    } else {
        console.log(`createPerson Service Error : ${JSON.stringify(response)}`);
        throw new Error("createPerson Service Error message : " + response.status + " " + response.statusText);
    }

}

// /**
//  * Update the person
//  * @param {*} person
//  * @param {*} callback
//  */
// export async function updatePerson(person, callback) {

//     let wsUrl = wsUrlformel + `person/${person.conc_id}`;

//     console.log("updatePersonService start :2 " + wsUrl + " " + JSON.stringify(person));
//     const myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/json");
//     myHeaders.append("Access-Control-Allow-Origin", "*");

//     const response = await fetch(wsUrl, {
//         method: "PUT",
//         headers: myHeaders,
//         body: JSON.stringify(person),
//         redirect: "follow"
//     })
//         .then((response) => response.text())
//         .then((result) => {
//             console.log("updatePersonService ok:" + result);
//             callback(result);
//         })
//         .catch((error) => {
//             console.log(("updatePersonService error" + error))
//             return false;
//         });
// }

// /**
//  *
//  * @param {*} person
//  * @param {*} callback
//  */
// export async function createPerson(person, callback) {

//     let wsUrl = wsUrlformel + `person/0`;

//     console.log("createPersonService start : " + wsUrl + JSON.stringify(person));
//     const myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/json");
//     myHeaders.append("Access-Control-Allow-Origin", "*");

//     const response = await fetch(wsUrl, {
//         method: "POST",
//         headers: myHeaders,
//         body: JSON.stringify(person),
//         redirect: "follow"
//     })
//         .then((response) => response.text())
//         .then((result) => {
//             console.log("createPersonService OK : Résultat du POST :" + result);
//             callback(result);
//         })
//         .catch((error) => {
//             console.log(("createPersonService Error : " + error))
//             return false;
//         });
// }
