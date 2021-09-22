// importing modules
const fs = require("fs");
const readline = require("readline");
const queries = require("../repository/insertQueries");

/**
 * saveData() calls the insertQueries repository and saves all relevant data do its respectives tables
 * this method is a async await function waiting on each method call to avoid problems
 * where it tries to call insertRequest() before insertConsumer and/or insertService
 * @param {JSON} line is a line given by readLogs()
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
async function readLogs(filePath) {
  const rl = await readline.createInterface({
    input: fs.createReadStream(filePath),
    output: process.stdout,
    terminal: false,
  });
  rl.on("line", async (line) => {
    await saveData(JSON.parse(line));
  });
}

// calls the function once with the desired filepath (in this case ./input/FileName)
readLogs("./input/logs.txt");
