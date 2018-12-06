const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const rp = require("request-promise");
const Mta = require("mta-gtfs");
const GtfsRealtimeBindings = require("gtfs-realtime-bindings");
const request = require("request");
const app = express();
const port = process.env.PORT || 5000;
const MTA_KEY = "7b58c4cff16a70fd01f0b1eb08a9e99e";
let FEED_ID = 1;
const $ = require("cheerio");
const lineStats = require("./lineStats");
const getSubways = require("./getSubways");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("build"));

app.get("/subways", (req, res) => {
  let mta = new Mta({
    key: MTA_KEY,
    feed_id: 1
  });

  mta
    .status("subway")
    .then(function(result) {
      let subs = getSubways(result);
      res.send({ subways: subs });
    })
    .catch(function(err) {
      console.log(err);
      res.status(500).send();
    });
});

app.post("/update", (req, res) => {
  let mta = new Mta({
    key: MTA_KEY,
    feed_id: 1
  });

  mta
    .status("subway")
    .then(function(result) {
      let subs = getSubways(result, req.body.subways);
      subs = subs.filter(subway => typeof subway == "object");
      res.send({ updatedSubways: subs });
    })
    .catch(function(err) {
      console.log(err);
      res.status(500).send();
    });
});

app.get("/status/:line", (req, res) => {
  // TODO: Pull the status of the line in question
  res.send({ express: `status update of the ${req.params.line}` });
});

app.get("/uptime/:line", (req, res) => {
  let uptime = lineStats("uptime", req.params.line);
  console.log("uptime: ", uptime);
  res.send({ express: `${uptime}` });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./build/index.html"));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
