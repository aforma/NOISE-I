var colors = require('colors');
var moment = require("moment");
var config = require("../../../config.json")
var sketch = require("./../sketch");
var loop = require('raf-loop');
var env = require("./print/env")

var engine = loop(function(dt) { 
  sketch.draw() 
}).start()

var printEnv = env(engine);
var ctx = printEnv.createContext();
sketch.setup(ctx, printEnv);
console.log("– Artwork started at ".yellow + moment().format("HH:mm:ss").green)
