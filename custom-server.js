const express = require("express");
const path = require("path");
const { StringDecoder } = require("string_decoder");
const decoder = new StringDecoder("utf8");
const { createConfiguration, startServer, build } = require("snowpack");
const c = require("./snowpack.config.js");
const config = createConfiguration(c);

const { result } = build({ config });
let snowpackServer;
console.log("bye", result);

const app = express();
const port = 3000;

// to serve js, css etc. files which will be built by snowpack
// we start a snowpack server which takes care of the watch part
// When any js file changes, it builds and put it's into the build directory
// We load the built file through snowpack server and send back to the browser
app.get("/dist/*", async (req, res) => {
  console.log("got request", req.url);
  try {
    const buildResult = await snowpackServer.loadUrl(req.url);
    // res.send(buildResult.contents);
    res.contentType("application/JavaScript");
    res.send(decoder.write(buildResult.contents));
  } catch (e) {
    res.contentType("application/JavaScript");
    res.send("could not find the file in build folder");
  }
});

// TODO: We can hook up all api paths to our regular server which serves both apis as well
// as static assets
// Which means for those paths, this server is just a proxy

app.get("/", async (req, res) => {
  const indexUrl = snowpackServer.getUrlForFile("build/index.html");
  // we probably want to send the index.html file which is in the public diretory
  // and pass it through loadUrl because snowpack server adds some scripts for
  // 1. hrm client
  // 2. for error overlay
  try {
    const buildResult = await snowpackServer.loadUrl("/");
    res.send(decoder.write(buildResult.contents));
  } catch (e) {
    console.error("Error loading url", req.url, e);
    res.send("Error loading the index file");
  }
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

async function startSnowpackServer() {
  snowpackServer = await startServer({ config });
}

startSnowpackServer();
