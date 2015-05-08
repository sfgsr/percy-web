import Ember from 'ember';
import utils from '../lib/utils';
import Base from 'simple-auth/authenticators/base';

export default Base.extend({
  restore: function(data) {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      if (data.userData) {
        var userRecord = this.get('store').push('user', data.userData);
        resolve({user: userRecord, userData: data.userData});
      } else {
        reject();
      }
    }.bind(this));
  },
  authenticate: function(options) {
    return new Ember.RSVP.Promise(function(resolve, reject) {
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
          // Redirect to GitHub auth.
          if (options.doRedirect) {
            var parser = document.createElement('a');
            parser.href = window.location.href;
            parser.hash = '#auth';
            var params = {redirect_to: parser.href};
            window.location = utils.buildApiUrl('login', {params: params});
          }
        } else {
          Ember.Logger.warn('Unhandled iframe message data:', event.data);
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
