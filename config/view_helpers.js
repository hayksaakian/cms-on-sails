var moment = require('moment');
var ejs = require('ejs');

ejs.filters.fromNow = function(date){
  return moment(date).fromNow();
}
ejs.filters.formatDate = function(date){
  return moment(date).format('MMM Do YYYY');
}

ejs.filters.pretty = function(date){
  return moment(date).format('LLL')
}