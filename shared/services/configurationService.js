import { getAppPath } from './commonFunctions.js'
//*** Application initialisation**************************** */
export async function getConfigurationFromJson() {

    var wsUrl = `${getAppPath()}/shared/services/configuration.json`;
    let responsefr = await fetch(wsUrl);
    if (responsefr.ok) {
        // *** Get the data and save in the localstorage
        const data = await responsefr.json();
        localStorage.setItem("configuration", JSON.stringify(data));

        // console.log("getLogin  await ok ");
        return true;
        return (data);

    } else {
        console.log(`getConfigurationFromJson Error : ${JSON.stringify(responsefr)}`);
        throw new Error("getConfigurationFromJson Error message : " + responsefr.status + " " + responsefr.statusText);
    }
}


export function getwsUrlformel() {

    // *** Get the database according to the current language in the browser
    let frBase = localStorage.getItem("configuration");
    let base = JSON.parse(frBase);

    let foundIndex = Object.keys(base).indexOf("wsUrlformel");

    if (foundIndex >= 0)
        return (Object.values(base)[foundIndex]);
    else
        throw new Error("configuration getwsUrlformel not found")

}

export function getimagePath() {
    // *** Get the database according to the current language in the browser
    let frBase = localStorage.getItem("configuration");
    let base = JSON.parse(frBase);

    let foundIndex = Object.keys(base).indexOf("imagePath");

    if (foundIndex >= 0)
        return (Object.values(base)[foundIndex]);
    else
        throw new Error("configuration getimagePath not found")

}
