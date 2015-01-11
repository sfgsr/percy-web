module.exports = function(app) {
  var express = require('express');
  var screenshotsRouter = express.Router();

  screenshotsRouter.get('/', function(req, res) {
    res.send({
      screenshots: [
        {
          id: 1,
          repo_id: 12345,
          image_id: 92347,
          name: 'Screenshot Name',
          created_at: '',
          updated_at: '',
        },
      ]
    });
  });

  app.use('/api/screenshots', screenshotsRouter);
};
