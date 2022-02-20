const path = require("path");
const express = require("express");
const cors = require("cors");
const router = require("./routes/router");
require("dotenv").config();
require("./db/conn");

const app = express();
app.use(cors());
app.use(express.json());

// serve client
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "./client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("please set to production");
  });
}

app.use(router);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server is running on port: ${port}`));
