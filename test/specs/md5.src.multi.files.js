var index = require('../../index');

var assert = require('chai').assert;

// HASH dummy.txt  = 2bd52f68d9
// HASH dummy2.txt = 83135f90c4

describe('Using multiple paths with md5 for creating the replacement', function () {

    var config;
    beforeEach(function () {
        config = {
            replacement: 'md5',
            src: {
                path: [
                    __dirname + "/../fixtures/dummy.txt",
                    __dirname + "/../fixtures/dummy2.txt"
                ]
            }
        };
    });

    it('single ?rel', function () {

        var test     = '<link href="/css/style.css" />';
        var actual   = index.breakCache(test, 'style.css', config);

        var expected = '<link href="/css/style.css?rel=2bd52f68d9" />';

        assert.equal(actual, expected);
    });
    it('single filename', function () {

        config.position = "filename";

        var test     = '<link href="/css/style.css" />';
        var actual   = index.breakCache(test, 'style.css', config);

        var expected = '<link href="/css/style.2bd52f68d9.css" />';

        assert.equal(actual, expected);
    });
    it('single overwrite', function () {

        config.position = "overwrite";

        var test     = '<link href="/css/style.r5432.css" />';
        var actual   = index.breakCache(test, 'style.*.css', config);

        var expected = '<link href="/css/style.2bd52f68d9.css" />';

        assert.equal(actual, expected);
    });
    it('multiple files ?rel', function () {

        var test     = '<link href="/css/style.css" /><link href="/css/style2.css" />';
        var actual   = index.breakCache(test, ['style.css', 'style2.css'], config);

        var expected = '<link href="/css/style.css?rel=2bd52f68d9" /><link href="/css/style2.css?rel=83135f90c4" />';

        assert.equal(actual, expected);
    });
    it('multiple files filename', function () {

        config.position = "filename";

        var test     = '<link href="/css/style.css" /><link href="/css/style2.css" />';
        var actual   = index.breakCache(test, ['style.css', 'style2.css'], config);

        var expected = '<link href="/css/style.2bd52f68d9.css" /><link href="/css/style2.83135f90c4.css" />';

        assert.equal(actual, expected);
    });
    it('multiple files overwrite', function () {

        config.position = "overwrite";

        var test     = '<link href="/css/style.r5432.css" /><link href="/css/style2.r5432.css" />';
        var actual   = index.breakCache(test, ['style.*.css', 'style2.*.css'], config);

        var expected = '<link href="/css/style.2bd52f68d9.css" /><link href="/css/style2.83135f90c4.css" />';

        assert.equal(actual, expected);
    });
});
