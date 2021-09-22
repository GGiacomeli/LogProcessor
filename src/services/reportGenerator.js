const reports = require("../repository/reportQueries");

/**
 *generateReports() makes calls to a repository (reportQueries)
 *each call is responsible for a query and passes the result to a helper wich makes the csv file
 */
function generateReports() {
  reports.requestsPerConsumer();
  reports.requestsPerService();
  reports.avgLatency();
}
// calls the above function once
generateReports();
