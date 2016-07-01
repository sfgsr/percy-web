import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,

  notifyGoogleAnalytics: Ember.on('didTransition', function() {
    return window.ga && window.ga('send', 'pageview', {
      'page': this.get('url'),
      'title': this.get('url')
    });
  }),
});

Router.map(function() {
  // TODO: remove resetNamespace and refactor all route references to full paths.
  this.route('login');
  this.route('repo-forbidden');
  this.route('namespace', {path: '/:namespace_id'}, function() {
    this.route('repo', {resetNamespace: true, path: '/:repo_id'}, function() {
      this.route('settings', {path: '/settings'});
      this.route('builds', {resetNamespace: true}, function() {
        this.route('build', {path: '/:build_id'});
      });
    });
  });
  this.route('docs', function() {
    this.route('capybara');
    this.route('static');
    this.route('faq');
    this.route('animations');

    this.route('integrations', {resetNamespace: true, path: '/integrations'}, function() {
      this.route('ci');
      this.route('github');
      this.route('responsive');
      this.route('fonts');
      this.route('parallel-tests');
    });

    this.route('apidocs', {resetNamespace: true, path: '/api'}, function() {
      this.route('reference');
      this.route('client');
    });
  });
  this.route('pricing');
  this.route('about');
  this.route('terms');
  this.route('privacy');
  this.route('account');
});

export default Router;
