/** @module jsonSyntax */

/**
 * @fileOverview 
 * Read a file and determine if content is valid JSON syntax.<br/>
 * <br/>
 * Usage: jsonsyntax file<br/>
 * <ul style='list-style-type:none;'>
 *   <li>  file : JSON file to check syntax of</li>
 * </ul>
 * Exit code<br/>
 * <ul style='list-style-type:none;'>
 *   <li>0 : for success</li>
 *   <li>1 : for failure</li>
 * </ul>
 */

// file system module
var fs = require ("fs");

/**
 * Error definition thrown when an error occurs.
 * <ul style='list-style-type:none;'>
 *   <li>error code 1: Invalid name</li>
 *   <li>error code 2: File does not exist</li>
 *   <li>error code 3: Error reading file</li>
 *   <li>error code 4: JSON syntax error</li>
 * </ul>
 * @param {integer} code - Error number
 * @param {string} message - Text message, suitable for display
 */
function CheckSyntaxError (code, message)
{
    this.name = "CheckSyntaxError";
    this.code = code;
    this.message = message;
}

/**
 * Check syntax of file passed in command line argument.
 * 
 * @param {string} file - File to check
 * @throws {CheckSyntaxError}
 */
function checkSyntax (file) {
    "use strict";

    // verify file provided
    if ((file === null) || (file === undefined)) {
        throw new CheckSyntaxError (1, "Invalid name");
    }

    // verify file exists
    if (fs.existsSync (file) === false) {
        throw new CheckSyntaxError (2, "File not found");
    }

    // read specified file
    var data = null;
    try {
        data = fs.readFileSync (file);
    } catch (e) {
        throw new CheckSyntaxError (3, "Error reading file: " + e.message);
    }

    // parse the data as JSON
    try {
        JSON.parse (data);
    } catch (e) {
        throw new CheckSyntaxError (4, e.message);
    }
}

/**
 * Main - parse file name from command and call syntax check.
 */
function main () {
    "use strict";
    // if wrong number of arguments, print usage message and exit
    if (process.argv.length !== 3) {
        console.log ("Usage: jsonsyntax file");
        console.log ("  file   JSON file to check syntax of");
        process.exit (1);
    }

    // check syntax, displaying result message. Exit with success/fail code.
    try
    {
        var file = process.argv[2];
        checkSyntax (file);
        console.log ("File contains valid JSON content.");
        process.exit (0);
    } catch (e) {
        console.log ("Error: " + e.message);
        process.exit (1);
    }
}

// if module invoked directly, call main
if (require.main === module) {
    main ();
}

exports.main = main;
exports.CheckSyntaxError = CheckSyntaxError;
exports.checkSyntax = checkSyntax;
