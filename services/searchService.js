import { wsUrlformel } from '../shared/assets/constants.js';

/**
 * 
 * @param {*} searchString 
 * @param {*} mode 
 * @param {*} callback 
 * @returns search list 
 */
export function getSearch(searchString, mode, callback) {

    // console.log("get Search start");
    console.log(wsUrlformel + "searchAdvanced/3/" + searchString);
    var wsUrl = wsUrlformel + "searchAdvanced/3/" + searchString;
    var jqxhr = $.ajax(`${wsUrl}`)
        .done(function (data) {
            console.log(("getSearch Service  ok"))
            callback(data.content);
        })
        .fail(function (xhr, err) {
            console.log(("getSearch Service  error" + err))
            console.log(JSON.stringify(xhr));
        })
        .always(function () {
        });

}
