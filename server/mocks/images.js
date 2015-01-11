module.exports = function(app) {
  var express = require('express');
  var imageRouter = express.Router();

  imageRouter.get('/', function(req, res) {
    res.send({
      "image": []
    });
  });

  imageRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  imageRouter.get('/:id', function(req, res) {
    res.send({
      "image": {
        "id": req.params.id,
        url: 'http://path-to-image/image.png',
        md5_hash: '',
        mimetype: '',
        size: '',
        created_at: '',
        updated_at: '',
      }
    });
  });

  imageRouter.put('/:id', function(req, res) {
    res.send({
      "image": {
        "id": req.params.id
      }
    });
  });

  imageRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/images', imageRouter);
};
