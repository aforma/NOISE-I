var loop = require('raf-loop');

module.exports = function(ctx){
  var engine = loop(function(dt) {
    
  }).start()

  setTimeout(function(){
    engine.stop();
  }, 5000)
}