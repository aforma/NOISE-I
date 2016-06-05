window.moment = require("moment");
var config = require("../../config.json")
var sketch = require("./sketch")
var loop = require('raf-loop');

document.title = config.name;

var canvas = document.createElement("canvas");
var context = canvas.getContext('2d');
var PRINT_WIDTH = config.width;
var PRINT_HEIGHT = config.height;
var PADDING = 30;

resize();

document.body.appendChild(canvas);
window.addEventListener("keypress", saveImage)

sketch.setup(context, finish);
var engine = loop(function(dt) { sketch.draw() }).start()

function finish(){
  engine.stop();
}

function resize(){

  if(PRINT_WIDTH > PRINT_HEIGHT) {
    var percent = PRINT_HEIGHT / PRINT_WIDTH
    var w = window.innerWidth - PADDING * 2
    canvas.width = w;
    canvas.height = w * percent;
  } else if (PRINT_HEIGHT > PRINT_WIDTH){
    var percent = PRINT_WIDTH / PRINT_HEIGHT
    var w = window.innerHeight - PADDING * 2
    canvas.width = w * percent;
    canvas.height = w;
  } else {
    var w = window.innerHeight - PADDING * 2
    canvas.width = w;
    canvas.height = w;
  }
}


function saveImage(e){
  if(e.keyCode === 83 || e.keyCode === 115) {
    var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    var a = document.createElement('a');
    a.href = image;
    a.download = config.name + ".png";
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(event.target);
  }
}