// importing modules
const fs = require("fs");
const readline = require("readline");

/**
 *  readLogs() handle a txt file
 * @param {path} filePath
 *
 */
function readLogs(filePath) {
  const rl = readline.createInterface({
    input: fs.createReadStream(filePath),
    output: process.stdout,
    terminal: false,
  });
  rl.on("line", (line) => {
    // TODO this should not be logging on console, it should send eachline to another method
    console.log(line);
  });
}

module.exports = { readLogs };
