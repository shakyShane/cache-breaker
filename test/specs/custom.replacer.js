var index = require('../../index');

var assert = require('chai').assert;

describe('Using a custom callback for creating the replacement', function () {

    var config;
    beforeEach(function () {
        config = {
            replacement: function () {
                return "shaneisawesome";
            }
        };
    });

    it('single 1', function () {

        var test     = '<link href="/css/style.css" />';
        var actual   = index.breakCache(test, 'style.css', config);

        var expected = '<link href="/css/style.css?rel=shaneisawesome" />';

        assert.equal(actual, expected);
    });

    it('single 1', function () {

        var test     = '<link href="/css/style.css" />';
        var actual   = index.breakCache(test, 'style.css', config);

        var expected = '<link href="/css/style.css?rel=shaneisawesome" />';

        assert.equal(actual, expected);
    });
    it('single 2', function () {

        config.replacement = function () {
            return 123456;
        };
        config.position = "filename";

        var test     = '<link href="/css/style.css" />';
        var actual   = index.breakCache(test, 'style.css', config);

        var expected = '<link href="/css/style.123456.css" />';

        assert.equal(actual, expected);
    });
    it('single 3', function () {

        config.replacement = function () {
            return 123456;
        };
        config.position = "overwrite";

        var test     = '<link href="/css/style.23232.css" />';
        var actual   = index.breakCache(test, 'style.*.css', config);

        var expected = '<link href="/css/style.123456.css" />';

        assert.equal(actual, expected);
    });
    it('multiple 1', function () {

        config.replacement = function () {
            return 123456;
        };

        config.position = "overwrite";

        var test     = '<link href="/css/style.23232.css" />\n<script src="http://example.com/js/app.min.23232.js?rel=2343"></script>';
        var actual   = index.breakCache(test, ['style.*.css', 'app.min.*.js'], config);

        var expected = '<link href="/css/style.123456.css" />\n<script src="http://example.com/js/app.min.123456.js?rel=2343"></script>';

        assert.equal(actual, expected);
    });
});