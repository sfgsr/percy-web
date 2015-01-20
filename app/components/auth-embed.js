import Ember from 'ember';
import BaseComponent from './base';
import config from '../config/environment';

export default BaseComponent.extend({
  listenForMessage: function() {
    var receiveMessage = function(event) {
      if (event.origin !== config.API_URI) {
        return;
      }
      if (event.data.token) {
        window.sessionStorage.setItem('user_token', event.data.token);
      } else if (event.data === 'redirect') {
        window.location = config.BASE_AUTHENTICATION_PATH + '?redirect_to=' + window.location.origin;
      } else {
        Ember.Logger.warn('Unhandled iframe message data:', event.data);
      }
    };
    window.addEventListener('message', receiveMessage, false);
  }.on('willInsertElement'),
});
