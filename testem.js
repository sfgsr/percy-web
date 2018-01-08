/* eslint-env node */

var testemReporter = 'tap';
var testemReportFile = false;

// only generate xml test reports when on BuildKite
// TODO how to only do this on buildkite
// if (true) {
testemReporter = 'xunit';
testemReportFile = 'junit/test-results.xml';
// }

module.exports = {
  framework: 'mocha',
  test_page: 'tests/index.html?hidepassed',
  disable_watching: true,
  launch_in_ci: ['PhantomJS'],
  launch_in_dev: ['PhantomJS'],
  reporter: testemReporter,
  report_file: testemReportFile,
};
