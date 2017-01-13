var config = require("../config.js");
var fs = require("fs");
var colors = require("colors/safe");
var endOfLine = require("os").EOL;

var controller = {};

var typeToColor = {
  error: "red",
  warning: "yellow",
  normal: "grey"
};

var isDebugEnv = process.env.DEBUG === "true";

controller.debug = function(type, text) {
  var color = typeToColor[type];
  var coloredOutput = colors[color](text);

  if(isDebugEnv) {
    console.log(coloredOutput);
  }

  fs.appendFile(config.logFilePath, coloredOutput + endOfLine, function(err) {
    if(err) {
      console.log(colors[typeToColor["error"]](err));
    }
  });
};

module.exports = controller;
