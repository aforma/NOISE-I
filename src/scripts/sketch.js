var perlin = require("./sketch/noise");
var _ = require("lodash");

var ctx = undefined;
var env = undefined;
var frameCount = 0;
var pointA = {x:0,y:0};
var pointB = {x:0,y:0};
var pointC = {x:0,y:0};
var pointD = {x:0,y:0};
var radius = {x:0,y:0};
var noise = {x:0.0, y:0};
var angle = 0;
var size = 0;
var color = 0;
var noiseSpeed = 0.5;
var scale = 1;
var lineWidth = 0.1;
var angleSpeed = 0.01;
var delay = 60000 * 0.5;


exports.setup = function(_ctx, _env){
  ctx = _ctx;
  env = _env;
  size = 0;
  radius.x = Math.random() * size;  
  radius.y = Math.random() * size;

  background("#FFF");

  _.delay(env.done, 10000)
}

exports.draw = function() {

  drawLines();

  angle += angleSpeed;
  noise.x += 0.005;
  noise.y += 0.001;

  size = size + perlin(noise.x, 0) * noiseSpeed
  size = constrain(size,0,ctx.canvas.height);

  color = perlin(noise.x) * 255;

  radius.x = perlin(noise.x) * size;
  radius.y = perlin(noise.y) * size;

  updatePoints();

  if(size >= ctx.canvas.width * 0.1) {
    env.done()
  }
}

function drawLines() {
  ctx.strokeStyle = "#000";
  ctx.lineWidth = lineWidth;

  ctx.beginPath()
  ctx.moveTo(pointA.x, pointA.y)
  ctx.lineTo(pointD.x, pointD.y)
  ctx.moveTo(pointB.x, pointB.y)
  ctx.lineTo(pointC.x, pointC.y)
  ctx.stroke()
  ctx.closePath()
}

function updatePoints() {
  pointA.x = (ctx.canvas.width / 2) + (Math.cos(angle) * radius.x);
  pointA.y = (ctx.canvas.height / 2) + (Math.sin(angle) * radius.y);

  pointB.x = (ctx.canvas.width / 2) - (Math.cos(angle) * radius.x);
  pointB.y = (ctx.canvas.height / 2) - (Math.sin(angle) * radius.y);

  pointC.x = (ctx.canvas.width / 2) + (Math.cos(angle - 90) * radius.x);
  pointC.y = (ctx.canvas.height / 2) + (Math.sin(angle - 90) * radius.y);

  pointD.x = (ctx.canvas.width / 2) - (Math.cos(angle - 90) * radius.x);
  pointD.y = (ctx.canvas.height / 2) - (Math.sin(angle - 90) * radius.y);
}

function background(color){
  ctx.fillStyle = color;
  ctx.fillRect(0,0, ctx.canvas.width, ctx.canvas.height);
}

function constrain(n, low, high) {
  return Math.max(Math.min(n, high), low);
}