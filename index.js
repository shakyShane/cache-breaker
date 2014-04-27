"use strict";

/**
 * @param matcher
 * @returns {RegExp}
 */
exports._getRegex = function (matcher) {
    return new RegExp("(('|\")(.+?)?)("+matcher+")([\\w\\?=]*)('|\")", "g");
};

/**
 * @returns {string}
 */
exports._getReplacer = function () {
    return "$1$4?rel=%s$6".replace("%s", new Date().getTime().toString());
};

/**
 * @param {string} src
 * @param {string|array} matcher
 * @returns {string}
 */
exports.breakCache = function (src, matcher) {

    function replacer(src, match) {
        return src.replace(exports._getRegex(match), exports._getReplacer());
    }

    if (Array.isArray(matcher)) {
        matcher.forEach(function (match) {
            src = replacer(src, match);
        });
    } else {
        return replacer(src, matcher);
    }

    return src;

};