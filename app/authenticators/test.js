import Ember from 'ember';
import utils from '../lib/utils';
import BaseAuthenticator from 'ember-simple-auth/authenticators/base';

export default BaseAuthenticator.extend({
  store: Ember.inject.service(),

  restore() {
    let store = this.get('store');
    return new Ember.RSVP.Promise((resolve, reject) => {
      store.queryRecord('user', {}).then((userRecord) => {
        resolve({user: userRecord});
      }, reject);
    });
  },

  authenticate() {
    let store = this.get('store');
    return new Ember.RSVP.Promise((resolve, reject) => {
      store.queryRecord('user', {}).then((userRecord) => {
        resolve({user: userRecord});
      }, reject);
    });
  },

  invalidate() {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      Ember.$.ajax({
        type: 'GET',
        url: utils.buildApiUrl('logout')
      }).done(function(data/*, textStatus, xhr*/) {
        resolve(data);
      }).fail(function(xhr/*, textStatus, errorThrown*/) {
        reject(xhr);
      });
    });
  }
});
