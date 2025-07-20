/** @format */
const express = require("express");
const {
  insertData,
  showData,
  deleteData,
} = require("../controllers/dataController");

const data = express.Router();

data.post("/insert", insertData);
data.get("/data", showData);
data.delete("/delete/:name", deleteData);

module.exports = data;
