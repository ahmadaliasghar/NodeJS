const http = require("http");
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const logEvents = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");

const EventEmitter = require("events");
const { logger } = require("./middleware/logEvents");
class Emitter extends EventEmitter {}

const myEmitter = new Emitter();
myEmitter.on("log", (msg, fileName) => logEvents(msg, fileName));
const PORT = process.env.PORT || 3500;

// custom middleware
app.use(logger);

const whiteList = [
  "https://www.ahmad.com",
  "http://localhost:3500",
  "http://127.0.01:5500",
];
const corOptions = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not Allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};
app.use(cors(corOptions));

// built in middleware to handle url encoded data
// in other words for form type data
// 'content-type': application/x-www.form-urlencoded
app.use(express.urlencoded({ extended: false }));

// built in middleware for json
app.use(express.json());

//middleware to serve static files such as images, our css etc.
app.use("/", express.static(path.join(__dirname, "/public")));
app.use("/subdir", express.static(path.join(__dirname, "/public")));

app.use("/subdir", require("./routes/subdir"));
app.use("/", require("./routes/root"));

// ^/ must begin with
// /$ must end with
app.get("^/$|/index(.html)?", (req, res) => {
  // res.send("Hello World")
  // res.sendFile('./views/index.html', {root: __dirname})
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html")); //404
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found " });
  } else {
    res.type("txt").send("404 Could Not Found Your Desired Page");
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
