const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "db",
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
