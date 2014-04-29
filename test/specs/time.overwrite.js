var index = require('../../index');

var sinon  = require('sinon');
var assert = require('chai').assert;

describe("Over writing existing", function () {

    var clock;
    beforeEach(function () {
        clock = sinon.useFakeTimers();
    });
    afterEach(function () {
        clock.restore();
    });

    it('single', function () {

        clock.tick(123);

        var test     = '<script src="http://www.website.com/js/dist/app.y4353453456.js"></script>';
        var actual   = index.breakCache(test, 'app.*.js', {position: 'overwrite'});
        var expected = '<script src="http://www.website.com/js/dist/app.123.js"></script>';

        assert.equal(actual, expected);
    });
    it('single 2', function () {

        clock.tick(123);

        var test     = '<script src="js/dist/app.y4353453456.js"></script>';
        var actual   = index.breakCache(test, 'app.*.js', {position: 'overwrite'});
        var expected = '<script src="js/dist/app.123.js"></script>';

        assert.equal(actual, expected);
    });
    it('multiple 1', function () {

        clock.tick(123);

        var test     = '<script src="/app.1234.js"></script><link href="/styles/core.min.2323.css"/>';
        var actual   = index.breakCache(test, ['app.*.js', 'core.min.*.css'], {position: 'overwrite'});
        var expected = '<script src="/app.123.js"></script><link href="/styles/core.min.123.css"/>';

        assert.equal(actual, expected);
    });
    it('multiple 2', function () {

        clock.tick(123);

        var test     = '<script src="example.com/app.1234.js"></script><link href="example.com/styles/core.min.2323.css"/>';
        var actual   = index.breakCache(test, ['app.*.js', 'core.min.*.css'], {position: 'overwrite'});
        var expected = '<script src="example.com/app.123.js"></script><link href="example.com/styles/core.min.123.css"/>';

        assert.equal(actual, expected);
    });
});