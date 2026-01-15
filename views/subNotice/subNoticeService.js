import { getConfigurationValue } from '../../shared/services/configurationService.js';

/**
 * 
 * @param {*} noticeId 
 * @param {*} callback 
 */
export async function getsubNotice(subNoticeId) {

    var wsUrl = getConfigurationValue("wsUrlformel") + `subnotice/${subNoticeId}`;
    let responsefr = await fetch(wsUrl);
    if (responsefr.ok) {
        // *** Get the data and save in the sessionStorage
        const data = await responsefr.json();
        sessionStorage.setItem("getsubNotice", JSON.stringify(data.content));

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

    var wsUrl = getConfigurationValue("wsUrlformel") + `noticeextract/${noticeId}`; let responsefr = await fetch(wsUrl);
    if (responsefr.ok) {
        // *** Get the data and save in the sessionStorage
        const data = await responsefr.json();
        return (data.content);

    } else {
        console.log(`getNoticeExtract Error : ${JSON.stringify(responsefr)}`);
        throw new Error("getNoticeExtract Error message : " + responsefr.status + " " + responsefr.statusText);
    }

}



