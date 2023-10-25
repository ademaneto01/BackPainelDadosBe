const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "45.231.135.54",
  database: "postgres",
  password: "docker",
  port: 5432,
});

const query = (text, param) => {
  return pool.query(text, param);
};

module.exports = {
  query,
};
