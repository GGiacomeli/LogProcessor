// importing modules
const fs = require("fs");
const readline = require("readline");
const queries = require("../repository/insertQueries");

/**
 * saveData() calls the insertQueries repository and saves all relevant data do its respectives tables
 * @param {JSON} line is a line given by the readLogs method
 */
async function saveData(line) {
  await queries.insertConsumer(line.authenticated_entity.consumer_id.uuid);
  await queries.insertService(line.service.id);
  await queries.insertLatencies(
    line.latencies.proxy,
    line.latencies.kong,
    line.latencies.request,
    line.service.id
  );
  await queries.insertRequest(
    line.service.id,
    line.authenticated_entity.consumer_id.uuid
  );
}
/**
 *  readLogs() handle a txt file, it opens, read each line,
 *  sends the output to saveData()
 *  (MAYBE) change the method name to 'readLogFile'
 *  also consider changing the filename to LogProcessor
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
    saveData(JSON.parse(line));
  });
}

/**
 * this module aims to read a log file, transform it in JSON
 */
module.exports = { readLogs };
