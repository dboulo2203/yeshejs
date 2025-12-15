export function routerOld() {
    try {
        // *** Router function for the old links to notices and persons
        if (window.location.href.includes("#")) {
            // throw new Error("with #, Direct url must have a special treatment " + window.location.href);
            let splittedPath = window.location.href.split("/");
            let index = splittedPath.indexOf("#");
            if (index > 0 && splittedPath.length >= index + 2) {
                if (splittedPath[index + 1] === 'notice')
                    window.location.href = `./views/notice/notice.html?noticeID=${splittedPath[index + 2]}`;
                else if (splittedPath[index + 1] === 'keyword') {
                    window.location.href = `./views/keyword/keyword.html?keywordAliasID=${splittedPath[index + 2]}`;
                } else if (splittedPath[index + 1] === 'person') {
                    window.location.href = `./views/person/person.html?personAliasID=${splittedPath[index + 2]}`;
                }
                else
                    throw new Error("URL with #, Direct url malformed " + window.location.href);
            } else {
                throw new Error("URL with #, Direct url malformed " + window.location.href);
            }
        } else {
            window.location.href = `./views/mainpage/mainpage.html`
        }
    } catch (error) {
        document.querySelector("#messageSection").innerHTML = `<div class="alert alert-danger" style = "margin-top:50px" role = "alert" > ${error}</div > `;
    }
}