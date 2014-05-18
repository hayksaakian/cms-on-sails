module.exports.helpers = {
  combine: function(source, destination){
    for(var key in source) {
      if(source.hasOwnProperty(key) && !(key in destination)) {
        destination[key] = source[key];
      }
    }
    return destination;
  }
}