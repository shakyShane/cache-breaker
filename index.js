"use strict";

var path = require("path");

/**
 * @param {string} matcher
 * @param {string} position
 * @returns {RegExp}
 */
exports._getRegex = function (matcher, position) {

    function fullMatcher() {
        return new RegExp("(('|\")(.+?)?)("+matcher+")([\\w\\?=]*)('|\")", "g");
    }

    /**
     * @type {{overwrite: overwrite, filename: fullMatcher, append: fullMatcher}}
     */
    var regexs = {
        overwrite: function () {

            var split  = matcher.split("*");
            var before = "(%s)".replace("%s", split[0]);
            var after  = "(%s)".replace("%s", split[1]);

            return new RegExp(before + "(?:.+?)" + after);

        },
        filename: fullMatcher,
        append: fullMatcher
    };

    if (regexs[position]) {
        return regexs[position]();
    }
};

/**
 * @returns {string}
 */
exports._getReplacer = function (type) {

    function replace (string) {
        var timestamp = new Date().getTime().toString();
        return string.replace("%time%", timestamp);
    }

    var templates = {
        append: replace("$1$4?rel=%time%$6"),
        filename: function () {
            var start = arguments[1];
            var end   = arguments[6];
            var match = arguments[4];
            var file  = path.basename(match).split(".");
            var ext   = file.pop();
            return replace(start + file.join(".") + ".%time%." + ext + end);
        },
        overwrite: replace("$1%time%$2")
    };

    return templates[type]
};

/**
 * @param {string} src
 * @param {string|array} matcher
 * @param {object} [config]
 * @returns {string}
 */
exports.addTimestamp = function (src, matcher, config) {

    if (!config) {
        config = {
            position: "append",
            overwrite: false
        };
    }

    function replacer(src, match) {
        var replacer = exports._getReplacer(config.position);
        return src.replace(exports._getRegex(match, config.position), replacer);
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