var fs = require('fs')
var path = require('path')
var Canvas = require('canvas')
var config = require("../../../../config.json");

var Image = Canvas.Image
var img = new Image()

img.onerror = function (err) {
  throw err
}

img.onload = function () {
  var p = parseInt(config.thumbnail_size) / parseInt(config.width);
  var w = parseInt(config.width) * p
  var h = parseInt(config.height) * p
  var canvas = new Canvas(w, h)
  var ctx = canvas.getContext('2d')

  ctx.drawImage(img, 0, 0, w, h)

  var out = fs.createWriteStream(path.join(path.resolve(__dirname, '..', '..', '..', '..', 'print'), 'thumbnail.png'))
  var stream = canvas.createJPEGStream({})

  stream.pipe(out)
}


module.exports = function(src) {
  img.src = src;
}