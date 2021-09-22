const fastcsv = require("fast-csv");
const fs = require("fs");
/**
 * generateCSV() is on reportQueries to build CSV files for a desired query result
 * @param {String} reportName
 * @param {JSON} someData
 */
async function generateCSV(reportName, resultData) {
  const ws = fs.createWriteStream(`reports/${reportName}.csv`);
  await fastcsv
    .write(resultData, { headers: true })
    .on("finish", () => {
      console.log(`Report ${reportName} Successfully generated`);
    })
    .pipe(ws);
}
module.exports = { generateCSV };
