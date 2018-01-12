var fs = require('fs');
var path = require('path');
var parseString = require('xml2js').parseString;

fs.readdir('../tmp-junit', (err, fileNames) => {
  var markdown = '';
  var failures = [];

  fileNames.forEach(fileName => {
    var parsedXml;
    var p = path.join(__dirname, `../tmp-junit/${fileName}`);
    var file = fs.readFileSync(p, 'utf8');

    parseString(file, function(err, result) {
      parsedXml = result;
      failures.push.apply(
        failures,
        parsedXml.testsuite.testcase.filter(test => {
          return !!test.error;
        }),
      );
    });
  });

  markdown = `There were ${failures.length}.`;
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
