const rp = require("request-promise");
const $ = require("cheerio");

const lineStats = function(stat, line) {
  let url = `https://subwaystats.com/`;
  let statClass = stat == "uptime" ? ".trainUptime" : "trainStatus";
  let foundStat;
  let options = {
    uri: url,
    method: "GET",
    gzip: true,
    headers: {
      accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
      "accept-encoding": "gzip, deflate, br",
      "accept-language": "en-US,en;q=0.9",
      "cache-control": "no-cache",
      pragma: "no-cache",
      referer: "https://subwaystats.com/",
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36"
    }
  };
  return rp(options, function(error, response, body) {
    foundStat = $(
      `#content .container a[href='/status-${line}-train'] .subwayPanel .col-xs-6 ${statClass}`,
      body
    ).text();
    return foundStat;
  })
    .on("data", function(data) {})
    .on("response", function(response) {
      response.on("data", function(data) {});
    });
  //   return `looking for stat: ${stat} ${line}`;
};

module.exports = lineStats;
