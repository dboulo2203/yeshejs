import { wsUrlformel } from '../shared/assets/constants.js';

/**
 * 
 * @param {*} noticeId 
 * @param {*} callback 
 */
export function getNotice(noticeId, callback) {

    console.log("getNotice Service start");
    var wsUrl = wsUrlformel + `notice/${noticeId}`;
    var jqxhr = $.ajax(`${wsUrl}`)
        .done(function (data) {
            console.log("get notice ok");
            callback(data.content);
        })
        .fail(function (xhr, err) {
            console.log("getNotice error :" + JSON.stringify(xhr));
        })
        .always(function () {
        });
}

/**
 * 
 * @param {*} noticeId 
 * @param {*} callback 
 */
export function getNoticeExtract(noticeId, callback) {

    console.log("getNotice noticeextract Service");
    var wsUrl = wsUrlformel + `noticeextract/${noticeId}`;
    var jqxhr = $.ajax(`${wsUrl}`)
        .done(function (data) {
            console.log("get notice noticeextract ok");
            callback(data.content);
        })
        .fail(function (xhr, err) {
            console.log("get notice noticeextract error : " + JSON.stringify(xhr));
        })
        .always(function () {

        });

}



