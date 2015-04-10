import Ember from 'ember';
import utils from '../lib/utils';
import Base from 'simple-auth/authenticators/base';

export default Base.extend({
  restore: function(data) {
    debugger
    if (data.userToken) {
      return Ember.RSVP.resolve(data);
    }
    return Ember.RSVP.reject();
  },
  authenticate: function(options) {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      // First, declare a message receiver for the postMessage events.
      var receiveMessage = function(event) {
        Ember.Logger.warn('event', event);
        Ember.Logger.warn('options', options);
        if (event.origin !== utils.buildApiUrl('base')) {
          return;
        }
        if (event.data.token) {
          resolve({userToken: event.data.token});
        } else if (event.data === 'unauthenticated') {
          if (options.doRedirect) {
            var params = {redirect_to: window.location.origin};
            window.location = utils.buildApiUrl('login', {params: params});
          }
        } else {
          Ember.Logger.warn('Unhandled iframe message data:', event.data);
          reject();
        }
      };
      window.addEventListener('message', receiveMessage, false);

      // Second, inject the iframe into the page, which will trigger the postMessage events.
      var iframe = $('<iframe width="0" height="0" frameborder="0">');
      iframe = iframe.attr('src', utils.buildApiUrl('postMessageIframe'));
      iframe.appendTo('body');
    });
    return Ember.RSVP.resolve({token: token});
  },
  invalidate: function(data) {
    // TODO: logout
    return Ember.RSVP.resolve({});
  }
});