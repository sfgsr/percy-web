var fs = require('fs');
var path = require('path');
var parseString = require('xml2js').parseString;
var process = require('process');

// glob('tmp-junit/tmp-junit/*.xml', (err, fileNames) => {
// glob('tmp-junit/tmp-junit/*.xml', (err, fileNames) => {

// fs.readdir('.buildkite/merged-xml.xml', (err, fileNames) => {
var file = fs.readFileSync('.buildkite/merged-xml.xml');

var failures = [];
var numTests = 0;

parseString(file, (err, result) => {
  result.testsuites.testsuite.forEach(test => {
    var testArray = test.testcase;
    testArray.forEach(t => {
      numTests += 1;
      if (t.error) {
        failures.push(t);
      }
    });
  });

  var markdown = `There were ${failures.length} failures out of ${numTests} tests.`;
  if (failures.length) {
    markdown += ':(';
    failures.forEach(failure => {
      markdown += '<details>';
      markdown += `<summary><code>${failure.$.name}</code></summary>\n`;
      markdown += `<code>${failure.error[0].$.message}</code>\n\n\n`;
      markdown += '</details>';
    });
  }

  process.stdout.write(markdown);
});
