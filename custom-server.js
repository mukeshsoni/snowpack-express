const express = require("express");
const path = require("path");
const { StringDecoder } = require("string_decoder");
const decoder = new StringDecoder("utf8");
const { createConfiguration, startServer, build } = require("snowpack");
const c = require("./snowpack.config.js");
const config = createConfiguration(c);

const { result } = build({ config });
let snowpackServer;

const app = express();
const port = 3000;

function endsWith(str, subStr) {
  return str.indexOf(subStr) === str.length - subStr.length;
}

// We can hook up all api paths to our regular server which serves both apis as well
// as static assets
// Which means for those paths, this server is just a proxy
// let's simulate that with an api path
app.get("/api/people", (req, res) => {
  const people = [
    {
      name: "Mukesh"
    },
    {
      name: "Ramesh"
    },
    {
      name: "Rakesh"
    }
  ];

  res.json(people);
});

// to serve js, css etc. files which will be built by snowpack
// we start a snowpack server which takes care of the watch part
// When any js file changes, it builds and put it's into the build directory
// We load the built file through snowpack server and send back to the browser
// we probably want to send the index.html file which is in the public diretory
// and pass it through loadUrl because snowpack server adds some scripts for
// 1. hrm client
// 2. for error overlay
app.get("*", async (req, res, next) => {
  console.log("got request", req.url);
  try {
    const buildResult = await snowpackServer.loadUrl(req.url);
    if (endsWith(req.url, ".js")) {
      res.contentType("application/javascript");
    }
    res.send(decoder.write(buildResult.contents));
  } catch (e) {
    next(e);
  }
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

async function startSnowpackServer() {
  snowpackServer = await startServer({ config });
}

startSnowpackServer();
