import Ember from 'ember';
import BaseAuthenticator from 'ember-simple-auth/authenticators/base';


export default BaseAuthenticator.extend({
  store: Ember.inject.service(),

  restore(data) {
    return Ember.RSVP.resolve(data);
  },

  authenticate(data) {
    let userId = data.data.id;
    let store = this.get('store');
    store.pushPayload(data);

    let userRecord = store.peekRecord('user', userId);
    return Ember.RSVP.resolve({user: userRecord});
  },

  invalidate() {
    return Ember.RSVP.resolve();
  }
});