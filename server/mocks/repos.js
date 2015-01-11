module.exports = function(app) {
  var express = require('express');
  var reposRouter = express.Router();

  reposRouter.get('/', function(req, res) {
    res.send({
      "repos": [
        {
          id: 12345
        }
      ]
    });
  });

  reposRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  reposRouter.get('/:id', function(req, res) {
    res.send({
      "repo": {
        "id": req.params.id,
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

  reposRouter.put('/:id', function(req, res) {
    res.send({
      "repos": {
        "id": req.params.id
      }
    });
  });

  reposRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/repos', reposRouter);
};
