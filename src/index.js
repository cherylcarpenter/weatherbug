require ("@babel/polyfill");
var $ = require('jquery');
var myApp = require('./js/myApp');
$(document).ready(function($){
  myApp();
});
