var config = require("../../config.json")

module.exports = function(engine) {
  var env = {};
  var canvas = undefined;
  var context = undefined;
  var PRINT_WIDTH = undefined;
  var PRINT_HEIGHT = undefined;
  var PADDING = 30;

  env.done = function(){
    engine.stop();
    env.save()
  }

  env.save = function(){
    var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    var a = document.createElement('a');
    a.href = image;
    var name = config.name + ".png";
    a.download = name.replace(" ","_");
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  env.createContext = function(){
    canvas = document.createElement("canvas");
    context = canvas.getContext('2d');
    PRINT_WIDTH = config.width;
    PRINT_HEIGHT = config.height;
    document.body.appendChild(canvas);
    env.resize();

    document.title = config.name;
    return context;
  }

  env.resize = function(){
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

  return env;
}