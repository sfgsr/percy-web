import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType,

  notifyGoogleAnalytics: function() {
    return window.ga('send', 'pageview', {
      'page': this.get('url'),
      'title': this.get('url')
    });
  }.on('didTransition'),
});

Router.map(function() {
  this.route('login');
  this.resource('namespace', {path: '/:namespace_id'}, function() {
    this.resource('repo', {path: '/:repo_id'}, function() {
      this.route('settings', {path: '/settings'});
      this.resource('builds', function() {
        this.route('build', {path: '/:build_id'});
      });
    });
  });
  this.resource('docs', function() {
    this.route('capybara');
    this.route('static');

    this.resource('integrations', {path: '/integrations'}, function() {
      this.route('ci');
      this.route('github');
      this.route('github-pages');
      this.route('fonts');
    });

    this.resource('apidocs', {path: '/api'}, function() {
      this.route('reference');
      this.route('client');
    });
  });
  this.route('about');
  this.route('faq');
  this.route('terms');
  this.route('privacy');
  this.route('account');
});

export default Router;
