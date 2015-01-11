module.exports = function(app) {
  var express = require('express');
  var screenshotRouter = express.Router();

  screenshotRouter.get('/', function(req, res) {
    res.send({
      "screenshot": []
    });
  });

  screenshotRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  screenshotRouter.get('/:id', function(req, res) {
    res.send({
      "screenshot": {
        "id": req.params.id,
        repo_id: 12345,
        image_id: 92347,
        name: 'Screenshot Name',
        created_at: '',
        updated_at: '',
      }
    });
  });

  screenshotRouter.put('/:id', function(req, res) {
    res.send({
      "screenshot": {
        "id": req.params.id
      }
    });
  });

  screenshotRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/screenshot', screenshotRouter);
};
