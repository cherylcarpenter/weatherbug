require ("@babel/polyfill");



var $ = require('../../../node_modules/jquery/dist/jquery.min.js');

window.jQuery = $;
window.$ = $;

var Inputmask = require('inputmask');

var myApp = require('./js/myApp');



$(document).ready(function($){
  myApp();


});
