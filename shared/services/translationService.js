
/**
 * Load the translation files in the localstorage
 * 
 * TODO : the function can load translations from languages
 */
export async function loadTranslations() {
    console.log("LoadTranslations start");

    try {
        const responsefr = await fetch('locales/fr/translation.json');
        const datafr = await responsefr.json();
        localStorage.setItem("frTranslation", JSON.stringify(datafr));
        console.log("LoadTranslations fr await ok ");

        const responseen = await fetch('locales/en/translation.json');
        const dataen = await responseen.json();
        localStorage.setItem("enTranslation", JSON.stringify(dataen));
        console.log("LoadTranslations en await  ok ");

    } catch (error) {
        console.log('There was an error', error);
    }
}

/**
 * Load the translation files in the localstorage
 * 
 * TODO : the function can load translations from languages
 */
// export function loadTranslationsv1() {
//     console.log("LoadTranslations start");
//     $.getJSON('locales/fr/translation.json', function (data) {
//         localStorage.setItem("frTranslation", JSON.stringify(data));
//         console.log("LoadTranslations fr ok ");

//     }).fail(function (xhr, err) {
//         console.log(" Error loading translation fr : " + JSON.stringify(xhr));
//     });

//     $.getJSON('locales/en/translation.json', function (data) {
//         localStorage.setItem("enTranslation", JSON.stringify(data));
//         console.log("LoadTranslations en ok ");

//     }).fail(function (xhr, err) {
//         console.log(" Error loading translation en : " + JSON.stringify(xhr));
//     });

// }

/**
 * Get the main language set in the browser
 * Some browser return the language with 4chararcter (en-US)
 * @returns 
 */
export function getCurrentLanguage() {
    let browserLanguage = window.navigator.userLanguage || window.navigator.language;
    if (browserLanguage.length > 2)
        browserLanguage = browserLanguage.substring(0, 2);
    return browserLanguage;
}

/**
 * Translate a string in the current browser language
 * @param {} wordToTranslate 
 * @returns 
 */
export function getTranslation(wordToTranslate) {

    // let listresult = null;
    // *** Get the database according to the current language in the browser
    let frBase = localStorage.getItem(getCurrentLanguage() + "Translation");

    //  frBase.map((language, index) => {
    //      console.log(language);
    //  });

    // *** Load the translation database

    //    const testAr = [10, 67, 12];
    //    let ret = testAr.find((element) => element > 10);
    let base = JSON.parse(frBase);

    let listentries = Object.entries(base);
    let listkeys = Object.keys(base);
    let listvalues = Object.values(base);
    // base.map((language, index) => {
    //     console.log(language);
    // });

    // const foundIndex = Object.keys(base).find((element) => `${element}` == wordToTranslate);
    let foundIndex = Object.keys(base).indexOf(wordToTranslate);

    let valeur = '';
    if (foundIndex >= 0)
        valeur = (Object.values(base)[foundIndex]);

    return valeur;

    // *** Search for the word    
    // console.log(frBase);
    // console.log(Object.entries(base));

    // try {
    //     if (base) {
    //         let listresult = Object.entries(base)
    //             .filter(([key, value]) => `${key}` == wordToTranslate) //has options
    //     } else {
    //         return ("Translation base not found");
    //     }

    //     if (listresult) {
    //         if (listresult[0])
    //             return (listresult[0][1])
    //         else {
    //             console.log("Translation not found : " + wordToTranslate);
    //             // console.log(" Translation base : " + JSON.stringify(base));
    //             return ("not found");
    //         }
    //     } else {
    //         console.log("Translation not found : " + wordToTranslate);
    //         // console.log(" Translation base : " + JSON.stringify(base));
    //         return ("not found");
    //     }
    // } catch (except) {
    //   return wordToTranslate + "E";
    // }

}



