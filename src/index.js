const express = require("express");
const router = require("./router");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(cors());

app.use(express.json());
app.use(router);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
