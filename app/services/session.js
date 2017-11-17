import {inject as service} from '@ember/service';
import SessionService from 'ember-simple-auth/services/session';
import {resolve} from 'rsvp';
import {Promise as EmberPromise} from 'rsvp';

export default SessionService.extend({
  store: service(),
  analytics: service(),

  // set by load method
  currentUser: null,

  loadCurrentUser() {
    if (this.get('isAuthenticated')) {
      return (
        this.get('store')
          .queryRecord('user', {})
          .then(user => {
            this.set('currentUser', user);
            this._setupThirdPartyUserContexts(user);
          })
          // This catch will be triggered if the queryRecord or set currentUser
          // fails. If we don't have a user, the site will be very broken
          // so kick them out.
          .catch(() => {
            this.invalidate();

            this._clearThirdPartyUserContext();
          })
      );
    } else {
      // This needs to return a resolved promise because beforeModel in
      // ember-simple-auth application route mixin needs a resolved promise.
      return resolve();
    }
  },

  _setupThirdPartyUserContexts(user) {
    if (!user) {
      return;
    }
    // Always resolve this successfully, even if it errors.
    // The user should be able to access the site even if third party services fail.
    return new EmberPromise((resolve /*reject*/) => {
      this._setupSentry(user);
      this._setupAnalytics(user);
      this._setupIntercom(user);
      resolve();
    });
  },

  _clearThirdPartyUserContext() {
    this._clearSentry();
    this._clearAnalytics();

    if (window.localStorage) {
      window.localStorage.clear();
    }
  },

  _setupSentry(user) {
    if (window.Raven) {
      Raven.setUserContext({id: user.get('id')});
    }
  },
  _clearSentry() {
    if (window.Raven) {
      Raven.setUserContext();
    }
  },
  _setupAnalytics(user) {
    this.get('analytics').identifyUser(user);
  },
  _clearAnalytics() {
    this.get('analytics').invalidate();
  },
  _setupIntercom(user) {
    if (window.Intercom) {
      window.Intercom('update', {
        user_hash: user.get('userHash'),
        name: user.get('name'),
        email: user.get('email'),
        created_at: user.get('createdAt').getTime() / 1000,
      });
    }
  },
});
