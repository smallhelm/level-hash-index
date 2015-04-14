var hashCode = function(str){
  var hash = 0;
  var i;
  for(i = 0; i < str.length; i++){
    hash = 31 * hash + str.charCodeAt(i) | 0;
  }
  return ((hash >>> 1) & 0x40000000) | (hash & 0xBFFFFFFF);
};

module.exports = function(str){
  return hashCode(str).toString(36);
};
