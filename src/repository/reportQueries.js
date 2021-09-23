const csvHelper = require("../helpers/csvHelper");
const db = require("../../db");

/**
 * requestsPerConsumer() runs a query to get requests from a consumer (authenticated_entity) on table requests
 * grouping it by consumer
 * then it calls a helper function to generate a csv with the query data
 */
function requestsPerConsumer() {
  const queryString = `SELECT fk_consumer_authenticated_entity AS consumer,
                       COUNT (fk_consumer_authenticated_entity)
                       FROM requests
                       GROUP BY fk_consumer_authenticated_entity`;
  db.query(queryString, (err, res) => {
    if (err) {
      throw err;
    } else {
      csvHelper.generateCSV("consumerRequests", res.rows);
    }
  });
}
/**
 * requestsPerService() runs a query to get requests from a consumer (authenticated_entity) on table requests
 * grouping it by service
 * then it calls a helper function to generate a csv with the query data
 */
async function requestsPerService() {
  const queryString = `SELECT fk_service_id AS service,
                       COUNT (fk_service_id)
                       FROM requests
                       GROUP BY fk_service_id`;
  await db.query(queryString, (err, res) => {
    if (err) {
      throw err;
    } else {
      csvHelper.generateCSV("requestsPerService", res.rows);
    }
  });
}
/**
 * avgLatency() runs a query on latencies table geting a average of proxy, kong and requests and groups it by each service
 * then it calls a helper function to generate a csv with the query data
 */
function avgLatency() {
  const queryString = `SELECT fk_service_id AS service,
                       AVG(proxy) as proxyAvg,
                       AVG(kong) as kongTimeAvg,
                       AVG(request) as requestAvg
                       FROM latencies
                       GROUP BY fk_service_id`;
  db.query(queryString, (err, res) => {
    if (err) {
      throw err;
    } else {
      csvHelper.generateCSV("latenciesPerService", res.rows);
    }
  });
}

/**
 * exports each method from this file, although they could be run directly from the repository itself
 */
module.exports = { requestsPerConsumer, requestsPerService, avgLatency };
