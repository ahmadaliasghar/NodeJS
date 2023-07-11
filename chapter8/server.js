const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const logEvents = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const corOptions = require("./config/corOptions");
const EventEmitter = require("events");
const { logger } = require("./middleware/logEvents");
class Emitter extends EventEmitter {}

const myEmitter = new Emitter();
myEmitter.on("log", (msg, fileName) => logEvents(msg, fileName));
const PORT = process.env.PORT || 3500;

// custom middleware
app.use(logger);

app.use(cors(corOptions));

// form data
app.use(express.urlencoded({ extended: false }));

// built in middleware for json
app.use(express.json());

//middleware to serve static files such as images, our css etc.
app.use("/", express.static(path.join(__dirname, "/public")));

app.use("/", require("./routes/root"));
app.use("/api", require("./routes/api/employees"));

app.get("^/$|/index(.html)?", (req, res) => {
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
app.use(errorHandler)
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
