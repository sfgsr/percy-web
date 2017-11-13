import $ from 'jquery';
import {Promise as EmberPromise} from 'rsvp';
import {inject as service} from '@ember/service';
import utils from '../lib/utils';
import BaseAuthenticator from 'ember-simple-auth/authenticators/base';

export default BaseAuthenticator.extend({
  store: service(),
  analytics: service(),
  restore() {
    let store = this.get('store');
    return new EmberPromise((resolve, reject) => {
      store.queryRecord('user', {}).then(userRecord => {
        if (window.Intercom) {
          window.Intercom('update', {
            user_hash: userRecord.get('userHash'),
            name: userRecord.get('name'),
            email: userRecord.get('email'),
            created_at: userRecord.get('createdAt').getTime() / 1000,
          });
        }
        this.get('analytics').identifyUser(userRecord);

        // Setting Sentry user context
        Raven.setUserContext({id: userRecord.id});

        resolve({user: userRecord});
      }, reject);
    });
  },
  authenticate(options) {
    let store = this.get('store');
    return new EmberPromise(resolve => {
      store.queryRecord('user', {}).then(
        userRecord => {
          if (window.Intercom) {
            window.Intercom('update', {
              user_hash: userRecord.get('userHash'),
              name: userRecord.get('name'),
              email: userRecord.get('email'),
              created_at: userRecord.get('createdAt').getTime() / 1000,
            });
          }
          this.get('analytics').identifyUser(userRecord);

          // Setting Sentry user context
          Raven.setUserContext({id: userRecord.id});

          resolve({user: userRecord});
        },
        () => {
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
        },
      );
    });
  },
  invalidate() {
    return new EmberPromise((resolve, reject) => {
      let logoutResult = $.ajax({type: 'GET', url: utils.buildApiUrl('logout')});
      logoutResult.done(data => {
        // If a user clicks Logout, make sure we clear all the persistent storage locations.
        this.get('analytics').invalidate();

        Raven.setUserContext();

        if (window.localStorage) {
          window.localStorage.clear();
        }
        resolve(data);
      });
      logoutResult.fail(function(xhr) {
        reject(xhr);
      });
    });
  },
});
