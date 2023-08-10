const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "172.18.0.3",
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
