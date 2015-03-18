var page = require('webpage').create();
page.viewportSize = {
  width: 1280,
  height: 1200
};
page.open('http://localhost:3001/test.html', function() {
  page.render('first.png');
  phantom.exit();
});

