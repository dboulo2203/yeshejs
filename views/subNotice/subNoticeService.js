import { getwsUrlformel } from '../../shared/services/initialisationService.js';

/**
 * 
 * @param {*} noticeId 
 * @param {*} callback 
 */
export async function getsubNotice(subNoticeId) {

    var wsUrl = getwsUrlformel() + `subnotice/${subNoticeId}`;
    let responsefr = await fetch(wsUrl);
    if (responsefr.ok) {
        // *** Get the data and save in the localstorage
        const data = await responsefr.json();
        localStorage.setItem("getsubNotice", JSON.stringify(data.content));

        return (data.content);

    } else {
        console.log(`getsubNotice Error : ${JSON.stringify(responsefr)}`);
        throw new Error("getsubNotice Error message : " + responsefr.status + " " + responsefr.statusText);
    }
}

/**
 * 
 * @param {*} noticeId 
 * @param {*} callback 
 */
export async function getNoticeExtract(noticeId) {

    var wsUrl = getwsUrlformel() + `noticeextract/${noticeId}`; let responsefr = await fetch(wsUrl);
    if (responsefr.ok) {
        // *** Get the data and save in the localstorage
        const data = await responsefr.json();
        return (data.content);

    } else {
        console.log(`getNoticeExtract Error : ${JSON.stringify(responsefr)}`);
        throw new Error("getNoticeExtract Error message : " + responsefr.status + " " + responsefr.statusText);
    }

}



