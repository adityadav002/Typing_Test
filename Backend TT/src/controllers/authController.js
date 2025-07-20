/** @format */
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../libs/db");
require("dotenv").config();

module.exports.register = (req, res) => {
  const { name, email, password } = req.body;

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      console.error("Salt error:", err);
      return res.status(500).json({ message: "Server error" });
    }
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) {
        console.error("Hashing error:", err);
        return res.status(500).json({ message: "Server error" });
      }

      const sqlInsert =
        "INSERT INTO users(name, email, password) VALUES (?,?,?)";
      db.query(sqlInsert, [name, email, hash], (err, result) => {
        if (err) {
          console.error("DB insert error:", err);
          return res.status(500).json({ message: "User registration failed" });
        }

        const token = jwt.sign({ email }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        res.cookie("token", token, { httpOnly: true, secure: false });
        return res
          .status(201)
          .json({ message: "User registered successfully", token });
      });
    });
  });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  const sqlSelect = "SELECT * FROM users WHERE email = ?";
  db.query(sqlSelect, [email.toLowerCase()], (err, results) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (results.length === 0) {
      return res.status(401).json({ message: "User not found" });
    }
    const user = results[0];
    bcrypt.compare(password, user.password, (err, match) => {
      if (err) {
        console.error("Bcrypt compare error:", err);
        return res.status(500).json({ message: "Internal server error" });
      }
      if (!match) {
        return res.status(401).json({ message: "Incorrect password" });
      }
      try {
        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        res.cookie("token", token, {
          httpOnly: true,
          secure: false,
          sameSite: "Lax",
        });
        res.status(200).json({
          token,
        });
      } catch (tokenError) {
        console.error("JWT error:", tokenError);
        return res.status(500).json({ message: "Failed to generate token" });
      }
    });
  });
};

module.exports.checkAuth = (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ user: decoded });
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports.logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "Lax",
  });
  return res.status(200).json({ message: "Logout successful" });
};
