import { wsUrlformel } from '../shared/assets/constants.js';

/**
 * Load the language list from the database
 * the languages list is saved in the localStorage 
 */
export function getLanguages() {

    console.log("getLanguages Service start");
    var wsUrl = wsUrlformel + `list/bdd_language`;
    var jqxhr = $.ajax(`${wsUrl}`)
        .done(function (data) {
            console.log("get languages ok");
            localStorage.setItem("languages", JSON.stringify(data.content));
        })
        .fail(function (xhr, err) {
            console.log(JSON.stringify(xhr));
        })
        .always(function () {
        });
}

/**
 * Return the language list (json string)
 * @returns 
 */
export function getLanguagesList() {
    let frBase = localStorage.getItem("languages");
    if (frBase)
        return JSON.parse(frBase);
    else
        return null;

}