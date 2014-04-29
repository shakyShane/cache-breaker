var index = require('../../index');

var sinon  = require('sinon');
var assert = require('chai').assert;

describe('Appending with a query string', function () {
    var clock;
    beforeEach(function () {
        clock = sinon.useFakeTimers();
    });
    afterEach(function () {
        clock.restore();
    });
    it('should rewrite links with timestamps', function () {
        clock.tick(123);
        var test     = '<link href="/css/style.css" />';
        var actual   = index.addTimestamp(test, 'style.css');
        var expected = '<link href="/css/style.css?rel=123" />';

        assert.equal(actual, expected);
    });
    it('should rewrite links with Existing timestamps', function () {
        clock.tick(11122);
        var test     = '<link href="/css/style.css?rel=123" />';
        var actual   = index.addTimestamp(test, 'style.css');
        var expected = '<link href="/css/style.css?rel=11122" />';

        assert.equal(actual, expected);
    });
    it('should rewrite links with Existing timestamps', function () {
        clock.tick(11122);
        var test     = '<link href="/css/style.css?rel=123qwqwqw" />';
        var actual   = index.addTimestamp(test, 'style.css');
        var expected = '<link href="/css/style.css?rel=11122" />';

        assert.equal(actual, expected);
    });
    it('should rewrite links with timestamps (2)', function () {
        clock.tick(321);
        var test     = '<link href="/css/style.css" />';
        var actual   = index.addTimestamp(test, 'style.css');
        var expected = '<link href="/css/style.css?rel=321" />';

        assert.equal(actual, expected);
    });
    it('should rewrite links with timestamps (2)', function () {
        clock.tick(321);
        var test     = '<link href="style.css" />';
        var actual   = index.addTimestamp(test, 'style.css');
        var expected = '<link href="style.css?rel=321" />';

        assert.equal(actual, expected);
    });
    it('should rewrite links with timestamps (2)', function () {
        clock.tick(321);
        var test     = '<link href="/style.css" />';
        var actual   = index.addTimestamp(test, 'style.css');
        var expected = '<link href="/style.css?rel=321" />';

        assert.equal(actual, expected);
    });
    it('should rewrite Multiple links with timestamps (2)', function () {
        clock.tick(321);
        var test     = '<link href="/style.css" /><link href="/style2.css" />';
        var actual   = index.addTimestamp(test, 'style.css');
        var expected = '<link href="/style.css?rel=321" /><link href="/style2.css" />';

        assert.equal(actual, expected);
    });
    it('should rewrite Multiple links with timestamps (2)', function () {
        clock.tick(321);
        var test     = '<link href=\'/style.css\' /><link href="/style2.css" />';
        var actual   = index.addTimestamp(test, ['style.css', 'style2.css']);
        var expected = '<link href=\'/style.css?rel=321\' /><link href="/style2.css?rel=321" />';

        assert.equal(actual, expected);
    });
    it('should rewrite links with timestamps (2)', function () {
        clock.tick(321);
        var test     = '<script src="/js/dist/combined.min.js"></script>';
        var actual   = index.addTimestamp(test, 'combined.min.js');
        var expected = '<script src="/js/dist/combined.min.js?rel=321"></script>';

        assert.equal(actual, expected);
    });
});