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
  this.route('catchall', {path: '/*wildcard'});
});

export default Router;
