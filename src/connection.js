const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "http://10.5.0.10",
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
