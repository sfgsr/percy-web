import Ember from 'ember';
import utils from '../lib/utils';
import Base from 'simple-auth/authenticators/base';

export default Base.extend({
  restore: function() {
    // Strategy: completely ignore the restore data and ask the backend again for current auth info.
    return new Ember.RSVP.Promise(function(resolve, reject) {
      var receiveMessage = function(event) {
        // For security reasons, only accept postMessage events from the API origin.
        if (event.origin !== window.location.origin) {
          return;
        }
        if (event.data.user) {
          // Success! Store the user in the session.
          var serializer = this.get('store').serializerFor('user');
          var userData = serializer.normalize(this.store.modelFor('user'), event.data.user.data);
          Ember.$('.auth-iframe').remove();

          var userRecord = this.get('store').push('user', userData);
          resolve({user: userRecord, userData: userData});
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
  authenticate: function(options) {
    options = options || {};
    return new Ember.RSVP.Promise(function(resolve) {
      // First, declare a message receiver for the postMessage events.
      var receiveMessage = function(event) {
        // For security reasons, only accept postMessage events from the API origin.
        if (event.origin !== window.location.origin) {
          return;
        }
        if (event.data.user) {
          // Success! Store the user in the session.
          var serializer = this.get('store').serializerFor('user');
          var userData = serializer.normalize(this.store.modelFor('user'), event.data.user.data);
          Ember.$('.auth-iframe').remove();

          var userRecord = this.get('store').push('user', userData);
          resolve({user: userRecord, userData: userData});
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
  invalidate: function() {
    return new Ember.RSVP.Promise(function(resolve) {
      var iframe = Ember.$(
        '<iframe class="auth-iframe" style="display: block" width="0" height="0" frameborder="0">');
      iframe = iframe.attr('src', utils.buildApiUrl('logout'));
      iframe.appendTo('body');
      resolve({});
    }.bind(this));
  }
});
