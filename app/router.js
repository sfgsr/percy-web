import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL,

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
  this.route('organizations', {path: '/organizations'}, function() {
    this.route('new');
    this.route('organization', {path: '/:organization_id'}, function() {
      this.route('projects', {path: '/projects'}, function() {
        this.route('new');
      });
      this.route('settings');
      this.route('users');
      this.route('billing');
    });
  });
  // TODO: #projectification launch.
  this.route('organization', {path: '/-/:organization_id'}, function() {
    // Don't add anything else in this namespace, we want to allow users to own the whole projects
    // namespace. Org-level settings and such should go in the above "organizations" route.
    this.route('project', {path: '/:project_id'}, function() {
      this.route('settings');
      this.route('builds', {}, function() {
        this.route('build', {path: '/:build_id'});
      });
    });
  });
  // TODO: remove resetNamespace and refactor all route references to full paths.
  this.route('namespace', {path: '/:namespace_id'}, function() {
    this.route('repo', {resetNamespace: true, path: '/:repo_id'}, function() {
      this.route('settings');
      this.route('builds', {resetNamespace: true}, function() {
        this.route('build', {path: '/:build_id'});
      });
    });
  });
});

export default Router;
