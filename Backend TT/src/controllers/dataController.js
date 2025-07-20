/** @format */
const express = require("express");
const db = require("../libs/db.js");

module.exports.insertData = (req, res) => {
  const name = req.body.name;
  const wpm = req.body.wpm;
  const accuracy = req.body.accuracy;
  const sqlInsert =
    "INSERT INTO typingtest(name, wpm, accuracy ) VALUES (?,?,?);";
  db.query(sqlInsert, [name, wpm, accuracy], (err, result) => {
    console.log(err);
  });
};

module.exports.showData = (req, res) => {
  db.query("SELECT * FROM typingtest", (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
};

module.exports.deleteData = (req, res) => {
  const name = req.params.name;
  const sqlDelete = "DELETE FROM typingtest WHERE name = ?";
  db.query(sqlDelete, name, (err, result) => {
    if (err) console.log(err);
  });
};
