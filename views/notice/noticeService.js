import { wsUrlformel } from '../../shared/assets/constants.js';

/**
 * 
 * @param {*} noticeId 
 * @param {*} callback 
 */
export async function getNotice(noticeId) {

    console.log("getNotice Service start");

    var wsUrl = wsUrlformel + `notice/${noticeId}`;
    let responsefr = await fetch(wsUrl);
    if (responsefr.ok) {
        // *** Get the data and save in the localstorage
        const data = await responsefr.json();
        localStorage.setItem("notice", JSON.stringify(data.content));

        console.log("getNotice   ok ");
        return (data.content);

    } else {
        console.log(`getNotice Error : ${JSON.stringify(responsefr)}`);
        throw new Error("getNotice Error message : " + responsefr.status + " " + responsefr.statusText);
    }
}

/**
 * 
 * @param {*} noticeId 
 * @param {*} callback 
 */
export async function getNoticeExtract(noticeId) {

    console.log("getNoticeExtract Service start");
    var wsUrl = wsUrlformel + `noticeextract/${noticeId}`; let responsefr = await fetch(wsUrl);
    if (responsefr.ok) {
        // *** Get the data and save in the localstorage
        console.log("getNoticeExtract ok");
        const data = await responsefr.json();
        return (data.content);

    } else {
        console.log(`getNoticeExtract Error : ${JSON.stringify(responsefr)}`);
        throw new Error("getNoticeExtract Error message : " + responsefr.status + " " + responsefr.statusText);
    }

}



