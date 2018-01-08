  // var fs = require('fs');
  // var path = require('path');

  // // Buffer mydata
  // var BUFFER = bufferFile('../junit/test-results.xml');

  // function bufferFile(relPath) {
  //   console.log( fs.readFileSync(path.join(__dirname, relPath), { encoding: 'utf8' })); // zzzz....
  // }


var fs = require('fs');
var $ = require('jquery');
var __dirname = path.resolve();
var relPath = 'junit/test-results.xml';
var path = path.join(__dirname, relPath);
var file = fs.readFileSync(path, "utf8");
console.log(file);