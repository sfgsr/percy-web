import Ember from 'ember';
import BaseAuthenticator from 'ember-simple-auth/authenticators/base';

export default BaseAuthenticator.extend({
  store: Ember.inject.service(),

  restore() {
    let store = this.get('store');
    return new Ember.RSVP.Promise((resolve) => {
      store.findRecord('user', 'current').then((userRecord) => {
        this.userRecord = userRecord;
        resolve({user: userRecord});
      });
    });
  },

  authenticate() {
    let store = this.get('store');
    return new Ember.RSVP.Promise((resolve) => {
      store.findRecord('user', 'current').then((userRecord) => {
        this.userRecord = userRecord;
        resolve({user: userRecord});
      });
    });
  },

  invalidate() {
    return Ember.RSVP.resolve();
  }
});
