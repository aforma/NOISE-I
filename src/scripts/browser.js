var sketch = require("./sketch")

var canvas = document.createElement("canvas");
var context = canvas.getContext('2d');

resize();

document.body.appendChild(canvas);
window.addEventListener("resize", resize);


function resize(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

sketch(context);