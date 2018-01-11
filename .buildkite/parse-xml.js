var fs = require('fs');
var path = require('path');
var parseString = require('xml2js').parseString;
var relPath = '../tmp-junit/test-results.xml';
var p = path.join(__dirname, relPath);
var file = fs.readFileSync(p, 'utf8');
var xml = file;

var parsedXml;
parseString(xml, function(err, result) {
  parsedXml = result;
});

var failures = parsedXml.testsuite.testcase.filter(test => {
  return !!test.error;
});

var markdown = `There were ${parsedXml.testsuite.$.failures} out of ${parsedXml.testsuite.$.tests} tests.`;
if (failures.length) {
  failures.forEach(failure => {
    markdown += '<details>';
    markdown += `<summary><code>${failure.$.name}</code></summary>\n`;
    markdown += `<code>${failure.error[0].$.message}</code>\n\n\n`;
    markdown += '</details>';
  });
}

process.stdout.write(markdown);
