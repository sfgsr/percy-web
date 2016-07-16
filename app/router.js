import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,

  notifyGoogleAnalytics: Ember.on('didTransition', function() {
    if (window.ga) {
      window.ga('send', 'pageview', {
        'page': this.get('url'),
        'title': this.get('url')
      });
    }
    if (window.Intercom) {
      window.Intercom('update');
    }
    return true;
  }),
});

Router.map(function() {
  // TODO: remove resetNamespace and refactor all route references to full paths.
  this.route('login');
  this.route('repo-forbidden');
  this.route('docs', {path: '/docs'}, function() {
    this.route('page', {path: '*path'});
  });
  this.route('pricing');
  this.route('about');
  this.route('terms');
  this.route('privacy');
  this.route('account');
  this.route('namespace', {path: '/:namespace_id'}, function() {
    this.route('repo', {resetNamespace: true, path: '/:repo_id'}, function() {
      this.route('settings', {path: '/settings'});
      this.route('builds', {resetNamespace: true}, function() {
        this.route('build', {path: '/:build_id'});
      });
    });
  });
});

export default Router;
