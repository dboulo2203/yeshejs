import { getwsUrlformel } from '../../shared/services/configurationService.js';

/**
 * 
 * @param {*} noticeId 
 * @param {*} callback 
 */
export async function getNotice(noticeId) {

    var wsUrl = getwsUrlformel() + `notice/${noticeId}`;
    let responsefr = await fetch(wsUrl);
    if (responsefr.ok) {
        // *** Get the data and save in the localstorage
        const data = await responsefr.json();
        localStorage.setItem("notice", JSON.stringify(data.content));
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


export async function getAbstractFile(noticeId) {
    var wsUrl = getwsUrlformel() + `noticeextract/${noticeId}/sendfile`;
    let responsefr = await fetch(wsUrl);
    if (responsefr.ok) {
        // *** Get the data and save in the localstorage
        const data = await responsefr.json();
        return (data.content);

    } else {
        console.log(`getNoticeExtract Error : ${JSON.stringify(responsefr)}`);
        throw new Error("getNoticeExtract Error message : " + responsefr.status + " " + responsefr.statusText);
    }
}


export async function sendAbstractMail(noticeId, mail) {
    var wsUrl = getwsUrlformel() + `noticeextract/${noticeId}/sendmail/${mail}`;
    let responsefr = await fetch(wsUrl);
    if (responsefr.ok) {
        // *** Get the data and save in the localstorage
        const data = await responsefr.json();
        return (data.content);

    } else {
        console.log(`getNoticeExtract Error : ${JSON.stringify(responsefr)}`);
        throw new Error("getNoticeExtract Error message : " + responsefr.status + " " + responsefr.statusText);
    }


}


