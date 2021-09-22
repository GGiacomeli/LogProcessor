// imports a .env file located in .src/config/.env, this file has the DB auth info
require("dotenv").config({ path: "./src/config/.env" });
const { Pool } = require("pg");

/**
 * creates a pool Connection to the database with .env params
 * and allowExitOnIdle, this makes it that any pool to disconnect immediatly after being idle
 * read docs for more info
 * https://node-postgres.com/features/connecting
 * for more info about the Pool connection https://node-postgres.com/api/pool
 */
const pool = new Pool({ allowExitOnIdle: true });

module.exports = {
  query: (text, params, callback) => pool.query(text, params, callback),
};
