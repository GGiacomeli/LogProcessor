// require dotenv gets the db auth from a .env file located @Param path
require("dotenv").config({ path: "./src/config/.env" });
const { Pool } = require("pg");

/**
 * creates a pool Connection to the database with .env params
 * read docs for more info
 * https://node-postgres.com/features/connecting
 */
const pool = new Pool({
  allowExitOnIdle: true,
});

/**
 *
 * @param {authenticated_entity} value is expected to be a uuid from the log file
 */
async function insertConsumer(value) {
  const queryString =
    "INSERT INTO consumers(authenticated_entity) VALUES ($1) ON CONFLICT DO NOTHING;";
  await pool.query(queryString, [value], (err) => {
    if (err) throw err.stack;
  });
}
/**
 *
 * @param {uuid} value is expected to be a uuid value from the authenticated_entity object from the log file
 */
async function insertService(value) {
  const query =
    "INSERT INTO services(service_id) VALUES ($1) ON CONFLICT DO NOTHING;";
  await pool.query(query, [value], (err) => {
    if (err) {
      throw new Error(err.stack);
    }
  });
}
/**
 *
 * @param {Int} proxy
 * @param {int} kong
 * @param {int} request
 * @param {uuid} serviceId
 * proxy, kong and requests are expected to be int values from latencies object from the log file
 * serviceId is expected to be a uuid value from service object from the log file
 */
async function insertLatencies(proxy, kong, request, serviceId) {
  const values = [proxy, kong, request, serviceId];
  const query =
    "INSERT INTO latencies (proxy, kong, request, fk_service_id) VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING";
  await pool.query(query, values, (err) => {
    if (err) {
      throw new Error(err.stack);
    }
  });
}
/**
 *
 * @param {service_id} service
 * @param {authenticated_entity} consumer
 * service_id and authenticated_entity are expected to be uuid values from service and authenticated_entity
 * given by the log file
 */
async function insertRequest(service, consumer) {
  const values = [service, consumer];
  const query =
    "INSERT INTO requests (fk_service_id, fk_consumer_authenticated_entity) VALUES ($1, $2) ON CONFLICT DO NOTHING";
  await pool.query(query, values, (err) => {
    if (err) {
      throw new Error(err.stack);
    }
  });
}

module.exports = {
  insertConsumer,
  insertService,
  insertLatencies,
  insertRequest,
};
