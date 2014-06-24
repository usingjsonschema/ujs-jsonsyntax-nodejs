/**
 * Unit tests for jsonSyntax
 * 
 * Note that the read error (code = 3) is not tested since artificially
 * generating a read error (e.g. disabling read file permissions) is not
 * consistent across operating systems.
 */

var assert = require ("assert");
var fs = require ("fs");
var path = require ("path");
var syntax = require ("../lib/jsonSyntax");

// get path to test directory for location of test files
var path = path.join (path.dirname (fs.realpathSync (__filename)));

var fn = null;
describe ("syntax", function () {
    describe ("with valid file and JSON to check", function () {
        it ("does not throw exception", function () {
            assert.doesNotThrow (function () {
                syntax.checkSyntax (path + "/valid.json");
            }, syntax.CheckSyntaxError);
        });
    });
    describe ("with invalid file name (null)", function () {
        it ("throws exception with code 2", function () {
            fn = function () { syntax.checkSyntax (null); };
            assert.throws (fn, function (e) {
                if (e instanceof syntax.CheckSyntaxError) {
                    if (e.code === 1) {
                        return (true);
                    }
                }
                return (false);
            });
        });
    });
    describe ("file does not exist", function () {
        it ("throws exception with code 1", function () {
            fn = function () { syntax.checkSyntax (path + "/nofile.json"); };
            assert.throws (fn, function (e) {
                if (e instanceof syntax.CheckSyntaxError) {
                    if (e.code === 2) {
                        return (true);
                    }
                }
                return (false);
            });
        });
    });
    describe ("with valid file, invalid JSON to check", function () {
        it ("throws exception with code 3", function () {
            fn = function () { syntax.checkSyntax (path + "/invalid.json"); };
            assert.throws (fn, function (e) {
                if (e instanceof syntax.CheckSyntaxError) {
                    if (e.code === 4) {
                        return (true);
                    }
                }
                return (false);
            });
        });
    });
});
