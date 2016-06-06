var fs = require('fs');
var path = require("path")
var config = require("../../../../config.json");
var moment = require("moment");
var colors = require('colors');
var Canvas = require('canvas');

module.exports = function(engine){
  var env = {};
  var canvas = undefined;
  var context = undefined;

  env.save = function(){
    var filename = config.name + "_" + moment().format("YYYYMMDDHHmmss") + ".jpg";
    var artworkPath = path.resolve(__dirname, '..', '..', '..', '..', 'print') + '/'+filename
    var out = fs.createWriteStream(artworkPath);
    var stream = canvas.jpegStream({quality: 100});

    stream.on('data', function(chunk){
      out.write(chunk);
    });

    console.log("– Artwork saved at ".green + artworkPath.toString().green)
  }

  env.one = function() {
    engine.stop()
    env.save()
  }

  env.createContext = function(){
    canvas = new Canvas(parseInt(config.width), parseInt(config.height));
    ctx = canvas.getContext('2d');
    return ctx;
  }

  return env;
};