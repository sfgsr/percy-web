import Ember from 'ember';
import BaseAuthenticator from 'ember-simple-auth/authenticators/base';


export default BaseAuthenticator.extend({
  store: Ember.inject.service(),

  restore() {
    // This is a workaround: ember-simple-auth installs a beforeModelHook to
    // applicationRoute, which calls authenticator.restore.
    // In tests we typically call authenticatSession before that.
    // So we're just resetting what we already set in authenticate.
    return Ember.RSVP.resolve({user: this.userRecord});
  },

  authenticate(user) {
    let store = this.get('store');
    return new Ember.RSVP.Promise((resolve) => {
      store.findRecord('user', user.id).then((userRecord) => {
        this.userRecord = userRecord;
        resolve({user: userRecord});
      });
    });
  },

  invalidate() {
    return Ember.RSVP.resolve();
  }
});
