import { DOLIBARRURL, DOLIKEY } from './constants.js';

export function getCategoriesLevel1(callback) {

    var jqxhr = $.ajax(`${DOLIBARRURL}categories?sortfield=t.rowid&sortorder=ASC&limit=100&sqlfilters=fk_parent%3A%3D%3A'1'&DOLAPIKEY=${DOLIKEY}`)
        .done(function (data) {
            // console.log("order call ok");
            //  document.getElementById(htmlPartId).innerHTML = displayOrderList(data);
            // e.log(data);
            callback(data);

        })
        .fail(function (xhr, err) {
            alert(JSON.stringify(xhr));
            // var responseTitle = $(xhr.responseText).filter('title').get(0);
            // alert($(responseTitle).text() + "\n" + formatErrorMessage(xhr, err));
        })
        .always(function () {
            // console.log("API order call complete");
        });

}

export function getCategoryContentList(categoryId, callback) {

    var jqxhr = $.ajax(`${DOLIBARRURL}categories/${categoryId}/objects?type=product&DOLAPIKEY=${DOLIKEY}`)
        .done(function (data) {
            callback(data);

        })
        .fail(function (xhr, err) {
            alert(JSON.stringify(xhr));
        })
        .always(function () {
            // console.log("API order call complete");
        });






} 