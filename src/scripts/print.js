var fs = require('fs');
var sketch = require("./sketch");

var Canvas = require('canvas');
var canvas = new Canvas(4724, 4724);
var ctx = canvas.getContext('2d');

sketch(ctx, function(){
  var out = fs.createWriteStream(__dirname + '/artwork.jpg');
  var stream = canvas.jpegStream();

  stream.on('data', function(chunk){
    out.write(chunk);
  });
}, true);