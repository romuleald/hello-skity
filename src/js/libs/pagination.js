import getTpl from "../libs/gettpl";
/**
 *
 * @param tplPage {String}
 * @param tplPageSkip {String}
 * @param edgeLimit {Number}
 * @param aroundLimit {Number}
 * @returns {Object}
 */
var pagin = function (tplPage, tplPageSkip, edgeLimit = 1, aroundLimit = 2) {
    "use strict";
    return function (currentPage, totalPage) {
        let html = '';
        // let edgeLimit = 1;
        // let aroundLimit = 2;
        let isskip = false;
        // detect first last (edgLimit) and around current (aroundLimit)
        for (let i = 1; i <= totalPage; i++) {
            if (i > edgeLimit && i <= totalPage - edgeLimit && Math.abs(currentPage - i) > aroundLimit) {
                if (isskip) {
                    continue;
                }
                html += getTpl({}, tplPageSkip);
                isskip = true;
            }
            else {
                isskip = false;
                html += getTpl({active: i == currentPage ? 'active' : '', index: i}, tplPage);
            }
        }
        return html;
    };
};

export default pagin;