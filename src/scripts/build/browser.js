var env = require("./browser/env");
var sketch = require("./../sketch")
var loop = require('raf-loop');

window.addEventListener("keypress", onKeyPress)

var engine = loop(function(dt) { sketch.draw() }).start()
var browserEnv = env(engine);
var ctx = browserEnv.createContext()
sketch.setup(ctx, browserEnv);

function onKeyPress(e){
  if(e.keyCode === 83 || e.keyCode === 115) {
    env.save();
  }
}