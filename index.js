#!/usr/bin/env node

const fs = require('fs');
const chalk = require('chalk');
const path = require('path');

// to see what arguments were used
// console.log(process.argv);
const targetDir = process.argv[2] || process.cwd();

fs.readdir(targetDir, async (error, filenames) => {
    // handle either the error or carry on
    if (error) {
        // the error handling code here
        console.log(error);
        // can either throw a new error or just stop
        // throw new Error(error);
        // return;
    }

    const statPromises = filenames.map(filename => {
        return lstat(path.join(targetDir, filename));
    });

    const allStats = await Promise.all(statPromises);

    for (let stats of allStats) {
        const index = allStats.indexOf(stats);

        if (stats.isFile()) {
            console.log(filenames[index]);
        } else {
            console.log(chalk.yellow.bold(filenames[index]))    
        }
    }
});

// version 3
const {lstat} = fs.promises;


// version 2
// const util = require('util');
// const lstat = util.promisify(fs.lstat);


// version 1
// const lstat = (filename) => {
//     return new Promise((resolve, reject) => {
//         fs.lstat(filename, (err, stats) => {
//             if (err) {
//                 reject(err);
//             }

//             resolve(stats);
//         });
//     });
// }