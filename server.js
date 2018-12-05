const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const Mta = require("mta-gtfs");
const GtfsRealtimeBindings = require("gtfs-realtime-bindings");
const request = require("request");
const app = express();
const port = process.env.PORT || 5000;
const MTA_KEY = "7b58c4cff16a70fd01f0b1eb08a9e99e";
let FEED_ID = 2;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("build"));

app.get("/subways", (req, res) => {
  console.log("get subways called");
  const subways = [];
  let mta = new Mta({
    key: MTA_KEY,
    feed_id: 1
  });

  var SubwayLine = function(
    name,
    status,
    date,
    time,
    totalDownMins,
    totalMins
  ) {
    return {
      name,
      status,
      date,
      time,
      totalDownMins,
      totalMins
    };
  };

  mta
    .status("subway")
    .then(function(result) {
      result.forEach(group => {
        if (group.name.length === 1 || group.name === "SIR") {
          subways.push(
            new SubwayLine(
              group.name,
              group.status,
              group.Date,
              group.Time,
              0,
              1000
            )
          );
        } else {
          let lines = group.name.split("");
          lines.forEach(line => {
            subways.push(
              new SubwayLine(
                line,
                group.status,
                group.Date,
                group.Time,
                10,
                1000
              )
            );
          });
        }
      });
      res.send({ subways: subways });
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

app.get("/uptime", (req, res) => {
  // Testing for calculating general uptime
  let requestSettings = {
    method: "GET",
    url: `http://datamine.mta.info/mta_esi.php?key=${MTA_KEY}&feed_id=${FEED_ID}`,
    encoding: null
  };

  request(requestSettings, function(error, response, body) {
    let resBody = [];
    if (!error && response.statusCode == 200) {
      let feed = GtfsRealtimeBindings.FeedMessage.decode(body);
      feed.entity.forEach(function(entity) {
        let testEnt = {};
        totalCount += 1;
        if (entity.trip_update) {
          console.log("has trip update:", entity.trip_update);
          testEnt.line = entity.trip_update.trip.route_id;
        }

        resBody.push(testEnt);
      });
      res.send({ subways: ["subway 1", "subway 2"], feed: resBody });
    } else {
      res.send({ subways: ["subway 1", "subway 2"], feed: null });
    }
  });
});

app.get("/uptime/:line", (req, res) => {
  // TODO: Calculate uptime of subway line

  res.send({ express: `uptime of the ${req.params.line}` });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./build/index.html"));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
