import Ember from 'ember';
import BaseAuthenticator from 'ember-simple-auth/authenticators/base';

export default BaseAuthenticator.extend({
  store: Ember.inject.service(),

  restore() {
    let store = this.get('store');
    return new Ember.RSVP.Promise((resolve, reject) => {
      store.findRecord('user', 'current').then((userRecord) => {
        this.userRecord = userRecord;
        resolve({user: userRecord});
      }, reject);
    });
  },

  authenticate() {
    let store = this.get('store');
    return new Ember.RSVP.Promise((resolve, reject) => {
      store.findRecord('user', 'current').then((userRecord) => {
        this.userRecord = userRecord;
        resolve({user: userRecord});
      }, reject);
    });
  },

  invalidate() {
    return Ember.RSVP.resolve();
  }
});
