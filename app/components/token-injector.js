import Ember from 'ember';
import utils from '../lib/utils';

export default Ember.Component.extend({
  tagName: 'span',
  postMessageIframeUrl: utils.buildApiUrl('postMessageIframe'),

  listenForMessage: function() {
    var receiveMessage = function(event) {
      if (event.origin !== utils.buildApiUrl('base')) {
        return;
      }
      if (event.data.token) {
        window.sessionStorage.setItem('user_token', event.data.token);
      } else if (event.data === 'redirect') {
        window.location = utils.buildApiUrl('loginPath', {redirect_to: window.location.origin});
      } else {
        Ember.Logger.warn('Unhandled iframe message data:', event.data);
      }
    };
    window.addEventListener('message', receiveMessage, false);
  }.on('willInsertElement'),
});
