# Syntax Checker for JSON

[![Build Status](https://travis-ci.org/usingjsonschema/ujs-jsonsyntax-nodejs.svg?branch=master)](https://travis-ci.org/usingjsonschema/ujs-jsonsyntax-nodejs)

The 'hello world' of JSON processing, ```jsonSyntax``` provides a library
to determine whether a file contains valid JSON syntax or not.

For command line/script use, a console message is displayed and the process
exits with 0 for success, 1 for failure.

## Command Line / Script Use
To run the syntax checker (command line or script), use the ```jsonsyntax```
command with a file name (path optional). For example, to check the file
```example.json```, use,

    jsonsyntax example.json

## Library Function Use
To use the syntax checker as a library function, call the ```syntaxCheck```
function in a try/catch block. For example,

    var checkSyntax = require ("jsonSyntax").checkSyntax;
    try {
        checkSyntax ("example.json");
        console.log ("Valid JSON file");
    } catch (e) {
        console.log ("Error: " + e.message);
    }

## Installation
The program can be installed using ```npm```, with the command,

    npm -g install ujs-jsonsyntax

Use of the ```-g``` parameter will install it in the global system repository,
allowing command line / script use from any location on the system.

## Project
```jsonsyntax``` is part of the [Using JSON Schema]
(http://usingjsonschema.github.io) project.

## License
MIT