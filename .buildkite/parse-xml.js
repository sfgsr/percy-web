var fs = require('fs');
var path = require('path');
var parseString = require('xml2js').parseString;

fs.readdir('tmp-junit', (err, fileNames) => {
  var failures = [];
  // get all the failures out and put them in array failures
  fileNames.forEach(fileName => {
    var p = path.join(__dirname, `${fileName}`);
    var file = fs.readFileSync(p, 'utf8');

    parseString(file, function(err, result) {
      var parsedXml = result;
      failures.push.apply(
        failures,
        parsedXml.testsuite.testcase.filter(test => {
          return !!test.error;
        }),
      );
    });
  });

  var markdown = `There were ${failures.length} failures.`;
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
