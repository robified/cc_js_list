#!/usr/bin/env node

const fs = require('fs');

fs.readdir(process.cwd(), async (error, filenames) => {
    // handle either the error or carry on
    if (error) {
        // the error handling code here
        console.log(error);
        // can either throw a new error or just stop
        // throw new Error(error);
        // return;
    }

    const statPromises = filenames.map(filename => {
        return lstat(filename);
    });

    const allStats = await Promise.all(statPromises);

    for (let stats of allStats) {
        const index = allStats.indexOf(stats);

        console.log(filenames[index], stats.isFile());
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