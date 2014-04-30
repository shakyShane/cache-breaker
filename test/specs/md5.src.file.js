var index = require('../../index');

var assert = require('chai').assert;

// HASH = 2bd52f68d9

describe('Using a custom callback for creating the replacement', function () {

    var config;
    beforeEach(function () {
        config = {
            replacement: 'md5',
            src: {
                path: __dirname + "/../fixtures/dummy.txt"
            }
        };
    });

    it('single 1', function () {

        var test     = '<link href="/css/style.css" />';
        var actual   = index.breakCache(test, 'style.css', config);

        var expected = '<link href="/css/style.css?rel=2bd52f68d9" />';

        assert.equal(actual, expected);
    });
    it('single 2', function () {

        config.position = "filename";

        var test     = '<link href="/css/style.css" />';
        var actual   = index.breakCache(test, 'style.css', config);

        var expected = '<link href="/css/style.2bd52f68d9.css" />';

        assert.equal(actual, expected);
    });
    it('single 3', function () {

        config.position = "overwrite";

        var test     = '<link href="/css/style.r5432.css" />';
        var actual   = index.breakCache(test, 'style.*.css', config);

        var expected = '<link href="/css/style.2bd52f68d9.css" />';

        assert.equal(actual, expected);
    });
    it('multiple 1', function () {

        config.position = "overwrite";

        var test     = '<link href="/css/style.r5432.css" /><link href="/css/style2.r5432.css" />';
        var actual   = index.breakCache(test, ['style.*.css', 'style2.*.css'], config);

        var expected = '<link href="/css/style.2bd52f68d9.css" /><link href="/css/style2.2bd52f68d9.css" />';

        assert.equal(actual, expected);
    });
});