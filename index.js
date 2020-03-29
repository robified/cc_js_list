#!/usr/bin/env node

const fs = require('fs');

fs.readdir(process.cwd(), (error, filenames) => {
    // handle either the error or carry on
    if (error) {
        // the error handling code here
        console.log(error);
        // can either throw a new error or just stop
        // throw new Error(error);
        // return;
    }

    // how to solve this the incorrect way
    for (let filename of filenames) {
        fs.lstat(filename, (err, stats) => {
            if (err) {
                console.log(err);
            }

            console.log(filename, stats.isFile());
        });
    }
});