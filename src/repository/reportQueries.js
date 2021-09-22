// require dotenv gets the db auth from a .env file located @Param path
require("dotenv").config({ path: "./src/config/.env" });
const { Pool } = require("pg");
const csvHelper = require("../helpers/csvHelper");

/**
 * creates a pool Connection to the database with .env params
 * read docs for more info
 * https://node-postgres.com/features/connecting
 */
const pool = new Pool({
  allowExitOnIdle: true,
});

/**
 * requestsPerConsumer() runs a query to get requests from a consumer (authenticated_entity) on table requests
 * grouping it by consumer
 * then it calls a helper function to generate a csv with the query data
 */
function requestsPerConsumer() {
  const query =
    "SELECT fk_consumer_authenticated_entity, COUNT (fk_consumer_authenticated_entity) FROM requests GROUP BY fk_consumer_authenticated_entity";
  pool.query(query, (err, res) => {
    if (err) {
      throw err;
    } else {
      csvHelper.generateCSV("consumerPerService", res.rows);
    }
  });
}
/**
 * requestsPerService() runs a query to get requests from a consumer (authenticated_entity) on table requests
 * grouping it by service
 * then it calls a helper function to generate a csv with the query data
 */
async function requestsPerService() {
  const query =
    "SELECT fk_service_id, COUNT (fk_service_id) from requests GROUP BY fk_service_id";
  await pool.query(query, (err, res) => {
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
  const query =
    "SELECT fk_service_id, AVG(proxy) as proxy, AVG(kong) as kong, AVG(request) as request FROM latencies GROUP BY fk_service_id";
  pool.query(query, (err, res) => {
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
