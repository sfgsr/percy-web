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
  this.route('organizations', {path: '/organizations'}, function() {
    this.route('new', {path: '/new'});
    this.route('organization', {path: '/:organization_id'}, function() {
      this.route('settings', {path: '/settings'});
    });
  });
  // TODO: #projectification launch.
  this.route('organization', {path: '/_org/:organization_id'}, function() {
    // Don't add anything else in this namespace, we want to allow users to own the whole projects
    // namespace. Org-level settings and such should go in the above "organizations" route.
    this.route('project', {path: '/:project_id'}, function() {
      this.route('settings', {path: '/settings'});
      this.route('builds', {}, function() {
        this.route('build', {path: '/:build_id'});
      });
    });
  });
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
