import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType,
});

Router.map(function() {
  this.route('login');
  this.resource('owner', {path: '/:owner_id'}, function() {
    this.resource('repo', {path: '/:repo_id'}, function() {
      this.route('settings');
      this.resource('builds', function() {
        this.route('build', {path: '/:build_id'});
      });
    });
  });
  this.resource('docs', function() {
    this.route('capybara');
    this.route('ci');
    this.route('static');
    this.route('custom');
    this.resource('apidocs', {path: '/api'}, function() {
      this.route('reference');
      this.route('client');
    });
  });
  this.route('about');
  this.route('faq');
  this.route('terms');
  this.route('privacy');
});

export default Router;
