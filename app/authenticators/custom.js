import Ember from 'ember';
import utils from '../lib/utils';
import BaseAuthenticator from 'ember-simple-auth/authenticators/base';

export default BaseAuthenticator.extend({
  store: Ember.inject.service(),
  restore() {
    let store = this.get('store');
    return new Ember.RSVP.Promise((resolve, reject) => {
      store.queryRecord('user', {}).then((userRecord) => {
        window.Intercom('update', {
          name: userRecord.get('name'),
          email: userRecord.get('email'),
          created_at: userRecord.get('createdAt').getTime() / 1000,
        });
        resolve({user: userRecord});
      }, reject);
    });
  },
  authenticate(options) {
    let store = this.get('store');
    return new Ember.RSVP.Promise((resolve/*, reject*/) => {
      store.queryRecord('user', {}).then((userRecord) => {
        if (window.Intercom) {
          window.Intercom('update', {
            name: userRecord.get('name'),
            email: userRecord.get('email'),
            created_at: userRecord.get('createdAt').getTime() / 1000,
          });
        }
        resolve({user: userRecord});
      }, (/*reason*/) => {
        // Build params if given a custom final redirect location.
        var finalRedirect;
        options = options || {};
        if (options.redirectTo) {
          var parser = document.createElement('a');
          parser.href = window.location.href;
          parser.pathname = '/login';
          parser.search = '?redirect_to=' + encodeURIComponent(options.redirectTo);
          finalRedirect = parser.href;
        } else {
          finalRedirect = '/login';
        }
        // Redirect to GitHub auth.
        window.location = utils.buildApiUrl('login', {params: {redirect_to: finalRedirect}});
      })
    });
  },
  invalidate() {
    return Ember.$.ajax({
      type: 'GET',
      url: utils.buildApiUrl('logout')
    });
  }
});
