/** @format */
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();
app.use(cookieParser());
// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
const dataRoute = require("./routes/dataRoute.js");
app.use("/api", dataRoute);

const authRoute = require("./routes/authRoute.js");
app.use("/auth", authRoute);

// Server start
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
