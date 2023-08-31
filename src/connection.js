const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "docker",
  port: 5434,
});

const query = (text, param) => {
  return pool.query(text, param);
};

module.exports = {
  query,
};
