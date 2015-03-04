import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType,
});

Router.map(function() {
  // this.route('login');
  this.resource('repos', function() {
    this.resource('repo', {path: '/:repo_id'}, function() {
    });
    this.route('foo');
  });
});

export default Router;
