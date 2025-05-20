/**
 *  Do some initialisation
 *  and open the main view
 * 
 */
import { loadTranslations, getCurrentLanguage } from './services/translationService.js'
import { getLanguages } from './services/languageService.js'


import { launchApp } from './views/mainpage/mainpageViewController.js';



/*** Initailisations */
await loadTranslations();
getLanguages();


// function wait(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }

// // Example usage:
// async function example() {
//     console.log("Waiting...");
//     await wait(10000);
//     console.log("Waited for 2 seconds!");
// }

// example();

console.log(" Current language : " + getCurrentLanguage());

launchApp("#mainActiveSection", function (response, status, xhr) {
    //  console.log("Done load");
    if (status == "error") {
        var msg = "Sorry but there was an error: ";
        $("#error").html(msg + xhr.status + " " + xhr.statusText);
        console.log(msg);
    }
});
