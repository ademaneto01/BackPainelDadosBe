const { Pool } = require("pg");

const pool = new Pool({
  user: "Undefined9701",
  host: "db",
  database: "postgres",
  password: "Xov8WnAmmrcdxmLfj8Jzx2",
  port: 5432,
});

const query = (text, param) => {
  return pool.query(text, param);
};

module.exports = {
  query,
};
