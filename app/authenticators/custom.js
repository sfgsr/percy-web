import Ember from 'ember';
import utils from '../lib/utils';
import BaseAuthenticator from 'ember-simple-auth/authenticators/base';

// TODO: needs a complete refactor since we don't need the iframe postMessage architecture anymore.
export default BaseAuthenticator.extend({
  store: Ember.inject.service(),
  restore() {
    // Strategy: completely ignore the restore data and ask the backend again for current auth info.
    return new Ember.RSVP.Promise(function(resolve, reject) {
      var receiveMessage = function(event) {
        var store = this.get('store');
        // For security reasons, only accept postMessage events from the API origin.
        if (event.origin !== window.location.origin) {
          return;
        }
        if (event.data.user) {
          var payload = event.data.user;
          // Success! Store the user in the session.
          Ember.$('.auth-iframe').remove();

          var userId = payload.data.id;
          store.pushPayload(payload);
          var userRecord = store.peekRecord('user', userId);

          if (window.Intercom) {
            window.Intercom('update', {
              name: userRecord.get('name'),
              email: userRecord.get('email'),
              created_at: userRecord.get('createdAt').getTime() / 1000,
            });
          }

          resolve({user: userRecord});
        } else if (event.data === 'unauthenticated') {
          reject();
        }
      }.bind(this);
      window.addEventListener('message', receiveMessage, false);

      // Second, inject the iframe into the page, which will trigger the postMessage events.
      var iframe = Ember.$(
        '<iframe class="auth-iframe" style="display: block" width="0" height="0" frameborder="0">');
      iframe = iframe.attr('src', utils.buildApiUrl('postMessageIframe'));
      iframe.appendTo('body');
    }.bind(this));
  },
  authenticate(options) {
    options = options || {};
    return new Ember.RSVP.Promise(function(resolve) {
      // First, declare a message receiver for the postMessage events.
      var receiveMessage = function(event) {
        var store = this.get('store');
        // For security reasons, only accept postMessage events from the API origin.
        if (event.origin !== window.location.origin) {
          return;
        }
        if (event.data.user) {
          // Success! Store the user in the session.
          var payload = event.data.user;
          Ember.$('.auth-iframe').remove();

          var userId = payload.data.id;
          store.pushPayload(payload);
          var userRecord = store.peekRecord('user', userId);

          if (window.Intercom) {
            window.Intercom('update', {
              name: userRecord.get('name'),
              email: userRecord.get('email'),
              created_at: userRecord.get('createdAt').getTime() / 1000,
            });
          }

          resolve({user: userRecord});
        } else if (event.data === 'unauthenticated') {
          // Build params if given a custom final redirect location.
          var finalRedirect;
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
        } else {
          Ember.Logger.warn('Ignoring postMessage:', event.data);
          // Do not reject here, because authentication did not fail and this is an unrelated
          // message. Rejecting will cause bugs.
        }
      }.bind(this);
      window.addEventListener('message', receiveMessage, false);

      // Second, inject the iframe into the page, which will trigger the postMessage events.
      var iframe = Ember.$(
        '<iframe class="auth-iframe" style="display: block" width="0" height="0" frameborder="0">');
      iframe = iframe.attr('src', utils.buildApiUrl('postMessageIframe'));
      iframe.appendTo('body');
    }.bind(this));
  },
  invalidate() {
    return new Ember.RSVP.Promise(function(resolve) {
      var iframe = Ember.$(
        '<iframe class="auth-iframe" style="display: block" width="0" height="0" frameborder="0">');
      iframe = iframe.attr('src', utils.buildApiUrl('logout'));
      iframe.appendTo('body');
      if (window.Intercom) {
        window.Intercom('shutdown');
      }
      resolve({});
    }.bind(this));
  }
});
