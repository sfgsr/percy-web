module.exports = function(app) {
  var express = require('express');
  var repoRouter = express.Router();

  repoRouter.get('/', function(req, res) {
    res.send({
      "repo": []
    });
  });

  repoRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  repoRouter.get('/:id', function(req, res) {
    res.send({
      repo: {
        id: req.params.id,
        github_id: 12345,
        name: 'Repo Name',
        full_name: 'owner/Repo Name',
        private: '',
        html_url: '',
        description: '',
        created_at:'',
        updated_at:'',
      }
    });
  });

  repoRouter.put('/:id', function(req, res) {
    res.send({
      "repo": {
        "id": req.params.id
      }
    });
  });

  repoRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/repo', repoRouter);
};
