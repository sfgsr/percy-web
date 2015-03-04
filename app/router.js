import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType,
});

Router.map(function() {
  this.resource('owner', {path: '/:owner_id'}, function() {
    this.resource('repo', {path: '/:repo_id'}, function() {
      this.resource('builds', function() {
        this.route('build', {path: '/:build_id'})
      });
    });
  });
});

export default Router;
