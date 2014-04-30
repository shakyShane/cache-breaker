var index = require('../../index');

var assert = require('chai').assert;

// HASH = 7d6bc4c9c1

describe('Using an MD5 hash of content as the cache-breaker', function () {

    var config;
    beforeEach(function () {
        config = {
            replacement: 'md5',
            src: "ergwequnrqoi56"
        };
    });

    it('single 1', function () {

        var test     = '<link href="/css/style.css" />';
        var actual   = index.breakCache(test, 'style.css', config);

        var expected = '<link href="/css/style.css?rel=7d6bc4c9c1" />';

        assert.equal(actual, expected);
    });
    it('single 2', function () {

        config.position = 'filename';

        var test     = '<link href="/css/style.css" />';
        var actual   = index.breakCache(test, 'style.css', config);

        var expected = '<link href="/css/style.7d6bc4c9c1.css" />';

        assert.equal(actual, expected);
    });
    it('single 3', function () {

        config.position = 'overwrite';

        var test     = '<link href="/css/style.existing.css" />';
        var actual   = index.breakCache(test, 'style.*.css', config);

        var expected = '<link href="/css/style.7d6bc4c9c1.css" />';

        assert.equal(actual, expected);
    });
});