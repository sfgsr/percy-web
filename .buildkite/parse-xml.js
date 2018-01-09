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
var xml = file;

var parseString = require('xml2js').parseString;
var res;
parseString(xml, function(err, result){
  res = result;
  // console.dir(result);
})

console.log(res)
var failures = res.testsuite.testcase.filter((test) => {
  return !!test.error;
});


var html = `There were ${res.testsuite.$.failures} out of ${res.testsuite.$.tests} tests.`
if (failures.length) {
  html += '<ul>'
  failures.forEach((failure) => {
    html += `<div>${failure.$.name}</div>`;
    html += `<div>${failure.error[0].$.message}</div>`;
  });
  html += '</ul>'
}
