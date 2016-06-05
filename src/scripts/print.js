var fs = require('fs');
var path = require("path")
var colors = require('colors');
var moment = require("moment");
var config = require("../../config.json")
var sketch = require("./sketch");
var loop = require('raf-loop');
var Canvas = require('canvas');

var canvas = new Canvas(parseInt(config.width), parseInt(config.height));
var ctx = canvas.getContext('2d');

sketch.setup(ctx, finish);
var engine = loop(function(dt) { 
  sketch.draw() 
}).start()

console.log("Artwork started at ".yellow + moment().format("HH:mm:ss").green)

function finish(){
  engine.stop()
  var filename = config.name + "_" + moment().format("YYYYMMDDHHmmss") + ".jpg";
  var artworkPath = path.resolve(__dirname, '..', '..', 'print') + '/'+filename
  var out = fs.createWriteStream(artworkPath);
  var stream = canvas.jpegStream();

  stream.on('data', function(chunk){
    out.write(chunk);
  });
  console.log("Artwork saved at ".green + artworkPath.toString().green)
};
