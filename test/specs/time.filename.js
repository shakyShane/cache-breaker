var index = require('../../index');

var sinon  = require('sinon');
var assert = require('chai').assert;

describe('Adding to a file name', function () {
    var clock;
    beforeEach(function () {
        clock = sinon.useFakeTimers();
    });
    afterEach(function () {
        clock.restore();
    });
    it('single 1', function () {

        clock.tick(123);

        var test     = '<link href="/css/style.css" />';
        var actual   = index.breakCache(test, 'style.css', {position: 'filename'});
        var expected = '<link href="/css/style.123.css" />';

        assert.equal(actual, expected);
    });
    it('single 2', function () {

        clock.tick(123);

        var test     = '<link href="/css/style.min.css" />';
        var actual   = index.breakCache(test, 'style.min.css', {position: 'filename'});
        var expected = '<link href="/css/style.min.123.css" />';

        assert.equal(actual, expected);
    });
    it('multiple 1', function () {

        clock.tick(123);

        var test     = '<link href="/css/style.min.css" /><link href="/css/style2.min.css" />';
        var actual   = index.breakCache(test, ['style.min.css', 'style2.min.css'], {position: 'filename'});
        var expected = '<link href="/css/style.min.123.css" /><link href="/css/style2.min.123.css" />';

        assert.equal(actual, expected);
    });
    it('long url', function () {

        clock.tick(123);

        var test     = '<script src="http://www.website.com/js/dist/app.js"></script>';
        var actual   = index.breakCache(test, ['app.js'], {position: 'filename'});
        var expected = '<script src="http://www.website.com/js/dist/app.123.js"></script>';

        assert.equal(actual, expected);
    });
    it('should rewrite links with timestamps', function () {

        clock.tick(123);

        var test     = '<script src="http://www.website.com/js/dist/app.y4353453456.js"></script>';
        var actual   = index.breakCache(test, 'app.*.js', {position: 'overwrite'});
        var expected = '<script src="http://www.website.com/js/dist/app.123.js"></script>';

        assert.equal(actual, expected);
    });
    it('long url 2', function () {

        clock.tick(123);

        var test     = '<script src="http://www.website.com/js/dist/app.y4353453456.js"></script>';
        var actual   = index.breakCache(test, 'app.*.js', {position: 'overwrite'});
        var expected = '<script src="http://www.website.com/js/dist/app.123.js"></script>';

        assert.equal(actual, expected);
    });
    it('multiple, when only 1 should be overwritten', function () {

        clock.tick(123);

        var test     = '<script src="/app.1234.js"></script><link href="/styles/core.min.2323.css"/>';
        var actual   = index.breakCache(test, ['app.*.js', 'core.min.*.css'], {position: 'overwrite'});
        var expected = '<script src="/app.123.js"></script><link href="/styles/core.min.123.css"/>';

        assert.equal(actual, expected);
    });
});