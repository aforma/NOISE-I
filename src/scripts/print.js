var fs = require('fs');
var sketch = require("./sketch");

var Canvas = require('canvas');
var canvas = new Canvas(1920, 1280);
var ctx = canvas.getContext('2d');

sketch(ctx);

var out = fs.createWriteStream(__dirname + '/artwork.jpg');
var stream = canvas.jpegStream();

stream.on('data', function(chunk){
  out.write(chunk);
});