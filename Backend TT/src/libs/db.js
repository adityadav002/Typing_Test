/** @format */
require("dotenv").config();
const mysql = require("mysql");

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  // password: <your passowrd and details>
  database: process.env.DB_NAME,
});

module.exports = db;
